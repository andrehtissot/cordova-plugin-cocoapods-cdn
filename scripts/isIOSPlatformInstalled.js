"use strict";

var fs = require("fs");

var IOS_PLATFORM_PATH = "platforms/ios";

function isIOSPlatformInstalled() {
    try {
        return fs.statSync(IOS_PLATFORM_PATH).isDirectory();
    } catch (e) {
        return false;
    }
}

module.exports = isIOSPlatformInstalled;
