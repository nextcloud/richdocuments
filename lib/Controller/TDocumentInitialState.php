<?php
/*
 * @copyright Copyright (c) 2021 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

declare(strict_types=1);

namespace OCA\Richdocuments\Controller;

use OCA\Richdocuments\AppInfo\Application;
use OCA\Richdocuments\Db\Wopi;

trait TDocumentInitialState {

	private function provideDocumentInitialState(Wopi $wopi): void {
		$this->initialState->provideInitialState('wopi', $wopi);
		$this->initialState->provideInitialState('theme', $this->config->getAppValue(Application::APPNAME, 'theme', 'nextcloud'));
		$this->initialState->provideInitialState('uiDefaults', [
			'UIMode' => $this->config->getAppValue(Application::APPNAME, 'uiDefaults-UIMode', 'classic')
		]);
		$logoSet = $this->config->getAppValue('theming', 'logoheaderMime', '') !== '';
		if (!$logoSet) {
			$logoSet = $this->config->getAppValue('theming', 'logoMime', '') !== '';
		}
		$this->initialState->provideInitialState('theming-customLogo', ($logoSet ?
			\OC::$server->getURLGenerator()->getAbsoluteURL(\OC::$server->getThemingDefaults()->getLogo())
			: false));
	}

}
