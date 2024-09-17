/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { getLanguage, getLocale } from '@nextcloud/l10n'

const languageToBCP47 = () => {
	let language = getLanguage().replace(/_/g, '-')
	const locale = getLocale()

	// German formal should just be treated as 'de'
	if (language === 'de-DE') {
		language = 'de'
	}

	// es-419 should be mapped as this is not considered a valid locale string in COOL
	if (language === 'es-419') {
		language = 'es-MX'
	}

	// Australia
	if (language === 'en-GB' && locale === 'en_AU') {
		language = 'en-AU'
	}

	// special case where setting the bc47 region depending on the locale setting makes sense
	const whitelist = {
		de: {
			de_CH: 'de-CH',
			gsw: 'de-CH',
			gsw_CH: 'de-CH',
		},
		fr: {
			fr_CH: 'fr-CH',
		},
		it: {
			it_CH: 'it-CH',
		},
	}
	const matchingWhitelist = whitelist[language]
	if (typeof matchingWhitelist !== 'undefined' && typeof matchingWhitelist[locale] !== 'undefined') {
		return matchingWhitelist[locale]
	}

	// Collabora Online expects BCP47 language tag syntax.
	// When the Nextcloud language consists of two parts, we send both,
	// as the region is then provided by the language setting.
	return language
}

const getNextcloudVersion = () => {
	return parseInt(OC.config.version.split('.')[0])
}

const splitPath = (path) => {
	const fileName = path.split('\\').pop().split('/').pop()
	const directory = path.slice(0, -fileName.length - 1)
	return [directory, fileName]
}

const getRandomId = (length = 5) => {
	return Math.random()
		.toString(36)
		.replace(/[^a-z]+/g, '')
		.slice(0, length || 5)

}

export {
	languageToBCP47,
	getNextcloudVersion,
	splitPath,
	getRandomId,
}

export { default as isDocument } from './isDocument.js'
export { default as isPdf } from './isPdf.js'
export { default as isDownloadHidden } from './isDownloadHidden.js'
