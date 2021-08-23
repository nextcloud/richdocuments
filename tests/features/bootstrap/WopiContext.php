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
use Behat\Gherkin\Node\TableNode;
use GuzzleHttp\Client;
use JuliusHaertl\NextcloudBehat\Context\FilesContext;
use JuliusHaertl\NextcloudBehat\Context\ServerContext;
use PHPUnit\Framework\Assert;

class WopiContext implements Context {

	/** @var ServerContext */
	private $serverContext;
	/** @var FilesContext */
	private $filesContext;

	private $downloadedFile;
	private $response;
	private $currentServer;
	private $fileId;
	private $fileIds = [];
	private $wopiToken;
	private $checkFileInfoResult;

	public function __construct()
	{
		$this->downloadedFile = tempnam(sys_get_temp_dir(), 'downloadedFile');
	}

	/** @BeforeScenario */
	public function gatherContexts(BeforeScenarioScope $scope) {
		$environment = $scope->getEnvironment();
		$this->serverContext = $environment->getContext(ServerContext::class);
		$this->filesContext = $environment->getContext(FilesContext::class);
	}

	public function getWopiEndpointBaseUrl() {
		if ($this->currentServer) {
			return $this->currentServer;
		}
		return $this->serverContext->getBaseUrl();
	}

	public function getWopiToken() {
		return $this->wopiToken;
	}

	public function setWopiParameters($server, $fileId, $accessToken) {
		$this->currentServer = $server;
		$this->fileId = $fileId;
		$this->wopiToken = $accessToken;
		$this->fileIds[] = $fileId;
	}

	/**
	 * @Then Collabora fetches checkFileInfo
	 */
	public function collaboraFetchesCheckfileinfo() {
		$client = new Client();
		$options = [];
		$this->response = $client->get($this->getWopiEndpointBaseUrl() . 'index.php/apps/richdocuments/wopi/files/' . $this->fileId . '?access_token=' . $this->wopiToken, $options);
		$this->checkFileInfoResult = json_decode($this->response->getBody()->getContents(), true);
	}

	/**
	 * @Then /^Collabora saved the file with the content of "([^"]*)"$/
	 */
	public function collaboraPuts($source)
	{
		$file = \GuzzleHttp\Psr7\stream_for(fopen($source, 'r'));
		$client = new Client();
		$options = [
			'body' => $file,
			'headers' => [
				'X-LOOL-WOPI-Timestamp' => $this->checkFileInfoResult['LastModifiedTime']
			]
		];
		try {
			$this->response = $client->post($this->getWopiEndpointBaseUrl() . 'index.php/apps/richdocuments/wopi/files/' . $this->fileId . '/contents?access_token=' . $this->wopiToken, $options);
		} catch (\GuzzleHttp\Exception\ClientException $e) {
			$this->response = $e->getResponse();
		}
	}

	/**
	 * @Then /^the WOPI HTTP status code should be "([^"]*)"$/
	 * @param int $statusCode
	 */
	public function theHTTPStatusCodeShouldBe($statusCode) {
		Assert::assertEquals($statusCode, $this->response->getStatusCode());
	}


	/**
	 * @Given /^Collabora fetches and receives the following in the checkFileInfo response$/
	 */
	public function collaboraReceivesTheFollowingInTheCheckFileInfoResponse(TableNode $table) {
		$this->collaboraFetchesCheckfileinfo();
		foreach ($table->getRows() as $row) {
			$key = $row[0];
			$actual = $this->checkFileInfoResult[$key];
			$expected = $row[1];
			Assert::assertEquals((string)$expected, (string)$actual, $key . ' does not match the expected value');
		}
	}

	/**
	 * @Then /^checkFileInfo "([^"]*)" is "([^"]*)"$/
	 */
	public function checkfileinfoIs($key, $value)
	{
		\PHPUnit\Framework\Assert::assertEquals($value, $this->checkFileInfoResult[$key]);
	}


	/**
	 * @Then /^checkFileInfo "([^"]*)" matches "([^"]*)"$/
	 */
	public function checkfileinfoMatches($key, $regex)
	{
		\PHPUnit\Framework\Assert::assertRegExp($regex, $this->checkFileInfoResult[$key]);
	}

	/**
	 * @Then /^checkFileInfo "([^"]*)" is true$/
	 */
	public function checkfileinfoIsTrue($key)
	{
		\PHPUnit\Framework\Assert::assertTrue($this->checkFileInfoResult[$key]);
	}

	/**
	 * @Then /^checkFileInfo "([^"]*)" is false$/
	 */
	public function checkfileinfoIsFalse($key)
	{
		\PHPUnit\Framework\Assert::assertFalse($this->checkFileInfoResult[$key]);
	}

	/**
	 * @Then /^checkFileInfo "([^"]*)" is not set/
	 */
	public function checkfileinfoIsNotSet($key)
	{
		\PHPUnit\Framework\Assert::assertArrayNotHasKey($key, $this->checkFileInfoResult);
	}

	/**
	 * @Given /^Collabora downloads the file$/
	 */
	public function collaboraDownloadsTheFile() {
		$fp = fopen($this->downloadedFile, 'w');
		$client = new Client();
		try {
			$this->response = $client->get(
				$this->getWopiEndpointBaseUrl() . 'index.php/apps/richdocuments/wopi/files/' . $this->fileId . '/contents?access_token=' . $this->wopiToken,
				[ 'sink' => $fp ]
			);
		} catch (\GuzzleHttp\Exception\ClientException $e) {
			$this->response = $e->getResponse();
		}
	}

	/**
	 * @Then /^the file is equal to "([^"]*)"$/
	 */
	public function theFileIsEqual($comparison) {
		$fp1 = fopen($this->downloadedFile, 'r');
		$fp2 = fopen($comparison, 'r');
		\PHPUnit\Framework\Assert::assertTrue($this->compareFiles($fp1, $fp2));
	}

	/**
	 * @Then /^the file is not equal to "([^"]*)"$/
	 */
	public function theFileIsNotEqual($comparison) {
		$fp1 = fopen($this->downloadedFile, 'r');
		$fp2 = fopen($comparison, 'r');
		\PHPUnit\Framework\Assert::assertFalse($this->compareFiles($fp1, $fp2));
	}


	private function compareFiles($fp1, $fp2) {
		$result = true;
		while (!feof($fp1)) {
			if (fread($fp1, 8192) != fread($fp2, 8192)) {
				$result = false;
				break;
			}
		}

		fclose($fp1);
		fclose($fp2);
		return $result;
	}

	/**
	 * @Then /^Collabora downoads the file and it is equal to "([^"]*)"$/
	 */
	public function collaboraDownoadsTheFileAndItIsEqualTo($arg1) {
		$this->collaboraDownloadsTheFile();
		$this->theFileIsEqual($arg1);
	}

	/**
	 * @Given /^Collabora can save the file with the content of "([^"]*)"$/
	 */
	public function collaboraCanSaveTheFileWithTheContentOf($arg1) {
		$this->collaboraPuts($arg1);
		$this->collaboraDownloadsTheFile();
		$this->theFileIsEqual($arg1);
	}

	/**
	 * @Given /^Collabora can not save the file with the content of "([^"]*)"$/
	 */
	public function collaboraCanNotSaveTheFileWithTheContentOf($arg1) {
		$this->collaboraPuts($arg1);
		Assert::assertEquals(403, $this->response->getStatusCode(), 'Permission should be denied');
		$this->collaboraDownloadsTheFile();
		$this->theFileIsNotEqual($arg1);
	}


	/**
	 * @Then /^both Collabora files used the same file id$/
	 */
	public function bothCollaboraFilesUsedTheSameFileId() {
		if (count($this->fileIds) <= 1) {
			throw new \Exception('Less than two file ids available for comparison');
		}
		$current = $this->fileIds[count($this->fileIds)-1];
		$previous = $this->fileIds[count($this->fileIds)-2];
		Assert::assertEquals($current, $previous);
	}

	/**
	 * @Then /^both Collabora files used a different file id$/
	 */
	public function bothCollaboraFilesUsedADifferentFileId() {
		if (count($this->fileIds) <= 1) {
			throw new \Exception('Less than two file ids available for comparison');
		}
		$current = $this->fileIds[count($this->fileIds)-1];
		$previous = $this->fileIds[count($this->fileIds)-2];
		Assert::assertNotEquals($current, $previous);
	}


	/**
	 * @Given /^Collabora saves the content of "([^"]*)" as "([^"]*)"$/
	 */
	public function collaboraSavesTheFileAs($source, $newName) {
		$file = \GuzzleHttp\Psr7\stream_for(fopen($source, 'r'));
		$client = new Client();
		$options = [
			'body' => $file,
			'headers' => [
				'X-LOOL-WOPI-Timestamp' => $this->checkFileInfoResult['LastModifiedTime'],
				'X-WOPI-SuggestedTarget' => $newName,
				'X-WOPI-Override' => 'PUT_RELATIVE',
			]
		];
		try {
			$this->response = $client->post($this->getWopiEndpointBaseUrl() . 'index.php/apps/richdocuments/wopi/files/' . $this->fileId . '?access_token=' . $this->wopiToken, $options);
		} catch (\GuzzleHttp\Exception\ClientException $e) {
			$this->response = $e->getResponse();
		}
	}

}
