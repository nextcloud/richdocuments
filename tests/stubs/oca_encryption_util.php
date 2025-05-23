<?php

/**
 * SPDX-FileCopyrightText: 2017-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-FileCopyrightText: 2016 ownCloud, Inc.
 * SPDX-License-Identifier: AGPL-3.0-only
 */
namespace OCA\Encryption;

use OC\Files\Storage\Storage;
use OC\Files\View;
use OCA\Encryption\Crypto\Crypt;
use OCP\Files\Storage\IStorage;
use OCP\IConfig;
use OCP\IUser;
use OCP\IUserManager;
use OCP\IUserSession;
use OCP\PreConditionNotMetException;

class Util {
	public function __construct(private View $files, private Crypt $crypt, IUserSession $userSession, private IConfig $config, private IUserManager $userManager)
 {
 }

	/**
	 * check if recovery key is enabled for user
	 *
	 * @param string $uid
	 * @return bool
	 */
	public function isRecoveryEnabledForUser($uid)
 {
 }

	/**
	 * check if the home storage should be encrypted
	 *
	 * @return bool
	 */
	public function shouldEncryptHomeStorage()
 {
 }

	/**
	 * set the home storage encryption on/off
	 *
	 * @param bool $encryptHomeStorage
	 */
	public function setEncryptHomeStorage($encryptHomeStorage)
 {
 }

	/**
	 * check if master key is enabled
	 */
	public function isMasterKeyEnabled(): bool
 {
 }

	/**
	 * @param $enabled
	 * @return bool
	 */
	public function setRecoveryForUser($enabled)
 {
 }

	/**
	 * @param string $uid
	 * @return bool
	 */
	public function userHasFiles($uid)
 {
 }

	/**
	 * get owner from give path, path relative to data/ expected
	 *
	 * @param string $path relative to data/
	 * @return string
	 * @throws \BadMethodCallException
	 */
	public function getOwner($path)
 {
 }

	public function getStorage(string $path): ?IStorage
 {
 }

}
