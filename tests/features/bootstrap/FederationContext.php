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
use JuliusHaertl\NextcloudBehat\Context\ServerContext;
use JuliusHaertl\NextcloudBehat\Context\SharingContext;

class FederationContext implements Context {
	/** @var ServerContext */
	private $serverContext;
	/** @var SharingContext */
	private $sharingContext;
	/** @var WopiContext */
	private $wopiContext;
	/** @var RichDocumentsContext */
	private $richDocumentsContext;

	/** @BeforeScenario */
	public function gatherContexts(BeforeScenarioScope $scope) {
		$environment = $scope->getEnvironment();
		$this->serverContext = $environment->getContext(ServerContext::class);
		$this->sharingContext = $environment->getContext(SharingContext::class);
		$this->wopiContext = $environment->getContext(WopiContext::class);
		$this->richDocumentsContext = $environment->getContext(RichDocumentsContext::class);
	}

	/**
	 * @When I POST the WOPI access token to the federation endpoint
	 */
	public function iPostWopiAccessTokenToFederationEndpoint(): void {
		$this->serverContext->sendOCSRequest(
			'POST',
			'apps/richdocuments/api/v1/federation',
			['token' => $this->wopiContext->getWopiToken()]
		);
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

	/**
	 * @When I POST the initiator token to the federation endpoint
	 */
	public function iPostInitiatorTokenToFederationEndpoint(): void {
		foreach ($this->richDocumentsContext->getRedirectHistory() as $url) {
			if (str_contains($url, '/richdocuments/remote')) {
				parse_str(parse_url($url, PHP_URL_QUERY), $params);
				$this->serverContext->sendOCSRequest('POST', 'apps/richdocuments/api/v1/federation', ['token' => $params['remoteServerToken']]);
				return;
			}
		}
		throw new \RuntimeException('No federation redirect found in redirect history');
	}
}
