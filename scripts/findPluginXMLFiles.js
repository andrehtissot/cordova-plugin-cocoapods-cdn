"use strict";

var fs = require("fs");

var PLUGIN_DIR_PATH = "plugins";
var PLUGIN_FILE_NAME = "plugin.xml";

function getFilePath(pluginDirPath) {
    return PLUGIN_DIR_PATH + "/" + pluginDirPath + "/" + PLUGIN_FILE_NAME;
}

function listPlugins() {
    try {
        return fs.readdirSync(PLUGIN_DIR_PATH) || [];
    } catch (e) {
        return [];
    }
}

function findPluginXMLFiles() {
    var plugins = listPlugins();
    var filePaths = [];
    plugins.forEach(function (plugin) {
        var filePath = getFilePath(plugin);
        try {
            if (fs.statSync(filePath).isFile()) {
                filePaths.push(filePath);
            }
        } catch (e) {}
    });
    return filePaths;
}

module.exports = findPluginXMLFiles;
