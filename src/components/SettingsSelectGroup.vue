<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NcSelect
		v-model="inputValObjects"
		:options="groupsArray"
		:inputId="uuid"
		:placeholder="label"
		label="displayname"
		:inputLabel="label"
		:multiple="true"
		:closeOnSelect="false"
		:disabled="disabled"
		@update:modelValue="update"
		@search="asyncFindGroup">
		<template #noResult>
			<span>{{ t('settings', 'No results') }}</span>
		</template>
	</NcSelect>
</template>

<script>
import axios from '@nextcloud/axios'
import { generateOcsUrl } from '@nextcloud/router'
import NcSelect from '@nextcloud/vue/components/NcSelect'

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

		modelValue: {
			type: Array,
			default: () => [],
		},

		disabled: {
			type: Boolean,
			default: false,
		},
	},

	emits: ['update:modelValue', 'error'],
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
		modelValue(newVal) {
			this.inputValObjects = this.getValueObject()
		},
	},

	created() {
		this.uuid = uuid.toString()
		uuid += 1

		// Preseed with placeholder entries for groups
		this.getValueObject().forEach((element) => {
			this.groups[element.id] = element
		})
		this.inputValObjects = this.getValueObject()
		// Fetch actual group metadata
		this.asyncFindGroup('').then((result) => {
			this.inputValObjects = this.getValueObject()
		})
	},

	methods: {
		getValueObject() {
			return this.modelValue.filter((group) => group !== '' && typeof group !== 'undefined').map((id) => {
				if (typeof this.groups[id] === 'undefined') {
					return {
						id,
						displayname: id,
					}
				}
				return this.groups[id]
			})
		},

		update() {
			this.$emit('update:modelValue', this.inputValObjects.map((element) => element.id))
		},

		asyncFindGroup(query) {
			query = typeof query === 'string' ? encodeURI(query) : ''
			return axios.get(generateOcsUrl(`cloud/groups/details?search=${query}&limit=100`, 2))
				.then((response) => {
					if (Object.keys(response.data.ocs.data.groups).length > 0) {
						response.data.ocs.data.groups.forEach((element) => {
							if (typeof this.groups[element.id] === 'undefined') {
								this.groups[element.id] = element
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
