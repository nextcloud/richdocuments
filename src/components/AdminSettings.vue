<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div>
		<div class="section">
			<h2>{{ productName }}</h2>
			<p v-if="hasNextcloudBranding" class="description">
				{{ t('richdocuments', 'Nextcloud Office is a powerful Collabora Online based online office suite with collaborative editing, which supports all major documents, spreadsheet and presentation file formats and works together with all modern browsers.') }}
			</p>
			<p v-else class="description">
				{{ t('richdocuments', 'Collabora Online is a powerful LibreOffice-based online office suite with collaborative editing, which supports all major documents, spreadsheet and presentation file formats and works together with all modern browsers.') }}
			</p>

			<div v-if="settings.wopi_url && settings.wopi_url !== ''">
				<NcNoteCard v-if="serverError == 2" type="error">
					<p>{{ t('richdocuments', 'Could not establish connection to the Collabora Online server.') }}</p>
					<p>{{ errorMessage }}</p>

					<p v-if="isNginx && serverMode === 'builtin'">
						{{ t('richdocuments', 'This might be due to a missing configuration of your web server. For more information, please visit: ') }}
						<a title="Connecting Collabora Online Single Click with Nginx"
							href="https://www.collaboraoffice.com/online/connecting-collabora-online-single-click-with-nginx/"
							target="_blank"
							rel="noopener"
							class="external">{{ t('richdocuments', 'Connecting Collabora Online Single Click with Nginx') }}</a>
					</p>
				</NcNoteCard>
				<NcNoteCard v-else-if="serverError == 1" type="warning">
					<p>{{ t('richdocuments', 'Setting up a new server') }}</p>
				</NcNoteCard>
				<NcNoteCard v-else-if="serverError == 3" type="error">
					<p>{{ t('richdocuments', 'Collabora Online should use the same protocol as the server installation.') }}</p>
				</NcNoteCard>
				<NcNoteCard v-else-if="serverError == 4" type="error">
					<p>
						{{ t('richdocuments', 'Your browser has been unable to connect to the Collabora server:') }}
						{{ settings.public_wopi_url }}
					</p>
					<p>{{ t('richdocuments', 'This URL is determined on the Collabora server either from the configured URL or the server_name parameter in coolwsd.xml.') }}</p>
				</NcNoteCard>
				<NcNoteCard v-else type="success">
					<p>{{ t('richdocuments', 'Collabora Online server is reachable.') }}</p>
					<p>{{ settings.product_name }} {{ settings.product_version }} {{ settings.product_hash }}</p>
					<p class="description">
						<strong>{{ t('richdocuments', 'URL used by the browser:') }}</strong> <code>{{ settings.public_wopi_url }}</code><br>
						<strong>{{ t('richdocuments', 'Nextcloud URL used by Collabora:') }}</strong> <code>{{ callbackUrl }}</code>
						<i>{{ settings.wopi_callback_url ? '' : '(Determined from the browser URL)' }}</i>
					</p>
				</NcNoteCard>
			</div>
			<NcNoteCard v-else type="warning">
				<p>{{ t('richdocuments', 'Please configure a Collabora Online server to start editing documents') }}</p>
			</NcNoteCard>

			<NcNoteCard v-if="settings.wopi_url && settings.wopi_url !== '' && !settings.wopi_allowlist" type="warning">
				<p>
					{{ t('richdocuments', 'You have not configured the allow-list for WOPI requests. Without this setting users may download restricted files via WOPI requests to the Nextcloud server.') }}
					<a title="WOPI settings documentation"
						href="https://docs.nextcloud.com/server/latest/admin_manual/office/configuration.html#wopi-settings"
						target="_blank"
						rel="noopener"
						class="external">{{ t('richdocuments', 'Click here for more info') }}</a>
				</p>
			</NcNoteCard>

			<fieldset>
				<div>
					<input id="customserver"
						v-model="serverMode"
						type="radio"
						name="serverMode"
						value="custom"
						class="radio"
						:disabled="updating">
					<label for="customserver">{{ t('richdocuments', 'Use your own server') }}</label><br>
					<p class="option-inline">
						<em>{{ t('richdocuments', 'Nextcloud Office requires a separate server running Collabora Online to provide editing capabilities.') }}</em>
						<em>{{ t('richdocuments', 'Collabora Online requires a separate server acting as a WOPI-like Client to provide editing capabilities.') }}</em>
					</p>
					<div v-if="serverMode === 'custom'" class="option-inline">
						<form @submit.prevent.stop="updateServer">
							<p>
								<label for="wopi_url">{{ t('richdocuments', 'URL (and Port) of Collabora Online-server') }}</label><br>
								<input id="wopi_url"
									v-model="settings.wopi_url"
									type="text"
									:disabled="updating">
								<input type="submit" value="Save" :disabled="updating"><br>
							</p>
							<p>
								<input id="disable_certificate_verification"
									v-model="settings.disable_certificate_verification"
									type="checkbox"
									class="checkbox"
									:disabled="updating"
									@change="updateServer">
								<label for="disable_certificate_verification">{{ t('richdocuments', 'Disable certificate verification (insecure)') }}</label><br>
								<em>{{ t('richdocuments', 'Enable if your Collabora Online server uses a self signed certificate') }}</em>
							</p>
						</form>
					</div>
				</div>
				<div v-if="CODECompatible">
					<input id="builtinserver"
						v-model="serverMode"
						type="radio"
						name="serverMode"
						value="builtin"
						class="radio"
						:disabled="updating || !CODEInstalled"
						@click="setBuiltinServer">
					<label for="builtinserver">{{ t('richdocuments', 'Use the built-in CODE - Collabora Online Development Edition') }}</label><br>
					<p v-if="CODEInstalled" class="option-inline">
						<em>{{ t('richdocuments', 'Easy to install, for home use or small groups. A bit slower than a standalone server and without the advanced scalability features.') }}</em>
					</p>
					<div v-else>
						<p class="option-inline">
							<em>
								{{ t('richdocuments', 'This installation does not have a built in server.') }}
								<a :href="appUrl" target="_blank">{{ t('richdocuments', 'Install it from the App Store.') }}</a>
							</em>
						</p>
						<p class="option-inline-emphasized">
							{{ t('richdocuments', 'If the installation from the App Store fails, you can still do that manually using this command:') }}
							<tt>php -d memory_limit=512M occ app:install {{ CODEAppID }}</tt>
						</p>
					</div>
				</div>
				<div>
					<input id="demoserver"
						v-model="serverMode"
						type="radio"
						name="serverMode"
						value="demo"
						class="radio"
						:disabled="updating || hasHostErrors"
						@input="fetchDemoServers">
					<label for="demoserver">{{ t('richdocuments', 'Use a demo server') }}</label><br>
					<p class="option-inline">
						<em>{{ t('richdocuments', 'You can use a demo server provided by Collabora and other service providers for giving Collabora Online a try.') }}</em>
					</p>
					<div v-if="hasHostErrors" class="option-inline-emphasized">
						<p>{{ t('richdocuments', 'Your Nextcloud setup is not capable of connecting to the demo servers because:') }}</p>
						<ul>
							<li v-if="hostErrors[0]">
								{{ t('richdocuments', 'it is a local setup (localhost)') }}
							</li>
							<li v-if="hostErrors[1]">
								{{ t('richdocuments', 'it uses an insecure protocol (HTTP)') }}
							</li>
							<li v-if="hostErrors[2]">
								{{ t('richdocuments', 'it is unreachable from the internet (possibly because of a firewall, or lack of port forwarding)') }}
							</li>
						</ul><br>
						<p>
							{{ t('richdocuments', 'For use cases like this, we offer instructions for a') }} <a title="Quick tryout with Nextcloud docker"
								href="https://www.collaboraoffice.com/code/quick-tryout-nextcloud-docker/"
								target="_blank"
								rel="noopener"
								class="external">{{ t('richdocuments', 'Quick tryout with Nextcloud docker.') }}</a>
						</p>
					</div>
					<div v-if="serverMode === 'demo'" class="option-inline">
						<p v-if="demoServers === null">
							{{ t('richdocuments', 'Loading available demo servers …') }}
						</p>
						<p v-else-if="demoServers.length > 0">
							<NcSelect v-if="serverMode === 'demo'"
								v-model="settings.demoUrl"
								:custom-label="demoServerLabel"
								track-by="demo_url"
								label="demo_url"
								placeholder="Select a demo server"
								:options="demoServers"
								:searchable="false"
								:allow-empty="false"
								:disabled="updating"
								@input="setDemoServer" />
						</p>
						<p v-else>
							{{ t('richdocuments', 'No available demo servers found.') }}
						</p>

						<p v-if="settings.demoUrl">
							<em>
								{{ t('richdocuments', 'Documents opened with the demo server configured will be sent to a 3rd party server. Only use this for evaluating Collabora Online.') }}<br>
								<a :href="settings.demoUrl.provider_url"
									target="_blank"
									rel="noreferrer noopener"
									class="external">{{ providerDescription }}</a>
							</em>
						</p>
					</div>
				</div>
			</fieldset>
		</div>

		<NcModal v-if="serverMode === 'demo' && !approvedDemoModal" @close="serverMode = 'custom'">
			<div class="modal__content">
				<p>{{ t('richdocuments', 'Please make sure you understand that the following will happen if you set up the Collabora Online demo.') }}</p>
				<ul>
					<li>{{ t('richdocuments', 'The service will send users documents to Collabora and/or third party demo servers.') }}</li>
					<li>{{ t('richdocuments', 'This service is not intended for production use, hence the documents will show tile watermarks.') }}</li>
					<li>{{ t('richdocuments', 'The demo service may be under heavy load, and its performance is not representative in any way of the performance of an on-premise installation.') }}</li>
					<li>{{ t('richdocuments', 'These servers are used for testing and development, and may run test versions of the software. As such they may crash, burn, and re-start without warning.') }}</li>
					<li>{{ t('richdocuments', 'The users documents will not be retained by a third party after their session completes except in exceptional circumstances. By using the service, the user gives permission for Collabora engineers to exceptionally use such document data, solely for the purpose of providing, optimizing and improving Collabora Online. Such document data will remain confidential to Collabora and/or any third party providing a demo server.') }}</li>
				</ul>
				<p>{{ t('richdocuments', 'At the first use and after an update, each user will get the warning, explaining all the above.') }}</p>
				<input type="button"
					class="primary"
					:value="t('richdocuments', 'I agree, and use the demo server')"
					@click="approvedDemoModal=true">
				<input type="button" :value="t('richdocuments', 'I will setup my own server')" @click="serverMode = 'custom'">
			</div>
		</NcModal>

		<CoolFrame v-if="tokenGenerated"
			class="section"
			:iframe-type="'admin'"
			:public-wopi-url="settings.public_wopi_url"
			:access-token="accessToken"
			:access-token-t-t-l="accessTokenTTL"
			:wopi-setting-base-url="wopiSettingBaseUrl" />

		<div v-if="isSetup" id="advanced-settings" class="section">
			<h2>{{ t('richdocuments', 'Advanced settings') }}</h2>
			<SettingsCheckbox :value="isOoxml"
				:label="t('richdocuments', 'Use Office Open XML (OOXML) instead of OpenDocument Format (ODF) by default for new files')"
				hint=""
				:disabled="updating"
				@input="updateOoxml" />

			<SettingsCheckbox :value="settings.use_groups?.length > 0"
				:label="t('richdocuments', 'Restrict usage to specific groups')"
				:hint="t('richdocuments', '{productName} is enabled for all users by default. When this setting is active, only members of the specified groups can use it.', { productName })"
				:disabled="updating"
				@input="updateUseGroups">
				<SettingsSelectGroup v-if="uiVisible.use_groups || settings.use_groups?.length > 0"
					v-model="settings.use_groups"
					:label="t('richdocuments', 'Select groups')"
					class="option-inline"
					:disabled="updating"
					@input="updateUseGroups" />
			</SettingsCheckbox>

			<SettingsCheckbox :value="settings.edit_groups?.length > 0"
				:label="t('richdocuments', 'Restrict edit to specific groups')"
				:hint="t('richdocuments', 'All users can edit documents with {productName} by default. When this setting is active, only the members of the specified groups can edit, whereas the others can only view documents.', { productName })"
				:disabled="updating"
				@input="updateEditGroups">
				<SettingsSelectGroup v-if="uiVisible.edit_groups || settings.edit_groups?.length > 0"
					v-model="settings.edit_groups"
					:label="t('richdocuments', 'Select groups')"
					class="option-inline"
					:disabled="updating"
					@input="updateEditGroups" />
			</SettingsCheckbox>

			<SettingsCheckbox v-model="uiVisible.canonical_webroot"
				:label="t('richdocuments', 'Use Canonical webroot')"
				hint=""
				:disabled="updating"
				@input="updateCanonicalWebroot">
				<SettingsInputText v-if="uiVisible.canonical_webroot"
					v-model="settings.canonical_webroot"
					label=""
					:hint="t('richdocuments', 'Canonical webroot, in case there are multiple, for Collabora to use. Provide the one with least restrictions. Eg: Use non-shibbolized webroot if this instance is accessed by both shibbolized and non-shibbolized webroots. You can ignore this setting if only one webroot is used to access this instance.')"
					:disabled="updating"
					class="option-inline"
					@update="updateCanonicalWebroot" />
			</SettingsCheckbox>

			<SettingsCheckbox v-model="uiVisible.external_apps"
				:label="t('richdocuments', 'Enable access for external apps')"
				hint=""
				:disabled="updating"
				@input="updateExternalApps">
				<div v-if="uiVisible.external_apps">
					<SettingsExternalApps class="option-inline"
						:external-apps="settings.external_apps"
						:disabled="updating"
						@input="updateExternalApps" />
				</div>
			</SettingsCheckbox>

			<SettingsInputText v-model="settings.wopi_allowlist"
				label="Allow list for WOPI requests"
				:hint="t('richdocuments', 'List of IPV4 and IPV6 IP-addresses and subnets that are allowed to perform requests of the WOPI endpoints. If no allow list is specified all hosts will be allowed. E.g. 10.0.0.20,10.0.4.0/24')"
				:disabled="updating"
				@update="updateWopiAllowlist" />
		</div>

		<div v-if="isSetup" id="font-settings" class="section">
			<h2>{{ t('richdocuments', 'Extra fonts') }}</h2>
			<SettingsInputFile :label="t('richdocuments', 'Upload extra font file')"
				:button-title="t('richdocuments', 'Upload a font file')"
				:uploading="uploadingFont"
				:mimetypes="fontMimes"
				@change="uploadFont" />
			<SettingsFontList :fonts="settings.fonts"
				:label="t('richdocuments', 'Available fonts')"
				@deleted="onFontDeleted" />
			<em>
				{{ fontHint }}
			</em>
			<em>
				<pre>
					{{ fontXmlHint }}
				</pre>
			</em>
			<em>
				{{ t('richdocuments', 'For ideal document compatibility we recommend you to install commonly used fonts. If your users are working with Microsoft Office, installing their proprietary fonts can be done following the documentation.') }} <a :href="fontCustomDocumentUrl" target="_blank">{{ t('richdocuments', 'Custom fonts documentation') }}</a>
			</em>
		</div>

		<div v-if="isSetup" id="secure-view-settings" class="section">
			<h2>{{ t('richdocuments', 'Secure View') }}</h2>
			<p>{{ t('richdocuments', 'Secure view enables you to secure office documents by blocking downloads, previews and showing a watermark') }}</p>
			<ul>
				<li>{{ t('richdocuments', 'The settings only apply to compatible office files that are opened in Nextcloud Office') }}</li>
				<li>{{ t('richdocuments', 'Downloading the file through WebDAV will be blocked') }}</li>
				<li>{{ t('richdocuments', 'The following options within Nextcloud Office will be disabled: Copy, Download, Export, Print') }}</li>
				<li>{{ t('richdocuments', 'Files may still be downloadable via WOPI requests if WOPI settings are not correctly configured') }}</li>
				<li>{{ t('richdocuments', 'Previews will be blocked') }}</li>
			</ul>
			<SettingsCheckbox v-model="settings.watermark.enabled"
				:label="t('richdocuments', 'Enable secure view')"
				hint=""
				:disabled="updating"
				@input="update" />
			<SettingsInputText v-if="settings.watermark.enabled"
				v-model="settings.watermark.text"
				label="Watermark text"
				:hint="t('richdocuments', 'Supported placeholders: {userId}, {userDisplayName}, {email}, {date}, {themingName}')"
				:disabled="updating"
				@update="update" />
			<div v-if="settings.watermark.enabled">
				<SettingsCheckbox v-model="settings.watermark.allTags"
					:label="t('richdocuments', 'Enforce secure view on tagged files')"
					:disabled="updating"
					@input="update" />
				<p v-if="settings.watermark.allTags" class="checkbox-details">
					<NcSelectTags v-model="settings.watermark.allTagsList" :label="t('richdocuments', 'Select tags to enforce watermarking')" @input="update" />
				</p>
				<SettingsCheckbox v-model="settings.watermark.allGroups"
					:label="t('richdocuments', 'Enforce secure view for users of groups')"
					:disabled="updating"
					@input="update" />
				<p v-if="settings.watermark.allGroups" class="checkbox-details">
					<SettingsSelectGroup v-model="settings.watermark.allGroupsList" :label="t('richdocuments', 'Select tags to enforce watermarking')" @input="update" />
				</p>
				<SettingsCheckbox v-model="settings.watermark.shareAll"
					:label="t('richdocuments', 'Enforce secure view for all shares')"
					hint=""
					:disabled="updating"
					@input="update" />
				<SettingsCheckbox v-if="!settings.watermark.shareAll"
					v-model="settings.watermark.shareRead"
					:label="t('richdocuments', 'Enforce secure view for read only shares')"
					hint=""
					:disabled="updating"
					@input="update" />
				<SettingsCheckbox v-model="settings.watermark.shareTalkPublic"
					:label="t('richdocuments', 'Enforce secure view for all public Talk shares')"
					hint=""
					:disabled="updating"
					@input="update" />
				<SettingsCheckbox v-if="!settings.watermark.shareAll"
					v-model="settings.watermark.shareDisabledDownload"
					:label="t('richdocuments', 'Enforce secure view for shares without download permission')"
					hint=""
					:disabled="updating"
					@input="update" />

				<h3>Link shares</h3>
				<SettingsCheckbox v-model="settings.watermark.linkAll"
					:label="t('richdocuments', 'Enforce secure view for all link shares')"
					hint=""
					:disabled="updating"
					@input="update" />
				<SettingsCheckbox v-if="!settings.watermark.linkAll"
					v-model="settings.watermark.linkSecure"
					:label="t('richdocuments', 'Enforce secure view for download hidden shares')"
					hint=""
					:disabled="updating"
					@input="update" />
				<SettingsCheckbox v-if="!settings.watermark.linkAll"
					v-model="settings.watermark.linkRead"
					:label="t('richdocuments', 'Enforce secure view for read only link shares')"
					hint=""
					:disabled="updating"
					@input="update" />
				<SettingsCheckbox v-if="!settings.watermark.linkAll"
					v-model="settings.watermark.linkTags"
					:label="t('richdocuments', 'Enforce secure view on link shares with specific system tags')"
					:disabled="updating"
					@input="update" />
				<p v-if="!settings.watermark.linkAll && settings.watermark.linkTags" class="checkbox-details">
					<NcSelectTags v-model="settings.watermark.linkTagsList" :label="t('richdocuments', 'Select tags to enforce secure view')" @input="update" />
				</p>
			</div>
		</div>

		<div v-if="isSetup" id="esignature-settings" class="section">
			<h2>{{ t('richdocuments', 'Electronic signature settings') }}</h2>
			<SettingsInputText v-model="settings.esignature_client_id"
				:label="t('richdocuments', 'Client ID for the electronic signature API')"
				:hint="t('richdocuments', 'Fill in the registration form at https://eideasy.com/signup to obtain a client ID and secret.')"
				:disabled="updating"
				@update="updateESignatureClientId" />
			<SettingsInputText v-model="settings.esignature_secret"
				:label="t('richdocuments', 'Secret for the electronic signature API')"
				:hint="t('richdocuments', 'The secret may be downloadable via WOPI requests if WOPI allow list is not correctly configured.')"
				:disabled="updating"
				@update="updateESignatureSecret" />
		</div>

		<GlobalTemplates v-if="isSetup" />
	</div>
</template>

<script>
import Vue from 'vue'
import { loadState } from '@nextcloud/initial-state'
import { generateUrl, generateFilePath } from '@nextcloud/router'
import { showWarning, showError } from '@nextcloud/dialogs'
import { NcModal, NcSelect, NcSelectTags, NcNoteCard } from '@nextcloud/vue'
import axios from '@nextcloud/axios'
import SettingsCheckbox from './SettingsCheckbox.vue'
import SettingsInputText from './SettingsInputText.vue'
import SettingsSelectGroup from './SettingsSelectGroup.vue'
import SettingsExternalApps from './SettingsExternalApps.vue'
import SettingsInputFile from './SettingsInputFile.vue'
import SettingsFontList from './SettingsFontList.vue'
import GlobalTemplates from './AdminSettings/GlobalTemplates.vue'
import { getCurrentUser } from '@nextcloud/auth'

import { isPublicShare, getSharingToken } from '@nextcloud/sharing/public'

import '@nextcloud/dialogs/style.css'
import { getCallbackBaseUrl, getConfigFileUrl } from '../helpers/url.js'
import { getCapabilities } from '../services/capabilities.ts'
import CoolFrame from './CoolFrame.vue'

const SERVER_STATE_OK = 0
const SERVER_STATE_LOADING = 1
const SERVER_STATE_CONNECTION_ERROR = 2
const PROTOCOL_MISMATCH = 3
const SERVER_STATE_BROWSER_CONNECTION_ERROR = 4

const fontMimes = [
	'font/ttf',
	'font/otf',
	'application/font-sfnt',
	'font/opentype',
	'application/vnd.oasis.opendocument.formula-template',
]

export default {
	name: 'AdminSettings',
	components: {
		SettingsCheckbox,
		SettingsInputText,
		SettingsSelectGroup,
		NcSelect,
		NcSelectTags,
		SettingsExternalApps,
		SettingsInputFile,
		SettingsFontList,
		GlobalTemplates,
		NcModal,
		NcNoteCard,
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
			productName: loadState('richdocuments', 'productName', 'Nextcloud Office'),
			hasNextcloudBranding: loadState('richdocuments', 'hasNextcloudBranding', true),

			serverMode: '',
			serverError: SERVER_STATE_LOADING,
			errorMessage: null,
			hostErrors: [window.location.host === 'localhost' || window.location.host === '127.0.0.1', window.location.protocol !== 'https:', false],
			demoServers: null,
			CODEInstalled: 'richdocumentscode' in OC.appswebroots,
			CODECompatible: true,
			CODEAppID: 'richdocumentscode',
			isNginx: false,
			appUrl: generateUrl('/settings/apps/app-bundles/richdocumentscode'),
			approvedDemoModal: false,
			updating: false,
			uploadingFont: false,
			fontMimes,
			fontHintUrl: window.location.protocol + '//' + window.location.host + generateUrl('/apps/richdocuments/settings/fonts.json'),
			fontCustomDocumentUrl: 'https://docs.nextcloud.com/server/latest/admin_manual/office/configuration.html#custom-fonts',
			groups: [],
			tags: [],
			uiVisible: {
				canonical_webroot: false,
				external_apps: false,
				use_groups: false,
				edit_groups: false,
			},
			settings: {
				demoUrl: null,
				wopi_url: null,
				watermark: {
					enabled: false,
					shareAll: false,
					shareRead: false,
					shareTalkPublic: true,
					linkSecure: false,
					linkRead: false,
					linkAll: false,
					linkTags: false,
					linkTagsList: [],
					allGroups: false,
					allGroupsList: [],
					allTags: false,
					allTagsList: [],
					text: '',
				},
				fonts: [],
				hasSettingIframeSupport: false,
			},
			accessToken: '',
			accessTokenTTL: '',
			userId: getCurrentUser()?.uid,
			tokenGenerated: false,
			wopiSettingBaseUrl: '',
		}
	},
	computed: {
		providerDescription() {
			return t('richdocuments', 'Contact {0} to get an own installation.', [this.settings.demoUrl.provider_name])
		},
		isSetup() {
			return this.serverError === SERVER_STATE_OK
		},
		isOoxml() {
			return this.settings.doc_format === 'ooxml'
		},
		hasHostErrors() {
			return this.hostErrors.some(x => x)
		},
		fontHint() {
			return t('richdocuments', 'Make sure to set this URL: {url} in the coolwsd.xml file of your Collabora Online server to ensure the added fonts get loaded automatically. Please note that http:// will only work for debug builds of Collabora Online. In production you must use https:// for remote font config.',
				{ url: this.fontHintUrl },
			)
		},
		shareToken() {
			return getSharingToken()
		},
		fontXmlHint() {
			return `
<remote_font_config>
	<url>${this.fontHintUrl}</url>
</remote_font_config>
			`
		},
		callbackUrl() {
			return this.settings.wopi_callback_url ? this.settings.wopi_callback_url : getCallbackBaseUrl()
		},
	},
	watch: {
		'settings.public_wopi_url'(newVal, oldVal) {
			if (newVal !== oldVal) {
				const protocol = this.checkUrlProtocol(newVal)
				const nextcloudProtocol = this.checkUrlProtocol(window.location.href)
				if (protocol !== nextcloudProtocol) this.serverError = PROTOCOL_MISMATCH
				else this.serverError = Object.values(getCapabilities().collabora).length > 0 ? SERVER_STATE_OK : SERVER_STATE_CONNECTION_ERROR
			}
		},
	},
	async mounted() {
		if (this.settings.hasSettingIframeSupport && this.userId && this.userId.length > 0) {
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
	beforeMount() {
		for (const key in this.initial.settings) {
			if (!Object.prototype.hasOwnProperty.call(this.initial.settings, key)) {
				continue
			}

			const [parent, setting] = key.split('_')
			if (parent === 'watermark') {
				Vue.set(this.settings[parent], setting, this.initial.settings[key])
			} else {
				Vue.set(this.settings, key, this.initial.settings[key])
			}

		}
		Vue.set(this.settings, 'data', this.initial.settings)
		if (this.settings.wopi_url === '') {
			this.serverError = SERVER_STATE_CONNECTION_ERROR
		}
		Vue.set(this.settings, 'edit_groups', this.settings.edit_groups ? this.settings.edit_groups.split('|') : null)
		Vue.set(this.settings, 'use_groups', this.settings.use_groups ? this.settings.use_groups.split('|') : null)
		Vue.set(this.settings, 'fonts', this.initial.fonts ? this.initial.fonts : [])
		Vue.set(this.settings, 'hasSettingIframeSupport', this.initial.hasSettingIframeSupport ?? false)

		this.uiVisible.canonical_webroot = !!(this.settings.canonical_webroot && this.settings.canonical_webroot !== '')
		this.uiVisible.external_apps = !!(this.settings.external_apps && this.settings.external_apps !== '')

		this.demoServers = this.initial.demo_servers

		if (this.initial.web_server && this.initial.web_server.length > 0) {
			this.isNginx = this.initial.web_server.indexOf('nginx') !== -1
		}
		if (this.initial.os_family && this.initial.os_family.length > 0) {
			this.CODECompatible = this.CODECompatible && this.initial.os_family === 'Linux'
		}
		if (this.initial.platform && this.initial.platform.length > 0) {
			const supportedArchs = ['x86_64', 'aarch64']
			this.CODECompatible = this.CODECompatible && supportedArchs.includes(this.initial.platform)
		}
		if (this.initial.platform && this.initial.platform === 'aarch64') {
			this.appUrl = generateUrl('/settings/apps/app-bundles/richdocumentscode_arm64')
			this.CODEInstalled = 'richdocumentscode_arm64' in OC.appswebroots
			this.CODEAppID = 'richdocumentscode_arm64'
		}
		this.checkIfDemoServerIsActive()
		this.checkSettings()
	},
	methods: {
		async generateAccessToken() {
			const { data } = await axios.get(generateUrl('/apps/richdocuments/settings/generateToken/admin'))
			if (data.token) {
				this.accessToken = data.token
				this.accessTokenTTL = data.token_ttl
				console.debug('Admin settings WOPI token generated:', this.accessToken, this.accessTokenTTL)
			} else {
				console.error('Failed to generate token for admin settings')
			}
		},
		async checkSettings() {
			this.errorMessage = null
			this.updating = true
			this.serverError = SERVER_STATE_LOADING

			let result
			try {
				result = await axios.get(generateUrl('/apps/richdocuments/settings/check'))
				this.serverError = SERVER_STATE_OK

			} catch (e) {
				this.serverError = SERVER_STATE_CONNECTION_ERROR
				result = e.response
				const { message } = e.response.data.data
				this.errorMessage = message
			}

			this.updating = false

			const { settings } = result?.data?.data || {}
			for (const settingKey in settings) {
				if (settingKey === 'use_groups' || settingKey === 'edit_groups') {
					this.settings[settingKey] = settings[settingKey] ? settings[settingKey].split('|') : []
					continue
				}
				this.settings[settingKey] = settings[settingKey]
			}
			this.checkFrontend()
		},
		async checkFrontend() {
			try {
				await fetch(this.settings.public_wopi_url + '/hosting/discovery', { mode: 'no-cors' })
				await fetch(this.settings.public_wopi_url + '/hosting/capabilities', { mode: 'no-cors' })
			} catch (e) {
				console.error(e)
				this.serverError = SERVER_STATE_BROWSER_CONNECTION_ERROR
			}
		},
		async fetchDemoServers() {
			try {
				const result = await axios.get(generateUrl('/apps/richdocuments/settings/demo'))
				this.demoServers = result.data
			} catch (e) {
				this.demoServers = []
			}
		},
		update() {
			this.updating = true
			const settings = this.settings
			axios.post(generateUrl('/apps/richdocuments/settings/watermark'), { settings }).then((response) => {
				this.updating = false
			}).catch((error) => {
				this.updating = false
				OC.Notification.showTemporary(t('richdocuments', 'Failed to save settings'))
				console.error(error)
			})
		},

		async updateUseGroups(enabled) {
			if (typeof enabled === 'boolean') {
				this.settings.use_groups = (enabled) ? [] : null
				this.uiVisible.use_groups = Boolean(this.settings.use_groups)
			} else if (enabled.length > 0) {
				this.settings.use_groups = enabled
			}

			await this.updateSettings({
				use_groups: this.settings.use_groups?.join('|') ?? '',
			})
		},
		async updateEditGroups(enabled) {
			if (typeof enabled === 'boolean') {
				this.settings.edit_groups = (enabled) ? [] : null
				this.uiVisible.edit_groups = Boolean(this.settings.edit_groups)
			} else if (enabled.length > 0) {
				this.settings.edit_groups = enabled
			}

			await this.updateSettings({
				edit_groups: this.settings.edit_groups?.join('|') ?? '',
			})
		},
		async updateCanonicalWebroot(canonicalWebroot) {
			this.settings.canonical_webroot = (typeof canonicalWebroot === 'boolean') ? '' : canonicalWebroot
			if (canonicalWebroot === true) {
				return
			}
			await this.updateSettings({
				canonical_webroot: this.settings.canonical_webroot,
			})
		},
		async updateExternalApps(externalApps) {
			this.settings.external_apps = (typeof externalApps === 'boolean') ? '' : externalApps
			if (externalApps === true) {
				return
			}
			await this.updateSettings({
				external_apps: this.settings.external_apps,
			})
		},
		async updateWopiAllowlist(allowlist) {
			await this.updateSettings({
				wopi_allowlist: allowlist,
			})
		},
		async updateESignatureClientId(id) {
			await this.updateSettings({
				esignature_client_id: id,
			})
		},
		async updateESignatureSecret(secret) {
			await this.updateSettings({
				esignature_secret: secret,
			})
		},
		async updateOoxml(enabled) {
			this.settings.doc_format = enabled ? 'ooxml' : ''
			await this.updateSettings({
				doc_format: this.settings.doc_format,
			})
		},
		async updateServer() {
			this.serverError = SERVER_STATE_LOADING
			try {
				await this.updateSettings({
					wopi_url: this.settings.wopi_url,
					disable_certificate_verification: this.settings.disable_certificate_verification,
				})
				this.serverError = SERVER_STATE_OK
			} catch (e) {
				console.error(e)
				this.serverError = SERVER_STATE_CONNECTION_ERROR
				if (e.response.data.hint === 'missing_capabilities') {
					showWarning('Could not connect to the /hosting/capabilities endpoint. Please check if your webserver configuration is up to date.')
				}
			}
			this.checkIfDemoServerIsActive()
		},
		async updateSettings(data) {
			this.errorMessage = null
			this.updating = true
			try {
				const result = await axios.post(
					generateFilePath('richdocuments', 'ajax', 'admin.php'),
					data,
				)

				this.updating = false

				const { settings } = result?.data?.data || {}

				for (const settingKey in settings) {
					if (settingKey === 'use_groups' || settingKey === 'edit_groups') {
						this.settings[settingKey] = settings[settingKey] ? settings[settingKey].split('|') : []
						continue
					}
					this.settings[settingKey] = settings[settingKey]
				}

				this.checkFrontend()

				return result
			} catch (e) {
				this.updating = false
				const { message } = e.response.data.data
				this.errorMessage = message
				throw e
			}
		},
		checkIfDemoServerIsActive() {
			this.settings.demoUrl = this.demoServers ? this.demoServers.find((server) => server.demo_url === this.settings.wopi_url) : null
			this.settings.CODEUrl = this.CODEInstalled ? window.location.protocol + '//' + window.location.host + generateFilePath(this.CODEAppID, '', '') + 'proxy.php?req=' : null
			if (this.settings.wopi_url && this.settings.wopi_url !== '') {
				this.serverMode = 'custom'
			}
			if (this.settings.demoUrl) {
				this.serverMode = 'demo'
				this.approvedDemoModal = true
			} else if (this.settings.CODEUrl && this.settings.CODEUrl === this.settings.wopi_url) {
				this.serverMode = 'builtin'
			}
		},
		demoServerLabel(server) {
			return `${server.provider_name} — ${server.provider_location}`
		},
		async setDemoServer(server) {
			this.settings.wopi_url = server.demo_url
			this.settings.disable_certificate_verification = false
			await this.updateServer()
		},
		async setBuiltinServer() {
			this.settings.wopi_url = this.settings.CODEUrl
			this.settings.disable_certificate_verification = false
			await this.updateServer()
		},
		checkUrlProtocol(string) {
			let url
			try {
				url = new URL(string)
			} catch (_) {
				return false
			}

			return url.protocol
		},
		uploadFont(event) {
			// TODO define font format list
			const files = event.target.files
			const file = files[0]
			if (file.type !== '' && !fontMimes.includes(file.type)) {
				showError(t('richdocuments', 'Font format not supported ({mime})', { mime: file.type }))
				return
			}
			this.uploadingFont = true

			// Clear input to ensure that the change event will be emitted if
			// the same file is picked again.
			event.target.value = ''

			const formData = new FormData()
			formData.append('fontfile', file)
			const url = generateUrl('/apps/richdocuments/settings/fonts')
			axios.post(url, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}).then((response) => {
				// TODO reload font list
				this.settings.fonts.push(file.name)
			}).catch((error) => {
				console.error(error)
				showError(error?.response?.data?.error)
			}).then(() => {
				this.uploadingFont = false
			})
		},
		onFontDeleted(name) {
			const index = this.settings.fonts.indexOf(name)
			if (index !== -1) {
				this.settings.fonts.splice(index, 1)
			}
		},
	},
}
</script>

<style lang="scss" scoped>
	p {
		margin-bottom: 15px;
	}

	.notecard:deep(p:last-child) {
		margin-bottom: 0;
	}

	.description {
		color: var(--color-text-maxcontrast);
	}

	p.checkbox-details {
		margin-left: 25px;
		margin-top: -10px;
		margin-bottom: 20px;
	}

	input[type='text'],
	.multiselect {
		width: auto;
		min-width: 200px;
		max-width: 100%;
	}

	input#wopi_url {
		width: 300px;
	}

	#secure-view-settings {
		margin-top: 20px;
	}

	.section {
		border-bottom: 1px solid var(--color-border);
	}

	.option-inline {
		margin-left: 25px;
		&:not(.multiselect) {
			margin-top: 10px;
		}
	}

	.option-inline-emphasized {
		margin-left: 25px;
		&:not(.multiselect) {
			margin-top: 10px;
		}

	}

	ul {
		margin-bottom: 15px;
	}

	li {
		list-style: disc;
		padding: 3px;
		margin-left: 20px;
	}

	.modal__content {
		margin: 20px;
		overflow: scroll;
		max-width: 600px;

		ul {
			margin-bottom: 15px;
		}

		li {
			list-style: disc;
			padding: 3px;
			margin-left: 20px;
		}

		button {
			float: right;
		}
	}
</style>
