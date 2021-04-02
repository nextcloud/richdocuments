/**
 * @copyright Copyright (c) 2013 Viktar Dubiniuk <dubiniuk@owncloud.com>
 *
 * @author Viktar Dubiniuk <dubiniuk@owncloud.com>
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

import Office from './view/Office'
import { getCapabilities } from '@nextcloud/capabilities'

const supportedMimes = getCapabilities().richdocuments.mimetypes

document.addEventListener('DOMContentLoaded', function(event) {
	// Only use it outside the files app for now
	if (typeof OCA !== 'undefined'
		&& typeof OCA.Files !== 'undefined'
		&& typeof OCA.Files.fileActions !== 'undefined'
	) {
		return
	}

	if (OCA.Viewer) {
		OCA.Viewer.registerHandler({
			id: 'richdocuments',
			group: null,
			mimes: supportedMimes,
			component: Office,
		})
	}
})
