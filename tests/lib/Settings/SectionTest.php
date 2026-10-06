<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace Tests\Richdocuments\Settings;

use OCA\Richdocuments\Service\CapabilitiesService;
use OCA\Richdocuments\Settings\Section;
use OCP\IURLGenerator;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

class SectionTest extends TestCase {
	private IURLGenerator&MockObject $urlGenerator;
	private CapabilitiesService&MockObject $capabilitiesService;
	private Section $section;

	protected function setUp(): void {
		parent::setUp();

		$this->urlGenerator = $this->createMock(IURLGenerator::class);
		$this->capabilitiesService = $this->createMock(CapabilitiesService::class);

		$this->section = new Section(
			$this->urlGenerator,
			$this->capabilitiesService,
		);
	}

	public function testGetNameReturnsProductNameOnDefaultInstall(): void {
		$this->capabilitiesService->method('getProductName')
			->willReturn('Collabora Online');

		$this->assertSame('Collabora Online', $this->section->getName());
	}

	public function testGetNameReturnsVendorNameOnWhiteLabelInstall(): void {
		// getName() used to return a hardcoded 'Office' for any Collabora
		// >= 21.11, which made this path unreachable regardless of the vendor
		// name the capabilities carried.
		$this->capabilitiesService->method('getProductName')
			->willReturn('Vendor Office');

		$this->assertSame('Vendor Office', $this->section->getName());
	}

	public function testGetNameDoesNotBranchOnBranding(): void {
		// Exactly one lookup, no product-version check in between.
		$this->capabilitiesService->expects($this->once())
			->method('getProductName')
			->willReturn('Vendor Office');

		$this->section->getName();
	}

	public function testGetIdIsStable(): void {
		$this->assertSame('richdocuments', $this->section->getID());
	}
}
