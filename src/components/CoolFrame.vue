<!--
  - SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<div v-if="isIframeLoaded">
		<form ref="form"
			:action="formAction"
			method="post"
			:target="iframeName">
			<input type="hidden" name="access_token" :value="accessToken">
			<input type="hidden" name="access_token_ttl" :value="accessTokenTTL">
			<input type="hidden" name="wopi_setting_base_url" :value="wopiSettingBaseUrl">
			<input type="hidden" name="iframe_type" :value="iframeType">
			<input type="hidden" name="css_variables" :value="cssVariables">
		</form>
		<iframe :id="iframeName"
			:name="iframeName"
			class="cool-frame-iframe"
			:src="'about:blank'"
			frameborder="0"
			allowfullscreen />
	</div>
</template>

<script>

import { generateCSSVarTokens } from '../helpers/coolParameters.js'

export default {
	name: 'CoolFrame',
	props: {
		iframeUrl: {
			type: String,
			required: true,
		},
		accessToken: {
			type: String,
			required: true,
		},
		accessTokenTTL: {
			type: [String, Number],
			required: true,
		},
		wopiSettingBaseUrl: {
			type: String,
			required: true,
		},
		iframeType: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			iframeName: 'coolFrameIframe',
			formAction: '',
			cssVariables: generateCSSVarTokens(),
			isIframeLoaded: false,
		}
	},
	mounted() {
		if (this.iframeUrl.length > 0) {
			this.formAction = this.iframeUrl
			this.isIframeLoaded = true
		} else {
			return
		}
		console.debug('Form action URL generated')
		// Submit the form to load the iframe content
		this.$nextTick(() => {
			if (this.$refs.form) {
				this.$refs.form.submit()
			} else {
				console.error('Form reference not found')
			}
		})
	},
}
</script>

  <style scoped>
  .cool-frame-iframe {
    width: 100%;
    border: none;
	height: 60vh;
	overflow-y: auto;
  }
  </style>
