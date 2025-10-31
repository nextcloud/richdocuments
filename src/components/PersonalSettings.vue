<!--
  - SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NcSettingsSection :name="t('richdocuments', 'Nextcloud Office')"
		:description="t('richdocuments', 'Personal Settings for Nextcloud Office')"
		:limit-width="true">
		<!-- Template folder selection -->
		<div class="template-folder-settings">
			<div class="template-input-wrapper">
				<NcTextField v-model="templateFolder"
					:label="t('richdocuments', 'Select a template directory')"
					:disabled="true" />
			</div>
			<NcButton id="templateSelectButton"
				type="secondary"
				@click="onTemplateSelectButtonClick">
				<FolderIcon :size="20"
					:title="t('richdocuments', 'Select a personal template folder')"
					data-toggle="tooltip" />
			</NcButton>
			<NcButton id="templateResetButton"
				type="secondary"
				:title="t('richdocuments', 'Remove personal template folder')"
				@click="resetTemplate">
				<DeleteIcon :size="20" />
			</NcButton>
		</div>
		<p>
			<em>
				{{ t('richdocuments', 'Templates inside of this directory will be added to the template selector of Nextcloud Office.') }}
			</em>
		</p>

		<!-- Document signing -->
		<div class="docsign-section">
			<p class="doc_sign_head">
				<strong>{{ t('richdocuments', 'Document signing') }}</strong>
			</p>
			<template v-if="hasDocumentSigningSupport">
				<div class="input-wrapper">
					<!-- Document Signing Cert -->
					<DocSigningField v-model="documentSigningCert"
						:label="t('richdocuments', 'Enter document signing cert (in PEM format)')"
						@save="val => setDocumentSigningCert(val)"
						@remove="() => setDocumentSigningCert('')" />
					<!-- Document Signing Key -->
					<DocSigningField v-model="documentSigningKey"
						:label="t('richdocuments', 'Enter document signing key')"
						@save="val => setDocumentSigningKey(val)"
						@remove="() => setDocumentSigningKey('')" />
					<!-- Document Signing CA -->
					<DocSigningField v-model="documentSigningCa"
						:label="t('richdocuments', 'Enter document signing CA chain')"
						@save="val => setDocumentSigningCa(val)"
						@remove="() => setDocumentSigningCa('')" />
					<p>
						<em>
							{{ t('richdocuments', 'To use document signing, specify your signing certificate, key and CA chain here.') }}
						</em>
					</p>
				</div>
			</template>
			<p v-else>
				<em>
					{{ t('richdocuments', 'This instance does not support document signing, because the feature is missing or disabled. Please contact the administrator.') }}
				</em>
			</p>
		</div>
		<!-- user settings iframe  -->
		<CoolFrame v-if="tokenGenerated"
			:iframe-type="'user'"
			:iframe-url="settingIframeUrl"
			:access-token="accessToken"
			:access-token-t-t-l="accessTokenTTL"
			:wopi-setting-base-url="wopiSettingBaseUrl" />
	</NcSettingsSection>
</template>

<script>
import { generateFilePath, generateUrl } from '@nextcloud/router'
import { showError, showSuccess } from '@nextcloud/dialogs'
import NcSettingsSection from '@nextcloud/vue/dist/Components/NcSettingsSection.js'
import NcTextField from '@nextcloud/vue/dist/Components/NcTextField.js'
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import DocSigningField from './DocSigningField.vue'
import DeleteIcon from 'vue-material-design-icons/TrashCanOutline.vue'
import FolderIcon from 'vue-material-design-icons/FolderOutline.vue'
import axios from '@nextcloud/axios'
import {
	getCurrentUser,
} from '@nextcloud/auth'

import { isPublicShare, getSharingToken } from '@nextcloud/sharing/public'
import { getConfigFileUrl } from '../helpers/url.js'
import CoolFrame from './CoolFrame.vue'

export default {
	name: 'PersonalSettings',
	components: {
		NcSettingsSection,
		NcTextField,
		NcButton,
		DocSigningField,
		FolderIcon,
		DeleteIcon,
		CoolFrame,
	},
	props: {
		initial: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			templateFolder: this.initial.templateFolder || '',
			hasSettingIframeSupport: this.initial.hasSettingIframeSupport || false,
			settingIframeUrl: this.initial.setting_iframe_url || '',
			zoteroAPIKey: this.initial.zoteroAPIKey || '',
			hasDocumentSigningSupport: this.initial.hasDocumentSigningSupport || false,
			documentSigningCert: this.initial.documentSigningCert || '',
			documentSigningKey: this.initial.documentSigningKey || '',
			documentSigningCa: this.initial.documentSigningCa || '',
			tokenGenerated: false,
			accessToken: '',
			accessTokenTTL: '',
			userId: getCurrentUser()?.uid,
			wopiSettingBaseUrl: '',
			public_wopi_url: this.initial.publicWopiUrl || '',
		}
	},
	computed: {
		shareToken() {
			return getSharingToken()
		},
	},
	async mounted() {
		if (this.hasSettingIframeSupport && this.userId && this.userId.length > 0) {
			await this.generateAccessToken()
			if (this.accessToken) {
				this.wopiSettingBaseUrl = getConfigFileUrl()
				console.debug('wopiSettingBaseUrl', this.wopiSettingBaseUrl)
				this.tokenGenerated = true
			}
		} else {
			console.error('Setting Iframe not supported')
		}
	},
	methods: {
		async generateAccessToken() {
			const { data } = await axios.get(generateUrl('/apps/richdocuments/settings/generateToken/user'))
			if (data.token) {
				this.accessToken = data.token
				this.accessTokenTTL = data.token_ttl
				console.debug('Admin settings WOPI token generated:', this.accessToken, this.accessTokenTTL)
			} else {
				console.error('Failed to generate token for admin settings')
			}
		},
		async onTemplateSelectButtonClick() {
			OC.dialogs.filepicker(
				this.t('richdocuments', 'Select a personal template folder'),
				async (datapath) => {
					const success = await this.updateSetting({ templateFolder: datapath })
					if (success) {
						this.templateFolder = datapath
					}
				},
				false,
				'httpd/unix-directory',
				true,
				OC.dialogs.FILEPICKER_TYPE_CHOOSE,
			)
		},
		async resetTemplate() {
			const success = await this.updateSetting({ templateFolder: '' })
			if (success) {
				this.templateFolder = ''
			}
		},
		async setDocumentSigningCert(val) {
			const success = await this.updateSetting({ documentSigningCertInput: val })
			if (success) {
				this.documentSigningCert = val
			}
		},
		async setDocumentSigningKey(val) {
			const success = await this.updateSetting({ documentSigningKeyInput: val })
			if (success) {
				this.documentSigningKey = val
			}
		},
		async setDocumentSigningCa(val) {
			const success = await this.updateSetting({ documentSigningCaInput: val })
			if (success) {
				this.documentSigningCa = val
			}
		},
		async updateSetting(settings) {
			try {
				const response = await axios.post(
					generateFilePath('richdocuments', 'ajax', 'personal.php'),
					settings,
				)

				if (response.data.status === 'success') {
					showSuccess(this.t('richdocuments', 'Settings saved successfully.'))
					return true
				} else {
					showError(response.data.data.message || this.t('richdocuments', 'Failed to save settings.'))
					return false
				}
			} catch (error) {
				console.error('Error updating settings:', error)
				showError(this.t('richdocuments', 'Unexpected error occurred.'))
				return false
			}
		},
	},
}
</script>

<style scoped>
.template-folder-settings {
	display: flex;
	align-items: center;
	gap: 1rem;
	margin-bottom: 2rem;
}

.template-input-wrapper {
	width: 300px;
	flex-shrink: 0;
}

.input-wrapper {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.doc_sign_head {
	padding-top: 10px;
	padding-bottom: 5px;
}

.msg {
	display: inline-block;
	margin-bottom: 1rem;
	color: var(--color-warning);
}
</style>
