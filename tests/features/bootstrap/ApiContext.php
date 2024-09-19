<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
use Behat\Behat\Context\Context;
use Behat\Behat\Hook\Scope\BeforeScenarioScope;
use Behat\Gherkin\Node\TableNode;
use JuliusHaertl\NextcloudBehat\Context\FilesContext;
use JuliusHaertl\NextcloudBehat\Context\ServerContext;
use PHPUnit\Framework\Assert;

class ApiContext implements Context {
	private ServerContext $serverContext;
	private FilesContext $filesContext;

	private array $extractResult;

	/** @BeforeScenario */
	public function gatherContexts(BeforeScenarioScope $scope) {
		$environment = $scope->getEnvironment();
		$this->serverContext = $environment->getContext(ServerContext::class);
		$this->filesContext = $environment->getContext(FilesContext::class);
	}

	/**
	 * @Then /^User "([^"]*)" requests the form field data of "([^"]*)"$/
	 */
	public function userRequestsTheFormFieldData($user, $filePath) {
		$davClient = $this->filesContext->getSabreClient($user);
		$davPath = $this->filesContext->makeSabrePath($user, $filePath);
		$result = $davClient->propFind($davPath, ['{http://owncloud.org/ns}fileid']);
		$fileId = $result['{http://owncloud.org/ns}fileid'];
		$this->serverContext->sendOCSRequest('GET', 'apps/richdocuments/api/v1/template/fields/extract/' . $fileId);

		$body = (string)$this->serverContext->getResponse()->getBody();
		;
		$this->extractResult = json_decode($body, true);

		$this->serverContext->assertHttpStatusCode(200);
	}

	/**
	 * @Given /^the response contains the field "([^"]*)"$/
	 */
	public function theResponseContainsTheField($arg1) {
		$found = false;
		foreach ($this->extractResult['ocs']['data'] as $index => $field) {
			if ($field['alias'] === $arg1) {
				$found = true;
			}
		}
		Assert::assertTrue($found, 'Field was not found');
	}

	/**
	 * @Then /^User "([^"]*)" fills in fields of "([^"]*)" with values as "([^"]*)" to "([^"]*)"$/
	 */
	public function userFillsInFieldsOfWithValuesAsTo($user, $source, ?string $convert = null, ?string $target = null, ?TableNode $table = null) {
		$davClient = $this->filesContext->getSabreClient($user);
		$davPath = $this->filesContext->makeSabrePath($user, $source);
		$result = $davClient->propFind($davPath, ['{http://owncloud.org/ns}fileid']);
		$fileId = $result['{http://owncloud.org/ns}fileid'];

		$formData = [];
		foreach ($table->getRows() as $row) {
			$formData[$row[0]] = [
				'content' => $row[1],
			];
		}

		$this->serverContext->sendOCSRequest('POST', 'apps/richdocuments/api/v1/template/fields/fill/' . $fileId . '?'
			. ($convert ? '&convert=' . $convert : '')
			. ($target ? '&destination=' . $target : ''), ['fields' => $formData]);

		$this->serverContext->assertHttpStatusCode(200);

		if ($target === null) {
			file_put_contents('data/output.pdf', $this->serverContext->getResponse()->getBody());
		} else {
			$this->serverContext->sendRawRequest('GET', '/remote.php/dav/files/' . $user . '/' . $target);
			file_put_contents('data/output.pdf', $this->serverContext->getResponse()->getBody());
		}
	}

	/**
	 * @Given /^the response contains the field "([^"]*)" with "([^"]*)"$/
	 */
	public function theResponseContainsTheFieldWith($arg1, $arg2) {
		$found = false;
		foreach ($this->extractResult['ocs']['data'] as $index => $field) {
			if ($field['alias'] === $arg1) {
				Assert::assertEquals($arg2, $field['content']);
				$found = true;
			}
		}
		Assert::assertTrue($found, 'Field was not found');
	}

	/**
	 * @Then /^User "([^"]*)" fills in fields of "([^"]*)" with values as "([^"]*)"$/
	 */
	public function userFillsInFieldsOfWithValuesAs($arg1, $arg2, $arg3, TableNode $table) {
		$this->userFillsInFieldsOfWithValuesAsTo($arg1, $arg2, $arg3, null, $table);
	}

	/**
	 * @Then /^User "([^"]*)" downloads the file and compares it with the baseline$/
	 */
	public function userDownloadsTheFile($arg1) {
		$this->serverContext->setCurrentUser($arg1);
		$this->serverContext->sendRawRequest('GET', '/remote.php/dav/files/' . $arg1 . '/filled.pdf');
		file_put_contents('data/output.pdf', $this->serverContext->getResponse()->getBody());

		Assert::assertEquals(
			sha1_file('data/filled.pdf'),
			sha1_file('data/output.pdf'),
		);
	}

	/**
	 * @Given /^the resulting file is a "([^"]*)"$/
	 */
	public function theResultingFileIsA($mimetype) {
		$filetype = mime_content_type('data/output.pdf');
		Assert::assertEquals($mimetype, $filetype);
	}

	/**
	 * @Then /^compares the returned file with the baseline$/
	 */
	public function comparesTheReturnedFileWithTheBaseline() {
		file_put_contents('data/output.pdf', $this->serverContext->getResponse()->getBody());

		Assert::assertEquals(
			sha1_file('data/filled.pdf'),
			sha1_file('data/output.pdf'),
		);
	}
}
