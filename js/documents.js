/*globals $,OC,fileDownloadPath,t,document,odf,webodfEditor,alert,require,dojo,runtime */

$.widget('oc.documentGrid', {
	options : {
		context : '.documentslist',
		documents : {},
		sessions : {},
		members : {}
	},
	
	_create : function (){
			
	},
	
	render : function(){
		var that = this;
		jQuery.when(this._load())
			.then(function(){
				that._render();
			});
	},
	
	add : function(document) {
		var docElem = $(this.options.context + ' .template').clone(),
			a = docElem.find('a')
		;

		//Fill an element
		docElem.removeClass('template').attr('data-id', document.fileid);
		a.css('background-image', 'url("'+document.icon+'")')
			.attr('href', OC.generateUrl('apps/files/download{file}',{file:document.path}))
			.attr('original-title', document.path)
			.find('label').text(document.name)
		;
		
		docElem.appendTo(this.options.context).show();
		
		//Preview
		var previewURL,
			urlSpec = {
			file : document.path.replace(/^\/\//, '/'),
			x : 200,
			y : 200,
			c : document.etag,
			forceIcon : 0
		};

		if ( $('#isPublic').length ) {
			urlSpec.t = $('#dirToken').val();
		}
		
		if (!urlSpec.x) {
			urlSpec.x = $('#filestable').data('preview-x');
		}
		if (!urlSpec.y) {
			urlSpec.y = $('#filestable').data('preview-y');
		}
		urlSpec.y *= window.devicePixelRatio;
		urlSpec.x *= window.devicePixelRatio;

		previewURL = OC.generateUrl('/core/preview.png?') + $.param(urlSpec);
		previewURL = previewURL.replace('(', '%28').replace(')', '%29');
		
		if ( $('#previews_enabled').length && document.hasPreview) {
			var img = new Image();
			img.onload = function(){
				var ready = function (node){
					return function(path){
						node.css('background-image', 'url("'+ path +'")');
					}; 
				}(a);
				ready(previewURL);
			};
			img.src = previewURL;
		}
	},
	
	_load : function (){
		var that = this;
		var def = new $.Deferred();
		$.getJSON(OC.generateUrl('apps/documents/ajax/documents/list'))
			.done(function (data) {
				that.options.documents = data.documents;
				that.options.sessions = data.sessions;
				that.options.members = data.members;
				def.resolve();
			})
			.fail(function(data){
				console.log(t('documents','Failed to load documents.'));
			});
		return def;
	},
	
	_render : function (data){
		var that = this,
			documents = data && data.documents || this.options.documents,
			sessions = data && data.sessions || this.options.sessions,
			members = data && data.members || this.options.members,
			hasDocuments = false
		;
		
		$(this.options.context + ' .document:not(.template,.progress)').remove();
		
		$.each(documents, function(i, document){
			hasDocuments = true;
			that.add(document);
		});
		
		$.each(sessions, function(i, session){
			if (members[session.es_id].length > 0) {
				var docElem = $(that.options.context + ' .document[data-id="'+session.file_id+'"]');
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
			$(this.options.context).before('<div id="emptycontent">'
				+ t('documents', 'No documents were found. Upload or create a document to get started!')
				+ '</div>'
			);
		} else {
			$('#emptycontent').remove();
		}
	}
});

$.widget('oc.documentOverlay', {
	options : {
		parent : 'document.body'
	},
	_create : function (){
		$(this.element).hide().appendTo(document.body);
	},
	show : function(){
		$(this.element).fadeIn('fast');
	},
	hide : function(){
		$(this.element).fadeOut('fast');
	}
});

var documentsMain = {
	isEditormode : false,
	useUnstable : false,
	isGuest : false,
	memberId : false,
	esId : false,
	ready :false,
	fileName: null,
	canShare : false,
	toolbar : '<div id="ocToolbar"><div id="ocToolbarInside"></div><span id="toolbar" class="claro"></span></div>',
	
	UI : {		
		/* Editor wrapper HTML */
		container : '<div id="mainContainer" class="claro">' +
					'  <div id="editor" class="webodfeditor-editor">' +
					'    <div id="container" class="webodfeditor-canvascontainer">' +
					'      <div id="canvas" class="webodfeditor-canvas"></div>' +
					'    </div>' +
					'  </div>' +
					'  <div id="collaboration">' +
					'    <div id="collabContainer">' +
					'      <div id="members">' +
					'        <div id="inviteButton"></div>' +
					'        <div id="memberList"></div>' +
					'      </div>' +
					'    </div>' +
					'  </div>' +
					'</div>',
					
		/* Previous window title */
		mainTitle : '',
				
		init : function(){
			documentsMain.UI.mainTitle = $('title').text();
		},
		
		showEditor : function(title){
			if (documentsMain.isGuest){
				// !Login page mess wih WebODF toolbars
				$(document.body).attr('id', 'body-user');
			}

			$(document.body).addClass("claro");
			$(document.body).prepend(documentsMain.UI.container);
			// in case we are on the public sharing page we shall display the odf into the preview tag
			$('#preview').html(container);
			$('title').text(title + ' - ' + documentsMain.UI.mainTitle);
		},
		
		hideEditor : function(){
			if (documentsMain.isGuest){
				// !Login page mess wih WebODF toolbars
				$(document.body).attr('id', 'body-login');
				$('footer,nav').show();
			}
			
			// Fade out editor
			$('#mainContainer').fadeOut('fast', function() {
				$('#mainContainer').remove();
				$('#content-wrapper').fadeIn('fast');
				$(document.body).removeClass('claro');
				$('title').text(documentsMain.UI.mainTitle);
			});
		},
		
		showSave : function (){
			$('#odf-close').hide();
			$('#saving-document').show();
		},
		
		hideSave : function(){
			$('#saving-document').hide();
			$('#odf-close').show();
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
			$('#ocToolbar').children(':not(#document-title)').hide();
			$('<div id="connection-lost"></div>').prependTo('#memberList');
			$('<div id="warning-connection-lost">' + t('documents', 'No connection to server. Trying to reconnect.') +'<img src="'+ OC.imagePath('core', 'loading-dark.gif') +'" alt="" /></div>').prependTo('#ocToolbar');
		},
		
		hideLostConnection : function() {
			$('#connection-lost,#warning-connection-lost').remove();
			$('#ocToolbar').children(':not(#document-title,#saving-document)').show();
			$('#memberList .memberListButton').css({opacity : 1});
		},
		
		notify : function(message){
			OC.Notification.show(message);
			setTimeout(OC.Notification.hide, 10000);
		}
	},
	
	onStartup: function() {
		var fileId;
		documentsMain.useUnstable = $('#webodf-unstable').val()==='true';
		documentsMain.UI.init();
		
		if (!OC.currentUser){
			documentsMain.isGuest = true;
			
			if ($("[name='document']").val()){
				$(documentsMain.toolbar).appendTo('#header');
				documentsMain.prepareSession();
				documentsMain.joinSession(
					$("[name='document']").val()
				);
			}

		} else {
			// Does anything indicate that we need to autostart a session?
			fileId = parent.location.hash.replace(/\W*/g, '');
		}
		
		documentsMain.show();
		if (fileId){
			documentsMain.overlay.documentOverlay('show');
		}
		
		OC.addScript('documents', '3rdparty/webodf/webodf-debug').done(function() {
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
		documentsMain.overlay.documentOverlay('show');
		$(window).on('beforeunload', function(){
			return t('documents', "Leaving this page in Editor mode might cause unsaved data. It is recommended to use 'Close' button instead."); 
		});
		$(window).on("unload", documentsMain.onTerminate);
	},
	
	prepareGrid : function(){
		documentsMain.isEditorMode = false;
		documentsMain.overlay.documentOverlay('hide');
	},
	
	initSession: function(response) {
		if(response && (response.id && !response.es_id)){
			return documentsMain.view(response.id);
		}
		
		$('footer,nav').hide();
		$(documentsMain.toolbar).appendTo('#header');
		
		if (!response || !response.status || response.status==='error'){
			documentsMain.onEditorShutdown(t('documents', 'Failed to load this document. Please check if it can be opened with an external odt editor. This might also mean it has been unshared or deleted recently.'));
			return;
		}
		
		//Wait for 3 sec if editor is still loading 
		if (!documentsMain.ready){
			setTimeout(function(){ documentsMain.initSession(response); }, 3000);
			console.log('Waiting for the editor to start...');
			return;
		}

		documentsMain.canShare = !documentsMain.isGuest
				&& typeof OC.Share !== 'undefined' && response.permissions & OC.PERMISSION_SHARE;
		require({ }, ["owncloud/ServerFactory", "webodf/editor/Editor"], function (ServerFactory, Editor) {
			// fade out file list and show WebODF canvas
			$('#content-wrapper').fadeOut('fast').promise().done(function() {
				
				documentsMain.fileId = response.file_id;
				documentsMain.fileName = response.title;
				
				documentsMain.UI.showEditor(documentsMain.fileName || response.title);
				if (documentsMain.isGuest){
					$('#odf-close').text(t('documents', 'Save') );
					$('#odf-close').removeClass('icon-view-close');
				}
				var serverFactory = new ServerFactory();
				documentsMain.esId = response.es_id;
				documentsMain.memberId = response.member_id;

				// TODO: set webodf translation system, by passing a proper function translate(!string):!string in "runtime.setTranslator(translate);"

				documentsMain.webodfServerInstance = serverFactory.createServer();
				documentsMain.webodfServerInstance.setToken(oc_requesttoken);
				documentsMain.webodfEditorInstance = new Editor(
						{
							allFeaturesEnabled: true,
							collabEditingEnabled: true
						},
						documentsMain.webodfServerInstance, serverFactory
				);
				
				documentsMain.webodfEditorInstance.addEventListener(Editor.EVENT_BEFORESAVETOFILE, documentsMain.UI.showSave);
				documentsMain.webodfEditorInstance.addEventListener(Editor.EVENT_SAVEDTOFILE, documentsMain.UI.hideSave);
				documentsMain.webodfEditorInstance.addEventListener(Editor.EVENT_ERROR, documentsMain.onEditorShutdown);
				documentsMain.webodfEditorInstance.addEventListener(Editor.EVENT_HASSESSIONHOSTCONNECTIONCHANGED, function(has) {
					if (has){
						documentsMain.UI.hideLostConnection();
					} else {
						documentsMain.UI.showLostConnection();
					}
				});
				// load the document and get called back when it's live
				documentsMain.webodfEditorInstance.openSession(documentsMain.esId, documentsMain.memberId, function() {
					documentsMain.webodfEditorInstance.startEditing();
					documentsMain.overlay.documentOverlay('hide');
					parent.location.hash = response.file_id;
				});
			});
		});
	},
	

	joinSession: function(fileId) {
		console.log('joining session '+fileId);
		var url;
		if (documentsMain.isGuest){
			url = OC.generateUrl('apps/documents/ajax/session/joinasguest/{token}', {token: fileId});
		} else {
			url = OC.generateUrl('apps/documents/ajax/session/joinasuser/{file_id}', {file_id: fileId});
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
			$(window).off('unload');
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
			OC.generateUrl('apps/documents/ajax/documents/create'),
			{},
			function(response){
				if (response && response.fileid){
					documentsMain.prepareSession();
					documentsMain.joinSession(response.fileid);
				} else {
					if (response && response.message){
						documentsMain.UI.notify(response.message);
					}
					documentsMain.show();
				}
			}
			
		);
	},
	
	changeNick: function(memberId, name, node){
		var url = OC.generateUrl('apps/documents/ajax/user/rename');
		$.ajax({
			url: url,
			type: "POST",
			data: JSON.stringify({ 
				name : name,
				memberId : memberId
			}),
			contentType: 'application/json; charset=utf-8',
			dataType:"json",
			success: function(result) {
				if (result && result.status === 'error') {
					if (result.message){
						documentsMain.UI.notify(result.message);
					}
					return;
				}
			}
		});
	},
	
	onNickChange: function(memberId, fullNameNode){
		if (!documentsMain.isGuest || memberId !== documentsMain.memberId){
			return;
		}
		if ($(fullNameNode.parentNode).children('input').length !== 0){
			return;
		}
		
		var input = $('<input type="text"/>').val($(fullNameNode).attr('fullname'));
		$(fullNameNode.parentNode).append(input);
		$(fullNameNode).hide();

		input.on('blur', function(){
			var newName = input.val();
			if (!newName || newName === name) {
				input.tipsy('hide');
				input.remove();
				$(fullNameNode).show();
				return;
			}
			else {
				try {
					input.tipsy('hide');
					input.removeClass('error');
					input.tipsy('hide');
					input.remove();
					$(fullNameNode).show();
					documentsMain.changeNick(memberId, newName, fullNameNode);
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

	renameDocument: function(name) {
		var url = OC.generateUrl('apps/documents/ajax/documents/rename/{file_id}', {file_id: documentsMain.fileId});
		$.post(
			url,
			{ name : name },
			function(result) {
				if (result && result.status === 'error') {
					if (result.message){
						documentsMain.IU.notify(result.message);
					}
					return;
				}
				documentsMain.fileName = name;
				$('title').text(documentsMain.UI.mainTitle + '| ' + name);
				$('#document-title').text(name);
			}
		);
	},

	onEditorShutdown : function (message){
			OC.Notification.show(message);

			$(window).off('beforeunload');
			$(window).off('unload');
			if (documentsMain.isEditorMode){
				documentsMain.isEditorMode = false;
				parent.location.hash = "";
			} else {
				setTimeout(OC.Notification.hide, 7000);
			}
			documentsMain.prepareGrid();
			try {
				documentsMain.webodfEditorInstance.endEditing();
				documentsMain.webodfEditorInstance.closeSession(function() {
					documentsMain.webodfEditorInstance.destroy(documentsMain.UI.hideEditor);
				});
			} catch (e){
				documentsMain.UI.hideEditor();
			}
			
			documentsMain.show();
			$('footer,nav').show();
	},
		

	onClose: function() {
		if (!documentsMain.isEditorMode){
			return;
		}
		documentsMain.isEditorMode = false;
		$(window).off('beforeunload');
		$(window).off('unload');
		parent.location.hash = "";

		documentsMain.webodfEditorInstance.endEditing();
		documentsMain.webodfEditorInstance.closeSession(function() {
			$('footer,nav').show();
			documentsMain.webodfEditorInstance.destroy(documentsMain.UI.hideEditor);

			var url = '';
			if (documentsMain.isGuest){
				url = OC.generateUrl('apps/documents/ajax/user/disconnectGuest', {});
			} else {
				url = OC.generateUrl('apps/documents/ajax/user/disconnect', {});
			}
			
			$.post(url, {
				memberId : documentsMain.memberId,
				esId: documentsMain.esId
			});
			
			documentsMain.show();
		});
	},
	
	onTerminate: function(){
		var url = '';
		if (documentsMain.isGuest){
			url = OC.generateUrl('apps/documents/ajax/user/disconnectGuest/{member_id}', {member_id: documentsMain.memberId});
		} else {
			url = OC.generateUrl('apps/documents/ajax/user/disconnect/{member_id}', {member_id: documentsMain.memberId});
		}
		$.ajax({
				type: "POST",
				url: url,
				data: {esId: documentsMain.esId},
				dataType: "json",
				async: false // Should be sync to complete before the page is closed
		});

		
		documentsMain.webodfEditorInstance.endEditing();
		documentsMain.webodfEditorInstance.closeSession(function() {
			if (documentsMain.isGuest){
				$('footer,nav').show();
			}
			documentsMain.webodfEditorInstance.destroy(documentsMain.UI.hideEditor);
		});
	},
	
	show: function(){
		if (documentsMain.isGuest){
			return;
		}
		documentsMain.UI.showProgress(t('documents', 'Loading documents...'));
		documentsMain.docs.documentGrid('render');
		documentsMain.UI.hideProgress();
	}
};


//web odf bootstrap code. Added here to reduce number of requests
/*globals navigator,dojoConfig */
var usedLocale = "C";

if (navigator && navigator.language && navigator.language.match(/^(de)/)) {
	usedLocale = navigator.language.substr(0,2);
}

dojoConfig = {
	locale: usedLocale,
	paths: {
		"webodf/editor": OC.appswebroots.documents + "/js/3rdparty/webodf/editor",
		"dijit": OC.appswebroots.documents + "/js/3rdparty/resources/dijit",
		"dojox": OC.appswebroots.documents + "/js/3rdparty/resources/dojox",
		"dojo": OC.appswebroots.documents + "/js/3rdparty/resources/dojo",
		"resources": OC.appswebroots.documents + "/js/3rdparty/resources",
		"owncloud" : OC.appswebroots.documents + "/js"
	}
};


//init
var Files = Files || {
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
	
	updateStorageStatistics: function(){}
},
FileList = FileList || {};

FileList.getCurrentDirectory = function(){
	return $('#dir').val() || '/';
};

$(document).ready(function() {
	documentsMain.docs = $('.documentslist').documentGrid();
	documentsMain.overlay = $('<div id="documents-overlay" class="icon-loading"></div><div id="documents-overlay-below" class="icon-loading-dark"></div>').documentOverlay();
	
	$('li.document a').tipsy({fade: true, live: true});
	
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
	
	$('.add-document').on('click', '.add', documentsMain.onCreate);

	var file_upload_start = $('#file_upload_start');
	if (typeof supportAjaxUploadWithProgress !== 'undefined' && supportAjaxUploadWithProgress()) {
		file_upload_start.on('fileuploadstart', function(e, data) {
			$('#upload').addClass('icon-loading');
			$('.add-document .upload').css({opacity:0});
		});
	}
	file_upload_start.on('fileuploaddone', function(){
		$('#upload').removeClass('icon-loading');
		$('.add-document .upload').css({opacity:0.7});
		documentsMain.show();
	});
	OC.addStyle('documents', '3rdparty/webodf/wodotexteditor');
	OC.addStyle('documents', '/3rdparty/webodf/wodocollabpane');

	OC.addScript('documents', '3rdparty/webodf/dojo-amalgamation', documentsMain.onStartup);
});
