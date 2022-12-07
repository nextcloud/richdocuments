import '../css/admin.scss'
import { generateFilePath } from '@nextcloud/router'
import { showError } from '@nextcloud/dialogs'

$(function() {

	$('[data-toggle="tooltip"]').tooltip()

	const PersonalSettings = function() {
		this.templateInput = document.getElementById('templateInputField')
		this.templateSelectButton = document.getElementById('templateSelectButton')
		this.templateResetButton = document.getElementById('templateResetButton')

		this.zoteroAPIKeyInput = document.getElementById('zoteroAPIKeyField')
		this.zoteroAPIKeySaveButton = document.getElementById('zoteroAPIKeySave')
		this.zoteroAPIKeyRemoveButton = document.getElementById('zoteroAPIKeyRemove')

		const self = this
		this.templateSelectButton.addEventListener('click', function() {
			OC.dialogs.filepicker(t('richdocuments', 'Select a personal template folder'), function(datapath, returntype) {
				self.updateSetting(datapath)
			}, false, 'httpd/unix-directory', true, OC.dialogs.FILEPICKER_TYPE_CHOOSE)
		})

		this.templateResetButton.addEventListener('click', this.resetSettings.bind(this))

		this.zoteroAPIKeySaveButton.addEventListener('click', function() {
			self.updateZoteroAPIKey(self.zoteroAPIKeyInput.value)
		})

		this.zoteroAPIKeyRemoveButton.addEventListener('click', this.resetZoteroAPI.bind(this))
	}

	PersonalSettings.prototype.updateSetting = function(path) {
		const self = this
		this._updateSetting({ templateFolder: path }, function() {
			self.templateInput.value = path
		}, function() {

		})
	}

	PersonalSettings.prototype.resetSettings = function() {
		const self = this
		this._updateSetting({ templateFolder: '' }, function() {
			self.templateInput.value = ''
		}, function() {

		})
	}

	PersonalSettings.prototype.updateZoteroAPIKey = function(key) {
		const self = this
		this._updateSetting({ zoteroAPIKeyInput: key }, function() {
			self.zoteroAPIKeyInput.value = key
		}, function() {
			showError(t('richdocuments', 'Failed to update the Zotero API key'))
		})
	}

	PersonalSettings.prototype.resetZoteroAPI = function() {
		const self = this
		this._updateSetting({ zoteroAPIKeyInput: '' }, function() {
			self.zoteroAPIKeyInput.value = ''
		}, function() {

		})
	}

	PersonalSettings.prototype._updateSetting = function(data, successCallback, errorCallback) {
		OC.msg.startAction('#documents-admin-msg', t('richdocuments', 'Saving …'))
		const request = new XMLHttpRequest()
		request.open('POST', generateFilePath('richdocuments', 'ajax', 'personal.php'), true)
		request.setRequestHeader('Content-Type', 'application/json')
		request.setRequestHeader('requesttoken', OC.requestToken)
		request.onload = function() {
			if (request.status >= 200 && request.status < 400) {
				const response = JSON.parse(request.response)
				OC.msg.finishedAction('#documents-admin-msg', response)
				successCallback(response)
			} else {
				errorCallback(this.response)
			}
		}

		request.onerror = function() {
			errorCallback(this.response)
		}

		request.send(JSON.stringify(data))
	}

	return new PersonalSettings()
})
