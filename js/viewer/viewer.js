var odfViewer = {
	supportedMimesRead: [
		'application/vnd.oasis.opendocument.text',
		'application/vnd.oasis.opendocument.spreadsheet',
		'application/vnd.oasis.opendocument.graphics',
		'application/vnd.oasis.opendocument.presentation'
	],
			
	supportedMimesUpdate: [
		'application/vnd.oasis.opendocument.text'
	],
			
	register : function(){
		for (var i = 0; i < odfViewer.supportedMimesRead.length; ++i) {
			var mime = odfViewer.supportedMimesRead[i];
			FileActions.register(mime, 'View', OC.PERMISSION_READ, '', odfViewer.onView);
			FileActions.setDefault(mime, 'View');
		}
		for (var i = 0; i < odfViewer.supportedMimesUpdate.length; ++i) {
			var mime = odfViewer.supportedMimesUpdate[i];
			FileActions.register(
					mime, 
					t('documents', 'Edit'), 
					OC.PERMISSION_UPDATE, 
					OC.imagePath('core', 'actions/rename'), 
					odfViewer.onEdit
			);
		}
	},
	
	dispatch : function(filename){
		if (odfViewer.supportedMimesUpdate.indexOf(FileActions.getCurrentMimeType()) !== -1
		 && FileActions.getCurrentPermissions() & OC.PERMISSION_UPDATE
		){
			odfViewer.onEdit(filename);
		} else {
			odfViewer.onView(filename);
		}
	},
	
	onEdit : function(){
		var fileId = FileActions.currentFile.parent().attr('data-id');
		window.open(OC.linkTo('documents', 'index.php') + '#' + fileId);
	},
			
	onView: function(filename) {
		OC.addStyle('documents', 'viewer/webodf');
		OC.addStyle('documents', 'viewer/odfviewer');
		
		var webodfSource = (oc_debug === true) ? 'webodf-debug' : 'webodf';
		
		OC.addScript('documents', '3rdparty/webodf/' + webodfSource, function() {
			var location = fileDownloadPath($('#dir').val(), filename);

			// fade out files menu and add odf menu
			$('#controls div').fadeOut('slow').promise().done(function() {
				// odf action toolbar
				var odfToolbarHtml =
						'<div id="odf-toolbar">' +
						'<button id="odf_close">' + t('documents', 'Close') +
						'</button></div>';
				$('#controls').append(odfToolbarHtml);

			});

			// fade out file list and show pdf canvas
			$('table').fadeOut('slow').promise().done(function() {
				var canvashtml = '<div id="odf-canvas"></div>';
				$('table').after(canvashtml);
				// in case we are on the public sharing page we shall display the odf into the preview tag
				$('#preview').html(canvashtml);

				var odfelement = document.getElementById("odf-canvas");
				var odfcanvas = new odf.OdfCanvas(odfelement);
				odfcanvas.load(location);
			});
		});
	},
	
	onClose: function() {
		// Fade out odf-toolbar
		$('#odf-toolbar').fadeOut('slow');
		// Fade out editor
		$('#odf-canvas').fadeOut('slow', function() {
			$('#odf-toolbar').remove();
			$('#odf-canvas').remove();
			$('#controls div').not('.hidden').fadeIn('slow');
			$('table').fadeIn('slow');
		});
	}
};

$(document).ready(function() {
	if (typeof FileActions !== 'undefined') {
		odfViewer.register();
	}

	$('#odf_close').live('click', odfViewer.onClose);
});
