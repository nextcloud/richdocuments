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

use Exception;
use OCA\Richdocuments\AppInfo\Application;
use OCP\App\IAppManager;
use OCP\Files\IAppData;
use OCP\Http\Client\IClientService;
use OCP\ICacheFactory;
use OCP\IConfig;
use OCP\IL10N;
use OCP\PreConditionNotMetException;
use Psr\Log\LoggerInterface;

class CapabilitiesService extends BaseRemoteService {
	private IAppManager $appManager;
	private IL10N $l10n;

	public function clear(): void {
		$this->clearCache('capabilities');
	}


	public function __construct(IAppData $appData, IConfig $config, IClientService $clientService, ICacheFactory $cacheFactory, IAppManager $appManager, IL10N $l10n, LoggerInterface $logger) {
		parent::__construct(
			$appData,
			$clientService,
			$config,
			$logger,
			$cacheFactory
		);
		$this->config = $config;
		$this->clientService = $clientService;
		$this->appManager = $appManager;
		$this->l10n = $l10n;
		$this->logger = $logger;
	}

	public function getCapabilities(): array {
		return $this->getCache('capabilities') ?? [];
	}

	/**
	 * @throws PreConditionNotMetException When there is no server configured
	 * @throws Exception When the request fails
	 */
	public function fetch(): void {
		$capabilitiesEndpoint = $this->getRemoteUrl('/hosting/capabilities');
		if (!$capabilitiesEndpoint) {
			throw new PreConditionNotMetException('Not configured');
		}

		$client = $this->clientService->newClient();

		try {
			$startTime = microtime(true);
			$response = $client->get($capabilitiesEndpoint, $this->getRequestOptions());
			$duration = round(((microtime(true) - $startTime)), 3);
			$this->logger->info('Fetched capabilities endpoint from ' . $capabilitiesEndpoint. ' in ' . $duration . ' seconds');
			$responseBody = $response->getBody();
			$capabilities = \json_decode($responseBody, true);

			if (!is_array($capabilities)) {
				throw new \InvalidArgumentException('Capabilities didn\'t return an array');
			}
		} catch (\Exception $e) {
			$this->logger->error('Failed to fetch the Collabora capabilities endpoint: ' . $e->getMessage(), [ 'exception' => $e ]);
			throw $e;
		}

		$this->setCache('capabilities', $capabilities);
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
}
