/*global define,require */

define("owncloud/widgets/ocToolbar",
		[
			"dojo/ready",
			"owncloud/widgets/ocLogo",
			"owncloud/widgets/ocShare",
			"owncloud/widgets/ocClose",
			"owncloud/widgets/titleBar",
			"webodf/editor/EditorSession"
		],
		function (ready, OcLogo, OcShare, OcClose, TitleBar, EditorSession) {
			"use strict";
			return function OcToolbar(callback) {
				var tr = runtime.tr,
						ocToolbar,
						ocToolbarInside,
						ocLogo,
						ocShare,
						ocClose,
						titleBar
						;
				function makeWidget(callback) {
					require(["dijit/Toolbar"], function (Toolbar) {
						ocToolbar = new Toolbar({}, "ocToolbar");
						ocToolbarInside = new Toolbar({}, "ocToolbarInside");
						// OC Logo
						ocLogo = new OcLogo();
						ocLogo.placeAt(ocToolbarInside);
						ocLogo.startup();
						// OC Share
						ocShare = new OcShare();
						ocShare.placeAt(ocToolbarInside);
						ocShare.startup();
						//title
						titleBar = new TitleBar();
						titleBar.placeAt(ocToolbarInside);
						titleBar.startup();
						// OC Close
						ocClose = new OcClose();
						ocClose.placeAt(ocToolbar);
						ocClose.startup();
					});
					return callback(ocToolbar);
				};
				// init
				makeWidget(function (widget) {
					return callback(widget);
				});
			};
		}
);