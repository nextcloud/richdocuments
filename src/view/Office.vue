<!--
  - @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
  -
  - @author Julius Härtl <jus@bitgrid.net>
  -
  - @license GNU AGPL version 3 or any later version
  -
  - This program is free software: you can redistribute it and/or modify
  - it under the terms of the GNU Affero General Public License as
  - published by the Free Software Foundation, either version 3 of the
  - License, or (at your option) any later version.
  -
  - This program is distributed in the hope that it will be useful,
  - but WITHOUT ANY WARRANTY; without even the implied warranty of
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  - GNU Affero General Public License for more details.
  -
  - You should have received a copy of the GNU Affero General Public License
  - along with this program. If not, see <http://www.gnu.org/licenses/>.
  -
  -->

<template>
	<transition name="fade" appear>
		<div id="richdocuments-wrapper">
			<div v-if="showLoadingIndicator"
				id="cool-loading-overlay"
				:class="{ debug: debug }">
				<EmptyContent v-if="!error" icon="icon-loading">
					{{ t('richdocuments', 'Loading {filename} …', { filename: basename }, 1, {escape: false}) }}
					<template #desc>
						<button @click="close">
							{{ t('richdocuments', 'Cancel') }}
						</button>
					</template>
				</EmptyContent>
				<EmptyContent v-else icon="icon-error">
					{{ t('richdocuments', 'Document loading failed') }}
					<template #desc>
						{{ errorMessage }}<br><br>
						<button @click="close">
							{{ t('richdocuments', 'Close') }}
						</button>
					</template>
				</EmptyContent>
			</div>
			<div v-show="!useNativeHeader && showIframe" class="header">
				<div class="avatars">
					<Avatar v-for="view in avatarViews"
						:key="view.ViewId"
						:user="view.UserId"
						:display-name="view.UserName"
						:show-user-status="false"
						:show-user-status-compact="false"
						:style="viewColor(view)" />
				</div>
				<Actions>
					<ActionButton icon="icon-menu-sidebar" @click="share" />
				</Actions>
			</div>
			<iframe :style="{visibility: showIframe ? 'visible' : 'hidden' }"
				id="collaboraframe"
				ref="documentFrame"
				:src="src" />
		</div>
	</transition>
</template>

<script>
import Avatar from '@nextcloud/vue/dist/Components/Avatar'
import Actions from '@nextcloud/vue/dist/Components/Actions'
import ActionButton from '@nextcloud/vue/dist/Components/ActionButton'
import EmptyContent from '@nextcloud/vue/dist/Components/EmptyContent'
import { loadState } from '@nextcloud/initial-state'

import { basename, dirname } from 'path'
import { getDocumentUrlForFile, getDocumentUrlForPublicFile } from '../helpers/url'
import PostMessageService from '../services/postMessage.tsx'
import FilesAppIntegration from './FilesAppIntegration.js'
import { LOADING_ERROR, checkCollaboraConfiguration, checkProxyStatus } from '../services/collabora.js'
import { enableScrollLock, disableScrollLock } from '../helpers/safariFixer.js'

const FRAME_DOCUMENT = 'FRAME_DOCUMENT'
const PostMessages = new PostMessageService({
	FRAME_DOCUMENT: () => document.getElementById('collaboraframe').contentWindow,
})

const LOADING_STATE = {
	LOADING: 0,
	FRAME_READY: 1,
	DOCUMENT_READY: 2,
	FAILED: -1,
}

export default {
	name: 'Office',
	components: {
		Avatar,
		Actions,
		ActionButton,
		EmptyContent,
	},
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
	},
	data() {
		return {
			src: null,
			loading: LOADING_STATE.LOADING,
			loadingTimeout: null,
			error: null,
			views: [],
		}
	},
	computed: {
		basename() {
			return basename(this.filename)
		},
		useNativeHeader() {
			return true
		},
		avatarViews() {
			return this.views
		},
		viewColor() {
			return view => ({
				'border-color': '#' + ('000000' + Number(view.Color).toString(16)).substr(-6),
				'border-width': '2px',
				'border-style': 'solid',
			})
		},
		showIframe() {
			return this.loading >= LOADING_STATE.FRAME_READY
		},
		showLoadingIndicator() {
			return this.loading !== LOADING_STATE.DOCUMENT_READY
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
		debug() {
			return !!window.TESTING
		},
	},
	async mounted() {
		try {
			await checkCollaboraConfiguration()
			await checkProxyStatus()
		} catch (e) {
			this.error = e.message
			this.loading = LOADING_STATE.FAILED
			return
		}

		const fileList = OCA?.Files?.App?.getCurrentFileList?.()
		FilesAppIntegration.init({
			fileName: basename(this.filename),
			fileId: this.fileid,
			filePath: dirname(this.filename),
			fileList,
			fileModel: fileList?.getModelForFile(basename(this.filename)),
			sendPostMessage: (msgId, values) => {
				PostMessages.sendWOPIPostMessage(FRAME_DOCUMENT, msgId, values)
			},
		})
		PostMessages.registerPostMessageHandler(this.postMessageHandler)
		this.load()
	},
	beforeDestroy() {
		PostMessages.unregisterPostMessageHandler(this.postMessageHandler)
	},
	methods: {
		async load() {
			enableScrollLock()
			const isPublic = document.getElementById('isPublic') && document.getElementById('isPublic').value === '1'
			this.src = getDocumentUrlForFile(this.filename, this.fileid) + '&path=' + encodeURIComponent(this.filename)
			if (isPublic) {
				this.src = getDocumentUrlForPublicFile(this.filename, this.fileid)
			}
			this.loading = LOADING_STATE.LOADING
			this.loadingTimeout = setTimeout(() => {
				console.error('FAILED')
				this.loading = LOADING_STATE.FAILED
				this.error = t('richdocuments', 'Failed to load {productName} - please try again later', { productName: loadState('richdocuments', 'productName', 'Nextcloud Office') })
			}, (OC.getCapabilities().richdocuments.config.timeout * 1000 || 15000))
		},
		documentReady() {
			this.loading = LOADING_STATE.DOCUMENT_READY
			clearTimeout(this.loadingTimeout)
		},
		async share() {
			FilesAppIntegration.share()
		},
		close() {
			disableScrollLock()
			this.$parent.close()
		},
		postMessageHandler({ parsed, data }) {
			if (data === 'NC_ShowNamePicker') {
				this.documentReady()
				return
			} else if (data === 'loading') {
				this.loading = LOADING_STATE.LOADING
				return
			}
			console.debug('[viewer] Received post message', parsed)
			const { msgId, args, deprecated } = parsed
			if (deprecated) { return }

			switch (msgId) {
			case 'App_LoadingStatus':
				if (args.Status === 'Frame_Ready') {
					// defer showing the frame until collabora has finished also loading the document
					this.loading = LOADING_STATE.FRAME_READY
					this.$emit('update:loaded', true)
					FilesAppIntegration.initAfterReady()
				}
				if (args.Status === 'Document_Loaded') {
					this.documentReady()
				} else if (args.Status === 'Failed') {
					this.loading = LOADING_STATE.FAILED
					this.$emit('update:loaded', true)
				}
				break
			case 'Action_Load_Resp':
				if (args.success) {
					this.documentReady()
				} else {
					this.error = args.errorMsg
					this.loading = LOADING_STATE.FAILED
				}
				break
			case 'loading':
				break
			case 'close':
				this.close()
				break
			case 'Get_Views_Resp':
			case 'Views_List':
				this.views = args
				break
			case 'UI_InsertGraphic':
				FilesAppIntegration.insertGraphic((filename, url) => {
					PostMessages.sendWOPIPostMessage(FRAME_DOCUMENT, 'postAsset', { FileName: filename, Url: url })
				})
				break
			case 'UI_CreateFile':
				FilesAppIntegration.createNewFile(args.DocumentType)
				break
			case 'File_Rename':
				FilesAppIntegration.rename(args.NewName)
				break
			case 'UI_FileVersions':
			case 'rev-history':
				FilesAppIntegration.showRevHistory()
				break
			case 'App_VersionRestore':
				if (args.Status === 'Pre_Restore_Ack') {
					FilesAppIntegration.restoreVersionExecute()
				}
				break
			case 'UI_Share':
				this.share()
				break
			}
		},
	},
}
</script>
<style lang="scss">
	#cool-loading-overlay {
		border-top: 3px solid var(--color-primary-element);
		position: absolute;
		height: 100%;
		width: 100%;
		z-index: 1;
		top: 0;
		left: 0;
		background-color: #fff;
		&.debug {
			opacity: .5;
		}

		.empty-content p {
			text-align: center;
		}
	}

	.header {
		position: absolute;
		right: 44px;
		top: 3px;
		z-index: 99999;
		display: flex;
		background-color: #fff;

		.avatars {
			display: flex;
			padding: 4px;

			.avatardiv {
				margin-left: -15px;
				box-shadow: 0 0 3px var(--color-box-shadow);
			}

		}

		.icon-menu-sidebar {
			background-image: var(--icon-menu-sidebar-000) !important;
		}
	}

	#richdocuments-wrapper {
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		position: absolute;
		z-index: 100000;
		max-width: 100%;
		display: flex;
		flex-direction: column;
		background-color: var(--color-main-background);
		transition: opacity .25s;

		.viewer & {
			height: 100vh;
			top: -50px;
		}
	}

	iframe {
		width: 100%;
		flex-grow: 1;
	}

	.fade-enter-active, .fade-leave-active {
		transition: opacity .25s;
	}

	.fade-enter, .fade-leave-to {
		opacity: 0;
	}
</style>
