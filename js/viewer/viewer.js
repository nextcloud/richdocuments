/* globals FileList, OCA.Files.fileActions, oc_debug */
var odfViewer = {
	isDocuments : false,
	supportedMimesRead: [
		'application/vnd.oasis.opendocument.text',
		'application/vnd.oasis.opendocument.spreadsheet',
		'application/vnd.oasis.opendocument.graphics',
		'application/vnd.oasis.opendocument.presentation'
	],
			
	supportedMimesUpdate: [
		'application/vnd.oasis.opendocument.text'
	],
			
	register : function(response){
		var i, 
			mimeRead, 
			mimeUpdate;
		
		if (response && response.mimes){
			jQuery.each(response.mimes, function(i, mime){
				odfViewer.supportedMimesRead.push(mime);
				odfViewer.supportedMimesUpdate.push(mime);
			});
		}
		for (i = 0; i < odfViewer.supportedMimesRead.length; ++i) {
			mimeRead = odfViewer.supportedMimesRead[i];
			OCA.Files.fileActions.register(mimeRead, 'View', OC.PERMISSION_READ, '', odfViewer.onView);
			OCA.Files.fileActions.setDefault(mimeRead, 'View');
		}
		for (i = 0; i < odfViewer.supportedMimesUpdate.length; ++i) {
			mimeUpdate = odfViewer.supportedMimesUpdate[i];
			OCA.Files.fileActions.register(
					mimeUpdate, 
					'Edit',
					OC.PERMISSION_UPDATE, 
					OC.imagePath('core', 'actions/rename'), 
					odfViewer.onEdit,
					t('documents', 'Edit')
			);
		}
	},
	
	dispatch : function(filename){
		if (odfViewer.supportedMimesUpdate.indexOf(OCA.Files.fileActions.getCurrentMimeType()) !== -1
			&& OCA.Files.fileActions.getCurrentPermissions() & OC.PERMISSION_UPDATE
		){
			odfViewer.onEdit(filename);
		} else {
			odfViewer.onView(filename);
		}
	},
	
	onEdit : function(fileName, context){
		var fileId = context.$file.attr('data-id');
		window.location = OC.linkTo('documents', 'index.php') + '#' + fileId;
	},
			
	onView: function(filename, context) {
	},
	
	onClose: function() {
		FileList.setViewerMode(false);
		$('#odf-toolbar').remove();
		$('#odf-canvas').remove();
	}
};

$(document).ready(function() {
	if ( typeof OCA !== 'undefined' 
		&& typeof OCA.Files !== 'undefined'
		&& typeof OCA.Files.fileActions !== 'undefined'
	) {
		$.get(
			OC.filePath('documents', 'ajax', 'mimes.php'),
			{},
			odfViewer.register
		);
	}

	$('#odf_close').live('click', odfViewer.onClose);
});
