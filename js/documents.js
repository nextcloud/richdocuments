/*globals $,OC,fileDownloadPath,t,document,odf,webodfEditor,alert,require,dojo,runtime */
var documentsMain = {
	_documents: [],
	_sessions: [],
	_members: [],
	isEditormode : false,
	useUnstable : false,
	
	UI : {
		/* Overlay HTML */
		overlay : '<div id="documents-overlay"></div> <div id="documents-overlay-below"></div>',
				
		/* Toolbar HTML */
		toolbar : '<div id="odf-toolbar" class="dijitToolbar">' +
					'  <button id="odf-close">' +
						t('documents', 'Close') +
					'  </button>' +
					'<div id="document-title"><div>' +
					'%title%' +
			        '</div></div>' +
					'  <button id="odf-invite">' +
						t('documents', 'Share') +
					'  </button>' +
					'  <div id="invite-block" style="display:none">' +
					'    <input id="inivite-input" type="text" />' +
					'    <ul id="invitee-list"></ul>' +
		            '    <button id="invite-send">' +
					t('documents', 'Send Invitation') +
					'    </button>' +
	                '    </div>' +
					'    <span id="toolbar" class="claro"></span>' +
					'</div>',
					
		/* Editor wrapper HTML */
		container : '<div id = "mainContainer" class="claro" style="">' +
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
					'</div>',
					
		/* Previous window title */
		mainTitle : '',
				
		init : function(){
			$(documentsMain.UI.overlay).hide().appendTo(document.body);
			documentsMain.UI.mainTitle = $('title').text();
		},
				
		showOverlay : function(){
			$('#documents-overlay,#documents-overlay-below').fadeIn('slow');
		},
		
		hideOverlay : function(){
			$('#documents-overlay,#documents-overlay-below').fadeOut('slow');
		},
		
		showEditor : function(title, canShare){
			$(document.body).prepend(documentsMain.UI.toolbar.replace(/%title%/g, title));
			if (!canShare){
				$('#odf-invite,#invite-block').remove();
			}
			$(document.body).addClass("claro");
			$(document.body).prepend(documentsMain.UI.container);
			// in case we are on the public sharing page we shall display the odf into the preview tag
			$('#preview').html(container);
			$('title').text(documentsMain.UI.mainTitle + '| ' + title);
		},
		
		hideEditor : function(){
				// Fade out toolbar
				$('#odf-toolbar').fadeOut('slow');
				// Fade out editor
				$('#mainContainer').fadeOut('slow', function() {
					$('#mainContainer').remove();
					$('#odf-toolbar').remove();
					$('#content').fadeIn('slow');
					$(document.body).removeClass('claro');
					$('title').text(documentsMain.UI.mainTitle);
				});
		}
	},
	
	onStartup: function() {
		"use strict";
		documentsMain.UI.init();
		
		// Does anything indicate that we need to autostart a session?
		var esId = parent.location.hash.replace(/\W*/g, '');
		if (!esId){
			documentsMain.show();
		} else {
			documentsMain.UI.showOverlay();
		}
		
		
		OC.addScript('documents', '3rdparty/webodf/dojo-amalgamation', function() {
			OC.addScript('documents', '3rdparty/webodf/webodf-debug').done(function() {
				// preload stuff in the background
				require({}, ["dojo/ready"], function(ready) {
					ready(function() {
						require({}, ["webodf/editor/Editor"], function(Editor) {

							if (esId){
								documentsMain.prepareSession();
								documentsMain.joinSession(esId);
							}
						});
					});
				});
			});
		});
	},
	
	prepareSession : function(){
		documentsMain.isEditorMode = true;
		documentsMain.UI.showOverlay();
	},
	
	prepareGrid : function(){
		documentsMain.isEditorMode = false;
		documentsMain.UI.hideOverlay();
	},
	
	initSession: function(response) {
		"use strict";
		

		if (!response || !response.es_id || !response.status || response.status==='error'){
			OC.Notification.show(t('documents', 'Failed to load this document. Please check if it can be opened with an external odt editor. This might also mean it has been unshared or deleted recently.'));
			documentsMain.prepareGrid();
			documentsMain.show();
			setTimeout(OC.Notification.hide, 7000);
			return;
		}

		require({ }, ["webodf/editor/server/owncloud/ServerFactory", "webodf/editor/Editor"], function (ServerFactory, Editor) {
			// fade out file list and show WebODF canvas
			$('#content').fadeOut('slow').promise().done(function() {
				
				documentsMain.UI.showEditor(
						documentsMain.getNameByFileid(response.file_id),
						response.permissions & OC.PERMISSION_SHARE
				);
				var serverFactory = new ServerFactory();
				
				var memberId = response.member_id;
				documentsMain.webodfServerInstance = serverFactory.createServer();
				documentsMain.webodfServerInstance.setToken(oc_requesttoken);
				documentsMain.webodfEditorInstance = new Editor({unstableFeaturesEnabled: documentsMain.useUnstable}, documentsMain.webodfServerInstance, serverFactory);

				// load the document and get called back when it's live
				documentsMain.webodfEditorInstance.openSession(response.es_id, memberId, function() {
					documentsMain.webodfEditorInstance.startEditing();
					documentsMain.UI.hideOverlay();
					parent.location.hash = response.file_id;
				});
			});
		});
	},
	

	joinSession: function(fileId) {
		console.log('joining session '+fileId);
		$.post(
			OC.Router.generate('documents_session_join') + '/' + fileId,
			{},
			documentsMain.initSession
		);
	},
			
	onCreate: function(event){
		event.preventDefault();
		$.post(
			OC.Router.generate('documents_documents_create'),
			{},
			documentsMain.show
		);
	},

	onInvite: function(event) {
		event.preventDefault();
		$('#invite-block').toggle();
		$('#inivite-input').autocomplete({
			minLength: 1,
			source: function(search, response) {
				$.get(
					OC.Router.generate('documents_user_search'),
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
						+ t('documents', 'Remove from the list')
						+ '" >'
						+ el.item.label
						+ '<input type="hidden" name="invitee[]" value="'
						+ el.item.value
						+ '" />'
						+ '</li>'
				);
				$('#inivite-input').val('');
				$('#invitee-list').prepend(item);
			}
		});
	},
	
	sendInvite: function() {
		var users = [];
		$('input[name=invitee\\[\\]]').each(function(i, e) {
			users.push($(e).val());
		});
		$.post(OC.Router.generate('documents_user_invite'), {users: users});
	},
	
	onClose: function() {
		"use strict";
		
		if (!documentsMain.isEditorMode){
			return;
		}
		documentsMain.isEditorMode = false;
		parent.location.hash = "";

		documentsMain.show();

		documentsMain.webodfEditorInstance.endEditing();
		documentsMain.webodfEditorInstance.close(function() {
			// successfull shutdown - all is good.
			// TODO: proper session leaving call to server, either by webodfServerInstance or custom
// 			documentsMain.webodfServerInstance.leaveSession(sessionId, memberId, function() {
			documentsMain.webodfEditorInstance.destroy(documentsMain.UI.hideEditor);
// 			});
		});
	},
	
	getNameByFileid : function(fileid){
		return $('.documentslist li[data-id='+ fileid + ']').find('label').text();
	},
	
	show: function(){
		jQuery.when(documentsMain.loadDocuments())
			.then(function(){
				documentsMain.renderDocuments();
			});
	},
	
	loadDocuments: function () {
		var self = this;
		var def = new $.Deferred();
		OC.Router.registerLoadedCallback(function () {
			jQuery.getJSON(OC.Router.generate('documents_documents_list'))
				.done(function (data) {
					self._documents = data.documents;
					self._sessions = data.sessions;
					self._members = data.members;
					def.resolve();
				})
				.fail(function(data){
					console.log(t('documents','Failed to load documents.'));
				});
		});
		return def;
	},
	
	renderDocuments: function () {
		var self = this,
		hasDocuments = false;

		//remove all but template
		$('.documentslist .document:not(.template)').remove();

		jQuery.each(this._documents, function(i,document){
			var docElem = $('.documentslist .template').clone();
			docElem.removeClass('template');
			docElem.addClass('document');
			docElem.attr('data-id', document.fileid);

			var a = docElem.find('a');
			a.attr('href', OC.Router.generate('download',{file:document.path}));
			a.find('label').text(document.name);
			a.css('background-image', 'url("'+document.icon+'")');

			$('.documentslist').append(docElem);
			docElem.show();
			hasDocuments = true;
		});
		jQuery.each(this._sessions, function(i,session){
			if (self._members[session.es_id].length > 0) {
				var docElem = $('.documentslist .document[data-id="'+session.file_id+'"]');
				if (docElem.length > 0) {
					docElem.attr('data-esid', session.es_id);
					docElem.find('label').after('<img class="svg session-active" src="'+OC.imagePath('core','places/contacts-dark')+'">');
					docElem.addClass('session');
				} else {
					console.log('Could not find file '+session.file_id+' for session '+session.es_id);
				}
			}
		});
		
		if (!hasDocuments){
			$('#documents-content').append('<div id="emptyfolder">'
				+ t('documents', 'No documents are found. Please upload or create a document!')
				+ '</div>'
			);
		} else {
			$('#emptyfolder').remove();
		}
	}
};


$(document).ready(function() {
	"use strict";
	
	$('.documentslist').on('click', 'li:not(.add-document)', function(event) {
		event.preventDefault();
		if (documentsMain.isEditorMode){
			return;
		}
		documentsMain.prepareSession();
		if ($(this).attr('data-id')){
			documentsMain.joinSession($(this).attr('data-id'));
		}
	});
	
	$(document.body).on('click', '#odf-close', documentsMain.onClose);
	$(document.body).on('click', '#odf-invite', documentsMain.onInvite);
	$(document.body).on('click', '#invite-send', documentsMain.sendInvite);
	$(document.body).on('click', '#invitee-list li', function(){
		$(this).remove();
	});
	
	$('.add-document').on('click', '.add', documentsMain.onCreate);

	var file_upload_start = $('#file_upload_start');
	file_upload_start.on('fileuploaddone', documentsMain.show);
	//TODO when ending a session as the last user close session?

	OC.addScript('documents', '3rdparty/webodf/webodf_bootstrap', documentsMain.onStartup);
});
