<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Richdocuments\Tests\Listener;

use OCA\Richdocuments\AppConfig;
use OCA\Richdocuments\Listener\TagDeletedListener;
use OCP\EventDispatcher\Event;
use OCP\SystemTag\ISystemTag;
use OCP\SystemTag\ManagerEvent;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;

class TagDeletedListenerTest extends TestCase {
	private AppConfig|MockObject $appConfig;
	private TagDeletedListener $listener;

	protected function setUp(): void {
		parent::setUp();

		$this->appConfig = $this->createMock(AppConfig::class);

		$this->listener = new TagDeletedListener($this->appConfig);
	}

	private function deletionOf(string $tagId): ManagerEvent {
		return $this->tagEvent(ManagerEvent::EVENT_DELETE, $tagId);
	}

	private function tagEvent(string $eventName, string $tagId): ManagerEvent {
		$tag = $this->createMock(ISystemTag::class);
		$tag->method('getId')->willReturn($tagId);

		return new ManagerEvent($eventName, $tag);
	}

	private function configuredTagLists(array $allTags, array $linkTags): void {
		$this->appConfig->method('getAppValueArray')
			->willReturnMap([
				['watermark_allTagsList', $allTags],
				['watermark_linkTagsList', $linkTags],
			]);
	}

	public function testHandleRemovesTagFromBothLists(): void {
		$this->configuredTagLists(['1', '2', '3'], ['2', '4']);

		$written = [];
		$this->appConfig->expects(self::exactly(2))
			->method('setAppValue')
			->willReturnCallback(function (string $key, string $value) use (&$written): void {
				$written[$key] = $value;
			});

		$this->listener->handle($this->deletionOf('2'));

		self::assertSame([
			'watermark_allTagsList' => '1,3',
			'watermark_linkTagsList' => '4',
		], $written);
	}

	public function testHandleOnlyWritesTheListContainingTheTag(): void {
		$this->configuredTagLists(['1', '2', '3'], ['4']);

		$this->appConfig->expects(self::once())
			->method('setAppValue')
			->with('watermark_allTagsList', '1,3');

		$this->listener->handle($this->deletionOf('2'));
	}

	public function testHandleKeepsConfigUntouchedForUnusedTag(): void {
		$this->configuredTagLists(['1', '2'], ['3']);

		$this->appConfig->expects(self::never())
			->method('setAppValue');

		$this->listener->handle($this->deletionOf('4'));
	}

	public function testHandleWithoutConfiguredTagLists(): void {
		$this->configuredTagLists([], []);

		$this->appConfig->expects(self::never())
			->method('setAppValue');

		$this->listener->handle($this->deletionOf('1'));
	}

	public function testHandleIgnoresOtherTagManagerEvents(): void {
		$this->configuredTagLists(['1', '2'], ['1']);

		$this->appConfig->expects(self::never())
			->method('setAppValue');

		$this->listener->handle($this->tagEvent(ManagerEvent::EVENT_CREATE, '1'));
		$this->listener->handle($this->tagEvent(ManagerEvent::EVENT_UPDATE, '1'));
	}

	public function testHandleIgnoresUnrelatedEvent(): void {
		$this->appConfig->expects(self::never())
			->method('getAppValueArray');
		$this->appConfig->expects(self::never())
			->method('setAppValue');

		$this->listener->handle(new Event());
	}
}
