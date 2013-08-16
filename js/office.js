/*globals $,OC,fileDownloadPath,t,document,odf,webodfEditor,alert,require,dojo,runtime */
var officeMain = {
	onStartup: function() {
		"use strict";
		OC.addScript('office', 'webodf_bootstrap', function() {
			OC.addScript('office', 'webodf-debug').done(function() {
				require({}, ["dojo/ready"], function(ready) {
					ready(function() {
						require({}, ["webodf/editor/Editor"], function(Editor) {
							if (Editor && typeof(Editor) === 'function') {
								officeMain.initialized = 1;
							} else {
								alert("initialization of webodf/editor/Editor\n" +
										"failed somehow...");
							}
						});
					});
				});
			});
		});
		officeMain.updateSessions();
		setInterval(officeMain.updateSessions, 10000);
	},
	initSession: function(response) {
		"use strict";

		OC.addScript('office', 'editor/boot_editor').done(function() {
			var doclocation = response.es_id;

			// fade out file list and show WebODF canvas
			$('.documentslist, #emptyfolder, #editing-sessions').fadeOut('slow').promise().done(function() {
				// odf action toolbar
				var odfToolbarHtml =
						'<div id="odf-toolbar">'
						+ '<button id="odf_close">'
						+ t('files_odfviewer', 'Close')
						+ '</button>'
						+ '<button id="odf_invite">'
						+ t('files_odfviewer', 'Invite')
						+ '</button>'
						+ '<span id="toolbar" class="claro"></span>'
						+ '</div>';
				$('#controls').append(odfToolbarHtml);

				$('#office-content').addClass('wide');
				var memberId, odfelement, odfcanvas, canvashtml =
						'<div id = "mainContainer" class="claro" style="">' +
						'<div id = "editor">' +
						'<div id = "container">' +
						'<div id="canvas"></div>' +
						'</div>' +
						'</div>' +
						'<div id = "collaboration">' +
						'<div id = "collabContainer">' +
						'<div id = "people">' +
						'<div id = "inviteButton"></div>' +
						'<div id = "memberList"></div>' +
						'</div>' +
						'</div>' +
						'</div>' +
						'</div>';
				$(document.body).addClass("claro");
				$('.documentslist, #emptyfolder').after(canvashtml);
				// in case we are on the public sharing page we shall display the odf into the preview tag
				$('#preview').html(canvashtml);
					
				runtime.assert(response.es_id, "invalid session id.");
				memberId = response.member_id;
				webodfEditor.boot(
						{
							collaborative: "owncloud",
							docUrl: doclocation,
							loginProcedure: function(cb) {
								cb(response.es_id, OC.currentUser, "token");
							},
							joinSession: function(userId, sessionId, cb) {
								cb(memberId);
							},
							callback: function() {
								// initialized.
							}
						}
				);
			});
		});
	},
	startSession: function(filepath) {
		"use strict";
		if (officeMain.initialized === undefined) {
			alert("WebODF Editor not yet initialized...");
			return;
		}

		$.post(OC.Router.generate('office_session_start'),
				{'path': filepath},
		officeMain.initSession
				);
	},
	joinSession: function(esId) {
		$.post(OC.Router.generate('office_session_join') + '/' + esId,
				{},
				officeMain.initSession
				);
	},
	updateSessions: function() {
		$('#editing-sessions').load(OC.Router.generate('office_session_listhtml'), {}, officeMain.onSessions);
	},
	onSessions: function() {
		$('#editing-sessions a').click(
				function(event) {
					event.preventDefault();
					officeMain.joinSession($(this).attr('data-esid'));
				}
		);
	},
	onInvite: function() {
		$('#invite-block').toggle();
	},
	sendInvite: function() {
		var users = [];
		$('input[name=invitee\\[\\]]').each(function(i, e) {
			users.push($(e).val());
		});
		$.post(OC.Router.generate('office_user_invite'), {users: users});
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
			$('.documentslist, #emptyfolder, #editing-sessions').fadeIn('slow');
			$(document.body).removeClass('claro');
			$('#office-content').removeClass('wide');
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
	$('#odf_invite').live('click', officeMain.onInvite);
	$('#invite-send').live('click', officeMain.sendInvite);
	$('#invitee-list li').live('click', function(){
		$(this).remove();
	});
	
	$('#inivite-input').autocomplete({
		minLength: 1,
		source: function(search, response) {
			$.get(OC.Router.generate('office_user_search'), {search: $('#inivite-input').val()},
			function(result) {
				if (result.status == 'success' && result.data.length > 0) {
					response(result.data);
				} else {
					response([t('core', 'No people found')]);
				}
			});
		},
		select: function(event, el) {
			event.preventDefault();
			var item = $( 
					'<li title="'
					+ t('office', 'Remove from the list')
					+ '" >'
					+ el.item.label
					+ '<input type="hidden" name="invitee[]" value="'
					+ el.item.value
					+ '" />'
					+ '</li>'
					);
			$('#invitee-list').prepend(item);
		}
	});
	
	OC.addScript('office', 'dojo-amalgamation', officeMain.onStartup);
});
