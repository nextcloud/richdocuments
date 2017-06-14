/*global OC, $ */

var documentsSettings = {
	save : function() {
		$('#wopi_apply').attr('disabled', true);
		var data = {
			wopi_url  : $('#wopi_url').val().replace(/\/$/, '')
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

	initialize: function() {
		documentsSettings.initEditGroups();

		$('#wopi_apply').on('click', documentsSettings.save);

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
