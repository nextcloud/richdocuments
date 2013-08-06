/*globals navigator,dojoConfig */
var usedLocale = "C";

if (navigator && navigator.language.match(/^(de)/)) {
	usedLocale = navigator.language.substr(0,2);
}

dojoConfig = {
	locale: usedLocale,
	paths: {
		"webodf/editor": OC.appswebroots.office + "/js/editor",
		"dijit": OC.appswebroots.office + "/js/editor/dijit",
		"dojox": OC.appswebroots.office + "/js/editor/dojox",
		"dojo": OC.appswebroots.office + "/js/editor/dojo",
		"resources": OC.appswebroots.office + "/js/editor/resources"
	}
};


//alert("bootstrap hello");
