/*globals navigator,dojoConfig */
var usedLocale = "C";

if (navigator && navigator.language.match(/^(de)/)) {
	usedLocale = navigator.language.substr(0,2);
}

dojoConfig = {
	locale: usedLocale,
	paths: {
		"webodf/editor": OC.appswebroots.documents + "/js/editor",
		"dijit": OC.appswebroots.documents + "/js/editor/dijit",
		"dojox": OC.appswebroots.documents + "/js/editor/dojox",
		"dojo": OC.appswebroots.documents + "/js/editor/dojo",
		"resources": OC.appswebroots.documents + "/js/editor/resources"
	}
};


//alert("bootstrap hello");
