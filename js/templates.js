(function() {
  var template = Handlebars.template, templates = OCA.RichDocuments.Templates = OCA.RichDocuments.Templates || {};
templates['revHistoryContainer'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id=\"revPanelContainer\" class=\"loleaflet-font\">\n	<div id=\"revPanelHeader\">\n		<h2>Revision History</h2>\n		<span>"
    + alias4(((helper = (helper = helpers.filename || (depth0 != null ? depth0.filename : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"filename","hash":{},"data":data}) : helper)))
    + "</span>\n		<a class=\"closeButton\"><img src="
    + alias4(((helper = (helper = helpers.closeButtonUrl || (depth0 != null ? depth0.closeButtonUrl : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"closeButtonUrl","hash":{},"data":data}) : helper)))
    + " width=\"22px\" height=\"22px\"></a>\n	</div>\n	<div id=\"revisionsContainer\" class=\"loleaflet-font\">\n		<ul></ul>\n	</div>\n	<input type=\"button\" id=\"show-more-versions\" class=\"loleaflet-font\" value=\""
    + alias4(((helper = (helper = helpers.moreVersionsLabel || (depth0 != null ? depth0.moreVersionsLabel : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"moreVersionsLabel","hash":{},"data":data}) : helper)))
    + "\" />\n</div>\n";
},"useData":true});
templates['revHistoryItem'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li>\n	<a href=\""
    + alias4(((helper = (helper = helpers.downloadUrl || (depth0 != null ? depth0.downloadUrl : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"downloadUrl","hash":{},"data":data}) : helper)))
    + "\" class=\"downloadVersion has-tooltip\" title=\""
    + alias4(((helper = (helper = helpers.downloadTXT || (depth0 != null ? depth0.downloadTXT : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"downloadTXT","hash":{},"data":data}) : helper)))
    + "\">\n		<img src=\""
    + alias4(((helper = (helper = helpers.downloadIconUrl || (depth0 != null ? depth0.downloadIconUrl : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"downloadIconUrl","hash":{},"data":data}) : helper)))
    + "\" />\n		<a class=\"versionPreview\"><span class=\"versiondate has-tooltip\" title=\""
    + alias4(((helper = (helper = helpers.formattedTimestamp || (depth0 != null ? depth0.formattedTimestamp : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"formattedTimestamp","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.relativeTimestamp || (depth0 != null ? depth0.relativeTimestamp : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"relativeTimestamp","hash":{},"data":data}) : helper)))
    + "</span></a>\n		<a href=\""
    + alias4(((helper = (helper = helpers.restoreUrl || (depth0 != null ? depth0.restoreUrl : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"restoreUrl","hash":{},"data":data}) : helper)))
    + "\" class=\"restoreVersion has-tooltip\" title=\""
    + alias4(((helper = (helper = helpers.restoreTXT || (depth0 != null ? depth0.restoreTXT : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"restoreTXT","hash":{},"data":data}) : helper)))
    + "\"><img src=\""
    + alias4(((helper = (helper = helpers.restoreIconUrl || (depth0 != null ? depth0.restoreIconUrl : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"restoreIconUrl","hash":{},"data":data}) : helper)))
    + "\" />\n	</a>\n</li>\n";
},"useData":true});
})();