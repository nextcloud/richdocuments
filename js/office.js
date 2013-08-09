/*globals $,OC,fileDownloadPath,t,document,odf,webodfEditor,alert,require,dojo */
var officeMain = {
	onStartup: function() {
		"use strict";
		OC.addScript('office', 'webodf_bootstrap', function() {
			OC.addScript('office', 'webodf-debug').done(function() {
				require({}, ["dojo/ready"], function(ready) {
					ready(function(){
						require({}, ["webodf/editor/Editor"], function(Editor) {
							if (Editor && typeof(Editor) === 'function') {
								officeMain.initialized = 1;
							} else {
								alert("initialization of webodf/editor/Editor\n"+
									"failed somehow...");
							}
						});
					});
				});
			});
		});
	},
	joinSession: function(response) {
		"use strict";

		OC.addScript('office', 'editor/boot_editor').done(function() {
			var doclocation = response.es_id;

			// fade out files menu and add odf menu
			$('.documentslist, #emptyfolder').fadeOut('slow').promise().done(function() {
				// odf action toolbar
				var odfToolbarHtml =
					'<div id="odf-toolbar">' +
					'<button id="odf_close">' + t('files_odfviewer', 'Close') + '</button>' +
					'<span id="toolbar" class="claro"></span>' +
					'</div>';
				$('#controls').append(odfToolbarHtml);
			});

			// fade out file list and show WebODF canvas
			$('.documentslist, #emptyfolder').fadeOut('slow').promise().done(function() {
				var odfelement, odfcanvas, canvashtml =
					'<div id = "mainContainer" class="claro" style="">'+
						'<div id = "editor">'+
							//'<span id = "toolbar" class="claro"></span>'+
							'<div id = "container">'+
								'<div id="canvas"></div>'+
							'</div>'+
						'</div>'+
						'<div id = "collaboration">'+
							'<div id = "collabContainer">'+
								'<div id = "people">'+
									'<div id = "inviteButton"></div>'+
									'<div id = "peopleList"></div>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>';
				$(document.body).addClass("claro");
				$('.documentslist, #emptyfolder').after(canvashtml);
				// in case we are on the public sharing page we shall display the odf into the preview tag
				$('#preview').html(canvashtml);

				runtime.assert(response.es_id, "invalid session id.");
				webodfEditor.boot(
					{
						collaborative: "owncloud",
						docUrl: doclocation,
						loginProcedure: function(cb) {
							cb(response.es_id, OC.currentUser, "token");
						},
						callback: function() {
							// initialized.
						}
					}
				);
			});
		});
	},
	startSession : function(filepath){
		"use strict";
		if (officeMain.initialized === undefined) {
			alert("WebODF Editor not yet initialized...");
			return;
		}

		$.post(OC.Router.generate('office_session_start'), 
			{ 'path' : filepath },
			officeMain.joinSession
		);
	},
	
	showSessions : function(){
		if ($('#allsessions').length){
			$('#allsessions').remove();
			return;
		}
		$.post(OC.Router.generate('office_session_list'), {}, officeMain.onSessions);
	},
	onSessions : function(response){
		if (response && response.session_list){
			$(response.session_list).each( function(i, s){ officeMain.addSession(s) } );
		}
	},
	addSession : function(s){
		if (!$('#allsessions').length){
			$(document.body).append('<div id="allsessions"></div>');
		}
		$('<div><a href="">'+s+ '</a></div>').appendTo('#allsessions').click(
			function(event){
					event.preventDefault();
					officeMain.joinSession({es_id : s});  
			}
		);
	},
			
	onClose: function() {
		"use strict";

		// Fade out odf-toolbar
		$('#odf-toolbar').fadeOut('slow');
		// Fade out editor
		$('#mainContainer').fadeOut('slow', function() {
			$('#mainContainer').remove();
			$('#odf-canvas').remove();
			$('.actions,#file_access_panel').fadeIn('slow');
			$('.documentslist, #emptyfolder').fadeIn('slow');
			$(document.body).removeClass('claro');
			webodfEditor.shutdown();
		});
	}
};

$(document).ready(function() {
	$('.documentslist tr').click(function(event) {
		event.preventDefault();
		officeMain.startSession($(this).attr('data-file'));
	});
	$('#odf_close').live('click', officeMain.onClose);
	$('#session-list').click(officeMain.showSessions);
	OC.addScript('office', 'dojo-amalgamation', officeMain.onStartup);
});
