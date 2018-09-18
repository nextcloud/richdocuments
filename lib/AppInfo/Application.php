<?php
/**
 * @copyright Copyright (c) 2016 Lukas Reschke <lukas@statuscode.ch>
 *
 * @author Lukas Reschke <lukas@statuscode.ch>
 * @author Roeland Jago Douma <roeland@famdouma.nl>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\Richdocuments\AppInfo;

use OCA\Richdocuments\Capabilities;
use OCA\Richdocuments\Preview\MSExcel;
use OCA\Richdocuments\Preview\MSWord;
use OCA\Richdocuments\Preview\OOXML;
use OCA\Richdocuments\Preview\OpenDocument;
use OCP\AppFramework\App;
use OCP\IPreview;

class Application extends App {

	const APPNAME = 'richdocuments';

	public function __construct(array $urlParams = array()) {
		parent::__construct(self::APPNAME, $urlParams);

		$this->getContainer()->registerCapability(Capabilities::class);
	}

	public function registerProvider() {
		$container = $this->getContainer();

		/** @var IPreview $previewManager */
		$previewManager = $container->query(IPreview::class);

		$previewManager->registerProvider('/application\/vnd.ms-excel/', function() use ($container) {
			return $container->query(MSExcel::class);
		});

		$previewManager->registerProvider('/application\/msword/', function() use ($container) {
			return $container->query(MSWord::class);
		});

		$previewManager->registerProvider('/application\/vnd.openxmlformats-officedocument.*/', function() use ($container) {
			return $container->query(OOXML::class);
		});

		// \OC::$server->getLogger()->debug('==== Richdocuments Application registerProvider: calling manager registerProvider:');
		$previewManager->registerProvider('/application\/vnd.oasis.opendocument.*/', function() use ($container) {
			// \OC::$server->getLogger()->debug('==== Richdocuments Application registerProvider lambda. OpenDocument::class=' . OpenDocument::class);
			return $container->query(OpenDocument::class);
		});

	}
}
