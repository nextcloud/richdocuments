<?php
/**
 * @copyright Copyright (c) 2016 Lukas Reschke <lukas@statuscode.ch>
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

namespace OCA\Wopi\WOPI;

use OCP\Files\File;
use OCP\IRequest;
use SimpleXMLElement;

class Parser {
	/** @var DiscoveryManager */
	private $discoveryManager;
	/** @var SimpleXMLElement */
	private $parsed;
	/**
	 * @var IRequest
	 */
	private $request;

	/**
	 * @param DiscoveryManager $discoveryManager
	 * @param IRequest $request
	 */
	public function __construct(DiscoveryManager $discoveryManager, IRequest $request) {
		$this->discoveryManager = $discoveryManager;
		$this->request = $request;
	}

	/**
	 * @param $mimetype
	 * @return array
	 * @throws \Exception
	 */
	public function getUrlSrc($mimetype) {
		$discoveryParsed = $this->getParsed();

		$result = $discoveryParsed->xpath(sprintf('/wopi-discovery/net-zone/app[@name=\'%s\']/action', $mimetype));
		if ($result && count($result) > 0) {
			return [
				'urlsrc' => (string)$result[0]['urlsrc'],
				'action' => (string)$result[0]['name'],
			];
		}

		throw new \Exception('Could not find urlsrc in WOPI');

	}

	/**
	 * @return SimpleXMLElement|bool
	 * @throws \Exception
	 */
	public function getParsed() {
		if (!empty($parsed))
			return $parsed;
		$discovery = $this->discoveryManager->get();
		$loadEntities = libxml_disable_entity_loader(true);
		$discoveryParsed = simplexml_load_string($discovery);
		libxml_disable_entity_loader($loadEntities);
		$parsed = $discoveryParsed;
		return $discoveryParsed;
	}

	/**
	 * @param File $file
	 * @param bool $edit
	 * @return array
	 * @throws \Exception
	 */
	public function getUrlSrcForFile(File $file, $edit) {
		try{
			$result = $this->getUrlSrc($file->getMimeType());
			return $result;
		}
		catch(\Exception $e){

		}
		$actionName = $edit ? 'edit' : 'view';
		$discoveryParsed = $this->getParsed();
		$result = $discoveryParsed->xpath(sprintf('/wopi-discovery/net-zone[@name=\'external-https\']/app/action[@ext=\'%s\' and @name=\'%s\']', $file->getExtension(), $actionName));
		if (!$result || count($result) == 0)
			$result = $discoveryParsed->xpath(sprintf('/wopi-discovery/net-zone[@name=\'external-https\']/app/action[@ext=\'%s\' and @name=\'%s\']', $file->getExtension(), 'view'));

		if ($this->request->getServerProtocol() === 'http')
		{
			if (!$result || count($result) == 0)
				$result = $discoveryParsed->xpath(sprintf('/wopi-discovery/net-zone[@name=\'external-http\']/app/action[@ext=\'%s\' and @name=\'%s\']', $file->getExtension(), $actionName));
			if (!$result || count($result) == 0)
				$result = $discoveryParsed->xpath(sprintf('/wopi-discovery/net-zone[@name=\'external-http\']/app/action[@ext=\'%s\' and @name=\'%s\']', $file->getExtension(), 'view'));
		}
		if ($result && count($result) > 0) {
			return [
				'urlsrc' => preg_replace('/<.+>/', '', $result[0]['urlsrc']),
				'action' => (string)$result[0]['name'],
			];
		}
		throw new \Exception('Could not find urlsrc in WOPI');

	}

}