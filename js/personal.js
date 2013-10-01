$(document).ready(function(){
	var documentsSettings = {
		save : function() {
			var data = {
				savePath : $('#documents-default-path').val()
			};
			OC.msg.startSaving('#documents-personal .msg');
			$.post(OC.filePath('documents', 'ajax', 'personal.php'), data, documentsSettings.afterSave);
		},
		afterSave : function(data){
			OC.msg.finishedSaving('#documents-personal .msg', data);
		}
	};
	$('#documents-default-path').blur(documentsSettings.save);
});