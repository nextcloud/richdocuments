<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
use Behat\Behat\Context\Context;
use Behat\Behat\Hook\Scope\BeforeScenarioScope;
use GuzzleHttp\Client;
use JuliusHaertl\NextcloudBehat\Context\FilesContext;
use JuliusHaertl\NextcloudBehat\Context\ServerContext;
use JuliusHaertl\NextcloudBehat\Context\SharingContext;
use PHPUnit\Framework\Assert;

class DirectContext implements Context {
	/** @var ServerContext */
	private $serverContext;
	/** @var FilesContext */
	private $filesContext;
	/** @var WopiContext */
	private $wopiContext;
	/** @var SharingContext */
	private $sharingContext;

	/** @var string|null */
	private $directEditingLink;

	/** @BeforeScenario */
	public function gatherContexts(BeforeScenarioScope $scope) {
		$environment = $scope->getEnvironment();
		$this->serverContext = $environment->getContext(ServerContext::class);
		$this->filesContext = $environment->getContext(FilesContext::class);
		$this->wopiContext = $environment->getContext(WopiContext::class);
		$this->sharingContext = $environment->getContext(SharingContext::class);
	}

	/**
	 * @When /^User "([^"]*)" opens "([^"]*)" through direct editing$/
	 */
	public function userOpensThroughDirectEditing($user, $filePath) {
		$this->serverContext->usingWebAsUser($user);
		$this->requestDirectEditingLink($user, $filePath);
		$this->handleDirectEditingLink();
	}

	/**
	 * @When /^User "([^"]*)" opens the last share link through direct editing$/
	 */
	public function userOpensTheLastShareLinkThroughDirectEditing($user) {
		$shareToken = $this->sharingContext->getLastShareData()['token'];
		$this->serverContext->usingWebAsUser($user);
		$this->requestPublicDirectEditingLink($user, $shareToken);
		$this->handleDirectEditingLink();
	}

	/**
	 * @When /^User "([^"]*)" opens the file "([^"]*)" in the last share link through direct editing$/
	 */
	public function userOpensTheFileInTheLastShareLinkThroughDirectEditing($user, $path) {
		$shareToken = $this->sharingContext->getLastShareData()['token'];
		$this->serverContext->usingWebAsUser($user);
		$this->requestPublicDirectEditingLink($user, $shareToken, $path);
		$this->handleDirectEditingLink();
	}

	/**
	 * @When /^User "([^"]*)" opens the file "([^"]*)" in the last share link through direct editing from server "([^"]*)"$/
	 */
	public function userOpensTheFileInTheLastShareLinkThroughDirectEditingFromServer($user, $path, $host) {
		$shareToken = $this->sharingContext->getLastShareData()['token'];
		$this->serverContext->usingWebAsUser($user);
		$this->requestPublicDirectEditingLink($user, $shareToken, $path, null, $this->serverContext->getServer($host));
		$this->handleDirectEditingLink();
	}

	/**
	 * @When /^User "([^"]*)" opens the file "([^"]*)" in the last share link through direct editing from server "([^"]*)" with password "([^"]*)"$/
	 */
	public function userOpensTheFileInTheLastShareLinkThroughDirectEditingFromServerWithPassword($user, $path, $host, $password) {
		$shareToken = $this->sharingContext->getLastShareData()['token'];
		$this->serverContext->usingWebAsUser($user);
		$this->requestPublicDirectEditingLink($user, $shareToken, $path, $password, $this->serverContext->getServer($host));
		$this->handleDirectEditingLink();
	}

	/**
	 * @When /^User "([^"]*)" cannot open the file "([^"]*)" in the last share link through direct editing from server "([^"]*)" with password "([^"]*)"$/
	 */
	public function userCannotOpenTheFileInTheLastShareLinkThroughDirectEditingFromServerWithPassword($user, $path, $host, $password) {
		$shareToken = $this->sharingContext->getLastShareData()['token'];
		$this->serverContext->usingWebAsUser($user);
		$this->requestPublicDirectEditingLink($user, $shareToken, $path, $password, $this->serverContext->getServer($host));
		$this->serverContext->assertHttpStatusCode(403);
	}

	/**
	 * @When /^A guest opens the file "([^"]*)" in the last share link through direct editing$/
	 */
	public function aGuestOpensTheFileInTheLastShareLinkThroughDirectEditing($path) {
		$shareToken = $this->sharingContext->getLastShareData()['token'];
		$this->serverContext->usingWebasGuest();
		$this->requestPublicDirectEditingLink(null, $shareToken, $path);
		$this->handleDirectEditingLink();
	}

	private function handleDirectEditingLink() {
		$this->serverContext->assertHttpStatusCode(200);
		$data = $this->serverContext->getOCSResponseData();
		$this->directEditingLink = $data['url'];
		$response = $this->openDirectEditingLink();
		$redirects = $response->getHeader('X-Guzzle-Redirect-History');
		$lastServer = array_pop($redirects);
		if ($lastServer) {
			$currentServer = parse_url($lastServer, PHP_URL_SCHEME) . '://' . parse_url($lastServer, PHP_URL_HOST) . (
				parse_url($lastServer, PHP_URL_PORT) ? ':' . parse_url($lastServer, PHP_URL_PORT) : ''
			) . '/';
		}
		$contents = $response->getBody()->getContents();

		$re = '/id="initial-state-richdocuments-([A-z]+)" value="(.*)"/m';
		preg_match_all($re, $contents, $matches, PREG_SET_ORDER, 0);
		$initialState = [];
		foreach ($matches as $match) {
			$initialState[$match[1]] = json_decode(base64_decode($match[2], true), true);
		}

		Assert::assertNotEmpty($initialState['document']['fileId']);
		Assert::assertNotEmpty($initialState['document']['token']);

		$currentServer ??= $this->serverContext->getBaseUrl();

		$this->wopiContext->setWopiParameters($currentServer, $initialState['document']['fileId'], $initialState['document']['token']);
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
		// FIXME: track and assert redirect urls
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

	/**
	 * @param $user
	 * @param $token
	 * @param null $filePath
	 * @param null $password
	 * @param null $host
	 */
	private function requestPublicDirectEditingLink($user, $token, $filePath = null, $password = null, $host = null) {
		// ServerContext currently does not support sending anonymous ocs requests
		$options = $user ? [] : [ 'auth' => null ];
		$data = [
			'shareToken' => $token,
			'path' => $filePath,
			'password' => $password
		];
		if ($host) {
			$data['host'] = $host;
		}
		$this->serverContext->sendOCSRequest('POST', 'apps/richdocuments/api/v1/share', $data, $options);
	}
}
