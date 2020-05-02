"use strict";

function logWarning(message) {
    console.warn("\x1b[1m\x1b[33m%s\x1b[0m", message);
}

module.exports = logWarning;
