module.exports = {
	plugins: [
		"@babel/plugin-transform-modules-commonjs"
	],
	presets: [
		[
			'@babel/preset-env',
			{
				corejs: 3,
				useBuiltIns: 'entry',
			},
		],
	],
}
