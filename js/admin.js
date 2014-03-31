/*global OC, $ */

$(document).ready(function(){
	
	var documentsSettings = {
		converter : '',
		save : function() {
			$('#docs_apply').attr('disabled', true);
			var data = 	{
				converter : documentsSettings.converter
			}; 
			
			if (documentsSettings.converter !== 'local'){
				data.url = $('#docs_url').val();
			}
			
			$.post(
					OC.filePath('documents', 'ajax', 'admin.php'), 
					data,
					documentsSettings.afterSave
			);
		},
		
		afterSave : function(response){
			$('#docs_apply').attr('disabled', false);
			if (response && response.message) {
				OC.Notification.show(response.message);
			}
		}
	};
	
	$('#docs_converter_external, #docs_converter_local').on('click', function(){
		documentsSettings.converter = $(this).val();
		$('#docs_extra').toggle(documentsSettings.converter !== 'local');
	});
	$('#docs_apply').on('click', documentsSettings.save);
});
