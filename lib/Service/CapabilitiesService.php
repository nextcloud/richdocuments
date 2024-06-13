<?php
/**
 * @copyright Copyright (c) 2019, Roeland Jago Douma <roeland@famdouma.nl>
 *
 * @author Roeland Jago Douma <roeland@famdouma.nl>
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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\Richdocuments\Service;

use OCA\Richdocuments\AppInfo\Application;
use OCP\App\IAppManager;
use OCP\Files\AppData\IAppDataFactory;
use OCP\Http\Client\IClient;
use OCP\Http\Client\IClientService;
use OCP\IAppConfig;
use OCP\ICacheFactory;
use OCP\IConfig;
use OCP\IL10N;
use Psr\Log\LoggerInterface;

class CapabilitiesService extends CachedRequestService {

	private ?array $capabilities = null;

	public function __construct(
		private IClientService $clientService,
		private ICacheFactory $cacheFactory,
		private IAppDataFactory $appDataFactory,
		private IAppConfig $appConfig,
		private LoggerInterface $logger,
		private IConfig $config,
		private IAppManager $appManager,
		private IL10N $l10n,
	) {
		parent::__construct(
			$this->clientService,
			$this->cacheFactory,
			$this->appDataFactory,
			$this->appConfig,
			$this->logger,
			'capabilities',
		);
	}

	public function getCapabilities() {
		if (!$this->capabilities) {
			$this->capabilities = $this->getParsedCapabilities();
		}

		if (!is_array($this->capabilities)) {
			return [];
		}

		return $this->capabilities;
	}

	public function getProductVersion(): ?string {
		return $this->getCapabilities()['productVersion'] ?? null;
	}

	public function getProductHash(): ?string {
		return $this->getCapabilities()['productVersionHash'] ?? null;
	}

	public function getServerProductName(): ?string {
		return $this->getCapabilities()['productName'] ?? null;
	}

	public function hasNextcloudBranding(): bool {
		$productVersion = $this->getCapabilities()['productVersion'] ?? '0.0.0.0';
		return version_compare($productVersion, '21.11', '>=');
	}

	public function hasDrawSupport(): bool {
		$productVersion = $this->getCapabilities()['productVersion'] ?? '0.0.0.0';
		return version_compare($productVersion, '6.4.7', '>=');
	}

	public function hasTemplateSaveAs(): bool {
		return $this->getCapabilities()['hasTemplateSaveAs'] ?? false;
	}

	public function hasTemplateSource(): bool {
		return $this->getCapabilities()['hasTemplateSource'] ?? false;
	}

	public function hasZoteroSupport(): bool {
		return $this->getCapabilities()['hasZoteroSupport'] ?? false;
	}

	public function hasWASMSupport(): bool {
		return $this->getCapabilities()['hasWASMSupport'] ?? false;
	}

	public function getProductName(): string {
		$theme = $this->config->getAppValue(Application::APPNAME, 'theme', 'nextcloud');

		if (isset($this->capabilitites['productName']) && $theme !== 'nextcloud') {
			return $this->capabilitites['productName'];
		}

		return $this->l10n->t('Nextcloud Office');
	}

	public function hasOtherOOXMLApps(): bool {
		if ($this->appManager->isEnabledForUser('officeonline')) {
			return true;
		}

		if ($this->appManager->isEnabledForUser('onlyoffice')) {
			return true;
		}

		return false;
	}

	public function getCapabilitiesEndpoint(): ?string {
		$remoteHost = $this->config->getAppValue('richdocuments', 'wopi_url');
		if ($remoteHost === '') {
			return null;
		}
		return rtrim($remoteHost, '/') . '/hosting/capabilities';
	}

	protected function sendRequest(IClient $client): string {
		$response = $client->get($this->getCapabilitiesEndpoint(), $this->getDefaultRequestOptions());
		return (string)$response->getBody();
	}

	private function getParsedCapabilities() {
		$response = $this->get();
		return json_decode($response, true);
	}
}
