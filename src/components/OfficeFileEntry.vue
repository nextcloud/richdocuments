<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<NcListItem :name="source.basename"
		class="office-file-entry"
		@click="openFile">
		<template #icon>
			<img :src="previewUrl"
				:alt="source.basename"
				class="office-file-entry__preview">
		</template>
		<template #subname>
			<NcDateTime :timestamp="source.mtime" />
		</template>
	</NcListItem>
</template>

<script>
import { generateUrl } from '@nextcloud/router'
import NcDateTime from '@nextcloud/vue/dist/Components/NcDateTime.js'
import NcListItem from '@nextcloud/vue/dist/Components/NcListItem.js'

export default {
	name: 'OfficeFileEntry',

	components: {
		NcDateTime,
		NcListItem,
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
.office-file-entry {
	flex-direction: column !important;
	align-items: center !important;
	text-align: center;
	padding: 8px;
	border-radius: var(--border-radius-element);
	border: 1px solid var(--color-border);
	transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.office-file-entry:hover {
	background-color: var(--color-background-hover);
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	transform: translateY(-2px);
}

/* Preview image */
.office-file-entry__preview {
	width: 64px;
	height: 64px;
	object-fit: cover;
	border-radius: var(--border-radius);
}
</style>
