<!--
  - @copyright Copyright (c) 2020 Julius Härtl <jus@bitgrid.net>
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
		<ul>
			<li v-for="token in tokens" :key="token.token">
				<input v-model="token.description"
					type="text"
					:placeholder="t('richdocuments', 'Description')"
					:disabled="disabled">
				<input class="token"
					type="text"
					disabled
					:value="token.token">
				<button class="icon icon-history" :disabled="disabled" @click="regenerateToken(token)" />
				<button class="icon icon-close" :disabled="disabled" @click="removeToken(token)" />
			</li>
		</ul>
		<button :disabled="disabled" @click="addNewToken">
			{{ t('richdocuments', 'Add new token') }}
		</button>
		<input type="button"
			value="Save"
			:disabled="disabled"
			@click="updateTokens">
	</div>
</template>

<script>
const generateRandomToken = () => {
	const len = 3
	const array = new Uint32Array(len)
	window.crypto.getRandomValues(array)
	let random = ''
	for (let i = 0; i < len; ++i) {
		random += array[i].toString(36)
	}
	return random
}

const appsStringToArray = (apps) => {
	if (apps === '') {
		return []
	}
	return apps.replace(/,$/g, '').split(',').map((item) => {
		const data = item.split(':')
		return {
			description: data[0],
			token: data[1],
		}
	})
}
const appsArrayToString = (apps) => {
	let result = ''
	apps.forEach((item) => {
		result += item.description + ':' + item.token + ','
	})
	return result
}
export default {
	name: 'SettingsExternalApps',
	props: {
		externalApps: {
			type: String,
			default: '',
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			tokens: [],
		}
	},
	beforeMount() {
		this.tokens = appsStringToArray(this.externalApps)
	},
	methods: {
		addNewToken() {
			this.tokens.push({
				description: '',
				token: generateRandomToken(),
			})
		},
		removeToken(token) {
			this.tokens.splice(this.tokens.indexOf(token), 1)
		},
		updateTokens() {
			this.$emit('input', appsArrayToString(this.tokens))
		},
		regenerateToken(token) {
			token.token = generateRandomToken()
		},
	},
}
</script>

<style scoped>
	li {
		display: flex;
	}

	.token {
		width: 200px;
		background-color: #fff;
		background-color: var(--color-main-background) !important;
		color: var(--color-text-light);
		text-align: center;
	}
</style>
