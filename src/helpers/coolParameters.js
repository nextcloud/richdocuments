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
	const uiMode = defaults.UIMode ?? 'notebookbar'

	const systemDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
	const dataset = (document.body.dataset.themes ? document.body.dataset : parent?.document.body.dataset) ?? {}
	const nextcloudDarkMode = dataset?.themeDark === '' || dataset?.themeDarkHighcontrast === ''
	const matchedDarkMode = (!dataset?.themes || dataset?.themes === '' || dataset?.themeDefault === '') ? systemDarkMode : nextcloudDarkMode
	const uiTheme = matchedDarkMode ? 'dark' : 'light'

	let uiDefaults = 'TextRuler=' + textRuler + ';'
	uiDefaults += 'TextSidebar=' + sidebar + ';TextStatusbar=' + statusBar + ';'
	uiDefaults += 'PresentationSidebar=' + sidebar + ';PresentationStatusbar=' + statusBar + ';'
	uiDefaults += 'SpreadsheetSidebar=' + sidebar + ';SpreadsheetStatusbar=true;'
	uiDefaults += 'UIMode=' + uiMode + ';'
	uiDefaults += 'UITheme=' + uiTheme + ';'
	uiDefaults += 'SaveAsMode=' + saveAsMode + ';'
	return uiDefaults
}

const getCollaboraTheme = () => {
	return loadState('richdocuments', 'theme', 'nextcloud')
}

const createDataThemeDiv = (elementType, theme) => {
	const element = document.createElement(elementType)
	element.setAttribute('id', 'cool-var-source-' + theme)
	element.setAttribute('data-theme-' + theme, '')
	document.body.appendChild(element)
	return element
}
const generateCSSVarTokens = () => {
	/* NC versus COOL */
	const cssVarMap = {
		'--color-primary-element-text': '--co-primary-text',
		'--color-primary-element': '--co-primary-element:--co-text-accent',
		'--color-primary-element-light': '--co-primary-light:--co-primary-element-light',
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
	let str = ''
	const lightElement = createDataThemeDiv('div', 'light')
	try {
		for (const cssVarKey in cssVarMap) {
			let cStyle = window.getComputedStyle(lightElement).getPropertyValue(cssVarKey)
			if (!cStyle) {
				// try suffix -dark instead
				cStyle = window.getComputedStyle(lightElement).getPropertyValue(cssVarKey + '-dark')
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

	// New dark mode compatible way to hand over our Nextcloud variables in both light/dark to Collabora
	const darkElement = createDataThemeDiv('div', 'dark')

	const handover = [
		'--color-main-background',
		'--color-main-background-rgb',
		'--color-main-background-translucent',
		'--color-main-background-blur',
		'--color-main-text',
		'--color-text-maxcontrast',
		'--color-box-shadow',
		'--color-box-shadow-rgb',
		'--default-font-size',
		'--border-radius',
		'--border-radius-large',
		'--border-radius-rounded',
		'--border-radius-pill',
		'--default-clickable-area',
		'--default-line-height',
		'--default-grid-baseline',
		'--color-primary',
		'--color-primary-default',
		'--color-primary-text',
		'--color-primary-hover',
		'--color-primary-light',
		'--color-primary-light-text',
		'--color-primary-light-hover',
		'--color-primary-element',
		'--color-primary-element-hover',
		'--color-primary-element-text',
		'--color-primary-element-light',
		'--color-primary-element-light-hover',
		'--color-primary-element-light-text',
		'--color-primary-element-text-dark',
		'--primary-invert-if-bright',
		'--background-invert-if-bright',
		'--background-invert-if-dark',
	]
	for (const i in handover) {
		const varName = handover[i]

		const lightStyle = window.getComputedStyle(lightElement).getPropertyValue(varName)
		const darkStyle = window.getComputedStyle(darkElement).getPropertyValue(varName)

		str += varName.replace('--', '--nc-light-') + '=' + lightStyle.trim() + ';'
		str += varName.replace('--', '--nc-dark-') + '=' + darkStyle.trim() + ';'

		// Workaround for now as we need primary-invert-if-dark which is not available on server yet
		if (varName === '--primary-invert-if-bright') {
			if (lightStyle.trim() === 'no') {
				str += '--nc-light-primary-invert-if-dark=invert(1);'
				str += '--nc-dark-primary-invert-if-dark=invert(1);'
			} else {
				str += '--nc-light-primary-invert-if-dark=no;'
				str += '--nc-dark-primary-invert-if-dark=no;'
			}
		}
	}
	// cleanup theme elements after extracting property values
	lightElement.remove()
	darkElement.remove()
	const customLogo = loadState('richdocuments', 'theming-customLogo', false)
	if (customLogo) {
		str += `--nc-custom-logo=${window.OCA?.Theming?.cacheBuster ?? 0};`
	}

	const rootEl = document.querySelector(':root')

	const logoBgColor = window.getComputedStyle(rootEl).getPropertyValue('--nc-logo-background')
	str += '--nc-logo-background=' + (logoBgColor === '' ? 'transparent' : logoBgColor) + ';'

	const logoDisplay = window.getComputedStyle(rootEl).getPropertyValue('--nc-logo-display')
	str += '--nc-logo-display=' + (logoDisplay === '' ? 'block' : logoDisplay) + ';'

	return str.replace(/["']/g, '\\\'')
}

export {
	getUIDefaults,
	getCollaboraTheme,
	generateCSSVarTokens,
}
