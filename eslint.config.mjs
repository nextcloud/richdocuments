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
