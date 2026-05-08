<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<NcListItem :name="source.basename"
		class="office-file-entry"
		@click="openFile">
		<template #icon>
			<span :class="iconClass" class="office-file-entry__icon" />
		</template>
		<template #subname>
			<NcDateTime :timestamp="source.mtime" />
		</template>
	</NcListItem>
</template>

<script>
import NcDateTime from '@nextcloud/vue/dist/Components/NcDateTime.js'
import NcListItem from '@nextcloud/vue/dist/Components/NcListItem.js'

import { OFFICE_MIME_FILTERS } from '../services/officeFiles.js'

const CATEGORY_ICON = {
	documents: 'icon-filetype-document',
	presentations: 'icon-filetype-presentation',
	spreadsheets: 'icon-filetype-spreadsheet',
}

/**
 *
 * @param mime
 */
function mimeToIcon(mime) {
	for (const [category, mimes] of Object.entries(OFFICE_MIME_FILTERS)) {
		if (mimes.includes(mime)) {
			return CATEGORY_ICON[category]
		}
	}

	return 'icon-filetype-document'
}

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
		iconClass() {
			return mimeToIcon(this.source.mime)
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
	padding: 12px 8px;
	border-radius: var(--border-radius-element);
}

.office-file-entry:hover {
	background-color: var(--color-background-hover);
}

.office-file-entry__icon {
	display: block;
	width: 32px;
	height: 32px;
	background-size: 32px;
}
</style>
