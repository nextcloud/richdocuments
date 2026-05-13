<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<FileCard @click="openFile">
		<template #preview>
			<img :src="previewUrl"
				:alt="source.basename"
				class="office-file-entry__preview">
		</template>
		<template #name>
			{{ source.basename }}
		</template>
		<template #subname>
			<NcDateTime :timestamp="source.mtime" />
		</template>
	</FileCard>
</template>

<script>
import { generateUrl } from '@nextcloud/router'
import NcDateTime from '@nextcloud/vue/dist/Components/NcDateTime.js'

import FileCard from './FileCard.vue'

export default {
	name: 'OfficeFileEntry',

	components: {
		FileCard,
		NcDateTime,
	},

	props: {
		source: {
			type: Object,
			required: true,
		},
	},

	computed: {
		previewUrl() {
			return generateUrl('/core/preview?fileId={fileid}&x={x}&y={y}', {
				fileid: this.source.fileid,
				x: 300,
				y: 300,
			})
		},
	},

	methods: {
		openFile() {
			if (window.OCA?.Viewer) {
				OCA.Viewer.open({ path: this.source.path })
			}
		},
	},
}
</script>

<style scoped>
.office-file-entry__preview {
	width: 100%;
	height: 100%;
	object-fit: cover;
}
</style>
