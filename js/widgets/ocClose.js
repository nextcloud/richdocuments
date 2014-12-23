/*global define,require */
define("owncloud/widgets/ocClose",
		["dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "webodf/editor/EditorSession"],
		function (declare, _WidgetBase, _TemplatedMixin, EditorSession) {
			"use strict";
			return declare("OcClose", [_WidgetBase, _TemplatedMixin], {
				templateString: '<span class="dijit">' +
						'<button id="odf-close" class="icon-view-close svg" data-dojo-attach-event="onclick: closeEditor"></button>' +
						'<img id="saving-document" alt="" src="' + OC.imagePath('core', 'loading-dark.gif') + '" /></span>',
				closeEditor: function () {
					// FixMe: this should not be global
					documentsMain.onClose();
				}
			});
		}
);
