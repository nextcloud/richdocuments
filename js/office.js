/*globals $,OC,fileDownloadPath,t,document,odf,webodfEditor,alert,require,dojo,runtime */
var officeMain = {
	useUnstable : false,
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
		//setInterval(officeMain.updateInfo, 10000);
	},
	initSession: function(response) {
		"use strict";
		
		runtime.assert(response.status, "Server error");
		if (response.status==='error'){
			alert('Server error');
			return;
		}

		OC.addScript('office', 'editor/boot_editor').done(function() {
			var doclocation = response.es_id;

			// fade out file list and show WebODF canvas
			$('.documentslist, #emptyfolder').fadeOut('slow').promise().done(function() {
				// odf action toolbar
				var odfToolbarHtml =
					'<div id="odf-toolbar">' +
					'  <button id="odf_close">' +
						t('files_odfviewer', 'Close') +
					'  </button>' +
					'  <button id="odf_invite">' +
						t('files_odfviewer', 'Invite') +
					'  </button>' +
					'  <span id="toolbar" class="claro"></span>' +
					'</div>';
				$('#controls').append(odfToolbarHtml);

				var memberId, odfelement, odfcanvas, canvashtml =
					'<div id = "mainContainer" class="claro" style="">' +
					'  <div id = "editor">' +
					'    <div id = "container">' +
					'      <div id="canvas"></div>' +
					'    </div>' +
					'  </div>' +
					'  <div id = "collaboration">' +
					'    <div id = "collabContainer">' +
					'      <div id = "members">' +
					'        <div id = "inviteButton"></div>' +
					'        <div id = "memberList"></div>' +
					'      </div>' +
					'    </div>' +
					'  </div>' +
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
							callback: function(webodfEditorInstance) {
								officeMain.webodfEditorInstance = webodfEditorInstance;
							}
						}
				);
			});
		});
	},
	
	startSession: function(fileid) {
		"use strict";
		console.log('starting session for fileid '+fileid);
		if (officeMain.initialized === undefined) {
			alert("WebODF Editor not yet initialized...");
			return;
		}

		$.post(
			OC.Router.generate('office_session_start'),
			{'fileid': fileid},
			officeMain.initSession
		);
	},
	
	joinSession: function(esId) {
		console.log('joining session '+esId);
		$.post(
			OC.Router.generate('office_session_join') + '/' + esId,
			{},
			officeMain.initSession
		);
	},
	
	updateInfo : function(){
		var fileIds = [];
		$('.documentslist li').each(function(i, e){
			fileIds.push($(e).attr('data-file'));
		});
		$.post(
			OC.Router.generate('office_session_info'),
			{items: fileIds},
			function (response){
				if (response && response.info && response.info.length){
					for (var i=0;i<response.info.length;i++){
						$('.documentslist li[data-file='+ response.info[i].file_id +'] .session-info').text(
							t('office', 'Users in session:') 
							+ response.info[i].users
						);
					}
				}
			}
		);
	},

	onInvite: function(event) {
		event.preventDefault();
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

		officeMain.webodfEditorInstance.shutdown(function() {
			// successfull shutdown - all is good.

			// Fade out odf-toolbar
			$('#odf-toolbar').fadeOut('slow');
			// Fade out editor
			$('#mainContainer').fadeOut('slow', function() {
				$('#mainContainer').remove();
				$('#odf-canvas').remove();
				$('.actions,#file_access_panel').fadeIn('slow');
				$('.documentslist, #emptyfolder').fadeIn('slow');
				$(document.body).removeClass('claro');
			});
		});
	}
};


/**
 * TODO copy from files, move from files to core? load files.js?
 * @param {type} mime
 * @returns {getMimeIcon}
 */
function getMimeIcon(mime){
	var def = new $.Deferred();
	if(getMimeIcon.cache[mime]){
		def.resolve(getMimeIcon.cache[mime]);
	}else{
		jQuery.getJSON( OC.filePath('office','ajax','mimeicon.php'), {mime: mime})
		.done(function(data){
			getMimeIcon.cache[mime]=data.path;
			def.resolve(getMimeIcon.cache[mime]);
		})
		.error(function(jqXHR, textStatus, errorThrown){
			console.log(textStatus + ': ' + errorThrown);
			console.log(jqXHR);
		});
	}
	return def;
}
getMimeIcon.cache={};

// fill the albums from Gallery.images
var officeDocuments = {
	_documents: [],
	_sessions: []
};
officeDocuments.loadDocuments = function () {
	var self = this;
	var def = new $.Deferred();
	jQuery.getJSON(OC.filePath('office', 'ajax', 'documents.php'))
		.done(function (data) {
			self._documents = data.documents;
			def.resolve();
		})
		.fail(function(data){
			console.log(t('office','Failed to load documents.'));
		});
	return def;
};
officeDocuments.loadSessions = function () {
	var self = this;
	var def = new $.Deferred();
	jQuery.getJSON(OC.filePath('office', 'ajax', 'sessions.php'))
		.done(function (data) {
			self._sessions = data.sessions;
			def.resolve();
		})
		.fail(function(data){
			console.log(t('office','Failed to load sessions.'));
		});
	return def;
};
officeDocuments.renderDocuments = function () {
	
	//remove all but template
	$('.documentslist .document:not(.template)').remove();
	
	jQuery.each(this._documents, function(i,document){
		var docElem = $('.documentslist .template').clone();
		docElem.removeClass('template');
		docElem.addClass('document');
		docElem.attr('data-id', document.fileid);
		
		var a = docElem.find('a');
		a.text(document.name);
		a.attr('href', OC.Router.generate('download',{file:document.path}));
		
		getMimeIcon(document.mimetype).then(function(path){
			a.css('background-image', 'url("'+path+'")');
		});
		$('.documentslist').append(docElem);
		docElem.show();
	});
	jQuery.each(this._sessions, function(i,session){
		var docElem = $('.documentslist .document[data-id="'+session.file_id+'"]');
		if (docElem.length > 0) {
			docElem.attr('data-esid', session.es_id);
			docElem.find('a').before('<img class="svg session-active" src="'+OC.imagePath('core','places/contacts-dark')+'">');
			docElem.addClass('session');
		} else {
			console.log('Could not find file '+session.file_id+' for session '+session.es_id);
		}
	});
};

$(document).ready(function() {
	"use strict";
	
	$('.documentslist').on('click', 'li', function(event) {
		event.preventDefault();
		if ($(this).attr('data-esid')){
			officeMain.joinSession($(this).attr('data-esid'));
		} else if ($(this).attr('data-id')){
			officeMain.startSession($(this).attr('data-id'));
		}
	});
	
	$('#content').on('click', '#odf_close', officeMain.onClose);
	$('#content').on('click', '#odf_invite', officeMain.onInvite);
	$('#content').on('click', '#invite-send', officeMain.sendInvite);
	$('#content').on('click', '#invitee-list li', function(){
		$(this).remove();
	});
	
	$('#inivite-input').autocomplete({
		minLength: 1,
		source: function(search, response) {
			$.get(
				OC.Router.generate('office_user_search'),
				{search: $('#inivite-input').val()},
				function(result) {
					if (result.status === 'success' && result.data.length > 0) {
						response(result.data);
					} else {
						response([t('core', 'No people found')]);
					}
				}
			);
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

	//TODO load list of files
	jQuery.when(officeDocuments.loadDocuments(), officeDocuments.loadSessions())
			.then(function(){
				officeDocuments.renderDocuments();
			});
			//TODO show no docs please upload
	//TODO load list of sessions, and add 'active' as icon overlay
	//TODO when clicking on a document without a session initialize it
	//TODO when ending a session as the last user close session?

	OC.addScript('office', 'dojo-amalgamation', officeMain.onStartup);
});