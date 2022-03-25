<template>
	<div>
		<NcNoteCard v-if="!isConfigured" type="info">
			{{ t('richdocuments', 'Please configure a Collabora Online server to start editing documents') }}
		</NcNoteCard>

		<NcNoteCard v-if="isState(SETUP_HINTS.SERVER_STATE_LOADING)" type="info">
			<span class="icon icon-loading" /><span class="message">{{ t('richdocuments', 'Checking the existing configuration') }}</span>
		</NcNoteCard>

		<NcNoteCard v-else-if="isState(SETUP_HINTS.SERVER_STATE_UPDATING)" type="info">
			<span class="icon icon-loading" /><span class="message">{{ t('richdocuments', 'Setting new server URL and checking the configuration') }}</span>
		</NcNoteCard>

		<NcNoteCard v-if="isConnected" type="success">
			{{ t('richdocuments', 'Collabora Online server is reachable.') }}
		</NcNoteCard>

		<NcNoteCard v-if="isConfigured && !isConnected" type="error">
			{{ t('richdocuments', 'Could not establish connection to the Collabora Online server.') }}
			<p>{{ status.discovery.message }}</p>
			<span v-if="isNginx && serverMode === SERVER_MODE.BUILTIN">
				{{ t('richdocuments', 'This might be due to a missing configuration of your web server. For more information, please visit: ') }}
				<a title="Connecting Collabora Online Single Click with Nginx" class="external">{{ t('richdocuments', 'Connecting Collabora Online Single Click with Nginx') }}</a></span>
		</NcNoteCard>

		<NcNoteCard v-if="isConnected && !isCapabilitiesReachable" type="warning">
			{{ t('richdocuments', '/hosting/capabilities endpoint could not be reached') }}<br>
			{{ status.capabilities.message }}
		</NcNoteCard>

		<NcNoteCard v-if="isState(SETUP_HINTS.PROTOCOL_MISMATCH)" type="warning">
			{{ t('richdocuments', 'Collabora Online should use the same protocol as the server installation.') }}
		</NcNoteCard>
		<NcNoteCard v-if="isState(SETUP_HINTS.SERVER_STATE_CLIENT_CONNECTION_ERROR)" type="warning">
			{{ t('richdocuments', 'Collabora Online is not reachable from the browser.') }}
		</NcNoteCard>

		<NcNoteCard v-if="isConnected && !settings.wopi_allowlist" :heading="t('richdocuments', 'Configure WOPI allow list')" type="warning">
			{{ t('richdocuments', 'You have not configured the allow-list for WOPI requests. Without this setting users may download restricted files via WOPI requests to the Nextcloud server.') }}
			<a title="WOPI settings documentation"
				href="https://docs.nextcloud.com/server/latest/admin_manual/office/configuration.html#wopi-settings"
				target="_blank"
				rel="noopener"
				class="external">{{ t('richdocuments', 'Click here for more info') }}</a>
		</NcNoteCard>
	</div>
</template>

<script>

import { SETUP_HINTS, SERVER_MODE } from '../helpers/setupcheck.js'
import { NcNoteCard } from '@nextcloud/vue'

export default {
	name: 'SetupHints',
	components: {
		NcNoteCard,
	},
	props: {
		settings: {
			type: Object,
			required: true,
		},
		status: {
			type: Object,
			required: true,
		},
		serverError: {
			type: Number,
			required: true,
		},
		serverMode: {
			type: String,
			required: true,
		},
		isNginx: {
			type: Boolean,
			required: true,
		},
	},
	data() {
		return {
			SETUP_HINTS,
			SERVER_MODE,
		}
	},
	computed: {
		isState() {
			return (hint) => this.serverError === hint
		},
		isConfigured() {
			return this?.status?.configured
		},
		isConnected() {
			return this?.status?.configured && this?.status?.discovery?.status
		},
		isCapabilitiesReachable() {
			return this.status?.capabilities?.status
		},
	},
}
</script>
<style lang="scss" scoped>
.icon-loading {
	width: 44px;
	display: inline-block;
}
</style>
