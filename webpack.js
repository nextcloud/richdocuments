/**
 * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
const path = require('path')
const webpackConfig = require('@nextcloud/webpack-vue-config')
const webpackRules = require('@nextcloud/webpack-vue-config/rules')

const BabelLoaderExcludeNodeModulesExcept = require('babel-loader-exclude-node-modules-except')

webpackConfig.entry = {
	viewer: path.join(__dirname, 'src', 'viewer.js'),
	'init-viewer': path.join(__dirname, 'src', 'init-viewer.js'),
	fileActions: path.join(__dirname, 'src', 'file-actions.js'),
	document: path.join(__dirname, 'src', 'document.js'),
	admin: path.join(__dirname, 'src', 'admin.js'),
	personal: path.join(__dirname, 'src', 'personal.js'),
	reference: path.join(__dirname, 'src', 'reference.js'),
	public: path.join(__dirname, 'src', 'public.js'),
}

webpackRules.RULE_JS.test = /\.m?js$/
webpackRules.RULE_JS.exclude = BabelLoaderExcludeNodeModulesExcept([
	'@nextcloud/dialogs',
	'@nextcloud/event-bus',
])

// Replaces rules array
webpackConfig.module.rules = Object.values(webpackRules)

// Raw files rule
webpackConfig.module.rules.push({
	resourceQuery: /raw/,
	type: 'asset/source',
})

// Add typescript extension resolver
webpackConfig.resolve.extensions.push('.tsx')

// Export final config
module.exports = webpackConfig
