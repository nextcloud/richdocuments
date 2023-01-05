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
		'cypress/globals': true
	},
}
