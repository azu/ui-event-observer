// LICENSE : MIT
"use strict";

var startBench = require("./benchmark");
for (var i = 0; i < 100; i++) {
    (function(j) {
        window.addEventListener("scroll", function(event) {
        });
    })(i);
}

startBench();