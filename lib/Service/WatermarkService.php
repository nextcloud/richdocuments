<?php

namespace OCA\Richdocuments\Service;

use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\Db\Wopi;
use OCP\Files\IRootFolder;
use OCP\IConfig;
use OCP\IGroupManager;
use OCP\SystemTag\ISystemTagObjectMapper;

class WatermarkService {

	private IConfig $config;
	private AppConfig $appConfig;
	private IGroupManager $groupManager;
	private ISystemTagObjectMapper $systemTagObjectMapper;
	private IRootFolder $rootFolder;

	public function __construct(
		IConfig $config,
		AppConfig $appConfig,
		IGroupManager $groupManager,
		ISystemTagObjectMapper $systemTagObjectMapper,
		IRootFolder $rootFolder
	) {
		$this->config = $config;
		$this->appConfig = $appConfig;
		$this->groupManager = $groupManager;
		$this->systemTagObjectMapper = $systemTagObjectMapper;
		$this->rootFolder = $rootFolder;
	}

	public function getWopiParams(Wopi $wopi): array {
		if ($this->shouldWatermark($wopi)) {
			return [
				'WatermarkText' => $this->getWatermarkText($wopi)
			];
		}

		return [];
	}

	public function shouldWatermark(Wopi $wopi): bool {
		$userId = $wopi->getEditorUid();
		$fileId = $wopi->getFileid();
		$isPublic = $wopi->isGuest();
		if ($this->config->getAppValue(AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_enabled', 'no') === 'no') {
			return false;
		}

		if ($isPublic) {
			if ($this->config->getAppValue(AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_linkAll', 'no') === 'yes') {
				return true;
			}
			if ($this->config->getAppValue(AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_linkRead', 'no') === 'yes' && !$wopi->getCanwrite()) {
				return true;
			}
			if ($this->config->getAppValue(AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_linkSecure', 'no') === 'yes' && $wopi->getHideDownload()) {
				return true;
			}
			if ($this->config->getAppValue(AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_linkTags', 'no') === 'yes') {
				$tags = $this->appConfig->getAppValueArray('watermark_linkTagsList');
				$fileTags = $this->systemTagObjectMapper->getTagIdsForObjects([$fileId], 'files')[$fileId];
				foreach ($fileTags as $tagId) {
					if (in_array($tagId, $tags, true)) {
						return true;
					}
				}
			}
		} else {
			if ($this->config->getAppValue(AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_shareAll', 'no') === 'yes') {
				// Fallback to the file owner for watermarking check for public re-shares
				$userId = $userId ?? $wopi->getOwnerUid();
				$files = $this->rootFolder->getUserFolder($wopi->getOwnerUid())->getById($fileId);
				if (count($files) !== 0 && $files[0]->getOwner()->getUID() !== $userId) {
					return true;
				}
			}
			if ($this->config->getAppValue(AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_shareRead', 'no') === 'yes' && !$wopi->getCanwrite()) {
				return true;
			}
		}
		if ($this->config->getAppValue(AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_allGroups', 'no') === 'yes') {
			// Fallback to the file owner for watermarking check for public shares
			$userId = $userId ?? $wopi->getOwnerUid();
			$groups = $this->appConfig->getAppValueArray('watermark_allGroupsList');

			foreach ($groups as $group) {
				if ($this->groupManager->isInGroup($userId, $group)) {
					return true;
				}
			}
		}
		if ($this->config->getAppValue(AppConfig::WATERMARK_APP_NAMESPACE, 'watermark_allTags', 'no') === 'yes') {
			$tags = $this->appConfig->getAppValueArray('watermark_allTagsList');
			$fileTags = $this->systemTagObjectMapper->getTagIdsForObjects([$fileId], 'files')[$fileId];
			foreach ($fileTags as $tagId) {
				if (in_array($tagId, $tags, true)) {
					return true;
				}
			}
		}

		return false;
	}

	public function getWatermarkText(Wopi $wopi) {
		$user = \OC::$server->getUserManager()->get($wopi->getEditorUid());
		$email = $user !== null && !$wopi->isGuest() ? $user->getEMailAddress() : "";
		$replacements = [
			'userId' => $wopi->getEditorUid(),
			'date' => (new \DateTime())->format('Y-m-d H:i:s'),
			'themingName' => \OC::$server->getThemingDefaults()->getName(),
			'userDisplayName' => $user ? $user->getDisplayName() : $wopi->getGuestDisplayname(),
			'email' => $email,
		];
		$watermarkTemplate = $this->appConfig->getAppValue('watermark_text');
		return preg_replace_callback('/{(.+?)}/', function ($matches) use ($replacements) {
			return $replacements[$matches[1]];
		}, $watermarkTemplate);
	}

}
