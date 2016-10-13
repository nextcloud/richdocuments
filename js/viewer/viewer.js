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
		var fileDir = context.dir;

		if (fileDir) {
			window.location = OC.generateUrl('apps/richdocuments/index#{file_id}_{dir}', {file_id: fileId, dir: fileDir});
		} else {
			window.location = OC.generateUrl('apps/richdocuments/index#{file_id}', {file_id: fileId});
		}
	},

	onView: function(filename, context) {
	    var attachTo = odfViewer.isDocuments ? '#documents-content' : '#controls';

	    FileList.setViewerMode(true);
	},

	onClose: function() {
		FileList.setViewerMode(false);
		$('#loleafletframe').remove();
	},

	registerFilesMenu: function(response) {
		var ooxml = response.doc_format === 'ooxml';

		var docExt, spreadsheetExt, presentationExt;
		var docMime, spreadsheetMime, presentationMime;
		if (ooxml) {
			docExt = 'docx';
			spreadsheetExt = 'xlsx';
			presentationExt = 'pptx';
			docMime = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
			spreadsheetMime = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
			presentationMime =	'application/vnd.openxmlformats-officedocument.presentationml.presentation';
		} else {
			docExt = 'odt';
			spreadsheetExt = 'ods';
			presentationExt = 'odp';
			docMime = 'application/vnd.oasis.opendocument.text';
			spreadsheetMime = 'application/vnd.oasis.opendocument.spreadsheet';
			presentationMime = 'application/vnd.oasis.opendocument.presentation';
		}

		(function(OCA){
			OCA.FilesLOMenu = {
				attach: function(newFileMenu) {
					var self = this;

					newFileMenu.addMenuEntry({
						id: 'add-' + docExt,
						displayName: t('richdocuments', 'Document'),
						templateName: 'New Document.' + docExt,
						iconClass: 'icon-filetype-document',
						fileType: 'x-office-document',
						actionHandler: function(filename) {
							self._createDocument(docMime, filename);
						}
					});

					newFileMenu.addMenuEntry({
						id: 'add-' + spreadsheetExt,
						displayName: t('richdocuments', 'Spreadsheet'),
						templateName: 'New Spreadsheet.' + spreadsheetExt,
						iconClass: 'icon-filetype-spreadsheet',
						fileType: 'x-office-spreadsheet',
						actionHandler: function(filename) {
							self._createDocument(spreadsheetMime, filename);
						}
					});

					newFileMenu.addMenuEntry({
						id: 'add-' + presentationExt,
						displayName: t('richdocuments', 'Presentation'),
						templateName: 'New Presentation.' + presentationExt,
						iconClass: 'icon-filetype-presentation',
						fileType: 'x-office-presentation',
						actionHandler: function(filename) {
							self._createDocument(presentationMime, filename);
						}
					});
				},

				_createDocument: function(mimetype, filename) {
					OCA.Files.Files.isFileNameValid(filename);
					filename = FileList.getUniqueName(filename);

					$.post(
						OC.generateUrl('apps/richdocuments/ajax/documents/create'),
						{ mimetype : mimetype, filename: filename, dir: $('#dir').val() },
						function(response){
							if (response && response.status === 'success'){
								FileList.add(response.data, {animate: true, scrollTo: true});
							} else {
								OC.dialogs.alert(response.data.message, t('core', 'Could not create file'));
							}
						}
					);
				}
			};
		})(OCA);

		OC.Plugins.register('OCA.Files.NewFileMenu', OCA.FilesLOMenu);
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

		$.get(
			OC.filePath('richdocuments', 'ajax', 'settings.php'),
			{},
			odfViewer.registerFilesMenu
		);
	}

	$('#odf_close').live('click', odfViewer.onClose);
});
