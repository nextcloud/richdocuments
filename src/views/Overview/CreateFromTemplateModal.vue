<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NcDialog :open="true"
		:name="t('richdocuments', 'New document from template')"
		size="normal"
		@update:open="onOpenUpdate">
		<div class="create-modal">
			<div class="create-modal__preview">
				<img v-if="template.thumbnailUrl && !thumbErrored"
					:src="template.thumbnailUrl"
					:alt="''"
					@error="thumbErrored = true">
				<FileDocumentOutlineIcon v-else :size="64" />
			</div>
			<div class="create-modal__form">
				<NcTextField :value.sync="filename"
					:label="t('richdocuments', 'Filename')"
					:placeholder="t('richdocuments', 'Filename')"
					:error="!!filenameError"
					:helper-text="filenameError || extensionLabel"
					:disabled="busy"
					@keydown.enter="submit" />

				<div class="create-modal__folder">
					<div class="create-modal__folder-label">
						{{ t('richdocuments', 'Save to folder') }}
					</div>
					<button type="button"
						class="create-modal__folder-button"
						:disabled="busy"
						@click="pickFolder">
						<FolderIcon :size="20" />
						<span class="create-modal__folder-path">{{ folderPath }}</span>
					</button>
				</div>

				<div v-if="errorMessage" class="create-modal__error" role="alert">
					{{ errorMessage }}
				</div>
			</div>
		</div>

		<template #actions>
			<NcButton type="tertiary" :disabled="busy" @click="cancel">
				{{ t('richdocuments', 'Cancel') }}
			</NcButton>
			<NcButton type="primary"
				:disabled="!canSubmit"
				@click="submit">
				<template v-if="busy" #icon>
					<NcLoadingIcon :size="20" />
				</template>
				{{ t('richdocuments', 'Create') }}
			</NcButton>
		</template>
	</NcDialog>
</template>

<script>
import NcDialog from '@nextcloud/vue/dist/Components/NcDialog.js'
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import NcTextField from '@nextcloud/vue/dist/Components/NcTextField.js'
import NcLoadingIcon from '@nextcloud/vue/dist/Components/NcLoadingIcon.js'
import FolderIcon from 'vue-material-design-icons/Folder.vue'
import FileDocumentOutlineIcon from 'vue-material-design-icons/FileDocumentOutline.vue'
import { getFilePickerBuilder, FilePickerType, showSuccess } from '@nextcloud/dialogs'
import moment from '@nextcloud/moment'
import { createFromTemplate } from './api.js'
import { fireConfetti } from './confetti.js'
import { getDocumentUrlForFile } from '../../helpers/url.js'

const STORAGE_KEY = 'richdocuments.overview.lastTemplateFolder'

/**
 * Default filename: template basename + current date.
 * @param {object} template the template object
 * @return {string} suggested filename
 */
function defaultFilename(template) {
	const base = (template.name || '').replace(/\.[^.]+$/, '').trim() || t('richdocuments', 'New document')
	return `${base} ${moment().format('YYYY-MM-DD')}`
}

/**
 * Read the last-used target folder from localStorage.
 * @return {string} folder path, defaulting to '/'
 */
function loadLastFolder() {
	try {
		const value = localStorage.getItem(STORAGE_KEY)
		return value && typeof value === 'string' ? value : '/'
	} catch {
		return '/'
	}
}

/**
 * Persist the last-used target folder.
 * @param {string} path absolute user-relative folder path
 */
function saveLastFolder(path) {
	try {
		localStorage.setItem(STORAGE_KEY, path)
	} catch {
		// localStorage may be disabled in private mode; non-fatal.
	}
}

export default {
	name: 'CreateFromTemplateModal',
	components: { NcDialog, NcButton, NcTextField, NcLoadingIcon, FolderIcon, FileDocumentOutlineIcon },
	props: {
		template: { type: Object, required: true },
	},
	data() {
		return {
			filename: defaultFilename(this.template),
			folderPath: loadLastFolder(),
			busy: false,
			errorMessage: '',
			filenameError: '',
			thumbErrored: false,
		}
	},
	computed: {
		extension() {
			return this.template.extension || ''
		},
		extensionLabel() {
			return this.extension
				? t('richdocuments', 'Will be saved as .{ext}', { ext: this.extension })
				: ''
		},
		canSubmit() {
			return !this.busy && this.filename.trim().length > 0
		},
	},
	watch: {
		filename() {
			this.filenameError = ''
			this.errorMessage = ''
		},
	},
	methods: {
		onOpenUpdate(value) {
			if (!value && !this.busy) {
				this.cancel()
			}
		},
		cancel() {
			this.$emit('close')
		},
		async pickFolder() {
			try {
				const picker = getFilePickerBuilder(t('richdocuments', 'Select target folder'))
					.startAt(this.folderPath || '/')
					.setMultiSelect(false)
					.setType(FilePickerType.Choose)
					.allowDirectories(true)
					.addMimeTypeFilter('httpd/unix-directory')
					.build()
				const result = await picker.pick()
				const chosen = Array.isArray(result) ? result[0] : result
				if (typeof chosen === 'string' && chosen.length > 0) {
					this.folderPath = chosen
				}
			} catch {
				// User cancelled — ignore.
			}
		},
		validate() {
			const trimmed = this.filename.trim()
			if (!trimmed) {
				this.filenameError = t('richdocuments', 'Filename is required')
				return false
			}
			if (/[\\/]/.test(trimmed)) {
				this.filenameError = t('richdocuments', 'Filename cannot contain slashes')
				return false
			}
			if (trimmed.length > 200) {
				this.filenameError = t('richdocuments', 'Filename is too long')
				return false
			}
			return true
		},
		async submit() {
			if (!this.validate() || !this.canSubmit) {
				return
			}
			this.busy = true
			this.errorMessage = ''
			try {
				const result = await createFromTemplate({
					templateFileId: this.template.fileid,
					filename: this.filename.trim(),
					folderPath: this.folderPath || '/',
				})
				saveLastFolder(this.folderPath || '/')
				// Tiny celebration before we hand off to the editor — the
				// toast is announced to screen readers, the confetti is
				// purely decorative and respects prefers-reduced-motion.
				showSuccess(t('richdocuments', 'Created “{name}” — opening editor…', { name: result?.name ?? this.filename.trim() }))
				fireConfetti()
				if (result?.fileid) {
					// Build the URL with the CSRF requesttoken; the
					// document.index controller requires it on plain navigation.
					const targetUrl = getDocumentUrlForFile(this.folderPath || '/', result.fileid)
					// Brief delay so the user gets a glimpse of the celebration
					// before the editor takes over.
					window.setTimeout(() => {
						window.location.href = targetUrl
					}, 450)
				}
			} catch (e) {
				const code = e?.response?.status
				const remote = e?.response?.data?.ocs?.meta?.message
				if (code === 403) {
					this.errorMessage = t('richdocuments', 'No permission to create files in this folder.')
				} else if (code === 404) {
					this.errorMessage = t('richdocuments', 'The selected template or folder no longer exists.')
				} else {
					this.errorMessage = remote || t('richdocuments', 'Could not create the document. Please try again.')
				}
			} finally {
				this.busy = false
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.create-modal {
	display: flex;
	gap: 24px;
	align-items: flex-start;
	padding: 8px 0 16px;

	&__preview {
		flex: 0 0 auto;
		width: 96px;
		height: 96px;
		border-radius: var(--border-radius-large, 12px);
		background-color: var(--color-background-dark);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color-text-maxcontrast);
		overflow: hidden;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			display: block;
		}
	}

	&__form {
		flex: 1 1 auto;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	&__folder {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	&__folder-label {
		font-size: 0.85em;
		color: var(--color-text-maxcontrast);
	}
	&__folder-button {
		all: unset;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 8px 12px;
		border-radius: var(--border-radius, 8px);
		border: 1px solid var(--color-border);
		color: var(--color-main-text);
		min-width: 0;

		&:hover {
			background-color: var(--color-background-hover);
		}
		&:focus-visible {
			outline: 2px solid var(--color-primary-element);
			outline-offset: -2px;
		}
		&[disabled] {
			cursor: not-allowed;
			opacity: 0.6;
		}
	}
	&__folder-path {
		flex: 1 1 auto;
		min-width: 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	&__error {
		color: var(--color-error);
		font-size: 0.9em;
	}
}

@media (max-width: 540px) {
	.create-modal {
		flex-direction: column;
		align-items: stretch;
	}
	.create-modal__preview {
		align-self: center;
	}
}
</style>
