<?php
/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\Richdocuments\Service;

use Exception;
use OCA\Richdocuments\AppConfig;
use OCP\Files\File;
use OCP\Files\NotFoundException;
use OCP\Http\Client\IClientService;
use Psr\Log\LoggerInterface;

class RemoteService {
	public function __construct(
		private AppConfig $appConfig,
		private IClientService $clientService,
		private CapabilitiesService $capabilitiesService,
		private LoggerInterface $logger,
	) {
	}

	public function fetchTargets($file): array {
		$client = $this->clientService->newClient();
		try {
			$response = $client->put(
				$this->appConfig->getCollaboraUrlInternal() . '/cool/extract-link-targets',
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
			$response = $client->put($this->appConfig->getCollaboraUrlInternal() . '/cool/get-thumbnail', $this->getRequestOptionsForFile($file, $target));
			return (string)$response->getBody();
		} catch (Exception $e) {
			$this->logger->info('Failed to fetch target thumbnail', ['exception' => $e]);
		}
		return null;
	}

	/**
	 * @return resource|string
	 */
	public function convertFileTo(File $file, string $format) {
		$fileName = $file->getStorage()->getLocalFile($file->getInternalPath());
		$stream = fopen($fileName, 'rb');

		if ($stream === false) {
			throw new Exception('Failed to open stream');
		}
		return $this->convertTo($file->getName(), $stream, $format);
	}

	/**
	 * @param resource $stream
	 * @return resource|string
	 */
	public function convertTo(string $filename, $stream, string $format, ?array $conversionOptions = []) {
		$client = $this->clientService->newClient();
		$options = RemoteOptionsService::getDefaultOptions();
		// FIXME: can be removed once https://github.com/CollaboraOnline/online/issues/6983 is fixed upstream
		$options['expect'] = false;

		if ($this->appConfig->getDisableCertificateValidation()) {
			$options['verify'] = false;
		}

		$options['multipart'] = [
			array_merge([
				'name' => $filename,
				'filename' => $filename,
				'contents' => $stream
			], $conversionOptions),
		];

		try {
			$response = $client->post($this->appConfig->getCollaboraUrlInternal() . '/cool/convert-to/' . $format, $options);
			$body = $response->getBody();

			if (is_null($body)) {
				throw new \Exception('Empty response from Collabora server');
			}

			return $body;
		} catch (\Exception $e) {
			$this->logger->error('Failed to convert preview: ' . $e->getMessage(), ['exception' => $e]);
			throw $e;
		}
	}

	/**
	 * @param string $filename
	 * @param resource $stream
	 * @return array
	 */
	public function extractDocumentStructure(string $filename, $stream, string $filter): array {
		if (!$this->capabilitiesService->hasFormFilling()) {
			return [];
		}

		$collaboraUrl = $this->appConfig->getCollaboraUrlInternal();
		$client = $this->clientService->newClient();

		$options = RemoteOptionsService::getDefaultOptions();
		$options['expect'] = false;

		if ($this->appConfig->getDisableCertificateValidation()) {
			$options['verify'] = false;
		}

		$options['query'] = ['filter' => $filter];
		$options['multipart'] = [
			[
				'name' => 'data',
				'filename' => $filename,
				'contents' => $stream,
				'headers' => [ 'Content-Type' => 'multipart/form-data' ],
			],
		];

		try {
			$response = $client->post(
				$collaboraUrl . '/cool/extract-document-structure',
				$options
			);

			return json_decode($response->getBody(), true)['DocStructure'] ?? [];
		} catch (\Exception $e) {
			$this->logger->error($e->getMessage());
			return [];
		}
	}

	/**
	 * @param string $filename
	 * @param resource $stream
	 * @return string|resource
	 */
	public function transformDocumentStructure(string $filename, $stream, array $values, ?string $format = null) {
		if (!$this->capabilitiesService->hasFormFilling()) {
			throw new \RuntimeException('Form filling not supported by the Collabora server');
		}

		$collaboraUrl = $this->appConfig->getCollaboraUrlInternal();
		$client = $this->clientService->newClient();

		$options = RemoteOptionsService::getDefaultOptions();
		$options['expect'] = false;

		if ($this->appConfig->getDisableCertificateValidation()) {
			$options['verify'] = false;
		}

		$data = [
			'name' => 'data',
			'filename' => $filename,
			'contents' => $stream,
			'headers' => [ 'Content-Type' => 'multipart/form-data' ],
		];

		$transform = [
			'name' => 'transform',
			'contents' => '{"Transforms": ' . json_encode($values) . '}',
			'headers' => [ 'Content-Type' => 'application/json' ],
		];

		$options['multipart'] = [$data, $transform];

		if ($format !== null) {
			$options['multipart'][] = [
				'name' => 'format',
				'contents' => $format,
			];
		}

		try {
			$response = $client->post(
				$collaboraUrl . '/cool/transform-document-structure',
				$options
			);

			$body = $response->getBody();

			if (is_null($body)) {
				throw new \Exception('Empty response from Collabora server');
			}

			return $body;
		} catch (\Exception $e) {
			$this->logger->error($e->getMessage());
			throw $e;
		}
	}

	private function getRequestOptionsForFile(File $file, ?string $target = null): array {
		$localFile = $file->getStorage()->getLocalFile($file->getInternalPath());
		if (!is_string($localFile)) {
			throw new NotFoundException('Could not get local file');
		}
		$stream = fopen($localFile, 'rb');

		$options = RemoteOptionsService::getDefaultOptions(25);
		$options['multipart'] = [
			['name' => $file->getName(), 'contents' => $stream],
			['name' => 'target', 'contents' => $target]
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
