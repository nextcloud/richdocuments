<?php
/**
 * @copyright Copyright (c) 2018, Collabora Productivity.
 *
 * @author Tor Lillqvist <tml@collabora.com>
 *
 * @license AGPL-3.0
 *
 * This code is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License, version 3,
 * along with this program.  If not, see <http://www.gnu.org/licenses/>
 *
 */
namespace OCA\Richdocuments\Preview;

use OC\Preview\Provider;
use OCA\Richdocuments\Capabilities;
use OCP\Http\Client\IClientService;
use OCP\IConfig;

abstract class Office extends Provider {

	/** @var IClientService */
	private $clientService;

	/** @var IConfig */
	private $config;

	/** @var array */
	private $capabilitites;

	public function __construct(IClientService $clientService, IConfig $config, Capabilities $capabilities) {
		$this->clientService = $clientService;
		$this->config = $config;
		$this->capabilitites = $capabilities->getCapabilities()['richdocuments'];
	}

	private function getWopiURL() {
		return $this->config->getAppValue('richdocuments', 'wopi_url');
	}

	public function isAvailable(\OCP\Files\FileInfo $file) {
		if (isset($this->capabilitites['collabora']['convert-to'])) {
			return $this->capabilitites['collabora']['convert-to'];
		}
		return false;
	}

	/**
	 * {@inheritDoc}
	 */
	public function getThumbnail($path, $maxX, $maxY, $scalingup, $fileview) {
		$stream = $fileview->fopen($path, 'r');

		$client = $this->clientService->newClient();
		$options = ['timeout' => 10];

		if ($this->config->getAppValue('richdocuments', 'disable_certificate_verification') === 'yes') {
			$options['verify'] = false;
		}

		if (version_compare($this->config->getSystemValue('version'), '14.0.0.0', '<')) {
			$options['body'] = new \GuzzleHttp\Post\PostFile($path, $stream); // Since we upgraded guzzle in NC14 we have to do some dark magic here
		} else {
			$options['multipart'] = [['name' => $path, 'contents' => $stream]];
		}

		try {
			$response = $client->post($this->getWopiURL(). '/lool/convert-to/png', $options);
		} catch (\Exception $e) {
			return false;
		}

		$image = new \OC_Image();
		$image->loadFromData($response->getBody());

		if ($image->valid()) {
			$image->scaleDownToFit($maxX, $maxY);
			return $image;
		}
		return false;

	}

}
