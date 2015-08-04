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
			
	onView: function(filename) {
		var fileloc,
		attachTo = odfViewer.isDocuments ? '#documents-content' : '#controls',
		attachToolbarTo = odfViewer.isDocuments ? '#content-wrapper' : '#controls';

		if (odfViewer.isDocuments){
			//Documents view
			fileloc = filename;
		} else {
			//Public page, files app, etc
			var dirName = $('#dir').val()!='/' ? $('#dir').val() + '/' : '/';
			fileloc = OC.filePath('documents', 'ajax', 'download.php') + '?path=' 
				+ encodeURIComponent(dirName) + encodeURIComponent(filename)
				+ '&requesttoken=' + encodeURIComponent(oc_requesttoken);
			OC.addStyle('documents', '3rdparty/webodf/wodotexteditor');
		}
		
		OC.addStyle('documents', 'viewer/odfviewer');
		
		OC.addScript('documents', '3rdparty/webodf/webodf-debug', function() {
			FileList.setViewerMode(true);

			// odf action toolbar
			var odfToolbarHtml =
					'<div id="odf-toolbar">' +
					'<button id="odf_close">' + t('documents', 'Close') +
					'</button></div>';
			if (odfViewer.isDocuments){
				$(attachToolbarTo).prepend(odfToolbarHtml);
				$('#odf-toolbar').css({position:'fixed'});
			} else {
				$(attachToolbarTo).append(odfToolbarHtml);
			}

			var canvashtml = '<div id="odf-canvas"></div>';
			$(attachTo).after(canvashtml);
			// in case we are on the public sharing page we shall display the odf into the preview tag
			$('#preview').html(canvashtml);

			var odfelement = document.getElementById("odf-canvas");
			var odfcanvas = new odf.OdfCanvas(odfelement);
			odfcanvas.load(fileloc);
		});
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
