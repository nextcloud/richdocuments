<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NcContent app-name="richdocuments" class="overview">
		<NcAppNavigation :aria-label="t('richdocuments', 'Office overview')">
			<template #list>
				<NcAppNavigationItem :name="t('richdocuments', 'Home')"
					:to="{ name: 'home' }"
					:exact="true">
					<template #icon>
						<HomeOutlineIcon :size="20" />
					</template>
				</NcAppNavigationItem>
				<NcAppNavigationItem :name="t('richdocuments', 'My recent documents')"
					:to="{ name: 'recent' }">
					<template #icon>
						<ClockOutlineIcon :size="20" />
					</template>
				</NcAppNavigationItem>
				<NcAppNavigationItem :name="t('richdocuments', 'Shared with me')"
					:to="{ name: 'shared' }">
					<template #icon>
						<AccountMultipleIcon :size="20" />
					</template>
				</NcAppNavigationItem>
				<NcAppNavigationItem :name="t('richdocuments', 'Create new document')"
					:to="{ name: 'templates' }">
					<template #icon>
						<FileDocumentPlusIcon :size="20" />
					</template>
				</NcAppNavigationItem>
			</template>
		</NcAppNavigation>
		<NcAppContent>
			<transition name="overview-route" mode="out-in">
				<router-view :key="$route.name" />
			</transition>
		</NcAppContent>
	</NcContent>
</template>

<script>
import NcContent from '@nextcloud/vue/dist/Components/NcContent.js'
import NcAppNavigation from '@nextcloud/vue/dist/Components/NcAppNavigation.js'
import NcAppNavigationItem from '@nextcloud/vue/dist/Components/NcAppNavigationItem.js'
import NcAppContent from '@nextcloud/vue/dist/Components/NcAppContent.js'
import HomeOutlineIcon from 'vue-material-design-icons/HomeOutline.vue'
import ClockOutlineIcon from 'vue-material-design-icons/ClockOutline.vue'
import AccountMultipleIcon from 'vue-material-design-icons/AccountMultiple.vue'
import FileDocumentPlusIcon from 'vue-material-design-icons/FileDocumentPlus.vue'

export default {
	name: 'OverviewApp',
	components: {
		NcContent,
		NcAppNavigation,
		NcAppNavigationItem,
		NcAppContent,
		HomeOutlineIcon,
		ClockOutlineIcon,
		AccountMultipleIcon,
		FileDocumentPlusIcon,
	},
}
</script>

<style lang="scss" scoped>
.overview {
	min-height: 100%;
}

// Smooth fade + slight upward slide between Home / Recent / Shared /
// Templates so navigation feels intentional rather than snapping.
::v-deep(.overview-route-enter-active),
::v-deep(.overview-route-leave-active) {
	transition: opacity 180ms ease, transform 180ms ease;
}
::v-deep(.overview-route-enter) {
	opacity: 0;
	transform: translateY(6px);
}
::v-deep(.overview-route-leave-to) {
	opacity: 0;
	transform: translateY(-4px);
}

// Honour reduced-motion: snap instead of slide.
@media (prefers-reduced-motion: reduce) {
	::v-deep(.overview-route-enter-active),
	::v-deep(.overview-route-leave-active) {
		transition: none;
	}
	::v-deep(.overview-route-enter),
	::v-deep(.overview-route-leave-to) {
		transform: none;
	}
}
</style>
