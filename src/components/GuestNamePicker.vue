<template>
	<NcModal :can-close="false"
		:out-transition="true"
		size="small"
		:show.sync="show">
		<div class="modal__content" data-cy="guestNameModal">
			<h3>
				<NcIconSvgWrapper v-if="file.icon !== null"
					:svg="file.icon"
					:title="t('richdocuments',
						'{fileName} icon',
						{ fileName: file.name})" />
				{{ file.name }}
			</h3>

			<p>
				{{ t('richdocuments', `Please enter the guest name you wish to use before proceeding to the document.
                               If you don\'t provide one, the default will be used.`) }}
			</p>

			<div class="modal__form">
				<NcTextField :value="guestName"
					data-cy="guestNameInput"
					:label="t('richdocuments', 'Guest name')"
					:placeholder="t('richdocuments', 'Anonymous guest')"
					type="text"
					@update:value="setGuestName" />
			</div>
		</div>

		<div class="modal__buttons">
			<NcButton data-cy="guestNameSubmit"
				:aria-label="t('richdocuments', 'Submit name')"
				type="primary"
				@click="submit">
				{{ t('richdocuments', 'Submit name') }}
			</NcButton>
		</div>
	</NcModal>
</template>

<script>
import { NcButton, NcIconSvgWrapper, NcModal, NcTextField } from '@nextcloud/vue'
import { translate as t } from '@nextcloud/l10n'
import axios from '@nextcloud/axios'
import { setGuestNameCookie } from '../helpers/guestName.js'

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
			setGuestNameCookie(this.guestName)
			this.show = false

			await this.onSubmit(this.guestName)
		},
	},
}
</script>

<style lang="scss" scoped>
$modal-padding: calc(var(--default-grid-baseline) * 4);

.modal__content {
	padding: $modal-padding;

	h3 {
		display: flex;
		align-items: center;
		font-size: 1.3em;
	}

	.modal__form {
		padding: 15px 0;
	}
}

.modal__buttons {
	display: flex;
	justify-content: center;
	padding: 0 $modal-padding $modal-padding $modal-padding;
}
</style>