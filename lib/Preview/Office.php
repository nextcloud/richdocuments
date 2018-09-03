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
use \GuzzleHttp\Client;
use \GuzzleHttp\Post\PostFile;
use OCP\Http\Client\IClient;
use OCP\Http\Client\IClientService;
use OCP\IConfig;

abstract class Office extends Provider {

	/** @var IClientService */
	private $clientService;

	/** @var IConfig */
	private $config;

	public function __construct(IClientService $clientService, IConfig $config) {
		$this->clientService = $clientService;
		$this->config = $config;
	}

	private function getWopiURL(): string {
		return $this->config->getAppValue('richdocuments', 'wopi_url');
	}

	/**
	 * {@inheritDoc}
	 */
	public function getThumbnail($path, $maxX, $maxY, $scalingup, $fileview) {
		$stream = $fileview->fopen($path, 'r');

		$client = $this->clientService->newClient();
		try {
		$response = $client->post($this->getWopiURL() . '/lool/convert-to/png', [
			'timeout' => 2.0,
			'body' => $stream
		]);
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
