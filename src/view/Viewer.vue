<!--
  - SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<!--
  - This component is a wrapper around the Office component to be used in the viewer
  - We currently need this to isolate the vue instances
-->
<template>
	<Office :filename="filename"
		:fileid="fileid"
		:has-preview="hasPreview"
		:source="source"
		:mime="mime"
		:permissions="permissions"
		:is-embedded="isEmbedded"
		@close="$parent.close()"
		@update:loaded="$emit('update:loaded', $event)" />
</template>
<script>
import Vue from 'vue'
import Office from './Office.vue'

Vue.prototype.t = t
Vue.prototype.n = n

export default {
	name: 'Viewer',
	components: {
		Office: Vue.extend(Office),
	},
	props: {
		filename: {
			type: String,
			default: null,
		},
		fileid: {
			type: Number,
			default: null,
		},
		hasPreview: {
			type: Boolean,
			required: false,
			default: () => false,
		},
		source: {
			type: String,
			default: null,
		},
		mime: {
			type: String,
			default: null,
		},
		permissions: {
			type: String,
			default: '',
		},
		isEmbedded: {
			type: Boolean,
			default: false,
		},
	},
}
</script>
