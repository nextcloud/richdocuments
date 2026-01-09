<?php

declare(strict_types = 1);
/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

use Behat\Behat\Context\Context;
use Behat\Behat\Hook\Scope\BeforeScenarioScope;
use Behat\Hook\AfterScenario;
use Behat\Hook\BeforeScenario;
use Behat\Step\Then;
use Behat\Step\When;
use JuliusHaertl\NextcloudBehat\Context\ServerContext;
use PHPUnit\Framework\Assert;

class SettingsContext implements Context {
	/** @var ServerContext */
	private $serverContext;

	/** @var GuzzleHttp\Client */
	private $http;

	/** @var Psr\Http\Message\ResponseInterface */
	private $httpResponse;

	public function __construct() {

	}

	#[BeforeScenario]
	public function gatherContexts(BeforeScenarioScope $scope) {
		$this->serverContext = $scope->getEnvironment()->getContext(ServerContext::class);

		$this->http = new GuzzleHttp\Client([
			'base_uri' => $this->serverContext->getBaseUrl() . 'apps/richdocuments/',
			'http_errors' => false,
		]);
	}

	#[AfterScenario]
	public function cleanup() {
		$this->httpResponse = null;
	}

	#[When('a user uploads a system configuration file')]
	public function userUploadsSystemConfigFile() {
		$this->serverContext->actingAsUser('user1');

		$options = $this->serverContext->getWebOptions();

		$tokenResponse = $this->http->get('settings/generateToken/user', $options);
		$jsonTokenResponse = json_decode($tokenResponse->getBody()->getContents(), true);
		$settingsToken = $jsonTokenResponse['token'];

		$postOptions = [
			'query' => [
				'access_token' => $settingsToken,
				'fileId' => '/settings/systemconfig/wordbook/poc.dic',
			],
			'body' => 'fake dictionary',
		];

		$options = array_merge($options, $postOptions);

		$this->httpResponse = $this->http->post('wopi/settings/upload', $options);
	}

	#[Then('the system configuration upload is forbidden')]
	public function systemConfigUploadForbidden() {
		Assert::assertEquals(403, $this->httpResponse->getStatusCode());
	}
}
