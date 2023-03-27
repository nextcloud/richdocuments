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

import axios from '@nextcloud/axios'
import { generateOcsUrl } from '@nextcloud/router'

export const createEmptyFile = async(mimeType, fileName, templateId = null) => {
	const shareToken = document.getElementById('sharingToken')?.value
	const directoryPath = document.getElementById('dir')?.value

	const response = await axios.post(generateOcsUrl('apps/richdocuments/api/v1', 2) + 'file', {
		mimeType,
		fileName,
		directoryPath,
		shareToken,
		templateId,
	})

	return response.data
}
