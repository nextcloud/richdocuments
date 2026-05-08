<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<NcContent app-name="richdocuments">
		<NcAppNavigation>
			<template #list>
				<NcAppNavigationItem
					:name="t('richdocuments', 'Documents')"
					:active="currentView === 'documents'"
					@click="setView('documents')">
					<FileDocumentOutline slot="icon" :size="20" />
				</NcAppNavigationItem>

				<NcAppNavigationItem
					:name="t('richdocuments', 'Presentations')"
					:active="currentView === 'presentations'"
					@click="setView('presentations')">
					<FilePowerpointOutline slot="icon" :size="20" />
				</NcAppNavigationItem>

				<NcAppNavigationItem
					:name="t('richdocuments', 'Spreadsheets')"
					:active="currentView === 'spreadsheets'"
					@click="setView('spreadsheets')">
					<FileTableOutline slot="icon" :size="20" />
				</NcAppNavigationItem>
			</template>
		</NcAppNavigation>

		<NcAppContent />
	</NcContent>
</template>

<script>
import NcAppContent from '@nextcloud/vue/dist/Components/NcAppContent.js'
import NcAppNavigation from '@nextcloud/vue/dist/Components/NcAppNavigation.js'
import NcAppNavigationItem from '@nextcloud/vue/dist/Components/NcAppNavigationItem.js'
import NcContent from '@nextcloud/vue/dist/Components/NcContent.js'
import FileDocumentOutline from 'vue-material-design-icons/FileDocumentOutline.vue'
import FilePowerpointOutline from 'vue-material-design-icons/FilePowerpointOutline.vue'
import FileTableOutline from 'vue-material-design-icons/FileTableOutline.vue'

export default {
	name: 'OfficeOverview',

	components: {
		NcAppContent,
		NcAppNavigation,
		NcAppNavigationItem,
		NcContent,
		FileDocumentOutline,
		FilePowerpointOutline,
		FileTableOutline,
	},

	data() {
		return {
			currentView: 'documents',
		}
	},

	methods: {
		setView(view) {
			this.currentView = view
		},
	},
}
</script>
