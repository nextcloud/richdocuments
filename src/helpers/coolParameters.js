/**
 * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { loadState } from '@nextcloud/initial-state'

const getUIDefaults = () => {
	const defaults = loadState('richdocuments', 'uiDefaults', {})
	const statusBar = 'false'
	const textRuler = 'false'
	const sidebar = 'false'
	const saveAsMode = 'group'
	const uiMode = defaults.UIMode ?? 'notebookbar'

	let uiDefaults = 'TextRuler=' + textRuler + ';'
	uiDefaults += 'TextSidebar=' + sidebar + ';TextStatusbar=' + statusBar + ';'
	uiDefaults += 'PresentationSidebar=' + sidebar + ';PresentationStatusbar=' + statusBar + ';'
	uiDefaults += 'SpreadsheetSidebar=' + sidebar + ';SpreadsheetStatusbar=true;'
	uiDefaults += 'UIMode=' + uiMode + ';'
	uiDefaults += 'UITheme=' + getUITheme() + ';'
	uiDefaults += 'SaveAsMode=' + saveAsMode + ';'
	return uiDefaults
}

const getCollaboraTheme = () => {
	return loadState('richdocuments', 'theme', 'nextcloud')
}

const getUITheme = () => {
	const systemDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
	let dataset = {}
	try {
		dataset = (document.body.dataset.themes ? document.body.dataset : parent?.document.body.dataset) ?? {}
	} catch (e) {
		// Ignore errors here in case we run into cross-origin domains
	}
	const nextcloudDarkMode = dataset?.themeDark === '' || dataset?.themeDarkHighcontrast === ''
	const matchedDarkMode = (!dataset?.themes || dataset?.themes === '' || dataset?.themeDefault === '') ? systemDarkMode : nextcloudDarkMode
	return matchedDarkMode ? 'dark' : 'light'
}

const createDataThemeDiv = (elementType, theme) => {
	const element = document.createElement(elementType)
	element.setAttribute('id', 'cool-var-source-' + theme)
	element.setAttribute('data-theme-' + theme, '')
	document.body.appendChild(element)
	return element
}

const generateCSSVarTokens = (isSettingIframe = false) => {
	/* NC versus COOL */
	const cssVarMap = {
		'--color-primary-element-text': '--co-primary-text:--co-settings-btn-primary-text',
		'--color-primary-element': '--co-primary-element:--co-text-accent:--co-settings-btn-primary',
		'--color-primary-element-light': '--co-primary-light:--co-primary-element-light:--co-settings-btn-light',
		'--color-error': '--co-color-error',
		'--color-warning': '--co-color-warning',
		'--color-success': '--co-color-success',
		'--border-radius': '--co-border-radius',
		'--border-radius-large': '--co-border-radius-large',
		'--color-loading-light': '--co-loading-light',
		'--color-loading-dark': '--co-loading-dark',
		'--color-box-shadow': '--co-box-shadow',
		'--color-border': '--co-border:--co-settings-border',
		'--color-border-dark': '--co-border-dark:--co--settings-border-contrast',
		'--border-radius-pill': '--co-border-radius-pill',
		'--color-primary-element-light-text': '--co-settings-btn-light-text',
		'--color-main-text': '--co-settings-text',
		'--color-text-maxcontrast': '--co-settings-text-maxcontrast',
		'--color-main-background': '--co-settings-background',
		'--color-background-hover': '--co-settings-background-hover',
	}
	let str = ''
	const lightElement = createDataThemeDiv('div', 'light')
	const darkElement = createDataThemeDiv('div', 'dark')
	let selectedElement = lightElement

	// Note: To style the iframe properly, we send appropriate CSS variables based on the current theme.
	// For example, if the current theme is dark, we send values corresponding to the dark theme.
	if (isSettingIframe) {
		selectedElement = getUITheme() === 'dark' ? darkElement : lightElement
	}
	try {
		for (const cssVarKey in cssVarMap) {
			let cStyle = window.getComputedStyle(selectedElement).getPropertyValue(cssVarKey)
			if (!cStyle) {
				// try suffix -dark instead
				cStyle = window.getComputedStyle(selectedElement).getPropertyValue(cssVarKey + '-dark')
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

	if (isSettingIframe) {
		lightElement.remove()
		darkElement.remove()
		return str.replace(/["']/g, '\\\'')
	}

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

		if (lightStyle) str += varName.replace('--', '--nc-light-') + '=' + lightStyle.trim() + ';'
		if (darkStyle) str += varName.replace('--', '--nc-dark-') + '=' + darkStyle.trim() + ';'

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
		str += `--nc-custom-logo=${encodeURIComponent(customLogo)};`
	}

	const rootEl = document.querySelector(':root')

	const logoBgColor = window.getComputedStyle(rootEl).getPropertyValue('--nc-logo-background')
	str += '--nc-logo-background=' + (logoBgColor === '' ? 'transparent' : logoBgColor) + ';'

	const logoDisplay = window.getComputedStyle(rootEl).getPropertyValue('--nc-logo-display')
	if (logoDisplay) {
		str += `--nc-logo-display=${logoDisplay};`
	}

	return str.replace(/["']/g, '\\\'')
}

export {
	getUIDefaults,
	getCollaboraTheme,
	generateCSSVarTokens,
	getUITheme,
}
