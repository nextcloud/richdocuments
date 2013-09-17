/*globals navigator,dojoConfig */
var usedLocale = "C";

if (navigator && navigator.language.match(/^(de)/)) {
	usedLocale = navigator.language.substr(0,2);
}

dojoConfig = {
	locale: usedLocale,
	paths: {
		"webodf/editor": OC.appswebroots.documents + "/js/3rdparty/webodf/editor",
		"dijit": OC.appswebroots.documents + "/resources/dijit",
		"dojox": OC.appswebroots.documents + "/resources/dojox",
		"dojo": OC.appswebroots.documents + "/resources/dojo",
		"resources": OC.appswebroots.documents + "/resources"
	}
};


//alert("bootstrap hello");
