/*global OC, $ */

var documentsSettings = {
	save : function() {
		$('#wopi_apply').attr('disabled', true);
		var data = {
			wopi_url  : $('#wopi_url').val()
		};

		OC.msg.startAction('#documents-admin-msg', t('richdocuments', 'Saving...'));
		$.post(
			OC.filePath('richdocuments', 'ajax', 'admin.php'),
			data,
			documentsSettings.afterSave
		);
	},

	saveGroups: function(groups) {
		var data = {
			'edit_groups': groups
		};

		$.post(
			OC.filePath('richdocuments', 'ajax', 'admin.php'),
			data
		);
	},

	saveDocFormat: function(format) {
		$.post(
			OC.filePath('richdocuments', 'ajax', 'admin.php'),
			{ 'doc_format': format }
		);
	},

	saveTestWopi: function(groups, server) {
		var data = {
			'test_wopi_url': server,
			'test_server_groups': groups
		};

		OC.msg.startAction('#test-documents-admin-msg', t('richdocuments', 'Saving...'));
		$.post(
			OC.filePath('richdocuments', 'ajax', 'admin.php'),
			data,
			documentsSettings.afterSaveTestWopi
		);
	},

	afterSaveTestWopi: function(response) {
		$('#test_wopi_apply').attr('disabled', false);
		OC.msg.finishedAction('#test-documents-admin-msg', response);
	},

	afterSave : function(response){
		$('#wopi_apply').attr('disabled', false);
		OC.msg.finishedAction('#documents-admin-msg', response);
	},

	initEditGroups: function() {
		var groups = $('#edit_group_select').val();
		if (groups !== '') {
			OC.Settings.setupGroupsSelect($('#edit_group_select'));
			$('.edit-groups-enable').attr('checked', 'checked');
		} else {
			$('.edit-groups-enable').attr('checked', null);
		}
	},

	initTestWopiServer: function() {
		var groups = $(document).find('#test_server_group_select').val();
		var testserver = $(document).find('#test_wopi_url').val();

		if (groups === '' || testserver === '') {
			$('.test-server-enable').attr('checked', null);
		} else {
			OC.Settings.setupGroupsSelect($('#test_server_group_select'));
			$('.test-server-enable').attr('checked', 'checked');
		}
	},

	initialize: function() {
		documentsSettings.initEditGroups();
		documentsSettings.initTestWopiServer();

		$('#wopi_apply').on('click', documentsSettings.save);

		$(document).on('change', '.test-server-enable', function() {
			var page = $(this).parent();
			var $select = page.find('#test_server_group_select');
			$select.val('');

			page.find('#test-server-section').toggleClass('hidden', !this.checked);
			if (this.checked) {
				OC.Settings.setupGroupsSelect($select, {
					placeholder: t('core', 'None')
				});
			} else {
				$select.select2('destroy');
				page.find('#test_wopi_url').val('');

				documentsSettings.saveTestWopi('', '');
			}
		});

		$(document).on('click', '#test_wopi_apply', function() {
			var groups = $(this).parent().find('#test_server_group_select').val();
			var testserver = $(this).parent().find('#test_wopi_url').val();

			if (groups !== '' && testserver !== '') {
				documentsSettings.saveTestWopi(groups, testserver);
			} else {
				OC.msg.finishedError('#test-documents-admin-msg', 'Both fields required');
			}
		});

		$(document).on('change', '.doc-format-ooxml', function() {
			var ooxml = this.checked;
			documentsSettings.saveDocFormat(ooxml ? 'ooxml' : 'odf');
		});

		$(document).on('change', '#edit_group_select', function() {
			var element = $(this).parent().find('input.edit-groups-enable');
			var groups = $(this).val();
			documentsSettings.saveGroups(groups);
		});

		$(document).on('change', '.edit-groups-enable', function() {
			var $select = $(this).parent().find('#edit_group_select');
			$select.val('');

			if (this.checked) {
				OC.Settings.setupGroupsSelect($select, {
					placeholder: t('core', 'All')
				});
			} else {
				$select.select2('destroy');
			}

			$select.change();
		});
	}
};

$(document).ready(function(){
	documentsSettings.initialize();
});
