// LICENSE : MIT
"use strict";

var startBench = require("./benchmark");
for (var i = 0; i < 10; i++) {
    (function(j) {
        window.addEventListener("scroll", function(event) {
        });
    })(i);
}

startBench();