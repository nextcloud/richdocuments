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
			'base_uri' => $this->serverContext->getBaseUrl() . 'index.php/apps/richdocuments/',
			'http_errors' => false,
		]);
	}

	#[AfterScenario]
	public function cleanup() {
		$this->httpResponse = null;
	}

	#[When('the admin settings are requested by a user')]
	public function userRequestAdminSettings() {
		$this->serverContext->actingAsUser('user1');

		$options = $this->serverContext->getWebOptions();
		$this->httpResponse = $this->http->get('ajax/settings.php', $options);
	}

	#[When('the admin settings are requested by an admin')]
	public function adminRequestAdminSettings() {
		$this->serverContext->actAsAdmin(function () {
			$options = $this->serverContext->getWebOptions();
			$this->httpResponse = $this->http->get('ajax/settings.php', $options);
		});
	}

	#[Then('the admin settings are forbidden')]
	public function adminSettingsRequestForbidden() {
		Assert::assertEquals(403, $this->httpResponse->getStatusCode());

		Assert::assertJsonStringEqualsJsonString(
			'{"message":"Logged in account must be an admin"}',
			$this->httpResponse->getBody()->getContents(),
		);
	}

	#[Then('the admin settings are returned')]
	public function adminSettingsRequestReturned() {
		Assert::assertEquals(200, $this->httpResponse->getStatusCode());
		Assert::assertJsonStringNotEqualsJsonString(
			'{}',
			$this->httpResponse->getBody()->getContents(),
		);
	}
}
