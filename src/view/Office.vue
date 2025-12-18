<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div class="office-viewer" :class="{ 'office-viewer__embedding': isEmbedded }">
		<div v-if="showLoadingIndicator"
			class="office-viewer__loading-overlay"
			:class="{ debug: debug }">
			<NcEmptyContent v-if="!error" :name="loadingMessage">
				<template #icon>
					<NcLoadingIcon />
				</template>
				<template #action>
					<NcButton @click="close">
						{{ t('richdocuments', 'Cancel') }}
					</NcButton>
				</template>
			</NcEmptyContent>
			<NcEmptyContent v-else :name="t('richdocuments', 'Document loading failed')" :description="errorMessage">
				<template #icon>
					<AlertOctagonOutline />
				</template>
				<template #description>
					<p>{{ errorMessage }}</p>
					<p v-if="showAdminStorageFailure">
						{{ t('richdocuments', 'Please check the Collabora Online server log for more details and make sure that Nextcloud can be reached from there.') }}
					</p>
					<p v-if="showAdminWebsocketFailure">
						{{ t('richdocuments', 'Socket connection closed unexpectedly. The reverse proxy might be misconfigured, please contact the administrator.') }}
						<a href="https://docs.nextcloud.com/server/latest/admin_manual/office/proxy.html"
							target="_blank"
							rel="noreferrer noopener"
							class="external">
							{{ t('richdocuments', 'More information can be found in the reverse proxy documentation') }}
						</a>
					</p>
				</template>
				<template #action>
					<NcButton @click="close">
						{{ t('richdocuments', 'Close') }}
					</NcButton>
				</template>
			</NcEmptyContent>
		</div>
		<form ref="form"
			:target="iframeId"
			:action="formData.action"
			method="post">
			<input name="access_token" :value="formData.accessToken" type="hidden">
			<input name="access_token_ttl" :value="formData.accessTokenTTL" type="hidden">
			<input name="ui_defaults" :value="formData.uiDefaults" type="hidden">
			<input name="css_variables" :value="formData.cssVariables" type="hidden">
			<input name="theme" :value="formData.theme" type="hidden">
			<input name="buy_product" value="https://nextcloud.com/pricing" type="hidden">
			<input name="host_session_id" :value="formData.hostSessionID" type="hidden">
			<input name="wopi_setting_base_url" :value="formData.wopiSettingBaseUrl" type="hidden">
		</form>
		<iframe :id="iframeId"
			ref="documentFrame"
			:name="iframeId"
			data-cy="coolframe"
			scrolling="no"
			allowfullscreen
			allow="clipboard-read *; clipboard-write *"
			class="office-viewer__iframe"
			:style="{visibility: showIframe ? 'visible' : 'hidden' }"
			:src="iframeSrc"
			:title="iframeTitle" />

		<NcButton v-if="isEmbedded && !hasWidgetEditingEnabled" class="toggle-interactive" @click="toggleEdit">
			{{ t('richdocuments', 'Edit') }}
			<template #icon>
				<PencilIcon />
			</template>
		</NcButton>
		<ZoteroHint :show.sync="showZotero" @submit="reload" />
	</div>
</template>

<script>
import PencilIcon from 'vue-material-design-icons/PencilOutline.vue'
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import NcEmptyContent from '@nextcloud/vue/dist/Components/NcEmptyContent.js'
import NcLoadingIcon from '@nextcloud/vue/dist/Components/NcLoadingIcon.js'
import AlertOctagonOutline from 'vue-material-design-icons/AlertOctagonOutline.vue'
import { loadState } from '@nextcloud/initial-state'
import { showInfo, spawnDialog } from '@nextcloud/dialogs'

import ZoteroHint from '../components/Modal/ZoteroHint.vue'
import { basename, dirname } from 'path'
import { getRandomId } from '../helpers/index.js'
import {
	getNextcloudUrl,
	getWopiUrl,
	getConfigFileUrl,
} from '../helpers/url.js'
import PostMessageService from '../services/postMessage.tsx'
import FilesAppIntegration from './FilesAppIntegration.js'
import { LOADING_ERROR, checkCollaboraConfiguration, checkProxyStatus } from '../services/collabora.js'
import { enableScrollLock, disableScrollLock } from '../helpers/mobileFixer.js'
import axios from '@nextcloud/axios'
import {
	generateUrl,
	imagePath,
	generateFilePath,
} from '@nextcloud/router'
import { isPublicShare, getSharingToken } from '@nextcloud/sharing/public'
import { getCapabilities } from './../services/capabilities.ts'
import {
	generateCSSVarTokens,
	getCollaboraTheme,
	getUIDefaults,
} from '../helpers/coolParameters.js'
import Config from '../services/config.tsx'
import autoLogout from '../mixins/autoLogout.js'
import openLocal from '../mixins/openLocal.js'
import pickLink from '../mixins/pickLink.js'
import assistant from '../mixins/assistant.js'
import saveAs from '../mixins/saveAs.js'
import uiMention from '../mixins/uiMention.js'
import version from '../mixins/version.js'
import { getCurrentUser, getGuestNickname } from '@nextcloud/auth'
import { shouldAskForGuestName } from '../helpers/guestName.js'

const FRAME_DOCUMENT = 'FRAME_DOCUMENT'

const LOADING_STATE = {
	LOADING: 0,
	FRAME_READY: 1,
	DOCUMENT_READY: 2,
	FAILED: -1,
}

export default {
	name: 'Office',
	components: {
		AlertOctagonOutline,
		NcButton,
		NcEmptyContent,
		NcLoadingIcon,
		PencilIcon,
		ZoteroHint,
	},
	mixins: [
		autoLogout, openLocal, pickLink, saveAs, uiMention, version, assistant,
	],
	props: {
		filename: {
			type: String,
			default: null,
		},
		fileid: {
			type: Number,
			default: null,
		},
		hasPreview: {
			type: Boolean,
			required: false,
			default: () => false,
		},
		source: {
			type: String,
			default: null,
		},
		mime: {
			type: String,
			default: null,
		},
		permissions: {
			type: String,
			default: '',
		},
		isEmbedded: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			postMessage: null,
			iframeId: 'collaboraframe_' + getRandomId(),
			iframeSrc: null,
			loading: LOADING_STATE.LOADING,
			loadingTimeout: null,
			error: null,
			errorType: null,
			loadingMsg: null,

			showLinkPicker: false,
			showZotero: false,
			modified: false,
			hasWidgetEditingEnabled: false,

			// Track the last requested save-as filename for export operations
			lastSaveAsFilename: null,

			// Store original favicon for restoration
			originalFavicon: null,

			formData: {
				action: null,
				accessToken: null,
				accessTokenTTL: null,
				uiDefaults: getUIDefaults(),
				cssVariables: generateCSSVarTokens(),
				theme: getCollaboraTheme(),
				hostSessionID: 'nextcloud ' + OC.config.version + ' - richdocuments ' + getCapabilities().version,
				wopiSettingBaseUrl: getConfigFileUrl(),
			},
		}
	},
	computed: {
		showIframe() {
			return this.loading >= LOADING_STATE.FRAME_READY || this.debug
		},
		iframeTitle() {
			return loadState('richdocuments', 'productName', 'Nextcloud Office')
		},
		showLoadingIndicator() {
			return this.loading < LOADING_STATE.FRAME_READY
		},
		errorMessage() {
			switch (parseInt(this.error)) {
			case LOADING_ERROR.COLLABORA_UNCONFIGURED:
				return t('richdocuments', '{productName} is not configured', { productName: loadState('richdocuments', 'productName', 'Nextcloud Office') })
			case LOADING_ERROR.PROXY_FAILED:
				return t('richdocuments', 'Starting the built-in CODE server failed')
			default:
				return this.error
			}
		},
		loadingMessage() {
			if (this.loadingMsg) {
				return this.loadingMsg
			}

			return t('richdocuments', 'Loading {filename} …', { filename: basename(this.filename) }, 1, { escape: false })
		},
		debug() {
			return !!window.TESTING
		},
		isPublic() {
			return isPublicShare()
		},
		shareToken() {
			return getSharingToken()
		},
		showAdminStorageFailure() {
			return getCurrentUser()?.isAdmin && this.errorType === 'websocketloadfailed'
		},
		showAdminWebsocketFailure() {
			return getCurrentUser()?.isAdmin && this.errorType === 'websocketconnectionfailed'
		},
	},
	watch: {
		hasWidgetEditingEnabled() {
			this.load()
		},
	},
	async mounted() {
		// Store and update favicon
		this.storeFavicon()
		this.updateFavicon()

		this.postMessage = new PostMessageService({
			FRAME_DOCUMENT: () => document.getElementById(this.iframeId).contentWindow,
		})
		try {
			await checkCollaboraConfiguration()
			await checkProxyStatus()
		} catch (e) {
			this.error = e.message
			this.loading = LOADING_STATE.FAILED
			return
		}

		if (this.fileid) {
			const fileList = OCA?.Files?.App?.getCurrentFileList?.()
			FilesAppIntegration.init({
				fileName: basename(this.filename),
				fileId: this.fileid,
				filePath: dirname(this.filename),
				fileList,
				fileModel: fileList?.getModelForFile(basename(this.filename)),
				sendPostMessage: (msgId, values) => {
					this.postMessage.sendWOPIPostMessage(FRAME_DOCUMENT, msgId, values)
				},
			})

			window.OCA?.Files?.Sidebar?.close()
		}
		this.postMessage.registerPostMessageHandler(this.postMessageHandler)

		if (shouldAskForGuestName(this.mime, this.permissions?.includes('W'))) {
			const { default: GuestNamePicker } = await import(
				/* webpackChunkName: 'GuestNamePicker' */
				'../components/GuestNamePicker.vue')

			spawnDialog(GuestNamePicker, {
				fileName: basename(this.filename),
				onSubmit: async () => {
					await this.load()
				},
			})
		} else {
			await this.load()
		}
	},
	beforeDestroy() {
		this.postMessage.unregisterPostMessageHandler(this.postMessageHandler)
		this.restoreFavicon()
	},
	methods: {
		async load() {
			const fileid = this.fileid ?? basename(dirname(this.source))
			const version = this.fileid ? 0 : basename(this.source)

			enableScrollLock()

			// Generate WOPI token
			const { data } = await axios.post(generateUrl('/apps/richdocuments/token'), {
				fileId: fileid, shareToken: this.shareToken, version, guestName: getGuestNickname(),
			})

			if (data.federatedUrl) {
				this.$set(this.formData, 'action', data.federatedUrl)
				this.$nextTick(() => this.$refs.form.submit())
				this.loading = LOADING_STATE.DOCUMENT_READY
				return
			}

			Config.update('urlsrc', data.urlSrc)
			Config.update('wopi_callback_url', loadState('richdocuments', 'wopi_callback_url', ''))
			Config.update('startPresentation', loadState('richdocuments', 'startPresentation', false))

			const forceReadOnly = this.isEmbedded && !this.hasWidgetEditingEnabled

			// Generate form and submit to the iframe
			const action = getWopiUrl({
				fileId: fileid + '_' + loadState('richdocuments', 'instanceId', 'instanceid') + (version > 0 ? '_' + version : ''),
				readOnly: forceReadOnly || version > 0,
				revisionHistory: !this.isPublic,
				closeButton: !Config.get('hideCloseButton') && !this.isEmbedded,
				startPresentation: Config.get('startPresentation'),
				target: data.target,
			})
			this.$set(this.formData, 'action', action)
			this.$set(this.formData, 'accessToken', data.token)
			this.$nextTick(() => this.$refs.form.submit())

			this.loading = LOADING_STATE.LOADING
			this.loadingTimeout = setTimeout(() => {
				console.error('Document loading failed due to timeout: Please check for failing network requests')
				this.loading = LOADING_STATE.FAILED
				this.error = t('richdocuments', 'Failed to load {productName} - please try again later', { productName: loadState('richdocuments', 'productName', 'Nextcloud Office') })
			}, (getCapabilities().config.timeout * 1000 || 15000))
		},
		sendPostMessage(msgId, values = {}) {
			this.postMessage.sendWOPIPostMessage(FRAME_DOCUMENT, msgId, values)
		},
		documentReady() {
			this.loading = LOADING_STATE.DOCUMENT_READY
			clearTimeout(this.loadingTimeout)
			this.sendPostMessage('Host_PostmessageReady')
		},
		async share() {
			FilesAppIntegration.share()
		},
		close() {
			FilesAppIntegration.close()
			if (this.modified) {
				FilesAppIntegration.updateFileInfo(undefined, Date.now())
			}
			disableScrollLock()
			this.restoreFavicon()
			this.$emit('close')
		},
		reload() {
			this.loading = LOADING_STATE.LOADING
			this.load()
			this.$refs.documentFrame.contentWindow.location.replace(this.iframeSrc)
		},
		postMessageHandler({ parsed }) {
			const { msgId, args, deprecated } = parsed
			console.debug('[viewer] Received post message', msgId, args, deprecated)
			if (deprecated) {
				return
			}

			switch (msgId) {
			case 'App_LoadingStatus':
				if (args.Status === 'Frame_Ready') {
					// defer showing the frame until collabora has finished also loading the document
					this.loading = LOADING_STATE.FRAME_READY
					this.$emit('update:loaded', true)
					FilesAppIntegration.initAfterReady()
				} else if (args.Status === 'Document_Loaded') {
					this.documentReady()

					if (loadState('richdocuments', 'open_local_editor', true) && !this.isEmbedded) {
				        this.sendPostMessage('Insert_Button', {
					        id: 'Open_Local_Editor',
					        imgurl: window.location.protocol + '//' + getNextcloudUrl() + imagePath('richdocuments', 'launch.svg'),
					        mobile: false,
					        label: t('richdocuments', 'Open in local editor'),
					        hint: t('richdocuments', 'Open in local editor'),
					        insertBefore: 'print',
				        })
			        }
				} else if (args.Status === 'Failed') {
					this.loading = LOADING_STATE.FAILED
					this.$emit('update:loaded', true)
				}
				break
			case 'Action_Load_Resp':
				if (args.success) {
					this.documentReady()
				} else {
					if (args.errorType === 'clusterscaling') {
						this.loadingMsg = t('richdocuments', 'Cluster is scaling …')
					} else {
						this.error = args.errorMsg
						this.errorType = args.errorType
						this.loading = LOADING_STATE.FAILED
						clearTimeout(this.loadingTimeout)
					}
				}
				break
			case 'UI_Close':
				this.close()
				break
			case 'Session_Closed':
				this.handleSessionClosed(args)
				break
			case 'UI_SaveAs':
				this.saveAs(args.format)
				break
			case 'Action_Save_Resp':
				console.debug('[viewer] Received post message Action_Save_Resp', args, this.lastSaveAsFilename)
				if (args.success) {
					let newFileName = args.fileName

					// If no filename is provided for exportas, use the last tracked filename
					if (!newFileName && args.result === 'exportas' && this.lastSaveAsFilename) {
						newFileName = this.lastSaveAsFilename
					}

					if (newFileName && newFileName !== this.filename) {
						// When exporting (e.g., DOCX -> PDF), a new file is created
						// Fetch its metadata and emit files:node:created to show it in the files list
						FilesAppIntegration.createNodeForNewFile(newFileName)
					} else {
						// When saving the current file, update its modification time
						FilesAppIntegration.updateFileInfo(undefined, Date.now())
					}
					this.lastSaveAsFilename = null
				}
				break
			case 'UI_InsertGraphic':
				FilesAppIntegration.insertGraphic((filename, url) => {
					this.postMessage.sendWOPIPostMessage(FRAME_DOCUMENT, 'Action_InsertGraphic', {
						filename,
						url,
					})
				})
				break
			case 'UI_InsertFile':
				FilesAppIntegration.insertFile(args.mimeTypeFilter, (filename, url) => {
					this.postMessage.sendWOPIPostMessage(FRAME_DOCUMENT, args.callback, {
						filename,
						url,
					})
				})
				break
			case 'UI_Mention':
				this.uiMention(parsed.args)
				break
			case 'UI_CreateFile':
				FilesAppIntegration.createNewFile(args.DocumentType)
				break
			case 'File_Rename':
				FilesAppIntegration.rename(decodeURIComponent(args.NewName))
				break
			case 'UI_FileVersions':
				FilesAppIntegration.showRevHistory()
				break
			case 'App_VersionRestore':
				if (args.Status === 'Pre_Restore_Ack') {
					this.handlePreRestoreAck()
				}
				break
			case 'UI_Share':
				this.share()
				break
			case 'UI_ZoteroKeyMissing':
				this.showZotero = true
				break
			// FIXME: Remove once https://github.com/CollaboraOnline/online/pull/8926 is released
			case 'UI UI_PickLink':
			case 'UI_PickLink':
				this.pickLink()
				break
			case 'UI_InsertAIContent':
				this.openAssistant()
				break
			case 'Action_GetLinkPreview':
				this.resolveLink(args.url)
				break
			case 'Action_Save':
				if (this.modified) {
					FilesAppIntegration.updateFileInfo(undefined, Date.now())
				}
				break
			case 'Clicked_Button':
				this.buttonClicked(args)
				break
			case 'Doc_ModifiedStatus':
				if (args.Modified !== this.modified && !this.openingLocally) {
					FilesAppIntegration.updateFileInfo(undefined, Date.now())
				}
				this.modified = args.Modified
				break
			}
		},

		async buttonClicked(args) {
			if (args?.Id === 'Open_Local_Editor') {
				this.startOpenLocalProcess()
			}
		},

		handleSessionClosed({ Reason }) {
			if (Reason !== 'OwnerTermination') {
				return
			}
			if (this.openingLocally) {
				return
			}

			showInfo(t('richdocuments', 'The collaborative editing was terminated by another user'))
			this.close()
		},

		toggleEdit() {
			this.hasWidgetEditingEnabled = true
		},

		getDocumentTypeIcon() {
			const mime = this.mime.toLowerCase()

			if (mime.includes('spreadsheet')
				|| mime.includes('sheet')
				|| mime.includes('excel')
				|| mime.includes('csv')
				|| mime.includes('numbers')) {
				return 'x-office-spreadsheet'
			}

			if (mime.includes('presentation')
				|| mime.includes('powerpoint')
				|| mime.includes('slideshow')
				|| mime.includes('keynote')) {
				return 'x-office-presentation'
			}

			if (mime.includes('drawing')
				|| mime.includes('graphics')
				|| mime.includes('visio')) {
				return 'x-office-drawing'
			}

			return 'x-office-document'
		},

		restoreFavicon() {
			if (this.originalFavicon) {
				const link = document.querySelector('link[rel*="icon"]')
				if (link) {
					link.href = this.originalFavicon
				}
			}
		},

	},
}
</script>
<style lang="scss" scoped>
.office-viewer {
	z-index: 100000;
	max-width: 100%;
	display: flex;
	flex-direction: column;
	background-color: var(--color-main-background);

	&__loading-overlay:not(.viewer__file--hidden) {
		border-top: 3px solid var(--color-primary-element);
		display: flex;
		height: 100%;
		width: 100%;
		z-index: 1;
		top: 0;
		left: 0;
		background-color: var(--color-main-background);
		&.debug {
			opacity: .5;
		}

		::v-deep .empty-content p {
			text-align: center;
		}

		.empty-content {
			align-self: center;
			flex-grow: 1;
		}
	}

	&__embedding {
		min-height: 400px;

		.toggle-interactive {
			position: sticky;
			bottom: 12px;
			right: 12px;
			z-index: 1;
			margin-left: auto;
			margin-right: 0;
		}
	}

	&__iframe {
		width: 100%;
		flex-grow: 1;
	}
}
</style>

<style lang="scss">
.viewer__content:not(.viewer--split) .office-viewer:not(.viewer__file--hidden):not(.widget-file) {
	width: 100%;
	height: 100vh;
	height: 100dvh;
	top: -50px;
	position: absolute;
}

[data-handler="richdocuments"] .modal-container {
	bottom: 0;
}

.viewer__content.viewer--split .office-viewer {
	height: 100%;
	width: 100%;
}
</style>
