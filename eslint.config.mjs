/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { recommendedJavascript } from '@nextcloud/eslint-config'
import pluginCypress from 'eslint-plugin-cypress'
import { defineConfig } from 'eslint/config'
import globals from 'globals'

export default defineConfig(
	...recommendedJavascript,

	// JSDoc blocks are not expected to be complete, only accurate
	{
		name: 'richdocuments/partial-jsdoc',
		rules: {
			'jsdoc/check-values': 'off',
			'jsdoc/require-param-description': 'off',
			'jsdoc/require-param-type': 'off',
			'jsdoc/require-property-description': 'off',
			'jsdoc/valid-types': 'off',
		},
	},

	// WOPI post message payloads and the config store are untyped by nature
	{
		name: 'richdocuments/untyped-payloads',
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
		},
	},

	// Levelled console output is intentional, stray `console.log` is not
	{
		name: 'richdocuments/console',
		rules: {
			'no-console': ['error', { allow: ['debug', 'warn', 'error'] }],
		},
	},

	// ts-loader rejects `.ts` import paths (TS5097) and cannot enable
	// `allowImportingTsExtensions`, which requires `noEmit`
	{
		name: 'richdocuments/ts-import-extensions',
		files: ['**/*.ts', '**/*.tsx'],
		rules: {
			'import-extensions/extensions': 'off',
		},
	},

	// Pre-existing single-word view components, renaming them is a breaking change
	{
		name: 'richdocuments/legacy-component-names',
		files: [
			'src/components/Modal/Confirmation.vue',
			'src/view/Office.vue',
			'src/view/Viewer.vue',
		],
		rules: {
			'vue/multi-word-component-names': 'off',
		},
	},

	{
		name: 'richdocuments/cypress',
		files: ['cypress/**/*.js'],
		extends: [pluginCypress.configs.globals],
	},

	// Build and tooling scripts are CommonJS and run in Node
	{
		name: 'richdocuments/scripts-are-cjs',
		files: ['webpack.js', '.stylelintrc.js', 'cypress/plugins/**/*.js'],
		languageOptions: {
			sourceType: 'commonjs',
			globals: { ...globals.node },
		},
		rules: {
			'no-console': 'off',
			'jsdoc/require-jsdoc': 'off',
		},
	},
)
