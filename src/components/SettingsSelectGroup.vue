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
	<multiselect v-model="inputValObjects"
		:options="groupsArray" :options-limit="5"
		:placeholder="label"
		track-by="id"
		label="displayname"
		class="multiselect-vue" :multiple="true"
		:close-on-select="false" :tag-width="60"
		:disabled="disabled" @input="update"
		@search-change="asyncFindGroup">
		<span slot="noResult">{{ t('settings', 'No results') }}</span>
	</multiselect>
</template>

<script>
import axios from '@nextcloud/axios'
import Multiselect from '@nextcloud/vue/dist/Components/Multiselect'

let uuid = 0
export default {
	name: 'SettingsSelectGroup',
	components: {
		Multiselect
	},
	props: {
		label: {
			type: String,
			required: true
		},
		hint: {
			type: String,
			default: ''
		},
		value: {
			type: Array,
			default: () => []
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			inputValObjects: [],
			groups: {}
		}
	},
	computed: {
		id() {
			return 'settings-select-group-' + this.uuid
		},
		groupsArray() {
			return Object.values(this.groups)
		}
	},
	watch: {
		value(newVal) {
			this.inputValObjects = this.getValueObject()
		}
	},
	created: function() {
		this.uuid = uuid.toString()
		uuid += 1
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
							id: id,
							displayname: id
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
			return axios.get(OC.linkToOCS(`cloud/groups/details?search=${query}&limit=10`, 2))
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
		}
	}
}
</script>
