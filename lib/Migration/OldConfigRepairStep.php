<?php
namespace OCA\Wopi\Migration;

use OCP\IConfig;
use OCP\Migration\IOutput;
use OCP\Migration\IRepairStep;
use OCP\ILogger;

class OldConfigRepairStep implements IRepairStep {

	/** @var ILogger */
	protected $logger;
	/**
	 * @var IConfig
	 */
	private $config;

	public function __construct(ILogger $logger, IConfig $config) {
		$this->logger = $logger;
		$this->config = $config;
	}

	/**
	 * Returns the step's name
	 */
	public function getName() {
		return 'Move old config';
	}

	/**
	 * @param IOutput $output
	 */
	public function run(IOutput $output) {
		$serverUrl = $this->config->getAppValue('wopi', 'serverUrl');
		if ($serverUrl !== '')
		{
			$this->config->setAppValue('wopi', 'wopi_url', $serverUrl);
			$this->config->deleteAppValue('wopi', 'serverUrl');
		}
	}
}