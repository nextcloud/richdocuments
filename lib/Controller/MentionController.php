<?php
/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Controller;

use OCA\Richdocuments\AppInfo\Application;
use OCA\Richdocuments\Notification\Notifier;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\UserRateLimit;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\Files\IRootFolder;
use OCP\IRequest;
use OCP\IUserManager;
use OCP\Notification\IManager;

class MentionController extends Controller {
	public function __construct(
		$appName,
		IRequest $request,
		private IRootFolder $rootFolder,
		private IManager $manager,
		private ITimeFactory $timeFactory,
		private IUserManager $userManager,
		private ?string $userId,
	) {
		parent::__construct($appName, $request);
	}

	#[NoAdminRequired]
	#[UserRateLimit(limit: 5, period: 120)]
	public function mention(int $fileId, string $mention): DataResponse {
		$userFolder = $this->rootFolder->getUserFolder($this->userId);
		$file = $userFolder->getFirstNodeById($fileId);
		if ($file === null) {
			return new DataResponse([], Http::STATUS_NOT_FOUND);
		}

		// Reverse the array of users to pop off the first user later
		$userResults = array_reverse($this->userManager->searchDisplayName($mention, 1));
		if (count($userResults) < 1) {
			return new DataResponse([], Http::STATUS_NOT_FOUND);
		}

		// Get the first user returned in the array
		$user = array_pop($userResults);
		$userFolder = $this->rootFolder->getUserFolder($user->getUID());
		$file = $userFolder->getFirstNodeById($fileId);
		if ($file === null) {
			return new DataResponse([], Http::STATUS_NOT_FOUND);
		}

		$notification = $this->manager->createNotification();
		$notification->setUser($user->getUID())
			->setApp(Application::APPNAME)
			->setSubject(Notifier::TYPE_MENTIONED, [
				Notifier::SUBJECT_MENTIONED_SOURCE_USER => $this->userId,
				Notifier::SUBJECT_MENTIONED_TARGET_USER => $mention,
			])
			->setObject('file', (string)$fileId);

		if ($this->manager->getCount($notification) === 0) {
			$notification->setDateTime(\DateTime::createFromImmutable($this->timeFactory->now()));
			$this->manager->notify($notification);
			return new DataResponse([], Http::STATUS_OK);
		}

		return new DataResponse([], Http::STATUS_NOT_FOUND);
	}
}
