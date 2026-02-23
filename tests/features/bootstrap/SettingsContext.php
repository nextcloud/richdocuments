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

	#[When('a user uploads a system configuration file')]
	public function userUploadsSystemConfigFile() {
		$this->serverContext->actingAsUser('user1');

		$settingsAccessToken = $this->getSettingsAccessToken('user');
		$postOptions = [
			'query' => [
				'access_token' => $settingsAccessToken,
				'fileId' => '/settings/systemconfig/wordbook/poc.dic',
			],
			'body' => 'fake dictionary',
		];

		$options = array_merge($this->serverContext->getWebOptions(), $postOptions);

		$this->httpResponse = $this->http->post('wopi/settings/upload', $options);
	}

	#[When('an admin uploads a system configuration file')]
	public function adminUploadsSystemConfigFile() {
		$this->serverContext->actAsAdmin(function () {
			$settingsAccessToken = $this->getSettingsAccessToken('admin');
			$postOptions = [
				'query' => [
					'access_token' => $settingsAccessToken,
					'fileId' => '/settings/systemconfig/wordbook/poc.dic',
				],
				'body' => 'fake dictionary',
			];

			$options = array_merge($this->serverContext->getWebOptions(), $postOptions);

			$this->httpResponse = $this->http->post('wopi/settings/upload', $options);
		});
	}

	#[When('a user deletes a system configuration file')]
	public function userDeletesSystemConfigFile() {
		$this->serverContext->actingAsUser('user1');

		$settingsAccessToken = $this->getSettingsAccessToken('user');
		$deleteOptions = [
			'query' => [
				'access_token' => $settingsAccessToken,
				'fileId' => '/settings/systemconfig/wordbook/poc.dic',
			],
		];

		$options = array_merge($this->serverContext->getWebOptions(), $deleteOptions);

		$this->httpResponse = $this->http->delete('wopi/settings', $options);
	}

	#[When('an admin deletes a system configuration file')]
	public function adminDeletesSystemConfigFile() {
		$this->serverContext->actAsAdmin(function () {
			$settingsAccessToken = $this->getSettingsAccessToken('admin');
			$deleteOptions = [
				'query' => [
					'access_token' => $settingsAccessToken,
					'fileId' => '/settings/systemconfig/wordbook/poc.dic',
				],
			];

			$options = array_merge($this->serverContext->getWebOptions(), $deleteOptions);

			$this->httpResponse = $this->http->delete('wopi/settings', $options);
		});
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

	#[Then('the system configuration upload is forbidden')]
	public function systemConfigUploadForbidden() {
		Assert::assertEquals(403, $this->httpResponse->getStatusCode());
	}

	#[Then('the system configuration upload is allowed')]
	public function systemConfigUploadAllowed() {
		Assert::assertEquals(200, $this->httpResponse->getStatusCode());
	}

	#[Then('the system configuration deletion is forbidden')]
	public function systemConfigDeletionForbidden() {
		Assert::assertEquals(403, $this->httpResponse->getStatusCode());
	}

	#[Then('the system configuration deletion is allowed')]
	public function systemConfigDeletionAllowed() {
		Assert::assertEquals(200, $this->httpResponse->getStatusCode());
	}

	private function getSettingsAccessToken(string $type) {
		$options = $this->serverContext->getWebOptions();

		$response = $this->http->get("settings/generateToken/$type", $options);
		$responseBody = $response->getBody()->getContents();
		$responseJson = json_decode($responseBody, true);

		return $responseJson['token'];
	}
}
