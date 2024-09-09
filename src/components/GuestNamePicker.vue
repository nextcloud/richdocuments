<!--
  - SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<NcDialog :can-close="false"
		:out-transition="true"
		:name="fileName"
		:open.sync="show"
		:is-form="true"
		:buttons="buttons"
		size="small"
		@submit="submit">
		<p>
			{{ t('richdocuments', `Please enter the guest name you wish to use before proceeding to {fileName}.
                               If you don\'t provide one, the default will be used.`, { fileName: this.fileName}) }}
		</p>

		<NcTextField ref="guestNameInput"
			:value="guestName"
			data-cy="guestNameInput"
			:label="t('richdocuments', 'Guest name')"
			:placeholder="t('richdocuments', 'Anonymous guest')"
			type="text"
			@update:value="setGuestName" />
	</NcDialog>
</template>

<script>
import { setGuestNickname } from '@nextcloud/auth'
import { NcDialog, NcTextField } from '@nextcloud/vue'
import { translate as t } from '@nextcloud/l10n'

export default {
	name: 'GuestNamePicker',

	components: {
		NcDialog,
		NcTextField,
	},

	props: {
		fileName: {
			type: String,
			default: null,
		},
		onSubmit: {
			type: Function,
			default: () => {},
		},
	},

	data() {
		return {
			guestName: '',
			show: true,
			buttons: [
				{
					label: t('richdocuments', 'Submit name'),
					nativeType: 'submit',
					type: 'primary',
				},
			],
		}
	},

	async mounted() {
		this.$nextTick(() => {
			this.$refs.guestNameInput.focus()
		})
	},

	methods: {
		t,
		setGuestName(guestName) {
			this.guestName = guestName
		},
		async submit() {
			setGuestNickname(this.guestName)
			this.show = false

			await this.onSubmit()
		},
	},
}
</script>

<style lang="scss" scoped>
$modal-padding: calc(var(--default-grid-baseline) * 4);

.modal__content {
  padding: 0 $modal-padding $modal-padding;

  p, fieldset {
    margin: 10px 0;
  }

  .modal__buttons {
    margin-top: $modal-padding;
    display: flex;
    justify-content: end;
  }
}
</style>
