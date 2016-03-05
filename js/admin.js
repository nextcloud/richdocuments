/*global OC, $ */

$(document).ready(function(){

	var documentsSettings = {
		save : function() {
			$('#docs_apply').attr('disabled', true);
			var data = {
				converter : $('[name="docs_converter"]:checked').val(),
				wopi_url  : $('#wopi_url').val()
			};

			if (data.converter === 'external'){
				data.url = $('#docs_url').val();
			}

			OC.msg.startAction('#documents-admin-msg', t('richdocuments', 'Saving...'));
			$.post(
					OC.filePath('richdocuments', 'ajax', 'admin.php'),
					data,
					documentsSettings.afterSave
			);
		},

		afterSave : function(response){
			$('#docs_apply').attr('disabled', false);
			OC.msg.finishedAction('#documents-admin-msg', response);
		}
	};

	$('#docs_converter_external, #docs_converter_local, #docs_converter_off').on('click', function(){
		$('#docs_extra').toggle($('[name="docs_converter"]:checked').val() === 'external');
	});
	$('#docs_apply').on('click', documentsSettings.save);
});
