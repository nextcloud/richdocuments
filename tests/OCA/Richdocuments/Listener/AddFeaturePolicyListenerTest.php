<?php
/**
 * @copyright Copyright (c) 2023 Julius Härtl <jus@bitgrid.net>
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
 */

namespace OCA\Richdocuments\Listener;

use OC\Security\FeaturePolicy\FeaturePolicyManager;
use OCA\Richdocuments\AppConfig;
use OCP\EventDispatcher\IEventDispatcher;
use OCP\IRequest;
use PHPUnit\Framework\TestCase;

class AddFeaturePolicyListenerTest extends TestCase {
	private AddFeaturePolicyListener $featurePolicyListener;

	public function setUp(): void {

		$this->request = $this->createMock(IRequest::class);
		$this->config = $this->createMock(AppConfig::class);
		parent::setUp();

		$this->featurePolicyListener = new AddFeaturePolicyListener(
			$this->request,
			$this->config,
		);
	}

	public function testEmpty() {
		$this->expectPageLoad();
		$this->config->expects(self::any())
			->method('getDomainList')
			->willReturn([]);

		$policy = $this->getMergedPolicy();
		self::assertEquals(["'self'"], $policy->getFullscreenDomains());
	}

	public function testDomains() {
		$this->expectPageLoad();
		$this->config->expects(self::any())
			->method('getDomainList')
			->willReturn(['https://collabora.local']);

		$policy = $this->getMergedPolicy();
		self::assertEquals(["'self'", 'https://collabora.local'], $policy->getFullscreenDomains());
	}

	private function getMergedPolicy(): \OC\Security\FeaturePolicy\FeaturePolicy {
		$eventDispatcher = $this->createMock(IEventDispatcher::class);
		$eventDispatcher->expects(self::once())
			->method('dispatchTyped')
			->willReturnCallback(function ($event) {
				$this->featurePolicyListener->handle($event);
			});
		$manager = new FeaturePolicyManager($eventDispatcher);

		return $manager->getDefaultPolicy();
	}

	private function expectPageLoad(): void {
		$this->request->expects(self::once())
			->method('getScriptName')
			->willReturn('index.php');
	}

}
