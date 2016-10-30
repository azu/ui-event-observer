// LICENSE : MIT
"use strict";
function scrollTo(y, next) {
    window.scrollTo(0, y);
    setTimeout(next, 0);
}
function scrollBench(yPoints, next) {
    var currentY = yPoints.shift();
    if (currentY === undefined) {
        return next();
    }
    scrollTo(currentY, function() {
        scrollBench(yPoints, next);
    })
}
module.exports = function() {
    console.time("scroll-perf");
    console.profile("scroll-perf");
    scrollBench([0, 100, 200, 300, 100, 400, 500, 600, 700, 800, 100, 900, 1000], function() {
        console.profileEnd("scroll-perf");
        console.timeEnd("scroll-perf");
    });
};