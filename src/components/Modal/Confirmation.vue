<!--
  - SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<NcModal>
		<div class="confirmation-dialog">
			<h1>{{ name }}</h1>
			<p>{{ description }}</p>
			<div class="confirmation-dialog--buttons">
				<NcButton type="secondary"
					@click="() => close(false)">
					{{ cancelButtonText }}
				</NcButton>
				<NcButton type="primary"
					@click="() => close(true)">
					{{ confirmButtonText }}
				</NcButton>
			</div>
		</div>
	</NcModal>
</template>
<script>
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import NcModal from '@nextcloud/vue/dist/Components/NcModal.js'
import { translate as t } from '@nextcloud/l10n'

export default {
	name: 'Confirmation',
	components: {
		NcButton,
		NcModal,
	},
	props: {
		name: {
			type: String,
			default: '',
		},
		description: {
			type: String,
			default: '',
		},
		confirmButtonText: {
			type: String,
			default: t('richdocuments', 'Confirm'),
		},
		cancelButtonText: {
			type: String,
			default: t('richdocuments', 'Cancel'),
		},
	},
	emits: ['close'],
	methods: {
		t,
		close(result) {
			this.$emit('close', result)
		},
	},
}
</script>
<style lang="scss" scoped>
.confirmation-dialog {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 24px;
    h1 {
        font-size: 120%;
        font-weight: bold;
        margin-bottom: 12px;
    }

    &--buttons {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin-top: 24px;
    }
}
</style>
