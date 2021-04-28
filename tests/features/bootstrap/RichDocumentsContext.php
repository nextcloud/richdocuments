<?php
require __DIR__ . '/../../vendor/autoload.php';

use Behat\Behat\Context\Context;
use Behat\Behat\Hook\Scope\BeforeScenarioScope;
use GuzzleHttp\Client;
use JuliusHaertl\NextcloudBehat\Context\FilesContext;
use JuliusHaertl\NextcloudBehat\Context\ServerContext;
use JuliusHaertl\NextcloudBehat\Context\SharingContext;
use PHPUnit\Framework\Assert;

class RichDocumentsContext implements Context
{

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
	/**
	 * @var array List of opened file ids in order to compare opening accross instances
	 */
	private $fileIds = [];

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
	public function userOpens($user, $file)
	{
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
			$this->currentServer = parse_url($lastServer, PHP_URL_SCHEME) . '://'. parse_url($lastServer, PHP_URL_HOST)  . (
				parse_url($lastServer, PHP_URL_PORT) ? ':' . parse_url($lastServer, PHP_URL_PORT) : ''
			). '/';
		}
		$contents = $result->getBody()->getContents();
		$re = '/var richdocuments_([A-z]+) = (.*);/m';
		preg_match_all($re, $contents, $matches, PREG_SET_ORDER, 0);
		$result = [];
		foreach ($matches as $match) {
			$result[$match[1]] = str_replace("'", "", $match[2]);
		}

		$this->fileIds[] = $result['fileId'];
		$this->fileId = $result['fileId'];
		$this->wopiToken = $result['token'];
		$this->wopiContext->setWopiParameters($this->currentServer, $this->fileId, $this->wopiToken);

		Assert::assertNotEmpty($this->fileId);
		Assert::assertNotEmpty($this->wopiToken);
	}


	/**
	 * @Then a guest opens the share link
	 */
	public function aGuestOpensTheShareLink()
	{
		$this->aGuestOpensTheShareLinkAs();
	}

	/**
	 * @Then a guest opens the share link as :guestName
	 */
	public function aGuestOpensTheShareLinkAs($user = null)
	{
		$this->serverContext->usingWebAsUser(null);
		$token = $this->sharingContext->getLastShareData()['token'];

		$cookieJar = new \GuzzleHttp\Cookie\CookieJar();
		if ($user) {
			$domain = parse_url($this->currentServer ?? $this->serverContext->getBaseUrl(), PHP_URL_HOST);
			$cookieJar = \GuzzleHttp\Cookie\CookieJar::fromArray([
				'guestUser' => $user
			], $domain);
		}

		$client = new Client();
		$result = $client->get(
			$this->serverContext->getBaseUrl() . 'index.php/apps/richdocuments/public?shareToken=' . $token,
			array_merge($this->serverContext->getWebOptions(), ['cookies' => $cookieJar]));
		$contents = $result->getBody()->getContents();
		$re = '/var richdocuments_([A-z]+) = (.*);/m';
		preg_match_all($re, $contents, $matches, PREG_SET_ORDER, 0);
		$params = [];
		foreach ($matches as $match) {
			$params[$match[1]] = str_replace("'", "", $match[2]);
		}

		$this->wopiContext->setWopiParameters($this->serverContext->getBaseUrl(), $params['fileId'], $params['token']);
	}

}
