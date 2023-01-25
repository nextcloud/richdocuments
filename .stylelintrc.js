const stylelintConfig = require('@nextcloud/stylelint-config')

stylelintConfig.rules['no-invalid-position-at-import-rule'] = null

stylelintConfig.rules['selector-pseudo-element-no-unknown'] = [
	true,
	{
		ignorePseudoElements: ['v-deep']
	}
]

module.exports = stylelintConfig
