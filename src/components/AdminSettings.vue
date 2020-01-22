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

			<div v-if="settings.wopi_url !== ''">
				<div v-if="serverError == 2" id="security-warning-state-failure">
					<span class="icon icon-close-white" /><span class="message">Could not establish connection to the Collabora Online server.</span>
				</div>
				<div v-else-if="serverError == 1" id="security-warning-state-failure">
					<span class="icon icon-loading" /><span class="message">Settings new server</span>
				</div>
				<div v-else id="security-warning-state-ok">
					<span class="icon icon-checkmark-white" /><span class="message">Collabora Online server is reachable.</span>
				</div>
			</div>
			<div v-else id="security-warning-state-warning">
				<span class="icon icon-error-white" /><span class="message">Please configure a Collabora Online server to start editing documents</span>
			</div>

			<fieldset>
				<div>
					<input id="customserver" v-model="serverMode" type="radio"
						name="serverMode" value="custom" class="radio"
						:disabled="updating">
					<label for="customserver">Use your own server</label><br>
					<p class="option-inline">
						<em>{{ t('richdocuments', 'Collabora Online requires a seperate server acting as a WOPI-like Client to provide editing capabilities.') }}</em>
					</p>
					<div v-if="serverMode === 'custom'" class="option-inline">
						<form @submit="updateServer">
							<p>
								<label for="wopi_url">URL (and Port) of Collabora Online-server</label><br>
								<input id="wopi_url" v-model="settings.wopi_url" type="text"
									:disabled="updating">
								<input type="submit" value="Save" :disabled="updating"
									@click="updateServer"><br>
							</p>
							<p>
								<input id="disable_certificate_verification" v-model="settings.disable_certificate_verification" type="checkbox"
									class="checkbox" :disabled="updating" @change="updateServer">
								<label for="disable_certificate_verification">{{ t('richdocuments', 'Disable certificate verification (insecure)') }}</label><br>
								<em>{{ t('Enable if your Collabora Online server uses a self signed certificate') }}</em>
							</p>
						</form>
					</div>
				</div>
				<div>
					<input id="demoserver" v-model="serverMode" type="radio"
						name="serverMode" value="demo" class="radio"
						:disabled="updating">
					<label for="demoserver">Use a demo server</label><br>
					<div class="option-inline">
						<p><em>{{ t('richdocuments', 'You can use a demo server provided by Collabora and other service providers for giving Collabora Online a try.') }}</em></p>
						<p>
							<multiselect v-if="serverMode === 'demo'" v-model="settings.demoUrl" :custom-label="demoServerLabel"
								track-by="demo_url" label="demo_url" placeholder="Select a demo server"
								:options="demoServers" :searchable="false" :allow-empty="false"
								:disabled="updating" @input="setDemoServer" />
						</p>
					</div>
				</div>
			</fieldset>
		</div>

		<div id="secure-view-settings" class="section">
			<h2>{{ t('richdocuments', 'Secure view settings') }}</h2>
			<p>{{ t('richdocuments', 'Secure view enables you to secure documents by embedding a watermark') }}</p>
			<settings-checkbox v-model="settings.watermark.enabled" label="Enable watermarking" hint=""
				:disabled="updating" @input="update" />
			<settings-input-text v-if="settings.watermark.enabled" v-model="settings.watermark.text" label="Watermark text"
				:hint="t('richdocuments', 'Supported placeholders: {userId}, {date}')"
				:disabled="updating" @update="update" />
			<div v-if="settings.watermark.enabled">
				<settings-checkbox v-model="settings.watermark.allTags" label="Show watermark on tagged files" :disabled="updating"
					@input="update" />
				<p v-if="settings.watermark.allTags" class="checkbox-details">
					<settings-select-tag v-model="settings.watermark.allTagsList" label="Select tags to enforce watermarking" @input="update" />
				</p>
				<settings-checkbox v-model="settings.watermark.allGroups" label="Show watermark for users of groups" :disabled="updating"
					@input="update" />
				<p v-if="settings.watermark.allGroups" class="checkbox-details">
					<settings-select-group v-model="settings.watermark.allGroupsList" label="Select tags to enforce watermarking" @input="update" />
				</p>
				<settings-checkbox v-model="settings.watermark.shareAll" label="Show watermark for all shares" hint=""
					:disabled="updating" @input="update" />
				<settings-checkbox v-if="!settings.watermark.shareAll" v-model="settings.watermark.shareRead" label="Show watermark for read only shares"
					hint=""
					:disabled="updating" @input="update" />

				<h3>Link shares</h3>
				<settings-checkbox v-model="settings.watermark.linkAll" label="Show watermark for all link shares" hint=""
					:disabled="updating" @input="update" />
				<settings-checkbox v-if="!settings.watermark.linkAll" v-model="settings.watermark.linkSecure" label="Show watermark for download hidden shares"
					hint=""
					:disabled="updating" @input="update" />
				<settings-checkbox v-if="!settings.watermark.linkAll" v-model="settings.watermark.linkRead" label="Show watermark for read only link shares"
					hint=""
					:disabled="updating" @input="update" />
				<settings-checkbox v-if="!settings.watermark.linkAll" v-model="settings.watermark.linkTags" label="Show watermark on link shares with specific system tags"
					:disabled="updating" @input="update" />
				<p v-if="!settings.watermark.linkAll && settings.watermark.linkTags" class="checkbox-details">
					<settings-select-tag v-model="settings.watermark.linkTagsList" label="Select tags to enforce watermarking" @input="update" />
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import { Multiselect } from 'nextcloud-vue'
import axios from 'nextcloud-axios'
import SettingsCheckbox from './SettingsCheckbox'
import SettingsInputText from './SettingsInputText'
import SettingsSelectTag from './SettingsSelectTag'
import SettingsSelectGroup from './SettingsSelectGroup'
import { generateUrl } from 'nextcloud-router'

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
		Multiselect
	},
	props: {
		initial: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			serverMode: 'custom',
			serverError: SERVER_STATE_OK,
			updating: false,
			groups: [],
			tags: [],
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
					text: ''
				}
			}
		}
	},
	computed: {
		demoServers() {
			return this.initial.demo_servers
		}
	},
	beforeMount() {
		for (let key in this.initial.settings) {
			if (!this.initial.settings.hasOwnProperty(key)) {
				continue
			}

			let [ parent, setting ] = key.split('_')
			if (parent === 'watermark') {
				Vue.set(this.settings[parent], setting, this.initial.settings[key])
			} else {
				Vue.set(this.settings, key, this.initial.settings[key])
			}

		}
		Vue.set(this.settings, 'data', this.initial.settings)
		this.checkIfDemoServerIsActive()
	},
	methods: {
		update() {
			this.updating = true
			let settings = this.settings
			axios.post(generateUrl('/apps/richdocuments/settings/watermark'), { settings }).then((response) => {
				this.updating = false
			}).catch((error) => {
				this.updating = false
				OC.Notification.showTemporary('Failed to save settings')
				console.error(error)
			})
		},
		async updateServer() {
			const data = {
				wopi_url: this.settings.wopi_url,
				disable_certificate_verification: this.settings.disable_certificate_verification
			}
			this.serverError = SERVER_STATE_LOADING
			this.updating = true

			try {
				await axios.post(
					OC.filePath('richdocuments', 'ajax', 'admin.php'),
					data
				)
				this.serverError = SERVER_STATE_OK
			} catch (e) {
				console.error(e)
				this.serverError = SERVER_STATE_CONNECTION_ERROR
			}
			this.updating = false
			this.checkIfDemoServerIsActive()
		},
		checkIfDemoServerIsActive() {
			this.settings.demoUrl = this.initial.demo_servers.find((server) => server.demo_url === this.settings.wopi_url)
			if (this.settings.demoUrl) {
				this.serverMode = 'demo'
			}
		},
		demoServerLabel(server) {
			return `${server.provider_name} — ${server.provider_location}`
		},
		async setDemoServer(server) {
			this.settings.wopi_url = server.demo_url
			this.settings.disable_certificate_verification = false
			await this.updateServer()
		}
	}
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
		margin-top: 10px;
	}
</style>
