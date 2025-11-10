<!--
  - SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div v-if="filePath === null" class="office-target-presentation-picker">
		<FilePicker :name="t('files', 'Select Presentation to Start')"
			:buttons="filePickerButtons"
			:allow-pick-directory="false"
			:multiselect="false"
			:mimetype-filter="validMimetypes"
			container=".office-target-presentation-picker" />
	</div>
</template>

<script>
import { FilePickerVue as FilePicker } from '@nextcloud/dialogs/filepicker.js'
import { generateUrl, generateOcsUrl } from '@nextcloud/router'
import axios from '@nextcloud/axios'
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import NcEmptyContent from '@nextcloud/vue/dist/Components/NcEmptyContent.js'
import NcListItem from '@nextcloud/vue/dist/Components/NcListItem.js'
import NcLoadingIcon from '@nextcloud/vue/dist/Components/NcLoadingIcon.js'
import TableOfContentsIcon from 'vue-material-design-icons/TableOfContents.vue'
import { getCurrentUser } from '@nextcloud/auth'

export default {
	name: 'FollowMePresentationPicker',
	components: {
		NcButton,
		NcEmptyContent,
		NcListItem,
		NcLoadingIcon,
		FilePicker,
		TableOfContentsIcon,
	},
	props: {
		providerId: {
			type: String,
			required: true,
		},
		accessible: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			fileId: null,
			filePath: null,
			target: null,
			sections: null,
			filePickerButtons: [
				{
					label: t('richdocuments', 'Cancel'),
					callback: () => {
						this.$emit('cancel')
					},
					type: 'secondary',
				},
				{
					label: t('richdocuments', 'Select file'),
					callback: (files) => {
						const file = files[0]
						this.fileId = file.fileid
						this.filePath = file.path
						this.dirname = file.dirname
						this.submit()
					},
					type: 'primary',
				},
			],
		}
	},
	computed: {
		validMimetypes() {
			return ["application/vnd.oasis.opendocument.presentation",
			"application/vnd.oasis.opendocument.presentation-flat-xml",
			"application/vnd.oasis.opendocument.presentation-template",
			"application/vnd.openxmlformats-officedocument.presentationml.presentation",
			"application/vnd.ms-powerpoint"]
		},
	},
	mounted() {
		window.addEventListener('click', this.onWindowClick)
	},
	beforeDestroy() {
		window.removeEventListener('click', this.onWindowClick)
	},
	methods: {
		t,
		onWindowClick(e) {
			if (e.target.tagName === 'A' && e.target.classList.contains('oc-dialog-close')) {
				this.$emit('cancel')
			}
		},
		setTarget(entry) {
			this.target = entry.id
		},
		submit() {
			const fileLink = window.location.protocol + '//' + window.location.host
				+ generateUrl('/apps/richdocuments/editonline/followPresentation/{fileId}/{leaderId}', { fileId: this.fileId, leaderId: getCurrentUser().uid })
			this.$emit('submit', fileLink)
		},
		async fetchReferences() {
			const response = await axios.get(generateOcsUrl('/apps/richdocuments/api/v1/targets'), {
				params: {
					path: this.filePath,
				},
			})
			this.sections = response.data.ocs.data
		},
	},
}
</script>
