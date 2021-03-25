module.exports = {
	globals: {
		t: true,
		n: true,
		OC: true,
		OCA: true,
		OCP: true,
		$: true,
		_: true,
		Vue: true,
		VueRouter: true,
	},
	extends: [
		'@nextcloud',
	],
	settings: {
		'import/resolver': {
			node: {
				paths: ['src'],
				extensions: ['.js', '.vue', '.ts', '.tsx'],
			},
		},
	},
}
