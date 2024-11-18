<?php
/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\Richdocuments\Notification;

use InvalidArgumentException;
use OC\User\NoUserException;
use OCA\Richdocuments\AppInfo\Application;
use OCP\Files\IRootFolder;
use OCP\Files\NotPermittedException;
use OCP\IURLGenerator;
use OCP\IUserManager;
use OCP\L10N\IFactory;
use OCP\Notification\INotification;
use OCP\Notification\INotifier;

class Notifier implements INotifier {
	public const TYPE_MENTIONED = 'mentioned';
	public const SUBJECT_MENTIONED_SOURCE_USER = 'sourceUser';
	public const SUBJECT_MENTIONED_TARGET_USER = 'targetUser';

	public function __construct(
		private IFactory $factory,
		private IUserManager $userManager,
		private IURLGenerator $urlGenerator,
		private IRootFolder $rootFolder,
	) {
	}

	public function getID(): string {
		return 'richdocuments';
	}

	public function getName(): string {
		return 'Office';
	}

	public function prepare(INotification $notification, string $languageCode): INotification {
		if ($notification->getApp() !== Application::APPNAME) {
			throw new InvalidArgumentException('Application should be text instead of ' . $notification->getApp());
		}

		$l = $this->factory->get(Application::APPNAME, $languageCode);

		switch ($notification->getSubject()) {
			case self::TYPE_MENTIONED:
				$parameters = $notification->getSubjectParameters();
				$sourceUser = $parameters[self::SUBJECT_MENTIONED_SOURCE_USER];
				$sourceUserDisplayName = $this->userManager->getDisplayName($sourceUser);
				$targetUser = $notification->getUser();
				$fileId = (int)$notification->getObjectId();

				if ($sourceUserDisplayName === null) {
					throw new InvalidArgumentException();
				}

				try {
					$userFolder = $this->rootFolder->getUserFolder($targetUser);
				} catch (NotPermittedException|NoUserException $e) {
					throw new InvalidArgumentException();
				}
				$node = $userFolder->getFirstNodeById($fileId);

				if ($node === null) {
					throw new InvalidArgumentException();
				}

				$fileLink = $this->urlGenerator->linkToRouteAbsolute('files.viewcontroller.showFile', ['fileid' => $node->getId()]);

				$notification->setRichSubject($l->t('{user} has mentioned you in {node}'), [
					'user' => [
						'type' => 'user',
						'id' => $sourceUser,
						'name' => $sourceUserDisplayName,
					],
					'node' => [
						'type' => 'file',
						'id' => (string)$node->getId(),
						'name' => $node->getName(),
						'path' => $userFolder->getRelativePath($node->getPath()) ?? '',
						'link' => $fileLink,
					],
				]);
				break;
			default:
				throw new InvalidArgumentException();
		}
		$notification->setIcon($this->urlGenerator->getAbsoluteURL($this->urlGenerator->imagePath('text', 'app-dark.svg')));
		$notification->setLink($fileLink);
		$this->setParsedSubjectFromRichSubject($notification);
		return $notification;
	}

	protected function setParsedSubjectFromRichSubject(INotification $notification): void {
		$placeholders = $replacements = [];
		foreach ($notification->getRichSubjectParameters() as $placeholder => $parameter) {
			$placeholders[] = '{' . $placeholder . '}';
			if ($parameter['type'] === 'file') {
				$replacements[] = $parameter['path'];
			} else {
				$replacements[] = $parameter['name'];
			}
		}

		$notification->setParsedSubject(str_replace($placeholders, $replacements, $notification->getRichSubject()));
	}
}
