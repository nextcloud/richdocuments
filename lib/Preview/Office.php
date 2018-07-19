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

abstract class Office extends Provider {
	/**
	 * {@inheritDoc}
	 */
	public function getThumbnail($path, $maxX, $maxY, $scalingup, $fileview) {
		// \OC::$server->getLogger()->debug('==== getThumbnail: ' . $path);
		$data = $fileview->file_get_contents($path);

		$client = new Client(['base_uri' => 'http://localhost:9980/', 'timeout' => 2.0]);

		$request = $client->createRequest('POST', 'http://localhost:9980/lool/convert-to/png',
			[
				'body' =>
					[
						new PostFile($path, $data)
					]

			]);
		$response = $client->send($request);
/*
		$headers = $response->getHeaders();

		foreach ($headers as $key => $value) {
			$concatvalue = '';
			foreach ($value as $vvalue) {
				$concatvalue = $concatvalue . $vvalue;
			}
			// \OC::$server->getLogger()->debug('==== response: ' . $key . ': ' . $concatvalue);
		}

		\OC::$server->getLogger()->debug('==== response body type: ' . gettype($response->getBody()));
*/
		$image = new \OC_Image();
		$image->loadFromData($response->getBody());

		if ($image->valid()) {
			$image->scaleDownToFit($maxX, $maxY);
			return $image;
		}
		return false;

	}

}
