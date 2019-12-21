<?php

namespace OCA\Wopi\Hooks;

use OCP\AppFramework\Utility\ITimeFactory;
use OCP\Files\File;
use OCA\Wopi\Db\WopiLockMapper;
use OCP\Files\InvalidPathException;
use OCP\Files\IRootFolder;
use OCP\Files\Node;
use OCP\Files\NotFoundException;
use OCP\ILogger;
use OCP\Lock\ILockingProvider;
use OCP\Lock\LockedException;

class WopiLockHooks {

	private $rootFolder;
	/**
	 * @var WopiLockMapper
	 */
	private $lockMapper;
	/**
	 * @var ITimeFactory
	 */
	private $timeFactory;

	/**
	 * @var bool
	 */
	private $lockBypass;
	/**
	 * @var ILogger
	 */
	private $logger;

	public function __construct(IRootFolder $rootFolder, ITimeFactory $timeFactory, ILogger $logger, WopiLockMapper $lockMapper) {
		$this->rootFolder = $rootFolder;
		$this->lockMapper = $lockMapper;
		$this->timeFactory = $timeFactory;
		$this->logger = $logger;
	}

	public function register() {
		$this->rootFolder->listen('\OC\Files', 'preWrite', [$this, 'preWrite']);
	}

	public function preWrite(Node $node) {
		if ($node instanceof File) {
			try {
				$lock = $this->lockMapper->find($node->getId());
				if (empty($lock))
					return;
				if ($lock->getValidBy() < $this->timeFactory->getTime())
				{
					$this->lockMapper->delete($lock);
					return;
				}
				if (!$this->lockBypass)
					$node->lock(ILockingProvider::LOCK_SHARED);
			} catch (InvalidPathException $e) {
				$this->logger->logException($e);
			} catch (NotFoundException $e) {
				$this->logger->debug('not a file');
			} catch (LockedException $e) {
				$this->logger->logException($e);
			}
		}
	}

	/**
	 * @param bool $lockBypass
	 */
	public function setLockBypass($lockBypass): void {
		$this->lockBypass = $lockBypass;
	}
}