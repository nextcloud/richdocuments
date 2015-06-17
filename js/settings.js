$(document).ready(function(){
	
	var documentsSettings = {
		save : function() {
			var data = {
				unstable : $('#webodf-unstable').attr('checked')==="checked"
			};
			$.post(OC.generateUrl('apps/documents/ajax/config/unstable'), data, documentsSettings.afterSave);
		},
		afterSave : function(){
			documentsMain.useUnstable = $('#webodf-unstable').attr('checked')==="checked";
		}
	};
	$('#webodf-unstable').change(documentsSettings.save);
});