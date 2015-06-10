/*global define,require */
define("owncloud/widgets/ocLogo",
		["dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "webodf/editor/EditorSession"],
		function (declare, _WidgetBase, _TemplatedMixin, EditorSession) {
			return declare("OcLogo", [_WidgetBase, _TemplatedMixin], {
				templateString: '<div style="float:left" class="padded"><a href="' + (OC.webroot || '/') +'"><div class="logo-icon"></div></a></div>',
				startup: function () {
					$('#header').children(':not(#ocToolbar)').hide();
					this.inherited(arguments);
				},
				destroy: function () {
					this.inherited(arguments);
					$('#header').children(':not(#ocToolbar)').show();
				}
			});
		}
);
