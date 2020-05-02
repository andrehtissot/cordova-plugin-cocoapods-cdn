#!/usr/bin/env node
"use strict";

var isSupportedByCocoapods = require("./isSupportedByCocoapods");
var isIOSPlatformInstalled = require("./isIOSPlatformInstalled");
var replaceContentInFile = require("./replaceContentInFile");
var findPluginXMLFiles = require("./findPluginXMLFiles");

var PODFILE_PATH = "platforms/ios/Podfile";
var PODFILE_CDN_SOURCE = "source 'https://cdn.cocoapods.org/'";
var PODFILE_GH_SOURCE = "source 'https://github.com/CocoaPods/Specs.git'";
var PLUGIN_XML_CDN_SOURCE = '<source url="https://cdn.cocoapods.org"/>';
var PLUGIN_XML_GH_SOURCE = '<source url="https://github.com/CocoaPods/Specs.git"/>';

function replaceInPodfile(isCDNSupported) {
    if (isCDNSupported) {
        replaceContentInFile(PODFILE_PATH, PODFILE_GH_SOURCE, PODFILE_CDN_SOURCE);
    } else {
        replaceContentInFile(PODFILE_PATH, PODFILE_CDN_SOURCE, PODFILE_GH_SOURCE);
    }
}

function replaceInPluginXML(filePath, isCDNSupported) {
    if (isCDNSupported) {
        replaceContentInFile(filePath, PLUGIN_XML_GH_SOURCE, PLUGIN_XML_CDN_SOURCE);
    } else {
        replaceContentInFile(filePath, PLUGIN_XML_CDN_SOURCE, PLUGIN_XML_GH_SOURCE);
    }
}

function main() {
    isSupportedByCocoapods(function (isCDNSupported) {
        if (isIOSPlatformInstalled()) {
            replaceInPodfile(isCDNSupported);
        }
        findPluginXMLFiles().forEach(function (pluginXMLFilePath) {
            replaceInPluginXML(pluginXMLFilePath, isCDNSupported);
        });
    });
}

main();
