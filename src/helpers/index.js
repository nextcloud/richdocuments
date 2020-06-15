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

import { getLanguage, getLocale } from '@nextcloud/l10n'

const languageToBCP47 = () => {
	let language = getLanguage().replace(/_/g, '-')
	let locale = getLocale()

	// German formal should just be treated as 'de'
	if (language === 'de-DE') {
		language = 'de'
	}
	// special case where setting the bc47 region depending on the locale setting makes sense
	const whitelist = {
		de: {
			'de_CH': 'de-CH',
			'gsw': 'de-CH',
			'gsw_CH': 'de-CH'
		}
	}
	const matchingWhitelist = whitelist[language]
	if (typeof matchingWhitelist !== 'undefined' && typeof matchingWhitelist[locale] !== 'undefined') {
		return matchingWhitelist[locale]
	}

	// loleaflet expects a BCP47 language tag syntax
	// when a the nextcloud language constist of two parts we sent both
	// as the region is then provided by the language setting
	return language
}

const getNextcloudVersion = () => {
	return parseInt(OC.config.version.split('.')[0])
}

export {
	languageToBCP47,
	getNextcloudVersion
}
