/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
module.exports = {
	root: true,
	globals: {
		t: true,
		n: true,
		OC: true,
		OCA: true,
		OCP: true,
		$: true,
		_: true,
	},
	extends: [
		'@nextcloud',
		'@nextcloud/eslint-config/typescript',
		'plugin:cypress/recommended',
	],
	env: {
		'cypress/globals': true,
	},
	rules: {
		'import/no-named-as-default-member': 'off',
		'jsdoc/check-values': 'off',
		'jsdoc/valid-types': 'off',
		'jsdoc/no-undefined-types': 'off',
		'jsdoc/require-param-description': 'off',
		'jsdoc/require-param-type': 'off',
		'jsdoc/require-property-description': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
	}
}
