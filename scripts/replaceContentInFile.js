"use strict";

var fs = require("fs");

function replaceContentInFile(filePath, from, to) {
    var currentContent = fs.readFileSync(filePath);
    if (!currentContent || !currentContent.toString) {
        throw new Error(filePath + " could not be read");
    }
    currentContent = currentContent.toString();
    if (currentContent === "") {
        throw new Error(filePath + " found is completely empty");
    }
    var newContent = currentContent.replace(from, to);
    if (newContent === currentContent) {
        return;
    }
    fs.writeFileSync(filePath, newContent);
}

module.exports = replaceContentInFile;
