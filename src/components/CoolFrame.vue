<!-- CoolFrame.vue -->
<template>
	<div>
		<form ref="form"
			:action="formAction"
			method="post"
			:target="iframeName">
			<input type="hidden" name="access_token" :value="accessToken">
			<input type="hidden" name="access_token_ttl" :value="accessTokenTTL">
			<input type="hidden" name="wopi_setting_base_url" :value="wopiSettingBaseUrl">
			<!-- TODO: Include any other necessary hidden inputs -->
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

export default {
	name: 'CoolFrame',
	props: {
		endpoint: {
			type: String,
			required: true,
		},
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
	},
	data() {
		return {
			iframeName: 'coolFrameIframe',
			formAction: '',
		}
	},
	mounted() {
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
}
</script>

  <style scoped>
  .cool-frame-iframe {
    width: 100%;
    height: 600px;
    border: none;
  }
  </style>
