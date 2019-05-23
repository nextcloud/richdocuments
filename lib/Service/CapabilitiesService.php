<?php
/**
 * @copyright Copyright (c) 2019, Roeland Jago Douma <roeland@famdouma.nl>
 *
 * @author Roeland Jago Douma <roeland@famdouma.nl>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\Richdocuments\Service;

use OCP\Files\IAppData;
use OCP\Files\NotFoundException;
use OCP\Files\SimpleFS\ISimpleFile;
use OCP\Files\SimpleFS\ISimpleFolder;
use OCP\Http\Client\IClientService;
use OCP\IConfig;

class CapabilitiesService {

	/** @var IConfig */
	private $config;
	/** @var IClientService */
	private $clientService;
	/** @var ISimpleFolder */
	private $appData;
	/** @var array */
	private $capabilities;

	public function __construct(IConfig $config, IClientService $clientService, IAppData $appData) {
		$this->config = $config;
		$this->clientService = $clientService;
		try {
			$this->appData = $appData->getFolder('richdocuments');
		} catch (NotFoundException $e) {
			$this->appData = $appData->newFolder('richdocuments');
		}
	}


	public function getCapabilities() {
		if ($this->capabilities) {
			return $this->capabilities;
		}
		try {
			$file = $this->appData->getFile('capabilities.json');
			$decodedFile = \json_decode($file->getContent(), true);
		} catch (NotFoundException $e) {
			return [];
		}

		if (!is_array($decodedFile)) {
			return [];
		}
		$this->capabilities = $decodedFile;

		return $this->capabilities;
	}

	public function hasTemplateSaveAs() {
		return $this->getCapabilities()['hasTemplateSaveAs'] ?? false;
	}

	public function hasTemplateSource() {
		return $this->getCapabilities()['hasTemplateSource'] ?? false;
	}

	private function getFile() {
		try {
			$file = $this->appData->getFile('capabilities.json');
		} catch (NotFoundException $e) {
			$file = $this->appData->newFile('capabilities.json');
			$file->putContent(json_encode([]));
		}

		return $file;
	}

	public function clear() {
		$file = $this->getFile();
		$file->putContent(json_encode([]));
	}

	public function refretch() {
		$capabilties = $this->renewCapabilities();

		if ($capabilties !== []) {
			$file = $this->getFile();
			$file->putContent(json_encode($capabilties));
		}
	}

	private function renewCapabilities() {
		$remoteHost = $this->config->getAppValue('richdocuments', 'wopi_url');
		if ($remoteHost === '') {
			return [];
		}
		$capabilitiesEndpoint = $remoteHost . '/hosting/capabilities';

		$client = $this->clientService->newClient();
		$options = ['timeout' => 10];

		if ($this->config->getAppValue('richdocuments', 'disable_certificate_verification') === 'yes') {
			$options['verify'] = false;
		}

		try {
			$response = $client->get($capabilitiesEndpoint, $options);
		} catch (\Exception $e) {
			return [];
		}

		$responseBody = $response->getBody();
		$ret = \json_decode($responseBody, true);

		if (!is_array($ret)) {
			return [];
		}

		return $ret;
	}

}
