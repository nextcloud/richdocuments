/*global OC, $ */

$(document).ready(function(){

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

		afterSave : function(response){
			$('#wopi_apply').attr('disabled', false);
			OC.msg.finishedAction('#documents-admin-msg', response);
		}
	};

	$('#wopi_apply').on('click', documentsSettings.save);
});
