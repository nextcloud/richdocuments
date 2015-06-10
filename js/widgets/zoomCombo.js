/*global define,require */

define("owncloud/widgets/zoomCombo",
       ["webodf/editor/EditorSession"],

    function (EditorSession) {
    "use strict";
    /**
     * @constructor
     */
   return function ZoomCombo(callback) {
        var self = this,
            editorSession,
            zoomStore,
            combo,
            canZoomTo = [
                {name: "25%", id: "0.25"},
                {name: "50%", id: "0.5"},
                {name: "75%", id: "0.75"},
                {name: "100%", id: "1"},
                {name: "125%", id: "1.25"},
                {name: "150%", id: "1.5"},
                {name: "200%", id: "2"},
                {name: "250%", id: "2.5"},
                {name: "300%", id: "3"},
                {name: "350%", id: "3.5"},
                {name: "400%", id: "4"}
            ],
            defaultZoom = "100%";

        function makeWidget(callback) {
            require(["dijit/form/ComboBox", "dojo/store/Memory"], function (ComboBox, Memory) {
               zoomStore = new Memory({
                    data: canZoomTo
                });

                combo = new ComboBox({
                    name: 'ZoomCombo',
                    maxHeight: 200,
                    store: zoomStore,
                    searchAttr: "name",
                    class: "dijit",
                    value: defaultZoom,
                    style: {
                        height: '23px',
                        width: '60px',
                        float: 'right'
                    }
                });
                
                combo.onChange = function (value) {
                    if (editorSession && value && !isNaN(parseInt(value))) {
                        editorSession.getOdfCanvas().getZoomHelper().setZoomLevel(parseInt(value)/100);
                    }
                    self.onToolDone();
                };

                return callback(combo);
            });
        }
        
        function updateComboBox(zoomLevel) {
            if (combo) {
                self.setValue(zoomLevel);
            }
        }

        this.setValue = function (value) {
            if (value === "") {
                value = defaultZoom;
            } else {
                value = value * 100 + "%";
            }
            combo.set('value', value, false);
        };

        this.onAdd = null;
        this.onRemove = null;
        this.onChange = function () {};
        this.onToolDone = function () {};

        function addValue(option) {
            if (combo) {
                combo.addOption({
                    label: option.label,
                    value: option.value
                });
            }

            if (self.onAdd) {
                self.onAdd(option.label);
            }
        }

        function removeValue(option) {
            if (combo) {
                combo.removeOption(option.value);
            }

            if (self.onRemove) {
                self.onRemove(option.value);
            }
        }

        this.setEditorSession = function(session) {
            var zoomHelper;
            if (editorSession) {
                editorSession.getOdfCanvas().getZoomHelper().unsubscribe(gui.ZoomHelper.signalZoomChanged, updateComboBox);
            }
            editorSession = session;
            if (editorSession) {
                zoomHelper = editorSession.getOdfCanvas().getZoomHelper();
                zoomHelper.subscribe(gui.ZoomHelper.signalZoomChanged, updateComboBox);
                updateComboBox(zoomHelper.getZoomLevel());
            }
        };

        // init
        makeWidget(function (widget) {
            return callback(widget);
        });
    };
});
