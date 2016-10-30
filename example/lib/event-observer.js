// LICENSE : MIT
"use strict";
var startBench = require("./benchmark");
var UIEventObserver = require("ui-event-observer").UIEventObserver;
var eventObserver = new UIEventObserver();
for (var i = 0; i < 10; i++) {
    (function(j) {
        eventObserver.subscribe(window, "scroll", function(event) {
        });
    })(i);
}

startBench();
