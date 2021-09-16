<!--
  - @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
  -
  - @author Julius Härtl <jus@bitgrid.net>
  -
  - @license GNU AGPL version 3 or any later version
  -
  - This program is free software: you can redistribute it and/or modify
  - it under the terms of the GNU Affero General Public License as
  - published by the Free Software Foundation, either version 3 of the
  - License, or (at your option) any later version.
  -
  - This program is distributed in the hope that it will be useful,
  - but WITHOUT ANY WARRANTY; without even the implied warranty of
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  - GNU Affero General Public License for more details.
  -
  - You should have received a copy of the GNU Affero General Public License
  - along with this program. If not, see <http://www.gnu.org/licenses/>.
  -
  -->

<template>
	<div>
		<div class="section">
			<h2>Collabora Online</h2>
			<p>{{ t('richdocuments', 'Collabora Online is a powerful LibreOffice-based online office suite with collaborative editing, which supports all major documents, spreadsheet and presentation file formats and works together with all modern browsers.') }}</p>

			<div v-if="settings.wopi_url && settings.wopi_url !== ''">
				<div v-if="serverError == 2 && isNginx && serverMode === 'builtin'" id="security-warning-state-failure">
					<span class="icon icon-close-white" /><span class="message">{{ t('richdocuments', 'Could not establish connection to the Collabora Online server. This might be due to a missing configuration of your web server. For more information, please visit: ') }}<a title="Connecting Collabora Online Single Click with Nginx"
						href="https://www.collaboraoffice.com/online/connecting-collabora-online-single-click-with-nginx/"
						target="_blank"
						rel="noopener"
						class="external">{{ t('richdocuments', 'Connecting Collabora Online Single Click with Nginx') }}</a></span>
				</div>
				<div v-else-if="serverError == 2" id="security-warning-state-failure">
					<span class="icon icon-close-white" /><span class="message">{{ t('richdocuments', 'Could not establish connection to the Collabora Online server.') }}</span>
				</div>
				<div v-else-if="serverError == 1" id="security-warning-state-failure">
					<span class="icon icon-loading" /><span class="message">{{ t('richdocuments', 'Setting up a new server') }}</span>
				</div>
				<div v-else id="security-warning-state-ok">
					<span class="icon icon-checkmark-white" /><span class="message">{{ t('richdocuments', 'Collabora Online server is reachable.') }}</span>
				</div>
			</div>
			<div v-else id="security-warning-state-warning">
				<span class="icon icon-error-white" /><span class="message">{{ t('richdocuments', 'Please configure a Collabora Online server to start editing documents') }}</span>
			</div>

			<fieldset>
				<div>
					<input id="customserver"
						v-model="serverMode"
						type="radio"
						name="serverMode"
						value="custom"
						class="radio"
						:disabled="updating">
					<label for="customserver">{{ t('richdocuments', 'Use your own server') }}</label><br>
					<p class="option-inline">
						<em>{{ t('richdocuments', 'Collabora Online requires a seperate server acting as a WOPI-like Client to provide editing capabilities.') }}</em>
					</p>
					<div v-if="serverMode === 'custom'" class="option-inline">
						<form @submit.prevent.stop="updateServer">
							<p>
								<label for="wopi_url">{{ t('richdocuments', 'URL (and Port) of Collabora Online-server') }}</label><br>
								<input id="wopi_url"
									v-model="settings.wopi_url"
									type="text"
									:disabled="updating">
								<input type="submit" value="Save" :disabled="updating"><br>
							</p>
							<p>
								<input id="disable_certificate_verification"
									v-model="settings.disable_certificate_verification"
									type="checkbox"
									class="checkbox"
									:disabled="updating"
									@change="updateServer">
								<label for="disable_certificate_verification">{{ t('richdocuments', 'Disable certificate verification (insecure)') }}</label><br>
								<em>{{ t('Enable if your Collabora Online server uses a self signed certificate') }}</em>
							</p>
						</form>
					</div>
				</div>
				<div v-if="CODECompatible">
					<input id="builtinserver"
						v-model="serverMode"
						type="radio"
						name="serverMode"
						value="builtin"
						class="radio"
						:disabled="updating || !CODEInstalled"
						@click="setBuiltinServer">
					<label for="builtinserver">{{ t('richdocuments', 'Use the built-in CODE - Collabora Online Development Edition') }}</label><br>
					<p v-if="CODEInstalled" class="option-inline">
						<em>{{ t('richdocuments', 'Easy to install, for home use or small groups. A bit slower than a standalone server and without the advanced scalability features.') }}</em>
					</p>
					<div v-else>
						<p class="option-inline">
							<em>
								{{ t('richdocuments', 'This installation does not have a built in server.') }}
								<a :href="appUrl" target="_blank">{{ t('richdocuments', 'Install it from the App Store.') }}</a>
							</em>
						</p>
						<p class="option-inline-emphasized">
							{{ t('richdocuments', 'If the installation from the App Store fails, you can still do that manually using this command:') }}
							<tt>php -d memory_limit=512M occ app:install {{ CODEAppID }}</tt>
						</p>
					</div>
				</div>
				<div>
					<input id="demoserver"
						v-model="serverMode"
						type="radio"
						name="serverMode"
						value="demo"
						class="radio"
						:disabled="updating || hasHostErrors"
						@input="fetchDemoServers">
					<label for="demoserver">{{ t('richdocuments', 'Use a demo server') }}</label><br>
					<p class="option-inline">
						<em>{{ t('richdocuments', 'You can use a demo server provided by Collabora and other service providers for giving Collabora Online a try.') }}</em>
					</p>
					<div v-if="hasHostErrors" class="option-inline-emphasized">
						<p>{{ t('richdocuments', 'Your Nextcloud setup is not capable of connecting to the demo servers because:') }}</p>
						<ul>
							<li v-if="hostErrors[0]">
								{{ t('richdocuments', 'it is a local setup (localhost)') }}
							</li>
							<li v-if="hostErrors[1]">
								{{ t('richdocuments', 'it uses an insecure protocol (HTTP)') }}
							</li>
							<li v-if="hostErrors[2]">
								{{ t('richdocuments', 'it is unreachable from the internet (possibly because of a firewall, or lack of port forwarding)') }}
							</li>
						</ul><br>
						<p>
							{{ t('richdocuments', 'For use cases like this, we offer instructions for a') }} <a title="Quick tryout with Nextcloud docker"
								href="https://www.collaboraoffice.com/code/quick-tryout-nextcloud-docker/"
								target="_blank"
								rel="noopener"
								class="external">{{ t('richdocuments', 'Quick tryout with Nextcloud docker.') }}</a>
						</p>
					</div>
					<div v-if="serverMode === 'demo'" class="option-inline">
						<p v-if="demoServers === null">
							{{ t('richdocuments', 'Loading available demo servers …') }}
						</p>
						<p v-else-if="demoServers.length > 0">
							<Multiselect v-if="serverMode === 'demo'"
								v-model="settings.demoUrl"
								:custom-label="demoServerLabel"
								track-by="demo_url"
								label="demo_url"
								placeholder="Select a demo server"
								:options="demoServers"
								:searchable="false"
								:allow-empty="false"
								:disabled="updating"
								@input="setDemoServer" />
						</p>
						<p v-else>
							{{ t('richdocuments', 'No available demo servers found.') }}
						</p>

						<p v-if="settings.demoUrl">
							<em>
								{{ t('richdocuments', 'Documents opened with the demo server configured will be sent to a 3rd party server. Only use this for evaluating Collabora Online.') }}<br>
								<a :href="settings.demoUrl.provider_url"
									target="_blank"
									rel="noreferrer noopener"
									class="external">{{ providerDescription }}</a>
							</em>
						</p>
					</div>
				</div>
			</fieldset>
		</div>

		<Modal v-if="serverMode === 'demo' && !approvedDemoModal" @close="serverMode = 'custom'">
			<div class="modal__content">
				<p>{{ t('richdocuments', 'Please make sure you understand that the following will happen if you set up the Collabora Online demo.') }}</p>
				<ul>
					<li>{{ t('richdocuments', 'The service will send users documents to Collabora and/or third party demo servers.') }}</li>
					<li>{{ t('richdocuments', 'This service is not intended for production use, hence the documents will show tile watermarks.') }}</li>
					<li>{{ t('richdocuments', 'The demo service may be under heavy load, and its performance is not representative in any way of the performance of an on-premise installation.') }}</li>
					<li>{{ t('richdocuments', 'These servers are used for testing and development, and may run test versions of the software. As such they may crash, burn, and re-start without warning.') }}</li>
					<li>{{ t('richdocuments', 'The users documents will not be retained by a third party after their session completes except in exceptional circumstances. By using the service, the user gives permission for Collabora engineers to exceptionally use such document data, solely for the purpose of providing, optimizing and improving Collabora Online. Such document data will remain confidential to Collabora and/or any third party providing a demo server.') }}</li>
				</ul>
				<p>{{ t('richdocuments', 'At the first use and after an update, each user will get the warning, explaining all the above.') }}</p>
				<input type="button"
					class="primary"
					:value="t('richdocuments', 'I agree, and use the demo server')"
					@click="approvedDemoModal=true">
				<input type="button" :value="t('richdocuments', 'I will setup my own server')" @click="serverMode = 'custom'">
			</div>
		</Modal>

		<div v-if="isSetup" id="advanced-settings" class="section">
			<h2>{{ t('richdocuments', 'Advanced settings') }}</h2>
			<SettingsCheckbox :value="isOoxml"
				:label="t('richdocuments', 'Use Office Open XML (OOXML) instead of OpenDocument Format (ODF) by default for new files')"
				hint=""
				:disabled="updating"
				@input="updateOoxml" />

			<SettingsCheckbox :value="settings.use_groups !== null"
				:label="t('richdocuments', 'Restrict usage to specific groups')"
				:hint="t('richdocuments', 'Collabora Online is enabled for all users by default. When this setting is active, only members of the specified groups can use it.')"
				:disabled="updating"
				@input="updateUseGroups">
				<SettingsSelectGroup v-if="settings.use_groups !== null"
					v-model="settings.use_groups"
					:label="t('richdocuments', 'Select groups')"
					class="option-inline"
					:disabled="updating"
					@input="updateUseGroups" />
			</SettingsCheckbox>

			<SettingsCheckbox :value="settings.edit_groups !== null"
				:label="t('richdocuments', 'Restrict edit to specific groups')"
				hint="All users can edit documents with Collabora Online by default. When this setting is active, only the members of the specified groups can edit and the others can only view documents.')"
				:disabled="updating"
				@input="updateEditGroups">
				<SettingsSelectGroup v-if="settings.edit_groups !== null"
					v-model="settings.edit_groups"
					:label="t('richdocuments', 'Select groups')"
					class="option-inline"
					:disabled="updating"
					@input="updateEditGroups" />
			</SettingsCheckbox>

			<SettingsCheckbox v-model="uiVisible.canonical_webroot"
				:label="t('richdocuments', 'Use Canonical webroot')"
				hint=""
				:disabled="updating"
				@input="updateCanonicalWebroot">
				<SettingsInputText v-if="uiVisible.canonical_webroot"
					v-model="settings.canonical_webroot"
					label=""
					:hint="t('richdocuments', 'Canonical webroot, in case there are multiple, for Collabora to use. Provide the one with least restrictions. Eg: Use non-shibbolized webroot if this instance is accessed by both shibbolized and non-shibbolized webroots. You can ignore this setting if only one webroot is used to access this instance.')"
					:disabled="updating"
					class="option-inline"
					@update="updateCanonicalWebroot" />
			</SettingsCheckbox>

			<SettingsCheckbox v-model="uiVisible.external_apps"
				:label="t('richdocuments', 'Enable access for external apps')"
				hint=""
				:disabled="updating"
				@input="updateExternalApps">
				<div v-if="uiVisible.external_apps">
					<SettingsExternalApps class="option-inline"
						:external-apps="settings.external_apps"
						:disabled="updating"
						@input="updateExternalApps" />
				</div>
			</SettingsCheckbox>

			<SettingsInputText v-model="settings.wopi_allowlist"
				label="Allow list for WOPI requests"
				:hint="t('richdocuments', 'List of IPV4 and IPV6 IP-addresses and subnets that are allowed to perform requests of the WOPI endpoints. If no allow list is specified all hosts will be allowed. E.g. 10.0.0.20,10.0.4.0/24')"
				:disabled="updating"
				@update="updateWopiAllowlist" />
		</div>

		<div v-if="isSetup" id="secure-view-settings" class="section">
			<h2>{{ t('richdocuments', 'Secure view settings') }}</h2>
			<p>{{ t('richdocuments', 'Secure view enables you to secure documents by embedding a watermark') }}</p>
			<SettingsCheckbox v-model="settings.watermark.enabled"
				:label="t('richdocuments', 'Enable watermarking')"
				hint=""
				:disabled="updating"
				@input="update" />
			<SettingsInputText v-if="settings.watermark.enabled"
				v-model="settings.watermark.text"
				label="Watermark text"
				:hint="t('richdocuments', 'Supported placeholders: {userId}, {userDisplayName}, {email}, {date}, {themingName}')"
				:disabled="updating"
				@update="update" />
			<div v-if="settings.watermark.enabled">
				<SettingsCheckbox v-model="settings.watermark.allTags"
					:label="t('richdocuments', 'Show watermark on tagged files')"
					:disabled="updating"
					@input="update" />
				<p v-if="settings.watermark.allTags" class="checkbox-details">
					<SettingsSelectTag v-model="settings.watermark.allTagsList" :label="t('richdocuments', 'Select tags to enforce watermarking')" @input="update" />
				</p>
				<SettingsCheckbox v-model="settings.watermark.allGroups"
					:label="t('richdocuments', 'Show watermark for users of groups')"
					:disabled="updating"
					@input="update" />
				<p v-if="settings.watermark.allGroups" class="checkbox-details">
					<SettingsSelectGroup v-model="settings.watermark.allGroupsList" :label="t('richdocuments', 'Select tags to enforce watermarking')" @input="update" />
				</p>
				<SettingsCheckbox v-model="settings.watermark.shareAll"
					:label="t('richdocuments', 'Show watermark for all shares')"
					hint=""
					:disabled="updating"
					@input="update" />
				<SettingsCheckbox v-if="!settings.watermark.shareAll"
					v-model="settings.watermark.shareRead"
					:label="t('richdocuments', 'Show watermark for read only shares')"
					hint=""
					:disabled="updating"
					@input="update" />

				<h3>Link shares</h3>
				<SettingsCheckbox v-model="settings.watermark.linkAll"
					:label="t('richdocuments', 'Show watermark for all link shares')"
					hint=""
					:disabled="updating"
					@input="update" />
				<SettingsCheckbox v-if="!settings.watermark.linkAll"
					v-model="settings.watermark.linkSecure"
					:label="t('richdocuments', 'Show watermark for download hidden shares')"
					hint=""
					:disabled="updating"
					@input="update" />
				<SettingsCheckbox v-if="!settings.watermark.linkAll"
					v-model="settings.watermark.linkRead"
					:label="t('richdocuments', 'Show watermark for read only link shares')"
					hint=""
					:disabled="updating"
					@input="update" />
				<SettingsCheckbox v-if="!settings.watermark.linkAll"
					v-model="settings.watermark.linkTags"
					:label="t('richdocuments', 'Show watermark on link shares with specific system tags')"
					:disabled="updating"
					@input="update" />
				<p v-if="!settings.watermark.linkAll && settings.watermark.linkTags" class="checkbox-details">
					<SettingsSelectTag v-model="settings.watermark.linkTagsList" :label="t('richdocuments', 'Select tags to enforce watermarking')" @input="update" />
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import Multiselect from '@nextcloud/vue/dist/Components/Multiselect'
import Modal from '@nextcloud/vue/dist/Components/Modal'
import axios from '@nextcloud/axios'
import SettingsCheckbox from './SettingsCheckbox'
import SettingsInputText from './SettingsInputText'
import SettingsSelectTag from './SettingsSelectTag'
import SettingsSelectGroup from './SettingsSelectGroup'
import SettingsExternalApps from './SettingsExternalApps'
import { generateUrl } from '@nextcloud/router'

const SERVER_STATE_OK = 0
const SERVER_STATE_LOADING = 1
const SERVER_STATE_CONNECTION_ERROR = 2

export default {
	name: 'AdminSettings',
	components: {
		SettingsCheckbox,
		SettingsInputText,
		SettingsSelectTag,
		SettingsSelectGroup,
		Multiselect,
		SettingsExternalApps,
		Modal,
	},
	props: {
		initial: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			serverMode: '',
			serverError: Object.values(OC.getCapabilities().richdocuments.collabora).length > 0 ? SERVER_STATE_OK : SERVER_STATE_CONNECTION_ERROR,
			hostErrors: [window.location.host === 'localhost' || window.location.host === '127.0.0.1', window.location.protocol !== 'https:', false],
			demoServers: null,
			CODEInstalled: 'richdocumentscode' in OC.appswebroots,
			CODECompatible: true,
			CODEAppID: 'richdocumentscode',
			isNginx: false,
			appUrl: OC.generateUrl('/settings/apps/app-bundles/richdocumentscode'),
			approvedDemoModal: false,
			updating: false,
			groups: [],
			tags: [],
			uiVisible: {
				canonical_webroot: false,
				external_apps: false,
			},
			settings: {
				demoUrl: null,
				wopi_url: null,
				watermark: {
					enabled: false,
					shareAll: false,
					shareRead: false,
					linkSecure: false,
					linkRead: false,
					linkAll: false,
					linkTags: false,
					linkTagsList: [],
					allGroups: false,
					allGroupsList: [],
					allTags: false,
					allTagsList: [],
					text: '',
				},
			},
		}
	},
	computed: {
		providerDescription() {
			return t('richdocuments', 'Contact {0} to get an own installation.', [this.settings.demoUrl.provider_name])
		},
		isSetup() {
			return this.serverError === SERVER_STATE_OK
		},
		isOoxml() {
			return this.settings.doc_format === 'ooxml'
		},
		hasHostErrors() {
			return this.hostErrors.some(x => x)
		},
	},
	beforeMount() {
		for (const key in this.initial.settings) {
			if (!Object.prototype.hasOwnProperty.call(this.initial.settings, key)) {
				continue
			}

			const [parent, setting] = key.split('_')
			if (parent === 'watermark') {
				Vue.set(this.settings[parent], setting, this.initial.settings[key])
			} else {
				Vue.set(this.settings, key, this.initial.settings[key])
			}

		}
		Vue.set(this.settings, 'data', this.initial.settings)
		if (this.settings.wopi_url === '') {
			this.serverError = SERVER_STATE_CONNECTION_ERROR
		}
		Vue.set(this.settings, 'edit_groups', this.settings.edit_groups ? this.settings.edit_groups.split('|') : null)
		Vue.set(this.settings, 'use_groups', this.settings.use_groups ? this.settings.use_groups.split('|') : null)

		this.uiVisible.canonical_webroot = !!(this.settings.canonical_webroot && this.settings.canonical_webroot !== '')
		this.uiVisible.external_apps = !!(this.settings.external_apps && this.settings.external_apps !== '')

		this.demoServers = this.initial.demo_servers

		if (this.initial.web_server && this.initial.web_server.length > 0) {
			this.isNginx = this.initial.web_server.indexOf('nginx') !== -1
		}
		if (this.initial.os_family && this.initial.os_family.length > 0) {
			this.CODECompatible = this.CODECompatible && this.initial.os_family === 'Linux'
		}
		if (this.initial.platform && this.initial.platform.length > 0) {
			const supportedArchs = ['x86_64', 'aarch64']
			this.CODECompatible = this.CODECompatible && supportedArchs.includes(this.initial.platform)
		}
		if (this.initial.platform && this.initial.platform === 'aarch64') {
			this.appUrl = OC.generateUrl('/settings/apps/app-bundles/richdocumentscode_arm64')
			this.CODEInstalled = 'richdocumentscode_arm64' in OC.appswebroots
			this.CODEAppID = 'richdocumentscode_arm64'
		}
		this.checkIfDemoServerIsActive()
	},
	methods: {
		async fetchDemoServers() {
			try {
				const result = await axios.get(generateUrl('/apps/richdocuments/settings/demo'))
				this.demoServers = result.data
			} catch (e) {
				this.demoServers = []
			}
		},
		update() {
			this.updating = true
			const settings = this.settings
			axios.post(generateUrl('/apps/richdocuments/settings/watermark'), { settings }).then((response) => {
				this.updating = false
			}).catch((error) => {
				this.updating = false
				OC.Notification.showTemporary(t('richdocuments', 'Failed to save settings'))
				console.error(error)
			})
		},
		async updateUseGroups(enabled) {
			if (enabled) {
				this.settings.use_groups = enabled === true ? [] : enabled
			} else {
				this.settings.use_groups = null
			}
			await this.updateSettings({
				use_groups: this.settings.use_groups !== null ? this.settings.use_groups.join('|') : '',
			})
		},
		async updateEditGroups(enabled) {
			if (enabled) {
				this.settings.edit_groups = enabled === true ? [] : enabled
			} else {
				this.settings.edit_groups = null
			}
			await this.updateSettings({
				edit_groups: this.settings.edit_groups !== null ? this.settings.edit_groups.join('|') : '',
			})
		},
		async updateCanonicalWebroot(canonicalWebroot) {
			this.settings.canonical_webroot = (typeof canonicalWebroot === 'boolean') ? '' : canonicalWebroot
			if (canonicalWebroot === true) {
				return
			}
			await this.updateSettings({
				canonical_webroot: this.settings.canonical_webroot,
			})
		},
		async updateExternalApps(externalApps) {
			this.settings.external_apps = (typeof externalApps === 'boolean') ? '' : externalApps
			if (externalApps === true) {
				return
			}
			await this.updateSettings({
				external_apps: this.settings.external_apps,
			})
		},
		async updateWopiAllowlist(allowlist) {
			await this.updateSettings({
				wopi_allowlist: allowlist,
			})
		},
		async updateOoxml(enabled) {
			this.settings.doc_format = enabled ? 'ooxml' : ''
			await this.updateSettings({
				doc_format: this.settings.doc_format,
			})
		},
		async updateServer() {
			this.serverError = SERVER_STATE_LOADING
			try {
				await this.updateSettings({
					wopi_url: this.settings.wopi_url,
					disable_certificate_verification: this.settings.disable_certificate_verification,
				})
				this.serverError = SERVER_STATE_OK
			} catch (e) {
				console.error(e)
				this.serverError = SERVER_STATE_CONNECTION_ERROR
				if (e.response.data.hint === 'missing_capabilities') {
					OCP.Toast.warning('Could not connect to the /hosting/capabilities endpoint. Please check if your webserver configuration is up to date.')
				}
			}
			this.checkIfDemoServerIsActive()
		},
		async updateSettings(data) {
			this.updating = true
			try {
				const result = await axios.post(
					OC.filePath('richdocuments', 'ajax', 'admin.php'),
					data
				)
				this.updating = false
				return result
			} catch (e) {
				this.updating = false
				throw e
			}
		},
		checkIfDemoServerIsActive() {
			this.settings.demoUrl = this.demoServers ? this.demoServers.find((server) => server.demo_url === this.settings.wopi_url) : null
			this.settings.CODEUrl = this.CODEInstalled ? window.location.protocol + '//' + window.location.host + OC.filePath(this.CODEAppID, '', '') + 'proxy.php?req=' : null
			if (this.settings.wopi_url && this.settings.wopi_url !== '') {
				this.serverMode = 'custom'
			}
			if (this.settings.demoUrl) {
				this.serverMode = 'demo'
				this.approvedDemoModal = true
			} else if (this.settings.CODEUrl && this.settings.CODEUrl === this.settings.wopi_url) {
				this.serverMode = 'builtin'
			}
		},
		demoServerLabel(server) {
			return `${server.provider_name} — ${server.provider_location}`
		},
		async setDemoServer(server) {
			this.settings.wopi_url = server.demo_url
			this.settings.disable_certificate_verification = false
			await this.updateServer()
		},
		async setBuiltinServer() {
			this.settings.wopi_url = this.settings.CODEUrl
			this.settings.disable_certificate_verification = false
			await this.updateServer()
		},
	},
}
</script>

<style lang="scss" scoped>
	p {
		margin-bottom: 15px;
	}

	p.checkbox-details {
		margin-left: 25px;
		margin-top: -10px;
		margin-bottom: 20px;
	}

	input[type='text'],
	.multiselect {
		width: 100%;
		max-width: 400px;
	}

	input#wopi_url {
		width: 300px;
	}

	#secure-view-settings {
		margin-top: 20px;
	}

	.section {
		border-bottom: 1px solid var(--color-border);
	}

	#security-warning-state-failure,
	#security-warning-state-warning,
	#security-warning-state-ok {
		margin-top: 10px;
		margin-bottom: 20px;
	}

	.option-inline {
		margin-left: 25px;
		&:not(.multiselect) {
			margin-top: 10px;
		}
	}

	.option-inline-emphasized {
		margin-left: 25px;
		&:not(.multiselect) {
			margin-top: 10px;
			font-style: italic;
		}

		ul {
			margin-bottom: 15px;
		}

		li {
			list-style: disc;
			padding: 3px;
			margin-left: 20px;
		}
	}

	.modal__content {
		margin: 20px;
		overflow: scroll;
		max-width: 600px;

		ul {
			margin-bottom: 15px;
		}

		li {
			list-style: disc;
			padding: 3px;
			margin-left: 20px;
		}

		button {
			float: right;
		}
	}
</style>
