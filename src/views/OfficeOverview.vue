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
					icon="icon-filetype-document"
					:active="currentView === 'documents'"
					@click="setView('documents')" />

				<NcAppNavigationItem
					:name="t('richdocuments', 'Presentations')"
					icon="icon-filetype-presentation"
					:active="currentView === 'presentations'"
					@click="setView('presentations')" />

				<NcAppNavigationItem
					:name="t('richdocuments', 'Spreadsheets')"
					icon="icon-filetype-spreadsheet"
					:active="currentView === 'spreadsheets'"
					@click="setView('spreadsheets')" />
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

export default {
	name: 'OfficeOverview',

	components: {
		NcAppContent,
		NcAppNavigation,
		NcAppNavigationItem,
		NcContent,
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
