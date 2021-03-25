const { merge } = require('webpack-merge')
const path = require('path')

const webpackConfig = require('@nextcloud/webpack-vue-config')
const BabelLoaderExcludeNodeModulesExcept = require('babel-loader-exclude-node-modules-except')

const config = {
	entry: {
		viewer: path.join(__dirname, 'src', 'viewer.js'),
		files: path.join(__dirname, 'src', 'files.js'),
		document: path.join(__dirname, 'src', 'document.js'),
		admin: path.join(__dirname, 'src', 'admin.js'),
		personal: path.join(__dirname, 'src', 'personal.js'),
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: BabelLoaderExcludeNodeModulesExcept([
					'@nextcloud/dialogs',
					'@nextcloud/event-bus'
				]),
			},
			{
				test: /\.tsx?$/,
				use: ['babel-loader', 'ts-loader'],
				exclude: /node_modules/
			},
		],
	},
	resolve: {
		extensions: ['*', '.js', '.vue', '.json', '.tsx']
	}
}

const mergedConfigs = merge(config, webpackConfig)

// Remove duplicate rules by the `test` key
mergedConfigs.module.rules = mergedConfigs.module.rules.filter((v, i, a) => a.findIndex(t => (t.test.toString() === v.test.toString())) === i)

// Merge rules by replacing existing tests
module.exports = mergedConfigs
