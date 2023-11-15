<?php

namespace OCA\Richdocuments\Migration;

use OCA\Richdocuments\Service\FontService;
use OCP\IConfig;
use OCP\Migration\IOutput;
use OCP\Migration\IRepairStep;

class InstallDefaultFonts implements IRepairStep {
	public function __construct(private IConfig $config, private FontService $fontService) {
	}

	public function getName(): string {
		return 'Install default fonts';
	}

	public function run(IOutput $output): void {
		$appVersion = $this->config->getAppValue('richdocuments', 'installed_version');

		if (!empty($appVersion) && version_compare($appVersion, '8.2.2') < 1) {
			return;
		}

		$this->fontService->installDefaultFonts();
	}
}
