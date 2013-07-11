/*globals navigator,dojoConfig */
var usedLocale = "C";

if (navigator && navigator.language.match(/^(de)/)) {
	usedLocale = navigator.language.substr(0,2);
}

dojoConfig = {
	locale: usedLocale,
	paths: {
		"webodf/editor": "/owncloud/apps/office/js/editor",
		"dijit": "/owncloud/apps/office/js/editor/dijit",
		"dojox": "/owncloud/apps/office/js/editor/dojox",
		"dojo": "/owncloud/apps/office/js/editor/dojo",
		"resources": "/owncloud/apps/office/js/editor/resources"
	}
};


//alert("bootstrap hello");
