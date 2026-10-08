<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div class="office-viewer" :class="{ 'office-viewer__embedding': isEmbedded }">
		<div
			v-if="showLoadingIndicator"
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
						<a
							href="https://docs.nextcloud.com/server/latest/admin_manual/office/proxy.html"
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
		<form
			ref="form"
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
		<iframe
			:id="iframeId"
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

		<NcButton v-if="isEmbedded" class="toggle-interactive" @click="toggleEdit">
			{{ toggleEditString }}
			<template #icon>
				<EyeIcon v-if="hasWidgetEditingEnabled" />
				<PencilIcon v-else />
			</template>
		</NcButton>
		<ZoteroHint v-model:show="showZotero" @submit="reload" />
	</div>
</template>

<script>
import { getCurrentUser, getGuestNickname } from '@nextcloud/auth'
import axios from '@nextcloud/axios'
import { showInfo } from '@nextcloud/dialogs'
import { getSidebar } from '@nextcloud/files'
import { loadState } from '@nextcloud/initial-state'
import { translate as t } from '@nextcloud/l10n'
import {
	generateFilePath,
	generateUrl,
	imagePath,
} from '@nextcloud/router'
import { getSharingToken, isPublicShare } from '@nextcloud/sharing/public'
import { spawnDialog } from '@nextcloud/vue/functions/dialog'
import { basename, dirname } from 'path'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcEmptyContent from '@nextcloud/vue/components/NcEmptyContent'
import NcLoadingIcon from '@nextcloud/vue/components/NcLoadingIcon'
import AlertOctagonOutline from 'vue-material-design-icons/AlertOctagonOutline.vue'
import EyeIcon from 'vue-material-design-icons/EyeOutline.vue'
import PencilIcon from 'vue-material-design-icons/PencilOutline.vue'
import ZoteroHint from '../components/Modal/ZoteroHint.vue'
import {
	generateCSSVarTokens,
	getCollaboraTheme,
	getUIDefaults,
} from '../helpers/coolParameters.js'
import { shouldAskForGuestName } from '../helpers/guestName.js'
import { getRandomId } from '../helpers/index.js'
import { disableScrollLock, enableScrollLock } from '../helpers/mobileFixer.js'
import {
	getConfigFileUrl,
	getNextcloudUrl,
	getWopiUrl,
} from '../helpers/url.js'
import assistant from '../mixins/assistant.js'
import autoLogout from '../mixins/autoLogout.js'
import openLocal from '../mixins/openLocal.js'
import pickLink from '../mixins/pickLink.js'
import saveAs from '../mixins/saveAs.js'
import uiMention from '../mixins/uiMention.js'
import version from '../mixins/version.js'
import {
	checkCollaboraConfiguration,
	checkProxyStatus,
	isBuiltinCodeServerUsed,
	LOADING_ERROR,
} from '../services/collabora.js'
import Config from '../services/config.tsx'
import PostMessageService from '../services/postMessage.tsx'
import { getCapabilities } from './../services/capabilities.ts'
import FilesAppIntegration from './FilesAppIntegration.js'

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
		EyeIcon,
		PencilIcon,
		ZoteroHint,
	},

	mixins: [
		autoLogout,
		openLocal,
		pickLink,
		saveAs,
		uiMention,
		version,
		assistant,
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

	emits: ['close', 'update:loaded'],
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

			// Active document identity. The filename/fileid props only carry the
			// initially opened document; these are updated when a save-as moves
			// the editor session to a new file.
			activeFileid: this.fileid,
			activeFilename: this.filename,

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
			return loadState('richdocuments', 'productName', 'Nextcloud Office (Collabora)')
		},

		showLoadingIndicator() {
			return this.loading < LOADING_STATE.FRAME_READY
		},

		errorMessage() {
			switch (parseInt(this.error)) {
				case LOADING_ERROR.COLLABORA_UNCONFIGURED:
					return t('richdocuments', '{productName} is not configured', { productName: loadState('richdocuments', 'productName', 'Nextcloud Office (Collabora)') })
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

			return t('richdocuments', 'Loading {filename} …', { filename: basename(this.activeFilename) }, 1, { escape: false })
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

		toggleEditString() {
			return this.hasWidgetEditingEnabled
				? t('richdocuments', 'Preview')
				: t('richdocuments', 'Edit')
		},
	},

	watch: {
		hasWidgetEditingEnabled() {
			this.load()
		},

		// The viewer hides the handler until it is loaded, which would hide the error
		loading(state) {
			if (state === LOADING_STATE.FAILED) {
				this.$emit('update:loaded', true)
			}
		},
	},

	async mounted() {
		this.storeFavicon()
		this.updateFavicon()

		this.postMessage = new PostMessageService({
			FRAME_DOCUMENT: () => document.getElementById(this.iframeId).contentWindow,
		})
		try {
			await checkCollaboraConfiguration()
			if (isBuiltinCodeServerUsed()) {
				this.loadingMsg = t('richdocuments', 'Starting the built-in CODE server …')
			}
			await checkProxyStatus()
			this.loadingMsg = null
		} catch (e) {
			this.error = e.message
			this.loading = LOADING_STATE.FAILED
			return
		}

		if (this.activeFileid) {
			const fileList = OCA?.Files?.App?.getCurrentFileList?.()
			FilesAppIntegration.init({
				fileName: basename(this.activeFilename),
				fileId: this.activeFileid,
				filePath: dirname(this.activeFilename),
				fileList,
				fileModel: fileList?.getModelForFile(basename(this.activeFilename)),
				sendPostMessage: (msgId, values) => {
					this.postMessage.sendWOPIPostMessage(FRAME_DOCUMENT, msgId, values)
				},
			})

			getSidebar()?.close()
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

	beforeUnmount() {
		this.postMessage.unregisterPostMessageHandler(this.postMessageHandler)
		this.restoreFavicon()
		FilesAppIntegration.emitPendingNodeUpdate()
	},

	methods: {
		t,
		async load() {
			const tokenParams = this.tokenRequestParams()
			const { fileId: fileid, version } = tokenParams

			enableScrollLock()

			// Generate WOPI token
			let data
			try {
				({ data } = await axios.post(generateUrl('/apps/richdocuments/token'), tokenParams))
			} catch (e) {
				console.error('Failed to generate the WOPI token', e)
				this.error = t('richdocuments', 'Failed to load {productName} - please try again later', { productName: loadState('richdocuments', 'productName', 'Nextcloud Office (Collabora)') })
				this.loading = LOADING_STATE.FAILED
				return
			}

			if (data.federatedUrl) {
				try {
					this.postMessage.setAllowedOrigins([new URL(data.federatedUrl).origin, window.location.origin])
					this.postMessage.setTargetOrigins({ FRAME_DOCUMENT: new URL(data.federatedUrl).origin })
				} catch (e) {
					console.warn('[richdocuments] Could not derive origin from federatedUrl', e)
				}
				this.formData.action = data.federatedUrl
				this.$nextTick(() => this.$refs.form?.submit())
				this.loading = LOADING_STATE.DOCUMENT_READY
				return
			}

			Config.update('urlsrc', data.urlSrc)
			try {
				this.postMessage.setAllowedOrigins([new URL(data.urlSrc).origin, window.location.origin])
				this.postMessage.setTargetOrigins({ FRAME_DOCUMENT: new URL(data.urlSrc).origin })
			} catch (e) {
				console.warn('[richdocuments] Could not derive Collabora origin from urlsrc', e)
			}
			Config.update('wopi_callback_url', loadState('richdocuments', 'wopi_callback_url', ''))
			Config.update('startPresentation', loadState('richdocuments', 'startPresentation', false))

			const forceReadOnly = this.isEmbedded && !this.hasWidgetEditingEnabled

			// Generate form and submit to the iframe
			const action = getWopiUrl({
				fileId: fileid + '_' + loadState('richdocuments', 'instanceId', 'instanceid') + (version && version !== '0' ? '_' + version : ''),
				readOnly: forceReadOnly || (version && version !== '0'),
				revisionHistory: !this.isPublic,
				closeButton: !Config.get('hideCloseButton') && !this.isEmbedded,
				startPresentation: Config.get('startPresentation'),
				target: data.target,
			})
			this.formData.action = action
			this.formData.accessToken = data.token
			this.formData.accessTokenTTL = data.token_ttl * 1000
			this.$nextTick(() => this.$refs.form?.submit())

			this.loading = LOADING_STATE.LOADING
			this.loadingTimeout = setTimeout(() => {
				console.error('Document loading failed due to timeout: Please check for failing network requests')
				this.loading = LOADING_STATE.FAILED
				this.error = t('richdocuments', 'Failed to load {productName} - please try again later', { productName: loadState('richdocuments', 'productName', 'Nextcloud Office (Collabora)') })
			}, (getCapabilities().config.timeout * 1000 || 15000))
		},

		tokenRequestParams() {
			return {
				fileId: this.activeFileid ?? basename(dirname(this.source)),
				shareToken: this.shareToken,
				version: this.activeFileid ? '0' : basename(this.source),
				guestName: getGuestNickname(),
			}
		},

		async refreshToken() {
			try {
				const { data } = await axios.post(generateUrl('/apps/richdocuments/token'), this.tokenRequestParams())
				// Collabora reads a missing ttl as "no expiry" and stops warning about later ones
				this.sendPostMessage('Reset_Access_Token', {
					token: data.token,
					ttl: data.token_ttl * 1000,
				})
			} catch (error) {
				console.error('[richdocuments] Failed to refresh the WOPI access token', error)
			}
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

		async close() {
			FilesAppIntegration.close()
			if (this.modified) {
				await FilesAppIntegration.updateFileInfo(undefined, Date.now())
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

		async switchToSavedAsFile(newBasename) {
			this.loading = LOADING_STATE.LOADING
			const node = await FilesAppIntegration.createNodeForNewFile(newBasename)
			if (!node) {
				// New file could not be resolved, avoid reloading into a bad state
				this.loading = LOADING_STATE.DOCUMENT_READY
				return
			}
			this.activeFilename = node.path
			this.activeFileid = node.fileid

			// FilesAppIntegration keeps its own copy of the file identity
			const fileList = OCA?.Files?.App?.getCurrentFileList?.()
			FilesAppIntegration.init({
				fileName: node.basename,
				fileId: node.fileid,
				filePath: node.dirname,
				fileList,
				fileModel: fileList?.getModelForFile(node.basename),
				sendPostMessage: (msgId, values) => {
					this.postMessage.sendWOPIPostMessage(FRAME_DOCUMENT, msgId, values)
				},
			})
			FilesAppIntegration.changeFilesRoute(node.fileid)

			await this.load()
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
								accessKey: '2',
							})
						}

						if (this.isEmbedded && this.hasWidgetEditingEnabled) {
							this.sendPostMessage('Hide_Sidebar')
						}
					} else if (args.Status === 'Failed') {
						this.loading = LOADING_STATE.FAILED
					}
					break
				case 'Action_Load_Resp':
					if (args.success) {
						this.documentReady()
					} else {
						if (args.errorType === 'clusterscaling') {
							this.loadingMsg = t('richdocuments', 'Cluster is scaling …')
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
				case 'App_TokenExpiring':
				case 'App_TokenExpired':
					this.refreshToken()
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
						this.lastSaveAsFilename = null

						if (newFileName && args.result === 'exportas') {
						// Exporting (e.g. DOCX -> PDF) creates a new file but the
						// editor keeps editing the original, so only surface the
						// new file in the files list.
							FilesAppIntegration.createNodeForNewFile(newFileName)
						} else if (newFileName && newFileName !== basename(this.activeFilename)) {
						// A real save-as: Collabora has switched to a new file, so
						// the editor session has to be re-initialised for it.
							this.switchToSavedAsFile(newFileName)
						} else {
						// When saving the current file, update its modification time
							FilesAppIntegration.updateFileInfo(undefined, Date.now())
						}
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
				case 'UI_Save':
					FilesAppIntegration.updateFileInfo(undefined, Date.now())
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
			this.hasWidgetEditingEnabled = !this.hasWidgetEditingEnabled
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

		storeFavicon() {
			const link = document.querySelector('link[rel*="icon"]')
			if (link) {
				this.originalFavicon = link.href
			}
		},

		updateFavicon() {
			const link = document.querySelector('link[rel*="icon"]')
			if (link) {
				const iconPath = generateFilePath(
					'richdocuments',
					'img',
					this.getDocumentTypeIcon() + '.svg',
				)
				link.href = window.location.protocol + '//' + getNextcloudUrl() + iconPath
			}
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
		min-height: min(50vh, 100vh - 120px) !important;
		max-height: calc(100vh - 120px) !important;

		.toggle-interactive {
			position: absolute;
			bottom: calc(var(--default-grid-baseline) * 2);
			right: calc(var(--default-grid-baseline) * 2);
		}
	}

	&__iframe {
		width: 100%;
		flex-grow: 1;
	}
}
</style>

<style lang="scss">
richdocuments-viewer {
	display: block;
	width: 100%;
	height: 100%;
}

// Fill the viewer, which shrinks to make room for the files sidebar,
// over the viewport height the mobile fixer sets
.modal-container__content > richdocuments-viewer .office-viewer:not(.widget-file) {
	position: absolute;
	inset: 0;
	height: auto !important;
}

[data-handler="richdocuments"] .modal-header {
	display: none !important;
}

[data-handler="richdocuments"] .modal-container {
	bottom: 0;
}

.viewer__comparison .office-viewer {
	height: 100%;
	width: 100%;
}
</style>
