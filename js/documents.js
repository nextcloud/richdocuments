/*globals $,OC,fileDownloadPath,t,document,odf,webodfEditor,alert,require,dojo,runtime */
var documentsMain = {
	_documents: [],
	_sessions: [],
	_members: [],
	isEditormode : false,
	useUnstable : false,
	isGuest : false,
	memberId : false,
	esId : false,
	ready :false,
	fileName: null,
	
	UI : {
		/* Overlay HTML */
		overlay : '<div id="documents-overlay"></div> <div id="documents-overlay-below"></div>',
				
		/* Toolbar HTML */
		toolbar : '<div id="odf-toolbar" class="dijitToolbar">' +
					'  <div id="document-title"><div>' +
					'%title%' +
			        '  </div></div>' +
					'  <button id="odf-close">' +
						t('documents', 'Close') +
					'  </button>' +
					'  <button id="odf-invite" class="drop">' +
						  t('documents', 'Share') +
					'  </button>' +
					'  <span id="toolbar" class="claro"></span>' +
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
			$('#documents-overlay,#documents-overlay-below').fadeIn('fast');
		},
		
		hideOverlay : function(){
			$('#documents-overlay,#documents-overlay-below').fadeOut('fast');
		},
		
		showEditor : function(title, canShare){
			$(document.body).prepend(documentsMain.UI.toolbar.replace(/%title%/g, title));
			if (!canShare){
				$('#odf-invite').remove();
			} else {
				//TODO: fill in with users
			}
			$(document.body).addClass("claro");
			$(document.body).prepend(documentsMain.UI.container);
			// in case we are on the public sharing page we shall display the odf into the preview tag
			$('#preview').html(container);
			$('title').text(documentsMain.UI.mainTitle + '| ' + title);
		},
		
		hideEditor : function(){
				// Fade out toolbar
				$('#odf-toolbar').fadeOut('fast');
				// Fade out editor
				$('#mainContainer').fadeOut('fast', function() {
					$('#mainContainer').remove();
					$('#odf-toolbar').remove();
					$('#content').fadeIn('fast');
					$(document.body).removeClass('claro');
					$('title').text(documentsMain.UI.mainTitle);
				});
		},
		showProgress : function(message){
			if (!message){
				message = '&nbsp;';
			}
			$('.documentslist .progress div').text(message);
			$('.documentslist .progress').show();
		},
		
		hideProgress : function(){
			$('.documentslist .progress').hide();
		},
		
		showLostConnection : function(){
			$('#memberList .memberListButton').css({opacity : 0.3});
			$('#odf-toolbar').children(':not(#document-title)').hide();
			$('<div id="connection-lost"></div>').prependTo('#memberList');
			$('<div id="warning-connection-lost">' + t('documents', 'No connection to server. Trying to reconnect.') +'<img src="'+ OC.imagePath('core', 'loading-dark.gif') +'" alt="" /></div>').appendTo('#odf-toolbar');
		},
		
		hideLostConnection : function() {
			$('#connection-lost,#warning-connection-lost').remove();
			$('#odf-toolbar').children(':not(#document-title)').show();
			$('#memberList .memberListButton').css({opacity : 1});
		}
	},
	
	onStartup: function() {
		var fileId;
		"use strict";
		documentsMain.useUnstable = $('#webodf-unstable').val()==='true';
		documentsMain.UI.init();
		
		if (!OC.currentUser){
			documentsMain.isGuest = true;
			
		} else {
			// Does anything indicate that we need to autostart a session?
			fileId = parent.location.hash.replace(/\W*/g, '');
		}
		
		documentsMain.show();
		if (fileId){
			documentsMain.UI.showOverlay();
		}
		
		var webodfSource = (oc_debug === true) ? 'webodf-debug' : 'webodf';
		OC.addScript('documents', '3rdparty/webodf/' + webodfSource).done(function() {
			// preload stuff in the background
			require({}, ["dojo/ready"], function(ready) {
				ready(function() {
					require({}, ["webodf/editor/Editor"], function(Editor) {
						runtime.setTranslator(function(s){return t('documents', s);});
						documentsMain.ready = true;
						if (fileId){
							documentsMain.prepareSession();
							documentsMain.joinSession(fileId);
						}
					});
				});
			});
		});
	},
	
	prepareSession : function(){
		documentsMain.isEditorMode = true;
		documentsMain.UI.showOverlay();
		$(window).on('beforeunload', function(){
			return t('documents', "Leaving this page in Editor mode might cause unsaved data. It is recommended to use 'Close' button instead."); 
		});
	},
	
	prepareGrid : function(){
		documentsMain.isEditorMode = false;
		documentsMain.UI.hideOverlay();
	},
	
	initSession: function(response) {
		"use strict";

		if(response && (response.id && !response.es_id)){
			return documentsMain.view(response.id);
		} 

		if (!response || !response.status || response.status==='error'){
			OC.Notification.show(t('documents', 'Failed to load this document. Please check if it can be opened with an external odt editor. This might also mean it has been unshared or deleted recently.'));
			documentsMain.prepareGrid();
			documentsMain.show();
			$(window).off('beforeunload');
			setTimeout(OC.Notification.hide, 7000);
			return;
		}
		
		//Wait for 3 sec if editor is still loading 
		if (!documentsMain.ready){
			setTimeout(function(){ documentsMain.initSession(response); }, 3000);
			console.log('Waiting for the editor to start...');
			return;
		}

		require({ }, ["webodf/editor/server/owncloud/ServerFactory", "webodf/editor/Editor"], function (ServerFactory, Editor) {
			// fade out file list and show WebODF canvas
			$('#content').fadeOut('fast').promise().done(function() {
				
				documentsMain.fileId = response.file_id;
				documentsMain.fileName = documentsMain.getNameByFileid(response.file_id);
				documentsMain.UI.showEditor(
						documentsMain.fileName,
						response.permissions & OC.PERMISSION_SHARE && !documentsMain.isGuest
				);
				var serverFactory = new ServerFactory();
				documentsMain.esId = response.es_id;
				documentsMain.memberId = response.member_id;

				// TODO: set webodf translation system, by passing a proper function translate(!string):!string in "runtime.setTranslator(translate);"

				documentsMain.webodfServerInstance = serverFactory.createServer();
				documentsMain.webodfServerInstance.setToken(oc_requesttoken);
				documentsMain.webodfEditorInstance = new Editor({unstableFeaturesEnabled: documentsMain.useUnstable}, documentsMain.webodfServerInstance, serverFactory);
				
				// load the document and get called back when it's live
				documentsMain.webodfEditorInstance.openSession(documentsMain.esId, documentsMain.memberId, function() {
					documentsMain.webodfEditorInstance.startEditing();
					documentsMain.UI.hideOverlay();
					parent.location.hash = response.file_id;
				});
			});
		});
	},
	

	joinSession: function(fileId) {
		console.log('joining session '+fileId);
		var url;
		if (documentsMain.isGuest){
			url = OC.Router.generate('documents_session_joinasguest') + '/' + fileId;
		} else {
			url = OC.Router.generate('documents_session_joinasuser') + '/' + fileId;
		}
		$.post(
			url,
			{ name : $("[name='memberName']").val() },
			documentsMain.initSession
		);
	},
	
	view : function(id){
		OC.addScript('documents', 'viewer/viewer', function() {
			documentsMain.prepareGrid();
			$(window).off('beforeunload');
			var path = $('li[data-id='+ id +']>a').attr('href');
			odfViewer.isDocuments = true;
			odfViewer.onView(path);
		});
	},
			
	onCreate: function(event){
		event.preventDefault();
		var docElem = $('.documentslist .template').clone();
		docElem.removeClass('template');
		docElem.addClass('document');
		docElem.insertAfter('.documentslist .template');
		docElem.show();
		$.post(
			OC.Router.generate('documents_documents_create'),
			{},
			documentsMain.show
		);
	},

	onInvite: function(event) {
		event.preventDefault();
		if (OC.Share.droppedDown) {
			OC.Share.hideDropDown();
		} else {
			(function() {
				var target = OC.Share.showLink;
				OC.Share.showLink = function() {
					var r = target.apply( this, arguments );
					$('#linkText').val( $('#linkText').val().replace('service=files', 'service=documents') );
					return r;
				};
			})();

			OC.Share.showDropDown(
				'file', 
				parent.location.hash.replace(/\W*/g, ''),
				$("#odf-toolbar"),
				true, 
				OC.PERMISSION_READ | OC.PERMISSION_SHARE | OC.PERMISSION_UPDATE
			);
		}
	},
	
	sendInvite: function() {
		var users = [];
		$('input[name=invitee\\[\\]]').each(function(i, e) {
			users.push($(e).val());
		});
		$.post(OC.Router.generate('documents_user_invite'), {users: users});
	},

	renameDocument: function(name) {
		var url = OC.Router.generate('documents_session_renamedocument') + '/' + documentsMain.fileId;
		$.post(
			url,
			{ name : name },
			function(result) {
				if (result && result.status === 'error') {
					if (result.message){
						OC.Notification.show(result.message);
						setTimeout(function() {
							OC.Notification.hide();
						}, 10000);
					}
					return;
				}
				documentsMain.fileName = name;
				$('title').text(documentsMain.UI.mainTitle + '| ' + name);
				$('#document-title>div').text(name);
			}
		);
	},

	// FIXME: copy/pasted from Files.isFileNameValid, needs refactor into core
	isFileNameValid:function (name) {
		if (name === '.') {
			throw t('files', '\'.\' is an invalid file name.');
		} else if (name.length === 0) {
			throw t('files', 'File name cannot be empty.');
		}

		// check for invalid characters
		var invalid_characters = ['\\', '/', '<', '>', ':', '"', '|', '?', '*'];
		for (var i = 0; i < invalid_characters.length; i++) {
			if (name.indexOf(invalid_characters[i]) !== -1) {
				throw t('files', "Invalid name, '\\', '/', '<', '>', ':', '\"', '|', '?' and '*' are not allowed.");
			}
		}
		return true;
	},

	onRenamePrompt: function() {
		var name = documentsMain.fileName;
		var lastPos = name.lastIndexOf('.');
		var extension = name.substr(lastPos + 1);
		name = name.substr(0, lastPos);
		var input = $('<input type="text" class="filename"/>').val(name);
		$('#document-title').append(input);
		$('#document-title>div').hide();

		input.on('blur', function(){
			var newName = input.val();
			if (!newName || newName === name) {
				input.tipsy('hide');
				input.remove();
				$('#document-title>div').show();
				return;
			}
			else {
				newName = newName + '.' + extension;
				try {
					input.tipsy('hide');
					input.removeClass('error');
					if (documentsMain.isFileNameValid(newName)) {
						input.tipsy('hide');
						input.remove();
						$('#document-title>div').show();
						documentsMain.renameDocument(newName);
					}
				}
				catch (error) {
					input.attr('title', error);
					input.tipsy({gravity: 'n', trigger: 'manual'});
					input.tipsy('show');
					input.addClass('error');
				}
			}
		});
		input.on('keyup', function(event){
			if (event.keyCode === 27) {
				// cancel by putting in an empty value
				$(this).val('');
				$(this).blur();
				event.preventDefault();
			}
			if (event.keyCode === 13) {
				$(this).blur();
				event.preventDefault();
			}
		});
		input.focus();
		input.selectRange(0, name.length);
	},

	onClose: function() {
		"use strict";
		
		if (!documentsMain.isEditorMode){
			return;
		}
		documentsMain.isEditorMode = false;
		$(window).off('beforeunload');
		parent.location.hash = "";

		documentsMain.webodfEditorInstance.endEditing();
		documentsMain.webodfEditorInstance.closeSession(function() {
			// successfull shutdown - all is good.
			// TODO: proper session leaving call to server, either by webodfServerInstance or custom
// 			documentsMain.webodfServerInstance.leaveSession(sessionId, memberId, function() {
			if (documentsMain.isGuest){
				$(document.body).attr('id', 'body-login');
				$('header,footer').show();
			}
			documentsMain.webodfEditorInstance.destroy(documentsMain.UI.hideEditor);
			
			if (documentsMain.isGuest){
				var url = OC.Router.generate('documents_user_disconnectGuest');
			} else {
				var url = OC.Router.generate('documents_user_disconnect');
			}
			
			$.post(url + '/' + documentsMain.memberId, {esId: documentsMain.esId});
			
			documentsMain.show();
// 			});
		});
	},
	
	getNameByFileid : function(fileid){
		return $('.documentslist li[data-id='+ fileid + ']').find('label').text();
	},
	
	show: function(){
		if (documentsMain.isGuest){
			return;
		}
		documentsMain.UI.showProgress(t('documents', 'Loading documents...'));
		jQuery.when(documentsMain.loadDocuments())
			.then(function(){
				documentsMain.renderDocuments();
				documentsMain.UI.hideProgress();
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
		$('.documentslist .document:not(.template,.progress)').remove();

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
			$('#documents-content').append('<div id="emptycontent">'
				+ t('documents', 'No documents are found. Please upload or create a document!')
				+ '</div>'
			);
		} else {
			$('#emptycontent').remove();
		}
	}
};


//web odf bootstrap code. Added here to reduce number of requests
/*globals navigator,dojoConfig */
var usedLocale = "C";

if (navigator && navigator.language.match(/^(de)/)) {
	usedLocale = navigator.language.substr(0,2);
}

dojoConfig = {
	locale: usedLocale,
	paths: {
		"webodf/editor": OC.appswebroots.documents + "/js/3rdparty/webodf/editor",
		"dijit": OC.appswebroots.documents + "/js/3rdparty/resources/dijit",
		"dojox": OC.appswebroots.documents + "/js/3rdparty/resources/dojox",
		"dojo": OC.appswebroots.documents + "/js/3rdparty/resources/dojo",
		"resources": OC.appswebroots.documents + "/js/3rdparty/resources"
	}
};

//init
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
	
	$(document.body).on('click', '#document-title>div', documentsMain.onRenamePrompt);
	$(document.body).on('click', '#odf-close', documentsMain.onClose);
	$(document.body).on('click', '#odf-invite', documentsMain.onInvite);
	$(document.body).on('click', '#odf-join', function(event){
		event.preventDefault();

		// !Login page mess wih WebODF toolbars
		$(document.body).attr('id', 'body-user');
		$('header,footer').hide();
		documentsMain.prepareSession();
		documentsMain.joinSession(
				$("[name='document']").val()
		);
	});
	$('.add-document').on('click', '.add', documentsMain.onCreate);

	var file_upload_start = $('#file_upload_start');
	file_upload_start.on('fileuploaddone', documentsMain.show);
	//TODO when ending a session as the last user close session?
	
	OC.addScript('documents', '3rdparty/webodf/dojo-amalgamation', documentsMain.onStartup);
});
