/*global OC, $ */

$(document).ready(function(){
	
	var documentsSettings = {
		save : function() {
			$('#docs_apply').attr('disabled', true);
			var data = 	{
				converter : $('[name="docs_converter"]:checked').val()
			}; 
			
			if (data.converter !== 'local'){
				data.url = $('#docs_url').val();
			}
			
			OC.msg.startAction('#documents-admin-msg', t('documents', 'Saving...'));
			$.post(
					OC.filePath('documents', 'ajax', 'admin.php'), 
					data,
					documentsSettings.afterSave
			);
		},
		
		afterSave : function(response){
			$('#docs_apply').attr('disabled', false);
			OC.msg.finishedAction('#documents-admin-msg', response);
		}
	};
	
	$('#docs_converter_external, #docs_converter_local').on('click', function(){
		$('#docs_extra').toggle($('[name="docs_converter"]:checked').val() !== 'local');
	});
	$('#docs_apply').on('click', documentsSettings.save);
});
