<?php
/**
 * SPDX-FileCopyrightText: 2017 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\Richdocuments\Middleware;

use OCA\Richdocuments\AppInfo\Application;
use OCA\Richdocuments\Controller\Attribute\RestrictToWopiServer;
use OCA\Richdocuments\Controller\WopiController;
use OCA\Richdocuments\Db\WopiMapper;
use OCA\Richdocuments\Exceptions\ExpiredTokenException;
use OCA\Richdocuments\Exceptions\UnknownTokenException;
use OCA\Richdocuments\Helper;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\JSONResponse;
use OCP\AppFramework\Http\Response;
use OCP\AppFramework\Middleware;
use OCP\Files\NotPermittedException;
use OCP\IConfig;
use OCP\IRequest;
use Psr\Log\LoggerInterface;
use ReflectionClass;
use ReflectionMethod;
use Symfony\Component\HttpFoundation\IpUtils;

class WOPIMiddleware extends Middleware {
	public function __construct(
		private IConfig $config,
		private IRequest $request,
		private WopiMapper $wopiMapper,
		private LoggerInterface $logger,
		private bool $isWOPIRequest = false,
	) {
	}

	public function beforeController($controller, $methodName) {
		parent::beforeController($controller, $methodName);

		// Check controllers that are only supposed to be called by Collabora directly
		$reflectionClass = new ReflectionClass($controller);
		$hasClassAttribute = !empty($reflectionClass->getAttributes(RestrictToWopiServer::class));

		$reflectionMethod = new ReflectionMethod($controller, $methodName);
		$hasMethodAttribute = !empty($reflectionMethod->getAttributes(RestrictToWopiServer::class));

		$isRestricted = $hasClassAttribute || $hasMethodAttribute;
		if ($isRestricted && !$this->isWOPIAllowed()) {
			throw new NotPermittedException();
		}

		if (!$controller instanceof WopiController) {
			return;
		}

		if (str_contains($this->request->getRequestUri(), '/wopi/settings')) {
			return;
		}

		try {
			$fileId = $this->request->getParam('fileId');
			$accessToken = $this->request->getParam('access_token');
			[$fileId, ,] = Helper::parseFileId($fileId);
			$wopi = $this->wopiMapper->getWopiForToken($accessToken);
			if ((int)$fileId !== $wopi->getFileid() && (int)$fileId !== $wopi->getTemplateId()) {
				throw new NotPermittedException();
			}
		} catch (UnknownTokenException|ExpiredTokenException $e) {
			if ($this->request->getMethod() === 'POST') {
				$this->logger->error('Failed to validate WOPI access during save', [ 'exception' => $e ]);
			} else {
				$this->logger->info('Invalid token for WOPI access', [ 'exception' => $e ]);
			}
			throw new NotPermittedException();
		} catch (\Exception $e) {
			$this->logger->error('Failed to validate WOPI access', [ 'exception' => $e ]);
			throw new NotPermittedException();
		}

		$this->isWOPIRequest = true;
	}

	public function afterException($controller, $methodName, \Exception $exception): Response {
		if ($exception instanceof NotPermittedException && $controller instanceof WopiController) {
			return new JSONResponse([], Http::STATUS_FORBIDDEN);
		}

		if ($controller instanceof WopiController) {
			$this->logger->error('Uncaught error: ' . $exception->getMessage(), [ 'exception' => $exception ]);
			return new JSONResponse([
				'message' => 'Error'
			], Http::STATUS_INTERNAL_SERVER_ERROR);
		}

		throw $exception;
	}

	public function isWOPIAllowed(): bool {
		$allowedRanges = $this->config->getAppValue(Application::APPNAME, 'wopi_allowlist');
		if ($allowedRanges === '') {
			return true;
		}
		$allowedRanges = preg_split('/(\s|,|;|\|)+/', $allowedRanges);

		$userIp = $this->request->getRemoteAddress();
		if (IpUtils::checkIp($userIp, $allowedRanges)) {
			return true;
		}

		$this->logger->warning('WOPI request denied from ' . $userIp . ' as it does not match the configured ranges: ' . implode(', ', $allowedRanges));
		return false;
	}

	public function isWOPIRequest(): bool {
		return $this->isWOPIRequest;
	}
}
