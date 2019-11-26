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

import { getLanguage, getLocale } from 'nextcloud-l10n'
import { parse } from 'bcp-47'

const languageToBCP47 = () => {
	// loleaflet expects a BCP47 language tag syntax
	let language = getLanguage().replace(/^([a-z]{2}).*-([A-Z]{2})$/, (match, p1, p2) => p1)
	let locale = getLocale().replace(/^([a-z]{2}).*_([A-Z]{2})$/, (match, p1, p2) => p2.toLowerCase())
	let variant = null

	// special handling for formal german
	if (getLanguage() === 'de-DE') {
		language = 'de'
		variant = 'formal'
	}

	let tag = language + '-' + locale
	if (variant !== null) {
		tag += '-' + variant
	}
	const parsed = parse(tag)
	if (parsed.language !== null && parsed.region !== null) {
		return tag
	}

	return getLanguage()

}

const getNextcloudVersion = () => {
	return parseInt(OC.config.version.split('.')[0])
}

export {
	languageToBCP47,
	getNextcloudVersion
}
