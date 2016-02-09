/* globals FileList, OCA.Files.fileActions, oc_debug */
var odfViewer = {
	isDocuments : false,
	supportedMimesReadOnly: [
	],

	supportedMimesReadWrite: [
		'application/vnd.oasis.opendocument.text',
		'application/vnd.oasis.opendocument.spreadsheet',
		'application/vnd.oasis.opendocument.graphics',
		'application/vnd.oasis.opendocument.presentation',
		'application/vnd.lotus-wordpro',
		'image/svg+xml',
		'application/vnd.visio',
		'application/vnd.wordperfect',
		'application/msonenote',
		'application/msword',
		'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
		'application/vnd.ms-word.document.macroEnabled.12',
		'application/vnd.ms-word.template.macroEnabled.12',
		'application/vnd.ms-excel',
		'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
		'application/vnd.ms-excel.sheet.macroEnabled.12',
		'application/vnd.ms-excel.template.macroEnabled.12',
		'application/vnd.ms-excel.addin.macroEnabled.12',
		'application/vnd.ms-excel.sheet.binary.macroEnabled.12',
		'application/vnd.ms-powerpoint',
		'application/vnd.openxmlformats-officedocument.presentationml.presentation',
		'application/vnd.openxmlformats-officedocument.presentationml.template',
		'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
		'application/vnd.ms-powerpoint.addin.macroEnabled.12',
		'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
		'application/vnd.ms-powerpoint.template.macroEnabled.12',
		'application/vnd.ms-powerpoint.slideshow.macroEnabled.12'
	],

	register : function(response){
		var i,
			mimeReadOnly,
			mimeReadWrite;

		if (response && response.mimes){
			jQuery.each(response.mimes, function(i, mime){
				odfViewer.supportedMimesReadOnly.push(mime);
				odfViewer.supportedMimesReadWrite.push(mime);
			});
		}
		for (i = 0; i < odfViewer.supportedMimesReadOnly.length; ++i) {
			mimeReadOnly = odfViewer.supportedMimesReadOnly[i];
			OCA.Files.fileActions.register(mimeReadOnly, 'View', OC.PERMISSION_READ, '', odfViewer.onView);
			OCA.Files.fileActions.setDefault(mimeReadOnly, 'View');
		}
		for (i = 0; i < odfViewer.supportedMimesReadWrite.length; ++i) {
			mimeReadWrite = odfViewer.supportedMimesReadWrite[i];
			OCA.Files.fileActions.register(
					mimeReadWrite,
					'Edit',
					OC.PERMISSION_UPDATE,
					OC.imagePath('core', 'actions/rename'),
					odfViewer.onEdit,
					t('richdocuments', 'Edit')
			);
			OCA.Files.fileActions.setDefault(mimeReadWrite, 'Edit');
		}
	},

	dispatch : function(filename){
		if (odfViewer.supportedMimesReadWrite.indexOf(OCA.Files.fileActions.getCurrentMimeType()) !== -1
			&& OCA.Files.fileActions.getCurrentPermissions() & OC.PERMISSION_UPDATE
		){
			odfViewer.onEdit(filename);
		} else {
			odfViewer.onView(filename);
		}
	},

	onEdit : function(fileName, context){
		var fileId = context.$file.attr('data-id');
		window.location = OC.generateUrl('apps/richdocuments/index#{file_id}', {file_id: fileId});
	},

	onView: function(filename, context) {
	    var attachTo = odfViewer.isDocuments ? '#documents-content' : '#controls';

	    FileList.setViewerMode(true);

	    // TODO call something like in the onEdit case; or do we want
		// view-only at all?
	    /*
	    var viewer = window.location.protocol + '//' + window.location.host + '/loleaflet/dist/loleaflet.html?' +
		'file_path=' + context.dir + '/' + filename +
		'&host=' + 'ws://' + window.location.hostname + ':9980' +
		'&permission=' + 'view' +
		'&timestamp=' + '';

	    var frame = '<iframe id="loleafletframe" style="width:100%;height:100%;display:block;position:fixed;top:46px;" src="' + viewer + '"  sandbox="allow-scripts allow-same-origin allow-popups"/>';
	    $(attachTo).append(frame);

	    $('#loleafletframe').load(function(){
		var iframe = $('#loleafletframe').contents();
		iframe.find('#tb_toolbar-up_item_close').click(function() {
		    odfViewer.onClose();
		});
	    });
	    */
	},

	onClose: function() {
		FileList.setViewerMode(false);
		$('#loleafletframe').remove();
	}
};

$(document).ready(function() {
	if ( typeof OCA !== 'undefined'
		&& typeof OCA.Files !== 'undefined'
		&& typeof OCA.Files.fileActions !== 'undefined'
	) {
		$.get(
			OC.filePath('richdocuments', 'ajax', 'mimes.php'),
			{},
			odfViewer.register
		);
	}

	$('#odf_close').live('click', odfViewer.onClose);
});
