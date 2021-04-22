<?php
/*
 * @copyright Copyright (c) 2021 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

declare(strict_types=1);


use Behat\Behat\Context\Context;
use Behat\Behat\Hook\Scope\BeforeScenarioScope;
use GuzzleHttp\Client;
use JuliusHaertl\NextcloudBehat\Context\FilesContext;
use JuliusHaertl\NextcloudBehat\Context\ServerContext;
use PHPUnit\Framework\Assert;

class DirectContext implements Context {
	/** @var ServerContext */
	private $serverContext;
	/** @var FilesContext */
	private $filesContext;
	/** @var WopiContext */
	private $wopiContext;

	/** @var string|null */
	private $directEditingLink;

	/** @BeforeScenario */
	public function gatherContexts(BeforeScenarioScope $scope) {
		$environment = $scope->getEnvironment();
		$this->serverContext = $environment->getContext(ServerContext::class);
		$this->filesContext = $environment->getContext(FilesContext::class);
		$this->wopiContext = $environment->getContext(WopiContext::class);
	}

	/**
	 * @When /^User "([^"]*)" opens "([^"]*)" through direct editing$/
	 */
	public function userOpensThroughDirectEditing($user, $filePath) {
		$this->serverContext->usingWebAsUser($user);
		$this->requestDirectEditingLink($user, $filePath);
		$this->serverContext->assertHttpStatusCode(200);
		$data = $this->serverContext->getOCSResponseData();
		$this->directEditingLink = $data['url'];
		$response = $this->openDirectEditingLink();
		$redirects = $response->getHeader('X-Guzzle-Redirect-History');
		$lastServer = array_pop($redirects);
		if ($lastServer) {
			$currentServer = parse_url($lastServer, PHP_URL_SCHEME) . '://'. parse_url($lastServer, PHP_URL_HOST)  . (
				parse_url($lastServer, PHP_URL_PORT) ? ':' . parse_url($lastServer, PHP_URL_PORT) : ''
				). '/';
		}
		$contents = $response->getBody()->getContents();
		$re = '/var richdocuments_([A-z]+) = (.*);/m';
		preg_match_all($re, $contents, $matches, PREG_SET_ORDER, 0);
		$params = [];
		foreach ($matches as $match) {
			$params[$match[1]] = str_replace("'", "", $match[2]);
		}

		Assert::assertNotEmpty($params['fileId']);
		Assert::assertNotEmpty($params['token']);

		$currentServer = $currentServer ?? $this->serverContext->getBaseUrl();

		$this->wopiContext->setWopiParameters($currentServer, $params['fileId'], $params['token']);
		Assert::assertEquals(200, $response->getStatusCode());
	}

	/**
	 * @Given /^the direct editing link is only valid once$/
	 */
	public function theDirectEditingLinkIsOnlyValidOnce() {
		if (!$this->directEditingLink) {
			throw new \Exception('No existing direct editing link found to be checked');
		}
		$result = $this->openDirectEditingLink();
		Assert::assertEquals(403, $result->getStatusCode());
	}

	private function openDirectEditingLink() {
		if (!$this->directEditingLink) {
			throw new \Exception('No existing direct editing link found to be checked');
		}
		$client = new Client();
		try {
			return $client->get(
				$this->directEditingLink,
				[
					'allow_redirects' => [
						'track_redirects' => true
					]
				]
			);
		} catch (\GuzzleHttp\Exception\BadResponseException $e) {
			return $e->getResponse();
		}
	}

	private function requestDirectEditingLink($user, $filePath) {
		$davClient = $this->filesContext->getSabreClient($user);
		$davPath = $this->filesContext->makeSabrePath($user, $filePath);
		$result = $davClient->propFind($davPath, ['{http://owncloud.org/ns}fileid']);
		$fileId = $result['{http://owncloud.org/ns}fileid'];
		$this->serverContext->sendOCSRequest('POST', 'apps/richdocuments/api/v1/document', [ 'fileId' => $fileId ]);
	}


}
