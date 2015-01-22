/*global define,require */
define("owncloud/widgets/titleBar",
		["dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dojox/html/entities", "webodf/editor/EditorSession"],
		function (declare, _WidgetBase, _TemplatedMixin, Entities, EditorSession) {
			return declare("TitleBar", [_WidgetBase, _TemplatedMixin], {
				title : '',
				templateString:
					'<div style="float:left;min-width:320px;margin-top:5px;" class="dijit">' +
					'<div id="document-title" data-dojo-attach-event="onclick: showRenamePrompt" data-dojo-attach-point="titleNode">${title}</div>' +
					'</div>',
				buildRendering: function () {
					// FixMe: this should not be global
					this.title = Entities.encode(documentsMain.fileName);
					this.inherited(arguments);
				},
				showRenamePrompt: function () {
					var name = documentsMain.fileName;
					var lastPos = name.lastIndexOf('.');
					var extension = name.substr(lastPos + 1);
					name = name.substr(0, lastPos);
					var input = $('<input type="text" class="filename"/>').val(name);
					$('#document-title').parent().append(input);
					$('#document-title').hide();

					input.on('blur', function () {
						var newName = input.val();
						if (!newName || newName === name) {
							input.tipsy('hide');
							input.remove();
							$('#document-title').show();
							return;
						}
						else {
							newName = newName + '.' + extension;
							try {
								input.tipsy('hide');
								input.removeClass('error');
								if (Files.isFileNameValid(newName)) {
									input.tipsy('hide');
									input.remove();
									$('#document-title').show();
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
					input.on('keyup', function (event) {
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
				}
			});
		}
);
