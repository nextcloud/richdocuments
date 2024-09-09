<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NcSelect v-model="inputValObjects"
		:options="groupsArray"
		:input-id="uuid"
		:placeholder="label"
		label="displayname"
		:input-label="label"
		:multiple="true"
		:close-on-select="false"
		:disabled="disabled"
		@input="update"
		@search="asyncFindGroup">
		<span slot="noResult">{{ t('settings', 'No results') }}</span>
	</NcSelect>
</template>

<script>
import axios from '@nextcloud/axios'
import { NcSelect } from '@nextcloud/vue'
import { generateOcsUrl } from '@nextcloud/router'

let uuid = 0
export default {
	name: 'SettingsSelectGroup',
	components: {
		NcSelect,
	},
	props: {
		label: {
			type: String,
			required: true,
		},
		hint: {
			type: String,
			default: '',
		},
		value: {
			type: Array,
			default: () => [],
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			uuid: '',
			inputValObjects: [],
			groups: {},
		}
	},
	computed: {
		id() {
			return 'settings-select-group-' + this.uuid
		},
		groupsArray() {
			return Object.values(this.groups).sort((a, b) => {
				return this.inputValObjects.indexOf(b) - this.inputValObjects.indexOf(a)
			})
		},
	},
	watch: {
		value(newVal) {
			this.inputValObjects = this.getValueObject()
		},
	},
	created() {
		this.uuid = uuid.toString()
		uuid += 1

		// Preseed with placeholder entries for groups
		this.getValueObject().forEach((element) => {
			this.$set(this.groups, element.id, element)
		})
		this.inputValObjects = this.getValueObject()
		// Fetch actual group metadata
		this.asyncFindGroup('').then((result) => {
			this.inputValObjects = this.getValueObject()
		})
	},
	methods: {
		getValueObject() {
			return this.value.filter((group) => group !== '' && typeof group !== 'undefined').map(
				(id) => {
					if (typeof this.groups[id] === 'undefined') {
						return {
							id,
							displayname: id,
						}
					}
					return this.groups[id]
				},
			)
		},
		update() {
			this.$emit('input', this.inputValObjects.map((element) => element.id))
		},
		asyncFindGroup(query) {
			query = typeof query === 'string' ? encodeURI(query) : ''
			return axios.get(generateOcsUrl(`cloud/groups/details?search=${query}&limit=100`, 2))
				.then((response) => {
					if (Object.keys(response.data.ocs.data.groups).length > 0) {
						response.data.ocs.data.groups.forEach((element) => {
							if (typeof this.groups[element.id] === 'undefined') {
								this.$set(this.groups, element.id, element)
							}
						})
						return true
					}
					return false
				}).catch((error) => {
					this.$emit('error', error)
				})
		},
	},
}
</script>
