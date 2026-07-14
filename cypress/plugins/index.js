// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
const cypressSplit = require('cypress-split')
const webpackPreprocessor = require('@cypress/webpack-batteries-included-preprocessor')

module.exports = (on, config) => {
	cypressSplit(on, config)

	on('file:preprocessor', webpackPreprocessor())

	return config
}
