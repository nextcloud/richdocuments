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

import { generateCSSVarTokens, getCollaboraTheme, getUITheme } from '../helpers/coolParameters.js'
import { languageToBCP47 } from '../helpers/index.js'
import PostMessageService from '../services/postMessage.tsx'

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
			cssVariables: generateCSSVarTokens(true),
			isIframeLoaded: false,
			theme: getCollaboraTheme(),
			uiTheme: getUITheme(),
			postMessage: null,
		}
	},
	mounted() {
		this.postMessage = new PostMessageService({
			parent: window.parent,
		})
		this.postMessage.setTargetOrigins({ parent: window.location.origin })
		window.addEventListener('message', this.handlePostMessage)

		if (this.iframeUrl.length > 0) {
			this.formAction = this.iframeUrl + '?lang=' + languageToBCP47()
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
	beforeDestroy() {
		window.removeEventListener('message', this.handlePostMessage)
	},
	methods: {
		handlePostMessage(event) {
			try {
				if (this.iframeUrl && event.origin !== new URL(this.iframeUrl).origin) {
					return
				}

				// The embedded settings page posts a JSON string, so event.data is a
				// string here, not an object. Parse it before inspecting MessageId.
				let data = event.data
				if (typeof data === 'string') {
					try {
						data = JSON.parse(data)
					} catch (e) {
						return
					}
				}
				if (data && data.MessageId === 'Iframe_Height') {
					const iframe = document.getElementById(this.iframeName)
					const height = data.Values && data.Values.ContentHeight
					// Grow the iframe to the reported content height so it does not
					// show an inner scrollbar. Use style.height: the deprecated
					// height attribute ignores a "<n>px" value.
					if (iframe && height) {
						iframe.style.height = height
					}
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
    /* Fallback before the first Iframe_Height message sets the real height,
       so the iframe is not stuck at the 150px HTML default. */
    min-height: 800px;
    border: none;
	overflow-y: auto;
	box-sizing: border-box;
	padding: 0;
	margin: 0;
  }
  </style>
