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
use OCA\Richdocuments\Exceptions\WopiException;
use OCA\Richdocuments\Helper;
use OCA\Richdocuments\Service\DiscoveryService;
use OCA\Richdocuments\Service\ProofKeyService;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\JSONResponse;
use OCP\AppFramework\Http\Response;
use OCP\AppFramework\Middleware;
use OCP\Files\NotPermittedException;
use OCP\IConfig;
use OCP\IRequest;
use OCP\IURLGenerator;
use Psr\Log\LoggerInterface;
use ReflectionClass;
use ReflectionMethod;
use Symfony\Component\HttpFoundation\IpUtils;

class WOPIMiddleware extends Middleware {
	public function __construct(
		private IConfig $config,
		private IURLGenerator $urlGenerator,
		private IRequest $request,
		private DiscoveryService $discoveryService,
		private WopiMapper $wopiMapper,
		private LoggerInterface $logger,
		private ProofKeyService $proofKeyService,
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
			$accessToken = $this->request->getParam('access_token');
			$isWopiSettingsUrl = str_contains($this->request->getRequestUri(), '/wopi/settings');

			if (!$isWopiSettingsUrl) {
				$wopiProof = $this->request->getHeader('X-WOPI-Proof');
				$wopiProofOld = $this->request->getHeader('X-WOPI-ProofOld');
				$hasProofKey = $this->discoveryService->hasProofKey();

				// This could mean the discovery cache needs to be updated
				//     e.g. if Collabora sends a WOPI proof but the cached discovery
				//          says there is not one, then we should re-fetch it
				if ($hasProofKey !== (bool)$wopiProof) {
					$this->discoveryService->fetch();
					$hasProofKey = $this->discoveryService->hasProofKey();
				}

				if ($hasProofKey) {
					$wopiTimestamp = $this->request->getHeader('X-WOPI-TimeStamp');
					$wopiTimestampIsOld = $this->proofKeyService->isOldTimestamp((int)$wopiTimestamp);

					if ($wopiTimestampIsOld) {
						throw new WopiException('X-WOPI-TimeStamp header is older than 20 minutes');
					}

					$url = $this->urlGenerator->getAbsoluteURL($this->request->getRequestUri());

					$isProofValid = $this->proofKeyService->isProofValid(
						$accessToken,
						$url,
						$wopiTimestamp,
						$wopiProof,
						$wopiProofOld
					);

					if (!$isProofValid) {
						throw new WopiException('Invalid WOPI proof');
					}
				}
			}

			$fileId = $this->request->getParam('fileId');
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
		} catch (WopiException $e) {
			$this->logger->error('WOPI error: ' . $e->getMessage(), [
				'exception' => $e,
			]);
			throw new WopiException();
		} catch (\Exception $e) {
			$this->logger->error('Failed to validate WOPI access', [ 'exception' => $e ]);
			throw new NotPermittedException();
		}

		$this->isWOPIRequest = true;
	}

	public function afterException($controller, $methodName, \Exception $exception): Response {
		if ($exception instanceof WopiException && $controller instanceof WopiController) {
			return new JSONResponse([], Http::STATUS_INTERNAL_SERVER_ERROR);
		}

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
