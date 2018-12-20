$(function () {

	$('[data-toggle="tooltip"]').tooltip();

	var PersonalSettings = function () {
		this.templateInput = document.getElementById('templateInputField');
		this.templateSelectButton = document.getElementById('templateSelectButton');
		this.templateResetButton = document.getElementById('templateResetButton');

		var self = this;
		this.templateSelectButton.addEventListener('click', function() {
			OC.dialogs.filepicker(t('richdocuments', 'Select a personal template folder'), function(datapath, returntype) {
				self.updateSetting(datapath);
			}, false, 'httpd/unix-directory', true, OC.dialogs.FILEPICKER_TYPE_CHOOSE);
		});

		this.templateResetButton.addEventListener('click', this.resetSettings.bind(this));
	};

	PersonalSettings.prototype.updateSetting = function (path) {
		var self = this;
		this._updateSetting({templateFolder: path}, function() {
			self.templateInput.value = path;
		}, function () {

		});
	};

	PersonalSettings.prototype.resetSettings = function() {
		var self = this;
		this._updateSetting({templateFolder: ''}, function() {
			self.templateInput.value = '';
		}, function () {

		});
	}

	PersonalSettings.prototype._updateSetting = function(data, successCallback, errorCallback) {
		OC.msg.startAction('#documents-admin-msg', t('richdocuments', 'Saving…'));
		var request = new XMLHttpRequest();
		request.open('POST', OC.filePath('richdocuments', 'ajax', 'personal.php'), true);
		request.setRequestHeader("Content-Type", "application/json");
		request.setRequestHeader("requesttoken", OC.requestToken);
		request.onload = function() {
			if (request.status >= 200 && request.status < 400) {
				var response = JSON.parse(request.response);
				OC.msg.finishedAction('#documents-admin-msg', response);
				successCallback(response);
			} else {
				errorCallback(this.response);
			}
		};

		request.onerror = function() {
			errorCallback(this.response);
		};

		request.send(JSON.stringify(data));
	}

	new PersonalSettings();

});
