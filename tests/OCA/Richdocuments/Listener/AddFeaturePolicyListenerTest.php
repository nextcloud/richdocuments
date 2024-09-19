<?php
/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
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
			->willReturnCallback(function ($event): void {
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
