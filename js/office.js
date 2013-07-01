var officeMain = {
	onView: function(dir, file) {
		OC.addStyle('office', 'webodf');
		OC.addScript('office', 'webodf-debug').done(function() {
			var location = fileDownloadPath(dir, file);

			// fade out files menu and add odf menu
			$('.documentslist').fadeOut('slow').promise().done(function() {
				// odf action toolbar
				var odfToolbarHtml =
						'<div id="odf-toolbar">' +
						'<button id="odf_close">' + t('files_odfviewer', 'Close') +
						'</button></div>';
				$('#controls').append(odfToolbarHtml);
			});

			// fade out file list and show pdf canvas
			$('table').fadeOut('slow').promise().done(function() {
				;
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
			$('.actions,#file_access_panel').fadeIn('slow');
			$('table').fadeIn('slow');
		});
		is_editor_shown = false;
	}
};

$(document).ready(function() {
	$('.documentslist tr').click(function(event) {
		event.preventDefault();
		officeMain.onView('', $(this).attr('data-file'));
	});
	$('#odf_close').live('click', officeMain.onClose);
});
