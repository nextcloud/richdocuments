<!--
  - SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<Office
		:filename="file.path"
		:fileid="isVersion ? null : file.fileid"
		:source="file.source"
		:mime="file.mime"
		:permissions="permissions"
		@close="close"
		@update:loaded="$emit('loaded')" />
</template>

<script>
import { Permission } from '@nextcloud/files'
import { getViewer } from '@nextcloud/viewer'
import { defineAsyncComponent } from 'vue'

export default {
	name: 'Viewer',
	components: {
		Office: defineAsyncComponent(() => import('./Office.vue')),
	},

	inheritAttrs: false,
	props: {
		file: {
			type: Object,
			required: true,
		},
	},

	emits: ['loaded'],
	computed: {
		isVersion() {
			return this.file.root?.startsWith('/versions/')
		},

		permissions() {
			return (this.file.permissions & Permission.UPDATE) ? 'W' : ''
		},
	},

	methods: {
		close() {
			getViewer().close()
		},
	},
}
</script>
