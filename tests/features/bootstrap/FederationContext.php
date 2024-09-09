<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

use Behat\Behat\Context\Context;
use Behat\Behat\Hook\Scope\BeforeScenarioScope;
use Behat\Gherkin\Node\TableNode;
use JuliusHaertl\NextcloudBehat\Context\ServerContext;
use JuliusHaertl\NextcloudBehat\Context\SharingContext;

class FederationContext implements Context {
	/** @var ServerContext */
	private $serverContext;
	/** @var SharingContext */
	private $sharingContext;

	/** @BeforeScenario */
	public function gatherContexts(BeforeScenarioScope $scope) {
		$environment = $scope->getEnvironment();
		$this->serverContext = $environment->getContext(ServerContext::class);
		$this->sharingContext = $environment->getContext(SharingContext::class);
	}

	/**
	 * @Given /^share the file "([^"]*)" as a federated share to "([^"]*)" on "([^"]*)"$/
	 */
	public function shareTheFileAsAFederatedShareToOn($file, $user, $remote) {
		$table = new TableNode([
			['path', $file],
			['shareType', 6],
			['shareWith', $user . '@' . $this->serverContext->getServer($remote) . '/']
		]);
		$this->sharingContext->asCreatingAShareWith(
			$this->serverContext->getAuth()[0],
			$table
		);
	}

	/**
	 * @Given /^share the file "([^"]*)" with permission ([0-9]+) as a federated share to "([^"]*)" on "([^"]*)"$/
	 */
	public function shareTheFileAsAFederatedShareWithPerission($file, $permissions, $user, $remote) {
		$table = new TableNode([
			['path', $file],
			['shareType', 6],
			['shareWith', $user . '@' . $this->serverContext->getServer($remote) . '/'],
			['permissions', $permissions]
		]);
		$this->sharingContext->asCreatingAShareWith(
			$this->serverContext->getAuth()[0],
			$table
		);
	}
}
