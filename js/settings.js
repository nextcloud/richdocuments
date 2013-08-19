$(document).ready(function(){
	
	var officeSettings = {
		save : function() {
			var data = {
				unstable : $('#webodf-unstable').attr('checked')==="checked"
			};
			$.post(OC.filePath('office', 'ajax', 'settings.php'), data, officeSettings.afterSave);
		},
		afterSave : function(){
			officeMain.useUnstable = $('#webodf-unstable').attr('checked')==="checked"
		}
	};
	$('#webodf-unstable').change(officeSettings.save);
});