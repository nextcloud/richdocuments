const path = require('path')
const webpackConfig = require('@nextcloud/webpack-vue-config')
const webpackRules = require('@nextcloud/webpack-vue-config/rules')

const BabelLoaderExcludeNodeModulesExcept = require('babel-loader-exclude-node-modules-except')

webpackConfig.entry = {
	viewer: path.join(__dirname, 'src', 'viewer.js'),
	files: path.join(__dirname, 'src', 'files.js'),
	document: path.join(__dirname, 'src', 'document.js'),
	admin: path.join(__dirname, 'src', 'admin.js'),
	personal: path.join(__dirname, 'src', 'personal.js'),
}

webpackRules.RULE_JS.test = /\.m?js$/
webpackRules.RULE_JS.exclude = BabelLoaderExcludeNodeModulesExcept([
	'@nextcloud/dialogs',
	'@nextcloud/event-bus'
])

// Replaces rules array
webpackConfig.module.rules = Object.values(webpackRules)

// Add typescript rule
webpackConfig.module.rules.push({
	test: /\.tsx?$/,
	use: ['babel-loader', 'ts-loader'],
	exclude: /node_modules/
})

// Add typescript extension resolver
webpackConfig.resolve.extensions.push('.tsx')

// Export final config
module.exports = webpackConfig
