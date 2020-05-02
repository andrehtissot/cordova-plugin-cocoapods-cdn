"use strict";

var childProcess = require("child_process");

// Verifies if installed version of cocoapods supports the cdn repo
// 1.7.2
var SUPPORTED_MAJOR = "1";
var SUPPORTED_MINOR = "7";
var SUPPORTED_PATCH = "2";

function isSupportedByCocoapods(callback) {
    childProcess.exec("pod --version", function (err, stdout) {
        if (err) {
            callback(false);
            return;
        }
        var currentVersion = stdout.replace(/[^\.\d]/, "").split(".");
        if (currentVersion[0] !== SUPPORTED_MAJOR) {
            callback(currentVersion[0] > SUPPORTED_MAJOR);
            return;
        }
        if (currentVersion[1] !== SUPPORTED_MINOR) {
            callback(currentVersion[1] > SUPPORTED_MINOR);
            return;
        }
        callback(currentVersion[2] >= SUPPORTED_PATCH);
    });
}

module.exports = isSupportedByCocoapods;
