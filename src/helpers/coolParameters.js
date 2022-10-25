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

import { loadState } from '@nextcloud/initial-state'

const getUIDefaults = () => {
	const defaults = loadState('richdocuments', 'uiDefaults', {})
	const statusBar = 'false'
	const textRuler = 'false'
	const sidebar = 'false'
	const saveAsMode = 'group'
	const uiMode = defaults.UIMode ?? 'classic' // or notebookbar

	let uiDefaults = 'TextRuler=' + textRuler + ';'
	uiDefaults += 'TextSidebar=' + sidebar + ';TextStatusbar=' + statusBar + ';'
	uiDefaults += 'PresentationSidebar=' + sidebar + ';PresentationStatusbar=' + statusBar + ';'
	uiDefaults += 'SpreadsheetSidebar=' + sidebar + ';SpreadsheetStatusbar=' + statusBar + ';'
	uiDefaults += 'UIMode=' + uiMode + ';'
	uiDefaults += 'SaveAsMode=' + saveAsMode + ';'
	return uiDefaults
}

const getCollaboraTheme = () => {
	return loadState('richdocuments', 'theme', '')
}

const generateCSSVarTokens = () => {
	/* NC versus COOL */
	const cssVarMap = {
		'--color-primary-text': '--co-primary-text',
		'--color-primary-element': '--co-primary-element:--co-text-accent',
		'--color-primary-light': '--co-primary-light',
		'--color-primary-element-light': '--co-primary-element-light',
		'--color-error': '--co-color-error',
		'--color-warning': '--co-color-warning',
		'--color-success': '--co-color-success',
		'--border-radius': '--co-border-radius',
		'--border-radius-large': '--co-border-radius-large',
		'--color-loading-light': '--co-loading-light',
		'--color-loading-dark': '--co-loading-dark',
		'--color-box-shadow': '--co-box-shadow',
		'--color-border': '--co-border',
		'--color-border-dark': '--co-border-dark',
		'--border-radius-pill': '--co-border-radius-pill',
	}

	const accessibilityCss = document.querySelector("link[href*='accessibility/css/user']")
	accessibilityCss && accessibilityCss.remove()

	let str = ''
	const element = document.getElementById('documents-content') ?? document.documentElement
	try {
		for (const cssVarKey in cssVarMap) {
			let cStyle = window.getComputedStyle(element).getPropertyValue(cssVarKey)
			if (!cStyle) {
				// try suffix -dark instead
				cStyle = window.getComputedStyle(element).getPropertyValue(cssVarKey + '-dark')
			}
			if (!cStyle) continue // skip if it is not set
			const varNames = cssVarMap[cssVarKey].split(':')
			for (let i = 0; i < varNames.length; ++i) {
				str += varNames[i] + '=' + cStyle.trim() + ';'
			}
		}
	} catch (e) {
		// Skip extracting css vars if we cannot access parent
	}

	const customLogo = loadState('richdocuments', 'theming-customLogo', false)
	if (customLogo) {
		str += ';--nc-custom-logo=' + window.OCA?.Theming?.cacheBuster ?? 0 + ';'
	}
	return str
}

export {
	getUIDefaults,
	getCollaboraTheme,
	generateCSSVarTokens,
}
