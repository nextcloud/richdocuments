/*global define,require */

define("owncloud/widgets/zoomSelect",
       ["webodf/editor/EditorSession"],

    function (EditorSession) {
    "use strict";
    /**
     * @constructor
     */
   return function ZoomSelect(callback) {
        var self = this,
            editorSession,
            select,
            canZoomTo = [25, 50, 75, 100, 125, 150, 200, 250, 300, 350, 400],
            defaultZoom = 100;

        function makeWidget(callback) {
            require(["dijit/form/Select"], function (Select) {
                select = new Select({
                    name: 'ZoomSelect',
                    maxHeight: 200,
                    value: defaultZoom + "",
                    style: {
                        width: '100px',
                        margin: "2px 10px 0 0",
                        float: 'right'
                    }
                });
                
                select.onChange = function (value) {
                    if (editorSession && value) {
                        editorSession.getOdfCanvas().getZoomHelper().setZoomLevel(parseInt(value)/100);
                    }
                    self.onToolDone();
                };
                populateValues();

                return callback(select);
            });
        }
        
        function populateValues() {
            var i, selectionList;

            selectionList = [];
            if (!select) {
                return;
            }

            for (i = 0; i < canZoomTo.length; i++) {
                selectionList.push({
                    label: canZoomTo[i] + '%',
                    value: canZoomTo[i] + ""
                });
            }

            select.removeOption(select.getOptions());
            select.addOption(selectionList);
        }
        
        function updateSelect(zoomLevel) {
            if (select) {
                self.setValue(zoomLevel);
            }
        }

        this.setValue = function (value) {
            if (value === "") {
                value = defaultZoom + "";
            }
            select.set('value', value * 100 + "", false);
        };

        this.onAdd = null;
        this.onRemove = null;
        this.onChange = function () {};
	this.onToolDone = function () {};

        function addValue(option) {
            if (select) {
                select.addOption({
                    label: option.label,
                    value: option.value
                });
            }

            if (self.onAdd) {
                self.onAdd(option.label);
            }
        }

        function removeValue(option) {
            if (select) {
                select.removeOption(option.value);
            }

            if (self.onRemove) {
                self.onRemove(option.value);
            }
        }

        this.setEditorSession = function(session) {
            var zoomHelper;
            if (editorSession) {
                editorSession.getOdfCanvas().getZoomHelper().unsubscribe(gui.ZoomHelper.signalZoomChanged, updateSelect);
            }
            editorSession = session;
            if (editorSession) {
                zoomHelper = editorSession.getOdfCanvas().getZoomHelper();
                zoomHelper.subscribe(gui.ZoomHelper.signalZoomChanged, updateSelect);
                updateSelect(zoomHelper.getZoomLevel());
            }
        };

        // init
        makeWidget(function (widget) {
            return callback(widget);
        });
    };
});
