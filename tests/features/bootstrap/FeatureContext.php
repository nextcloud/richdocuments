<?php
require __DIR__ . '/../../vendor/autoload.php';

use Behat\Behat\Context\Context;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Response;
use PHPUnit\Framework\Assert;

class FeatureContext implements Context
{

	use \JuliusHaertl\NextcloudBehat\FilesSharingContextTrait;
	use \JuliusHaertl\NextcloudBehat\FilesDavContextTrait;
	use \JuliusHaertl\NextcloudBehat\UserContextTrait;
	use \JuliusHaertl\NextcloudBehat\UserWebContextTrait;

	/**
	 * Initializes context.
	 *
	 * Every scenario gets its own context instance.
	 * You can also pass arbitrary arguments to the
	 * context constructor through behat.yml.
	 */
	public function __construct($baseUrl)
	{
		$this->setBaseUrl($baseUrl);
	}

	/**
	 * @When User :user opens :file
	 */
	public function userOpens($user, $file)
	{
		// get file id
		$davClient = $this->getSabreClient($user);
		$path = $this->makeSabrePath($user, $file);
		$result = $davClient->propFind($path, ['{http://owncloud.org/ns}fileid']);
		$fileId = $result['{http://owncloud.org/ns}fileid'];

		$this->usingWebAsUser($user);

		$client = new Client();
		$result = $client->get($this->baseUrl . 'index.php/apps/wopi/index?fileId=' . $fileId, $this->getWebOptions());
		$contents =$result->getBody()->getContents();
		$re = '/var wopi_([A-z]+) = (.*);/m';
		preg_match_all($re, $contents, $matches, PREG_SET_ORDER, 0);
		$result = [];
		foreach ($matches as $match) {
			$result[$match[1]] = str_replace("'", "", $match[2]);
		}

		$this->fileId = $result['fileId'];
		$this->wopiToken = $result['token'];
	}


	/**
	 * @Then a guest opens the share link
	 */
	public function aGuestOpensTheShareLink()
	{
		if (count($this->lastShareData->data->element) > 0){
			$token = $this->lastShareData->data[0]->token;
		} else {
			$token = $this->lastShareData->data->token;
		}


		// 	public function publicPage($shareToken, $fileName, $fileId) {
		$client = new Client();
		$result = $client->get($this->baseUrl . 'index.php/apps/wopi/public?shareToken=' . $token, $this->getWebOptions());
		$contents =$result->getBody()->getContents();
		$re = '/var wopi_([A-z]+) = (.*);/m';
		preg_match_all($re, $contents, $matches, PREG_SET_ORDER, 0);
		$result = [];
		foreach ($matches as $match) {
			$result[$match[1]] = str_replace("'", "", $match[2]);
		}

		$this->fileId = $result['fileId'];
		$this->wopiToken = $result['token'];
	}

	/**
	 * @Then Collabora fetches checkFileInfo
	 */
	public function collaboraFetchesCheckfileinfo() {
		$client = new Client();
		$options = [];
		$result = $client->get($this->baseUrl . 'index.php/apps/wopi/wopi/files/' . $this->fileId . '?access_token=' . $this->wopiToken, $options);
		$this->checkFileInfoResult = json_decode($result->getBody()->getContents(), true);
	}

	/**
	 * @Then Collabora puts :source
	 */
	public function collaboraPuts($source)
	{
		$file = \GuzzleHttp\Psr7\stream_for(fopen($source, 'r'));
		$client = new Client();
		$options = [
			'data' => $file,
			'headers' => [
				'X-LOOL-WOPI-Timestamp' => $this->checkFileInfoResult['LastModifiedTime']
			]
		];
		try {
			$result = $client->post($this->baseUrl . 'index.php/apps/wopi/wopi/files/' . $this->fileId . '/contents?access_token=' . $this->wopiToken, $options);
			$this->checkFileInfoResult = json_decode($result->getBody()->getContents(), true);
		} catch (\GuzzleHttp\Exception\ClientException $e) {
			$this->response = $e->getResponse();
		}
	}

	/**
	 * @Then /^the HTTP status code should be "([^"]*)"$/
	 * @param int $statusCode
	 */
	public function theHTTPStatusCodeShouldBe($statusCode) {
		Assert::assertEquals($statusCode, $this->response->getStatusCode());
	}


	/**
	 * @Then checkFileInfo :arg1 is ":arg2"
	 */
	public function checkfileinfoIs($arg1, $arg2)
	{
		\PHPUnit\Framework\Assert::assertEquals($arg2, $this->checkFileInfoResult[$arg1]);
	}


	/**
	 * @Then checkFileInfo :arg1 matches ":arg2"
	 */
	public function checkfileinfoMatches($arg1, $arg2)
	{
		\PHPUnit\Framework\Assert::assertRegExp($arg2, $this->checkFileInfoResult[$arg1]);
	}

	/**
	 * @Then checkFileInfo :arg1 is true
	 */
	public function checkfileinfoIsTrue($arg1)
	{
		\PHPUnit\Framework\Assert::assertTrue($this->checkFileInfoResult[$arg1]);
	}

	/**
	 * @Then checkFileInfo :arg1 is false
	 */
	public function checkfileinfoIsFalse($arg1)
	{
		\PHPUnit\Framework\Assert::assertFalse($this->checkFileInfoResult[$arg1]);
	}

}
