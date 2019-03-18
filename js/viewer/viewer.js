/* globals FileList, OCA.Files.fileActions, oc_debug */

function getSearchParam(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if (results === null){
		return null;
	}
	return decodeURI(results[1]) || 0;
}

var preload_type = getSearchParam('richdocuments_create');
var preload_filename = getSearchParam('richdocuments_filename');
var Preload = {
	create: {
		type: preload_type,
		filename: preload_filename,
	}
};

var odfViewer = {
	isDocuments : false,
	nextcloudVersion: 0,
	supportedMimes: [
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
		'application/rtf',
		'text/rtf',
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

	register : function() {
		odfViewer.nextcloudVersion = parseInt(oc_config.version.split('.')[0]);
		var i,
		    mime;

		for (i = 0; i < odfViewer.supportedMimes.length; ++i) {
			mime = odfViewer.supportedMimes[i];
			OCA.Files.fileActions.register(
				    mime,
					'Edit',
				    OC.PERMISSION_UPDATE | OC.PERMISSION_READ,
					OC.imagePath('core', 'actions/rename'),
					odfViewer.onEdit,
					t('richdocuments', 'Edit')
			);
			OCA.Files.fileActions.setDefault(mime, 'Edit');
		}
	},

	dispatch : function(filename){
		odfViewer.onEdit(filename);
	},

	getNewDocumentFromTemplateUrl: function(templateId, fileName, fileDir, fillWithTemplate) {
		return OC.generateUrl(
			'apps/richdocuments/indexTemplate?templateId={templateId}&fileName={fileName}&dir={dir}&requesttoken={requesttoken}',
			{
				templateId: templateId,
				fileName: fileName,
				dir: fileDir,
				requesttoken: OC.requestToken
			}
		);
	},

	onEdit : function(fileName, context) {
		if(context) {
			var fileDir = context.dir;
			var fileId = context.fileId || context.$file.attr('data-id');
			var templateId = context.templateId;
		}

		var viewer;
		if($('#isPublic').val() === '1') {
			viewer = OC.generateUrl(
				'apps/richdocuments/public?shareToken={shareToken}&fileName={fileName}&requesttoken={requesttoken}&fileId={fileId}',
				{
					shareToken: $('#sharingToken').val(),
					fileName: fileName,
					fileId: fileId,
					requesttoken: OC.requestToken
				}
			);
		} else {
			// We are dealing with a template
			if (typeof(templateId) !== 'undefined') {
				viewer = this.getNewDocumentFromTemplateUrl(templateId, fileName, fileDir);
			} else {
				viewer = OC.generateUrl(
					'apps/richdocuments/index?fileId={fileId}&requesttoken={requesttoken}',
					{
						fileId: fileId,
						dir: fileDir,
						requesttoken: OC.requestToken
					}
				);
			}
		}

		if(context) {
			FileList.setViewerMode(true);
		}

		OC.addStyle('richdocuments', 'mobile');

		var $iframe = $('<iframe id="richdocumentsframe" nonce="' + btoa(OC.requestToken) + '" scrolling="no" allowfullscreen src="'+viewer+'" />');
		$.get(OC.generateUrl('/apps/richdocuments/settings/check'), function() {
			$iframe.src = viewer;
		}) .fail(function() {
			odfViewer.onClose();
			OC.Notification.showTemporary('Failed to load Collabora Online - please try again later');
		});
		$('body').css('overscroll-behavior-y', 'none');
		if ($('#isPublic').val()) {
			// force the preview to adjust its height
			$('#preview').append($iframe).css({height: '100%'});
			$('body').css({height: '100%'});
			$('#content').addClass('full-height');
			$('footer').addClass('hidden');
			$('#imgframe').addClass('hidden');
			$('.directLink').addClass('hidden');
			$('.directDownload').addClass('hidden');
			$('#controls').addClass('hidden');
			$('#content').addClass('loading');
		} else {
			if (odfViewer.nextcloudVersion < 14) {
				$iframe.css('height', '100%');
				$('#app-content').css('overflow', 'hidden');
			} else {
				$('body').css('overflow', 'hidden');
			}
			$('#app-content').append($iframe);
			if ($('header').length) {
				var $button = $('<div class="richdocuments-sharing"><a class="icon-shared icon-white"></a></div>');
				$('.header-right').prepend($button);
				$button.on('click', function() {
					if ($('#app-sidebar').is(':visible')) {
						OC.Apps.hideAppSidebar();
						return;
					}
					FileList.showDetailsView(fileName, 'shareTabView');
					OC.Apps.showAppSidebar();
				});
				$('.searchbox').hide();
				$('#app-navigation').addClass('hidden');
			}
		}

		$('#app-content #controls').addClass('hidden');
	},

	onClose: function() {
		if(typeof FileList !== "undefined") {
			FileList.setViewerMode(false);
			FileList.reload();
		}
		$('link[href="' + OC.addStyle.loaded.pop() + '"]').remove();
		$('#app-content #controls').removeClass('hidden');
		$('#richdocumentsframe').remove();
		$('#app-navigation').removeClass('hidden');
		$('.richdocuments-sharing').remove();
		$('#richdocuments-avatars').remove();
		$('#richdocuments-actions').remove();
		$('.searchbox').show();
		if (odfViewer.nextcloudVersion < 14) {
			$('#app-content').css('overflow', 'auto');
		} else {
			$('body').css('overflow', 'auto');
		}

		if ($('#isPublic').val()) {
			$('#content').removeClass('full-height');
			$('footer').removeClass('hidden');
			$('#imgframe').removeClass('hidden');
			$('.directLink').removeClass('hidden');
			$('.directDownload').removeClass('hidden');
		}

		OC.Util.History.replaceState();
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
						displayName: t('richdocuments', 'New Document'),
						templateName: t('richdocuments', 'New Document') + '.' + docExt,
						iconClass: 'icon-filetype-document',
						fileType: 'x-office-document',
						actionHandler: function(filename) {
							if (oc_capabilities.richdocuments.templates) {
								self._openTemplatePicker('document', docMime, filename);
							} else {
								self._createDocument(docMime, filename);
							}
						}
					});

					newFileMenu.addMenuEntry({
						id: 'add-' + spreadsheetExt,
						displayName: t('richdocuments', 'New Spreadsheet'),
						templateName: t('richdocuments', 'New Spreadsheet') + '.' + spreadsheetExt,
						iconClass: 'icon-filetype-spreadsheet',
						fileType: 'x-office-spreadsheet',
						actionHandler: function(filename) {
							if (oc_capabilities.richdocuments.templates) {
								self._openTemplatePicker('spreadsheet', spreadsheetMime, filename);
							} else {
								self._createDocument(spreadsheetMime, filename);
							}
						}
					});

					newFileMenu.addMenuEntry({
						id: 'add-' + presentationExt,
						displayName: t('richdocuments', 'New Presentation'),
						templateName: t('richdocuments', 'New Presentation') + '.' + presentationExt,
						iconClass: 'icon-filetype-presentation',
						fileType: 'x-office-presentation',
						actionHandler: function(filename) {
							if (oc_capabilities.richdocuments.templates) {
								self._openTemplatePicker('presentation', presentationMime, filename);
							} else {
								self._createDocument(presentationMime, filename);
							}
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
				},

				_createDocumentFromTemplate: function(templateId, mimetype, filename) {
					OCA.Files.Files.isFileNameValid(filename);
					filename = FileList.getUniqueName(filename);
					odfViewer.onEdit(filename, {
						fileId: -1,
						dir: $('#dir').val(),
						templateId: templateId
					});
				},

				_openTemplatePicker: function(type, mimetype, filename) {
					var self = this;
					$.ajax({
						url: OC.linkToOCS('apps/richdocuments/api/v1/templates', 2)  + type,
						dataType: 'json'
					}).then(function(response) {
						self._buildTemplatePicker(response.ocs.data)
							.then(function() {
								var buttonlist = [{
									text: t('core', 'Cancel'),
									classes: 'cancel',
									click: function() {
										$(this).ocdialog('close');
									}
								}, {
									text: t('richdocuments', 'Create'),
									classes: 'primary',
									click: function() {
										var templateId = this.dataset.templateId;
										self._createDocumentFromTemplate(templateId, mimetype, filename);
										$(this).ocdialog('close');
									}
								}];

								$('#template-picker').ocdialog({
									closeOnEscape: true,
									modal: true,
									buttons: buttonlist
								});
							})
					})
				},

				_buildTemplatePicker: function(data) {
					var self = this;
					return $.get(OC.filePath('richdocuments', 'templates', 'templatePicker.html'), function(tmpl) {
						$tmpl = $(tmpl);
						// init template picker
						var $dlg = $tmpl.octemplate({
							dialog_name: 'template-picker',
							dialog_title: t('richdocuments','Select template'),
						});

						// create templates list
						var templates = _.values(data)
						templates.forEach(function(template) {
							self._appendTemplateFromData($dlg[0], template);
						})

						$('body').append($dlg);
					})
				},

				_appendTemplateFromData: function(dlg, data) {
					var self = this;
					var template = dlg.querySelector('.template-model').cloneNode(true);
					template.className = '';
					template.querySelector('img').src = OC.generateUrl('apps/richdocuments/template/preview/'+data.id);
					template.querySelector('h2').textContent = data.name;
					template.onclick = function() {
						dlg.dataset.templateId = data.id;
					};
					if (!dlg.dataset.templateId) {
						dlg.dataset.templateId = data.id;
					}

					dlg.querySelector('.template-container').appendChild(template);
				}
			};
		})(OCA);

		OC.Plugins.register('OCA.Files.NewFileMenu', OCA.FilesLOMenu);

		// Open the template picker if there was a create parameter detected on load
		if (!!(Preload.create && Preload.create.type && Preload.create.filename)) {
			var mimetype;
			var ext;
			switch (Preload.create.type) {
				case 'document':
					mimetype = docMime;
					ext = docExt;
					break;
				case 'spreadsheet':
					mimetype = spreadsheetMime;
					ext = spreadsheetExt;
					break;
				case 'presentation':
					mimetype = presentationMime;
					ext = presentationExt;
					break;
			}
			OCA.FilesLOMenu._openTemplatePicker(Preload.create.type, mimetype, Preload.create.filename + '.' + ext);
		}

	}
};

$(document).ready(function() {
	if ( typeof OCA !== 'undefined'
		&& typeof OCA.Files !== 'undefined'
		&& typeof OCA.Files.fileActions !== 'undefined'
	) {
		// check if texteditor app is enabled and loaded...
		if (_.isUndefined(OCA.Files_Texteditor)) {
			// it is not, so we do open text files with this app too.
			odfViewer.supportedMimes.push('text/plain');
		}

		// notice: when changing 'supportedMimes' interactively (e.g. dev console),
		// register() needs to be re-run to re-register the fileActions.
		odfViewer.register();

		var getSettings = $.get(OC.filePath('richdocuments', 'ajax', 'settings.php'));
		var getCapabilities = $.Deferred().resolve();

		if (typeof oc_capabilities === 'undefined') {
			getCapabilities = $.get(OC.linkToOCS('cloud', 2) + 'capabilities?format=json', function (data) {
				oc_capabilities = data.ocs.data.capabilities;
			})
		}
		$.when(getSettings, getCapabilities).done(function(settings, capabilities) {
			odfViewer.registerFilesMenu(settings[0]);
		})

	}
});

// FIXME: Hack for single public file view since it is not attached to the fileslist
$(document).ready(function(){
	// FIXME: Filter compatible mime types
	if ($('#isPublic').val() && odfViewer.supportedMimes.indexOf($('#mimetype').val()) !== -1) {
		odfViewer.onEdit($('#filename').val());
	}
});

$(document).ready(function() {
	var eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
	var eventer = window[eventMethod];
	var messageEvent = eventMethod == 'attachEvent' ? 'onmessage' : 'message';

	eventer(messageEvent,function(e) {
		if(e.data === 'close') {
			odfViewer.onClose();
		} else if(e.data === 'loading') {
			$('#content').removeClass('loading');
		}
	}, false);
});
