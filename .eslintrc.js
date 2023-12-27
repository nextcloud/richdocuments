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
	}
}
