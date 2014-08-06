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
		if (response && response.mimes){
			jQuery.each(response.mimes, function(i, mime){
				odfViewer.supportedMimesRead.push(mime);
				odfViewer.supportedMimesUpdate.push(mime);
			});
		}
		for (var i = 0; i < odfViewer.supportedMimesRead.length; ++i) {
			var mime = odfViewer.supportedMimesRead[i];
			OCA.Files.fileActions.register(mime, 'View', OC.PERMISSION_READ, '', odfViewer.onView);
			OCA.Files.fileActions.setDefault(mime, 'View');
		}
		for (var i = 0; i < odfViewer.supportedMimesUpdate.length; ++i) {
			var mime = odfViewer.supportedMimesUpdate[i];
			OCA.Files.fileActions.register(
					mime, 
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
		var webodfSource = (oc_debug === true) ? 'webodf-debug' : 'webodf',
		attachTo = odfViewer.isDocuments ? '#documents-content' : '#controls',
		attachToolbarTo = odfViewer.isDocuments ? '#content-wrapper' : '#controls';

		if (odfViewer.isDocuments){
			//Documents view
			var location = filename;
		} else {
			//Public page, files app, etc
			var dirName = $('#dir').val()!='/' ? $('#dir').val() + '/' : '/';
			var location = OC.filePath('documents', 'ajax', 'download.php') + '?path=' + dirName + encodeURIComponent(filename);
			OC.addStyle('documents', '3rdparty/webodf/editor');
		}
		
		OC.addStyle('documents', 'viewer/odfviewer');
		
		OC.addScript('documents', '3rdparty/webodf/' + webodfSource, function() {
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
			odfcanvas.load(location);
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
		$.post(
			OC.filePath('documents', 'ajax', 'mimes.php'),
			{},
			odfViewer.register
		);
	}

	$('#odf_close').live('click', odfViewer.onClose);
});
