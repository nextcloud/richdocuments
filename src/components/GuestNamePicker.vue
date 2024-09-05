<!--
  - SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<NcModal :can-close="false"
		:out-transition="true"
		size="small"
		:show.sync="show">
		<form class="modal__content"
			data-cy="guestNameModal"
			@submit.prevent.stop="submit">
			<h3>
				<NcIconSvgWrapper v-if="file.icon !== null"
					:inline="true"
					:svg="file.icon"
					:size="35" />
				{{ file.name }}
			</h3>

			<p>
				{{ t('richdocuments', `Please enter the guest name you wish to use before proceeding to the document.
                               If you don\'t provide one, the default will be used.`) }}
			</p>

			<fieldset>
				<NcTextField ref="guestNameInput"
					:value="guestName"
					data-cy="guestNameInput"
					:label="t('richdocuments', 'Guest name')"
					:placeholder="t('richdocuments', 'Anonymous guest')"
					type="text"
					@update:value="setGuestName" />
			</fieldset>

			<div class="modal__buttons">
				<NcButton data-cy="guestNameSubmit"
					:aria-label="t('richdocuments', 'Submit name')"
					type="primary"
					native-type="submit">
					{{ t('richdocuments', 'Submit name') }}
				</NcButton>
			</div>
		</form>
	</NcModal>
</template>

<script>
import { setGuestNickname } from '@nextcloud/auth'
import { NcButton, NcIconSvgWrapper, NcModal, NcTextField } from '@nextcloud/vue'
import { translate as t } from '@nextcloud/l10n'
import axios from '@nextcloud/axios'

export default {
	name: 'GuestNamePicker',

	components: {
		NcModal,
		NcButton,
		NcTextField,
		NcIconSvgWrapper,
	},

	props: {
		onSubmit: {
			type: Function,
			default: () => {},
		},
		fileName: {
			type: String,
			default: '',
		},
	},

	data() {
		return {
			guestName: '',
			show: true,
			file: {
				name: this.fileName,
				icon: null,
			},
		}
	},

	async mounted() {
		this.$nextTick(() => {
			this.$refs.guestNameInput.focus()
		})

		const name = document.getElementById('filename').value
		const mimeTypeIcon = async () => {
			const url = document.getElementById('mimetypeIcon').value
			let res

			try {
				res = await axios.get(url)
			} catch (e) {
				console.error(e)
			}

			return (res.status === 200) ? res.data : null
		}

		this.file = {
			name: this.file.name === '' ? name : this.file.name,
			icon: await mimeTypeIcon(),
		}
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
  padding: $modal-padding;

  h3 {
    margin: 0;
    display: flex;
    align-items: center;
  }

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
