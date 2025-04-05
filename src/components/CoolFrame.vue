<!--
  - SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<div>
		<form ref="form"
			:action="formAction"
			method="post"
			:target="iframeName">
			<input type="hidden" name="access_token" :value="accessToken">
			<input type="hidden" name="access_token_ttl" :value="accessTokenTTL">
			<input type="hidden" name="wopi_setting_base_url" :value="wopiSettingBaseUrl">
			<input type="hidden" name="iframe_type" :value="iframeType">
			<input type="hidden" name="css_variables" :value="cssVariables">
			<input type="hidden" name="theme" :value="theme">
			<input type="hidden" name="ui_theme" :value="uiTheme">
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

import { getCoolServerUrl } from '../helpers/url.js'
import { generateCSSVarTokens, getCollaboraTheme, getUITheme } from '../helpers/coolParameters.js'
import PostMessageService from '../services/postMessage.tsx'

export default {
	name: 'CoolFrame',
	props: {
		publicWopiUrl: {
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
			cssVariables: generateCSSVarTokens(true),
			theme: getCollaboraTheme(),
			uiTheme: getUITheme(),
			postMessage: null,
		}
	},
	mounted() {
		this.postMessage = new PostMessageService({
			parent: window.parent,
		})

		window.addEventListener('message', this.handlePostMessage)

		// Ensure publicWopiUrl is used to construct formAction
		if (this.publicWopiUrl) {
			this.formAction = getCoolServerUrl(this.publicWopiUrl)
			console.debug('Form action URL generated:', this.formAction)
		} else {
			console.error('wopiUrl prop is missing')
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
	beforeDestroy() {
		window.removeEventListener('message', this.handlePostMessage)
	},
	methods: {
		handlePostMessage(event) {
			try {
				const data = event.data
				if (data.MessageId === 'Iframe_Height') {
					document.getElementById(this.iframeName).height = data.Values.ContentHeight
				}
			} catch (e) {
				console.error('Something went wrong with post message', e)
			}
		},
	},

}
</script>

  <style scoped>
  .cool-frame-iframe {
    width: 100%;
    border: none;
		overflow-y: auto;
		box-sizing: border-box;
		padding: 0;
		margin: 0;
  }
  </style>
