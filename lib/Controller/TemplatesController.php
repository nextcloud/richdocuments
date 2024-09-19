<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2018 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Controller;

use OC\Files\Filesystem;
use OCA\Richdocuments\TemplateManager;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Http\FileDisplayResponse;
use OCP\AppFramework\Http\JSONResponse;
use OCP\AppFramework\Http\NotFoundResponse;
use OCP\Files\IMimeTypeDetector;
use OCP\Files\Node;
use OCP\Files\NotFoundException;
use OCP\Files\SimpleFS\ISimpleFile;
use OCP\IL10N;
use OCP\IPreview;
use OCP\IRequest;
use Psr\Log\LoggerInterface;

class TemplatesController extends Controller {
	/** @var int Max template size */
	private $maxSize = 20 * 1024 * 1024;

	/**
	 * Templates controller
	 *
	 * @param string $appName
	 * @param IRequest $request
	 * @param IL10N $l10n
	 * @param TemplateManager $manager
	 * @param IPreview $preview
	 */
	public function __construct(
		$appName,
		IRequest $request,
		private IL10N $l10n,
		private TemplateManager $manager,
		private IPreview $preview,
		private IMimeTypeDetector $mimeTypeDetector,
		private LoggerInterface $logger,
	) {
		parent::__construct($appName, $request);

		$this->appName = $appName;
		$this->request = $request;
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @PublicPage
	 *
	 * Get preview for a specific template
	 *
	 * @param int $fileId The template id
	 * @param int $x
	 * @param int $y
	 * @param bool $a
	 * @param bool $forceIcon
	 * @param string $mode
	 * @return DataResponse
	 * @throws NotFoundResponse
	 */
	public function getPreview($fileId,
		$x = 150,
		$y = 150,
		$a = false,
		$forceIcon = true,
		$mode = 'fill') {
		if ($fileId === '' || $x === 0 || $y === 0) {
			return new DataResponse([], Http::STATUS_BAD_REQUEST);
		}

		try {
			$template = $this->manager->get($fileId);
		} catch (NotFoundException) {
			return new DataResponse([], Http::STATUS_NOT_FOUND);
		}

		if ($template instanceof ISimpleFile) {
			return new DataResponse([], Http::STATUS_NOT_FOUND);
		}

		return $this->fetchPreview($template, $x, $y, $a, $forceIcon, $mode);
	}

	/**
	 * Add a global template
	 *
	 * @return JSONResponse
	 */
	public function add() {
		$files = $this->request->getUploadedFile('files');

		if (!is_null($files)) {
			$mimeType = !empty($files['type'] ?? '') ? $files['type'] : $this->mimeTypeDetector->detect($files['tmp_name']);
			$error = $files['error'] ?? 0;

			if ($error !== 0) {
				$this->logger->error('Failed to get the uploaded file. PHP file upload error code: ' . $error);
				return new JSONResponse(
					['data' => ['message' => $this->l10n->t('Failed to upload the file')]],
					Http::STATUS_BAD_REQUEST
				);
			}

			if (is_uploaded_file($files['tmp_name']) && !Filesystem::isFileBlacklisted($files['tmp_name'])) {
				if ($files['size'] > $this->maxSize) {
					return new JSONResponse(
						['data' => ['message' => $this->l10n->t('File is too big')]],
						Http::STATUS_BAD_REQUEST
					);
				}

				if (!$this->manager->isValidTemplateMime($mimeType)) {
					return new JSONResponse(
						['data' => ['message' => $this->l10n->t('Only template files can be uploaded')]],
						Http::STATUS_BAD_REQUEST
					);
				}

				$templateName = $files['name'];
				$templateFile = file_get_contents($files['tmp_name']);

				unlink($files['tmp_name']);

				$template = $this->manager->add($templateName, $templateFile);

				return new JSONResponse(
					['data' => $template],
					Http::STATUS_CREATED
				);
			}
		}

		return new JSONResponse(
			['data' => ['message' => $this->l10n->t('Invalid file provided')]],
			Http::STATUS_BAD_REQUEST
		);
	}

	/**
	 * Delete a global template
	 *
	 * @param int $fileId
	 * @return JSONResponse
	 */
	public function delete($fileId) {
		try {
			$this->manager->delete($fileId);

			return new JSONResponse(
				['data' => ['status' => 'success']],
				Http::STATUS_NO_CONTENT
			);
		} catch (NotFoundException) {
			return new JSONResponse(
				['data' => ['message' => $this->l10n->t('Template not found')]],
				Http::STATUS_NOT_FOUND
			);
		}
	}

	/**
	 * @param Node $node
	 * @param int $x
	 * @param int $y
	 * @param bool $a
	 * @param bool $forceIcon
	 * @param string $mode
	 * @return DataResponse|FileDisplayResponse
	 */
	private function fetchPreview(
		Node $node,
		int $x,
		int $y,
		bool $a = false,
		bool $forceIcon = true,
		string $mode = IPreview::MODE_FILL): Http\Response {
		if (!($node instanceof Node) || (!$forceIcon && !$this->preview->isAvailable($node))) {
			return new DataResponse([], Http::STATUS_NOT_FOUND);
		}
		if (!$node->isReadable()) {
			return new DataResponse([], Http::STATUS_FORBIDDEN);
		}

		try {
			$f = $this->preview->getPreview($node, $x, $y, !$a, $mode);
			$response = new FileDisplayResponse($f, Http::STATUS_OK, ['Content-Type' => $f->getMimeType()]);
			$response->cacheFor(3600 * 24);

			return $response;
		} catch (NotFoundException) {
			return new DataResponse([], Http::STATUS_NOT_FOUND);
		} catch (\InvalidArgumentException) {
			return new DataResponse([], Http::STATUS_BAD_REQUEST);
		}
	}
}
