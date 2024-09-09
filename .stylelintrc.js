/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
const stylelintConfig = require('@nextcloud/stylelint-config')

stylelintConfig.rules['no-invalid-position-at-import-rule'] = null

stylelintConfig.rules['selector-pseudo-element-no-unknown'] = [
	true,
	{
		ignorePseudoElements: ['v-deep']
	}
]

module.exports = stylelintConfig
