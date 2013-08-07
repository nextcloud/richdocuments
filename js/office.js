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
	onView: function(response) {
		"use strict";

		OC.addScript('office', 'editor/boot_editor').done(function() {
			var doclocation = response.genesis_url;
			officeMain.doclocation = doclocation;

			// fade out files menu and add odf menu
			$('.documentslist').fadeOut('slow').promise().done(function() {
				// odf action toolbar
				var odfToolbarHtml =
					'<div id="odf-toolbar">' +
					'<button style="float:left" id="odf_close">' + t('files_odfviewer', 'Close') + '</button>' +
					'<span id="toolbar" class="claro"></span>' +
					'</div>';
				$('#controls').append(odfToolbarHtml);
				//$('#controls').append('<span id="toolbar" class="claro"></span>');
			});

			// fade out file list and show WebODF canvas
			$('table').fadeOut('slow').promise().done(function() {
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
					'</div>',
					bodyelement = document.getElementsByTagName('body')[0];
				bodyelement.className += " claro";
				$('table').after(canvashtml);
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

				// odfelement = document.getElementById("odf-canvas");
				// odfcanvas = new odf.OdfCanvas(odfelement);
				// odfcanvas.load(doclocation);
			});
		});
	},
	registerSession : function(filepath){
		"use strict";
		if (officeMain.initialized === undefined) {
			alert("WebODF Editor not yet initialized...");
			return;
		}

		$.post(OC.filePath('office', 'ajax', 'session.php'), 
			{ 'genesis' : filepath },
			officeMain.onView
		);
	},
	
	showSessions : function(){
		if ($('#allsessions').length){
			$('#allsessions').remove();
			return;
		}
		$.post(OC.filePath('office', 'ajax', 'sessions.php'), {}, officeMain.onSessions);
	},
	onSessions : function(response){
		if (response && response.sessions){
			$(response.sessions).each( function(i, s){ officeMain.addSession(s) } );
		}
	},
	addSession : function(s){
		if (!$('#allsessions').length){
			$(document.body).append('<div id="allsessions"></div>');
		}
		$('#allsessions').append('<div>'+s.es_id+ '</div>');
	},
			
	onClose: function() {
		"use strict";
		var bodyelement = document.getElementsByTagName('body')[0];
		// Fade out odf-toolbar
		$('#odf-toolbar').fadeOut('slow');
		// Fade out editor
		$('#mainContainer').fadeOut('slow', function() {
			$('#mainContainer').remove();
			$('#odf-canvas').remove();
			$('.actions,#file_access_panel').fadeIn('slow');
			$('table').fadeIn('slow');
			bodyelement.className.replace(' claro', '');
			webodfEditor.shutdown();
		});
	}
};

$(document).ready(function() {
	$('.documentslist tr').click(function(event) {
		event.preventDefault();
		officeMain.registerSession($(this).attr('data-file'));
	});
	$('#odf_close').live('click', officeMain.onClose);
	OC.addScript('office', 'dojo-amalgamation', officeMain.onStartup);
	$('#session-list').click(officeMain.showSessions);
});
