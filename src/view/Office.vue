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
		<div v-show="loading" id="richdocuments-wrapper">
			<div class="header">
				<!-- This is obviously not the way to go since it would require absolute positioning and therefore not be compatible with viewer actions/sidebar -->
				<div class="avatars">
					<Avatar v-for="view in avatarViews"
						:key="view.ViewId"
						:user="view.UserId"
						:display-name="view.UserName"
						:style="viewColor(view)" />
				</div>
			</div>
			<iframe id="collaboraframe" ref="documentFrame" :src="src" />
		</div>
	</transition>
</template>

<script>
import Avatar from '@nextcloud/vue/dist/Components/Avatar'

import { getDocumentUrlForFile } from '../helpers/url'
import PostMessageService from '../services/postMessage.tsx'
import FilesAppIntegration from './FilesAppIntegration'

const FRAME_DOCUMENT = 'FRAME_DOCUMENT'
const PostMessages = new PostMessageService({
	FRAME_DOCUMENT: () => document.getElementById('collaboraframe').contentWindow,
})

export default {
	name: 'Office',
	components: {
		Avatar,
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
			loading: false,
			views: [],
		}
	},
	computed: {
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
	},
	mounted() {
		PostMessages.registerPostMessageHandler(({ parsed }) => {
			console.debug('[viewer] Received post message', parsed)
			const { msgId, args, deprecated } = parsed
			if (deprecated) { return }

			switch (msgId) {
			case 'loading':
				break
			case 'close':
				this.$parent.close()
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
			}
		})
		this.load()
	},
	methods: {
		async load() {
			const documentUrl = getDocumentUrlForFile(this.filename, this.fileid) + '&path=' + this.filename
			this.$emit('update:loaded', true)
			this.src = documentUrl
			this.loading = true
		},
	},
}
</script>
<style lang="scss">
	.header {
		position: absolute;
		right: 100px;
		top: -50px;

		.avatars {
			display: flex;
			padding: 9px;

			.avatardiv {
				margin-left: -15px;
				box-shadow: 0 0 3px var(--color-box-shadow);
			}

		}
	}

	#richdocuments-wrapper {
		width: 100vw;
		height: calc(100vh - 50px);
		top: 50px;
		left: 0;
		position: absolute;
		z-index: 100000;
		max-width: 100%;
		display: flex;
		flex-direction: column;
		background-color: var(--color-main-background);
		transition: opacity .25s;
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
