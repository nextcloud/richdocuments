/*global define,require */
define("owncloud/widgets/ocShare",
		["dojo/_base/declare", "dojo/dom-style", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "webodf/editor/EditorSession"],
		function (declare, domStyle, _WidgetBase, _TemplatedMixin, EditorSession) {
			return declare("OcShare", [_WidgetBase, _TemplatedMixin], {
				templateString: '<div class="dijit" style="float:left;margin-top:3px">'
						+ '<button id="odf-invite" class="drop icon-share svg" data-dojo-attach-event="onclick: showDropdown">' +
						t('documents', 'Share') +
						'</button></div>',
				postCreate: function () {
					this.inherited(arguments);
					// FixMe: this should not be global
					domStyle.set(this.domNode, "display", !!documentsMain.canShare ? "block" : "none");
				},
				showDropdown: function (event) {
					event.preventDefault();
					if (OC.Share.droppedDown) {
						OC.Share.hideDropDown();
					} else {
						(function () {
							var target = OC.Share.showLink;
							OC.Share.showLink = function () {
								var r = target.apply(this, arguments);
								$('#linkText').val($('#linkText').val().replace('index.php/s/', 'public.php?service=documents&t='));
								return r;
							};
						})();

						OC.Share.showDropDown(
								'file',
								parent.location.hash.replace(/\W*/g, ''),
								$("#header"),
								true,
								OC.PERMISSION_READ | OC.PERMISSION_SHARE | OC.PERMISSION_UPDATE
								);
					}
				}
			});
		}
);
