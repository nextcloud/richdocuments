/*
 * @copyright Copyright (c) 2020 Julius Härtl <jus@bitgrid.net>
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

import { getSearchParam } from '../helpers/url'

const preloadCreate = getSearchParam('richdocuments_create')
const preloadOpen = getSearchParam('richdocuments_open')
const Preload = {}

if (preloadCreate) {
	Preload.create = {
		type: getSearchParam('richdocuments_create'),
		filename: getSearchParam('richdocuments_filename')
	}
}

if (preloadOpen) {
	Preload.open = {
		filename: preloadOpen,
		id: getSearchParam('richdocuments_fileId'),
		dir: getSearchParam('dir')
	}
}

export default Preload
