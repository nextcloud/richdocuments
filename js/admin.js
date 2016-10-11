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
			'edit_groups': groups.join('|')
		};

		console.log('posting to setSettings');
		$.post(
			OC.filePath('richdocuments', 'ajax', 'admin.php'),
			data
		);
	},

	afterSave : function(response){
		$('#wopi_apply').attr('disabled', false);
		OC.msg.finishedAction('#documents-admin-msg', response);
	},

	initEditGroups: function() {
		var groups = $('#edit_group_select').val().split('|');
		if (groups.length) {
			OC.Settings.setupGroupsSelect($('#edit_group_select'));
			$('.edit-groups-enable').attr('checked', 'checked');
		} else {
			$('.edit-groups-enable').attr('checked', null);
		}
	},

	initialize: function() {
		$('#wopi_apply').on('click', documentsSettings.save);
		documentsSettings.initEditGroups();

		$(document).on('change', '#edit_group_select', function() {
			var element = $(this).parent().find('input.edit-groups-enable');
			var groups = $(this).val();
			if (groups && groups !== '') {
				groups = groups.split('|');
			} else {
				groups = [];
			}

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
