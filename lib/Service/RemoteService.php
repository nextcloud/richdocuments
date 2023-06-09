<?php

namespace OCA\Richdocuments\Service;

use Exception;
use OCA\Richdocuments\AppConfig;
use OCP\Files\File;
use OCP\Files\NotFoundException;
use OCP\Http\Client\IClientService;
use Psr\Log\LoggerInterface;

class RemoteService {

	public const REMOTE_TIMEOUT_DEFAULT = 25;

	public function __construct(
		private AppConfig $appConfig,
		private IClientService $clientService,
		private LoggerInterface $logger,
	) {
	}

	public function fetchTargets($file): array {
		$client = $this->clientService->newClient();
		try {
			$response = $client->put(
				$this->appConfig->getCollaboraUrlInternal(). '/cool/extract-link-targets',
				$this->getRequestOptionsForFile($file)
			);
		} catch (Exception $e) {
			$this->logger->warning('Failed to fetch extract-link-targets', ['exception' => $e]);
			return [];
		}

		$json = trim($response->getBody());
		$json = str_replace(['", }', "\r\n", "\t"], ['" }', '\r\n', '\t'], $json);
		try {
			$result = json_decode($json, true, 512, JSON_THROW_ON_ERROR);
		} catch (\JsonException $e) {
			$this->logger->warning('Failed to parse extract-link-targets response', ['exception' => $e]);
			return [];
		}
		return $result;
	}

	public function fetchTargetThumbnail(File $file, string $target): ?string {
		$client = $this->clientService->newClient();
		try {
			$response = $client->put($this->appConfig->getCollaboraUrlInternal(). '/cool/get-thumbnail', $this->getRequestOptionsForFile($file, $target));
			return (string)$response->getBody();
		} catch (Exception $e) {
			$this->logger->info('Failed to fetch target thumbnail', ['exception' => $e]);
		}
		return null;
	}

	private function getRequestOptionsForFile(File $file, ?string $target = null): array {
		$useTempFile = $file->isEncrypted() || !$file->getStorage()->isLocal();
		if ($useTempFile) {
			$localFile = $file->getStorage()->getLocalFile($file->getInternalPath());
			if (!is_string($localFile)) {
				throw new NotFoundException('Could not get local file');
			}
			$stream = fopen($localFile, 'rb');
		} else {
			$stream = $file->fopen('rb');
		}

		$options = [
			'timeout' => self::REMOTE_TIMEOUT_DEFAULT,
			'multipart' => [
				['name' => $file->getName(), 'contents' => $stream],
				['name' => 'target', 'contents' => $target]
			]
		];

		if ($this->appConfig->getDisableCertificateValidation()) {
			$options['verify'] = false;
		}

		$options['headers'] = [
			'User-Agent' => 'Nextcloud Server / richdocuments',
			'Accept' => 'application/json',
		];

		return $options;
	}
}
