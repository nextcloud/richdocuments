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
	<NcSelect v-model="inputValObjects"
		:options="groupsArray"
		:input-id="uuid"
		:placeholder="label"
		label="displayname"
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
				}
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
