<?php
/**
 * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
require __DIR__ . '/../../vendor/autoload.php';

use Behat\Behat\Context\Context;
use Behat\Behat\Hook\Scope\BeforeScenarioScope;
use GuzzleHttp\Client;
use JuliusHaertl\NextcloudBehat\Context\FilesContext;
use JuliusHaertl\NextcloudBehat\Context\ServerContext;
use JuliusHaertl\NextcloudBehat\Context\SharingContext;
use PHPUnit\Framework\Assert;

class RichDocumentsContext implements Context {
	/** @var ServerContext */
	private $serverContext;
	/** @var FilesContext */
	private $filesContext;
	/** @var SharingContext */
	private $sharingContext;
	/** @var WopiContext */
	private $wopiContext;

	public $currentServer;
	public $fileId;
	public $wopiToken;
	/** @var array List of opened file ids in order to compare opening accross instances */
	private $fileIds = [];
	/** @var array List of templates fetched for a given file type */
	private $templates = [];

	/** @BeforeScenario */
	public function gatherContexts(BeforeScenarioScope $scope) {
		$environment = $scope->getEnvironment();
		$this->serverContext = $environment->getContext(ServerContext::class);
		$this->filesContext = $environment->getContext(FilesContext::class);
		$this->sharingContext = $environment->getContext(SharingContext::class);
		$this->wopiContext = $environment->getContext(WopiContext::class);
	}

	/**
	 * @When User :user opens :file
	 */
	public function userOpens($user, $file) {
		$this->serverContext->usingWebAsUser($user);
		$davClient = $this->filesContext->getSabreClient($user);
		$path = $this->filesContext->makeSabrePath($user, $file);
		$result = $davClient->propFind($path, ['{http://owncloud.org/ns}fileid']);
		$fileId = $result['{http://owncloud.org/ns}fileid'];

		$client = new Client();
		$result = $client->get(
			$this->serverContext->getBaseUrl() . 'index.php/apps/richdocuments/index?fileId=' . $fileId,
			array_merge(
				$this->serverContext->getWebOptions(),
				[
					'allow_redirects' => [
						'track_redirects' => true
					]
				]
			)
		);
		$redirects = $result->getHeader('X-Guzzle-Redirect-History');
		$lastServer = array_pop($redirects);
		if ($lastServer) {
			$this->currentServer = parse_url($lastServer, PHP_URL_SCHEME) . '://' . parse_url($lastServer, PHP_URL_HOST) . (
				parse_url($lastServer, PHP_URL_PORT) ? ':' . parse_url($lastServer, PHP_URL_PORT) : ''
			) . '/';
		}
		$this->extractRichdocumentsFrontendContext($result);

		Assert::assertNotEmpty($this->fileId);
		Assert::assertNotEmpty($this->wopiToken);
	}

	public function generateTokenWithApi($user, $fileId, ?string $shareToken = null, ?string $path = null, ?string $guestName = null) {
		$this->serverContext->usingWebAsUser($user);
		$this->serverContext->sendJSONRequest('POST', '/index.php/apps/richdocuments/token', [
			'fileId' => $fileId,
			'shareToken' => $shareToken,
			'path' => $path,
			'guestName' => $guestName,
		]);
		echo $this->serverContext->getResponse()->getStatusCode();

		$response = $this->serverContext->getOCSResponse();

		$this->fileId = $fileId . '_ocfake';
		$this->fileIds[] = $this->fileId;
		$this->wopiToken = $response['token'];
		$this->wopiContext->setWopiParameters($this->currentServer, $this->fileId, $this->wopiToken);

		Assert::assertNotEmpty($this->fileId);
		Assert::assertNotEmpty($this->wopiToken);
	}


	/**
	 * @Then a guest opens the share link
	 */
	public function aGuestOpensTheShareLink() {
		$this->aGuestOpensTheShareLinkAs();
	}

	/**
	 * @Then a guest opens the share link as :guestName
	 * @Then a guest opens the share link without guest name
	 */
	public function aGuestOpensTheShareLinkAs($guestName = null) {
		$this->openTheShareLink(null, $guestName);
	}

	/**
	 * @Then the user opens the share link
	 */
	public function aUserOpensTheShareLink() {
		$this->openTheShareLink($this->serverContext->getAuth()[0], null);
	}

	private function openTheShareLink($userId = null, $guestName = null, $fileId = null) {
		if ($fileId === null) {
			$fileId = $this->sharingContext->getLastShareData()['item_source'];
		}
		$shareToken = $this->sharingContext->getLastShareData()['token'];
		$this->generateTokenWithApi($userId, $fileId, shareToken: $shareToken, guestName: $guestName);
	}

	/**
	 * @Given /^a guest opens the file "([^"]*)" of the shared link$/
	 */
	public function aGuestOpensTheFileOfTheSharedLink($file) {
		$this->openTheShareLink(null, null, $this->getFileIdInLastShare($file));
	}

	/**
	 * @Given /^a guest opens the file "([^"]*)" of the shared link as "([^"]*)"$/
	 */
	public function aGuestOpensTheFileOfTheSharedLinkWithGuestName($file, $guestName) {
		$this->openTheShareLink(null, $guestName, $this->getFileIdInLastShare($file));
	}

	/**
	 * @Given /^User "([^"]*)" opens the file "([^"]*)" of the shared link$/
	 */
	public function userOpensTheFileOfTheSharedLink($user, $file) {
		$this->openTheShareLink($user, null, $this->getFileIdInLastShare($file));
	}

	private function getFileIdInLastShare($file) {
		$shareToken = $this->sharingContext->getLastShareData()['token'];
		$davClient = $this->filesContext->getPublicSabreClient($shareToken);
		$path = $file;
		$result = $davClient->propFind($path, ['{http://owncloud.org/ns}fileid']);
		return $result['{http://owncloud.org/ns}fileid'];
	}

	/**
	 * @Given /^user "([^"]*)" fetches the (document|spreadsheet|presentation) template list$/
	 */
	public function userFetchesTheTemplateList($user, $type) {
		$this->serverContext->sendOCSRequest('GET', '/apps/richdocuments/api/v1/templates/' . $type);
		$this->templates = $this->serverContext->getOCSResponseData();
	}

	/**
	 * @Given /^user "([^"]*)" creates a new file "([^"]*)" from a template$/
	 */
	public function userCreatesANewFileFromATemplate($user, $file) {
		$template = $this->templates[0];
		$this->serverContext->usingWebAsUser($user);

		$client = new Client();
		$query = [
			'templateId' => $template['id'],
			'fileName' => basename($file),
			'dir' => dirname($file),
		];
		$result = $client->get(
			$this->serverContext->getBaseUrl() . 'index.php/apps/richdocuments/indexTemplate',
			array_merge(
				$this->serverContext->getWebOptions(),
				[
					'query' => $query,
					'allow_redirects' => [
						'track_redirects' => true
					]
				]
			)
		);
		$redirects = $result->getHeader('X-Guzzle-Redirect-History');
		$lastServer = array_pop($redirects);
		if ($lastServer) {
			$this->currentServer = parse_url($lastServer, PHP_URL_SCHEME) . '://' . parse_url($lastServer, PHP_URL_HOST) . (
				parse_url($lastServer, PHP_URL_PORT) ? ':' . parse_url($lastServer, PHP_URL_PORT) : ''
			) . '/';
		}
		$this->extractRichdocumentsFrontendContext($result);

		Assert::assertNotEmpty($this->fileId);
		Assert::assertNotEmpty($this->wopiToken);
	}


	/**
	 * @Given /^TemplateSource is set$/
	 */
	public function templatesourceIsSet() {
		$this->wopiContext->checkfileinfoMatches('TemplateSource', '%wopi/template/' . $this->templates[0]['id'] . '\\?access_token%');
	}

	private function extractRichdocumentsFrontendContext($response) {
		$contents = $response->getBody()->getContents();
		$re = '/id="initial-state-richdocuments-([A-z]+)" value="(.*)"/m';
		preg_match_all($re, $contents, $matches, PREG_SET_ORDER, 0);
		$result = [];
		foreach ($matches as $match) {
			$result[$match[1]] = json_decode(base64_decode($match[2], true), true);
		}

		$document = $result['document'];
		$this->fileIds[] = $document['fileId'];
		$this->fileId = $document['fileId'];
		$this->wopiToken = $document['token'];
		$this->wopiContext->setWopiParameters($this->currentServer, $this->fileId, $this->wopiToken);
	}

	/**
	 * @When /^the guest updates the display name to "([^"]*)"$/
	 */
	public function updateTheGuestDisplayName($displayName) {
		$this->serverContext->sendOCSRequest('POST', 'apps/richdocuments/api/v1/wopi/guestname', [
			'access_token' => $this->wopiContext->getWopiToken(),
			'guestName' => $displayName,
		], [ 'auth' => null ]);
	}

	/**
	 * @Given /^as "([^"]*)" rename "([^"]*)" to "([^"]*)"$/
	 */
	public function renameFileTo($user, $file, $newName) {
		$this->serverContext->usingWebAsUser($user);
		$davClient = $this->filesContext->getSabreClient($user);
		$path = $this->filesContext->makeSabrePath($user, $file);
		$result = $davClient->propFind($path, ['{http://owncloud.org/ns}fileid']);
		$fileId = $result['{http://owncloud.org/ns}fileid'];

		$this->wopiContext->collaboraRenamesTo($fileId, $newName);
	}
}
