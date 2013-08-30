/**
 * @license
 * Copyright (C) 2013 KO GmbH <copyright@kogmbh.com>
 *
 * @licstart
 * The JavaScript code in this page is free software: you can redistribute it
 * and/or modify it under the terms of the GNU Affero General Public License
 * (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 * the License, or (at your option) any later version.  The code is distributed
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.
 *
 * As additional permission under GNU AGPL version 3 section 7, you
 * may distribute non-source (e.g., minimized or compacted) forms of
 * that code without the copy of the GNU GPL normally required by
 * section 4, provided you include this license notice and a URL
 * through which recipients can access the Corresponding Source.
 *
 * As a special exception to the AGPL, any HTML file which merely makes function
 * calls to this code, and for that purpose includes it by reference shall be
 * deemed a separate work for copyright law purposes. In addition, the copyright
 * holders of this code give you permission to combine this code with free
 * software libraries that are released under the GNU LGPL. You may copy and
 * distribute such a system following the terms of the GNU AGPL for this code
 * and the LGPL for the libraries. If you modify this code, you may extend this
 * exception to your version of the code, but you are not obligated to do so.
 * If you do not wish to do so, delete this exception statement from your
 * version.
 *
 * This license applies to this entire compilation.
 * @licend
 * @source: http://www.webodf.org/
 * @source: http://gitorious.org/webodf/webodf/
 */

/*global define, ops, runtime */

define("webodf/editor/server/pullbox/SessionList", [], function () {
    "use strict";

    return function PullBoxSessionList(server) {
        var cachedSessionData = {},
            subscribers = [],
            serverPullingTimeoutId = null,
            pullingActive = true;

        function onSessionData(sessionData) {
            var i,
                isNew = ! cachedSessionData.hasOwnProperty(sessionData.id);

            // cache
            cachedSessionData[sessionData.id] = sessionData;
            runtime.log("get session data for:"+sessionData.title+", is new:"+isNew);

            for (i = 0; i < subscribers.length; i += 1) {
                if (isNew) {
                    subscribers[i].onCreated(sessionData);
                } else {
                    subscribers[i].onUpdated(sessionData);
                }
            }
        }

        function onSessionRemoved(sessionId) {
            var i;

            if (cachedSessionData.hasOwnProperty(sessionId)) {
                delete cachedSessionData[sessionId];

                for (i = 0; i < subscribers.length; i += 1) {
                    subscribers[i].onRemoved(sessionId);
                }
            }
        }

        function pullSessionList() {
            serverPullingTimeoutId = null;

            server.call({
                command: "query_sessiondata_list"
            }, function(responseData) {
                var response = runtime.fromJson(responseData),
                    sessionList, i,
                    unupdatedSessions = {};

                // stopped meanwhile? TODO: support for cancelling calls
                if (!pullingActive) {
                    return;
                }

                runtime.log("query_sessiondata_list reply: " + responseData);

                if (response.hasOwnProperty("sessiondata_list")) {
                    // collect known sessions
                    for (i in cachedSessionData) {
                        if (cachedSessionData.hasOwnProperty(i)) {
                            unupdatedSessions[i] = ""; // some dummy value, unused
                        }
                    }

                    // add/update with all delivered sessions
                    sessionList = response.sessiondata_list;
                    for (i = 0; i < sessionList.length; i++) {
                        if (unupdatedSessions.hasOwnProperty(sessionList[i].id)) {
                            delete unupdatedSessions[sessionList[i].id];
                        }
                        onSessionData(sessionList[i]);
                    }

                    // remove unupdated sessions
                    for (i in unupdatedSessions) {
                        if (unupdatedSessions.hasOwnProperty(i)) {
                            onSessionRemoved(i);
                        }
                    }

                    // next update in 5 secs
                    serverPullingTimeoutId = runtime.getWindow().setTimeout(pullSessionList, 5000);
                } else {
                    runtime.log("Meh, sessionlist data broken: " + responseData);
                }
            });
        }

        this.getSessions = function (subscriber) {
            var i,
                sessionList = [];

            if (subscriber) {
                subscribers.push(subscriber);
            }

            for (i in cachedSessionData) {
                if (cachedSessionData.hasOwnProperty(i)) {
                    sessionList.push(cachedSessionData[i]);
                }
            }

            return sessionList;
        };

        this.unsubscribe = function (subscriber) {
            var i;

            for (i=0; i<subscribers.length; i+=1) {
                if (subscribers[i] === subscriber) {
                    break;
                }
            }

            runtime.assert((i < subscribers.length),
                            "tried to unsubscribe when not subscribed.");

            subscribers.splice(i,1);
        };

        this.setUpdatesEnabled = function (enabled) {
            if (pullingActive === enabled) {
                return;
            }

            pullingActive = enabled;
            if (pullingActive) {
                pullSessionList();
            } else {
                // cancel any running pulling timeout
                if (serverPullingTimeoutId !== null) {
                    runtime.clearTimeout(serverPullingTimeoutId);
                    serverPullingTimeoutId = null;
                }
            }
        };

        function init() {
            pullSessionList();
        }

        init();
    };
});
