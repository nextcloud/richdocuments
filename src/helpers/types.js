
/*
 * @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
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

const ooxml = OC.getCapabilities()['richdocuments']['config']['doc_format'] === 'ooxml'

const getFileTypes = () => {
	if (ooxml) {
		return {
			document: {
				extension: 'docx',
				mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
			},
			spreadsheet: {
				extension: 'xlsx',
				mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
			},
			presentation: {
				extension: 'pptx',
				mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
			}
		}
	}
	return {
		document: {
			extension: 'odt',
			mime: 'application/vnd.oasis.opendocument.text'
		},
		spreadsheet: {
			extension: 'ods',
			mime: 'application/vnd.oasis.opendocument.spreadsheet'
		},
		presentation: {
			extension: 'odp',
			mime: 'application/vnd.oasis.opendocument.presentation'
		}
	}
}

const getFileType = (document) => {
	return getFileTypes()[document]
}

export default {
	getFileTypes,
	getFileType
}
