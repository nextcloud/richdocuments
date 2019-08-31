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
	<div class="section">
		<h2>Secure view settings</h2>

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
</template>

<script>
import Vue from 'vue'
import axios from 'nextcloud-axios'
import SettingsCheckbox from './SettingsCheckbox'
import SettingsInputText from './SettingsInputText'
import SettingsSelectTag from './SettingsSelectTag'
import SettingsSelectGroup from './SettingsSelectGroup'
import { generateUrl } from 'nextcloud-router'

export default {
	name: 'AdminSettings',
	components: {
		SettingsCheckbox,
		SettingsInputText,
		SettingsSelectTag,
		SettingsSelectGroup
	},
	props: {
		initial: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			updating: false,
			groups: [],
			tags: [],
			settings: {
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
	beforeMount() {
		for (let key in this.initial) {
			if (!this.initial.hasOwnProperty(key)) {
				continue
			}

			let [ parent, setting ] = key.split('_')
			if (parent === 'watermark') {
				Vue.set(this.settings[parent], setting, this.initial[key])
			} else {
				Vue.set(this.settings, key, this.initial[key])
			}

		}
		Vue.set(this.settings, 'data', this.initial)
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
		}
	}
}
</script>

<style scoped>
	p {
		margin-bottom: 15px;
	}
	p.checkbox-details {
		margin-left: 25px;
		margin-top: -10px;
		margin-bottom: 20px;
	}
	input,
	.multiselect {
		width: 100%;
		max-width: 400px;
	}
</style>
