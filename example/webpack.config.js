const path = require("path");
module.exports = {
    entry: {
        "addEventListener": "./lib/addEventListener.js",
        "event-observer": "./lib/event-observer.js"
    },
    devtool: process.env.WEBPACK_DEVTOOL || "source-map",
    output: {
        path: path.join(__dirname, "build"),
        filename: "[name].js"
    }
};
