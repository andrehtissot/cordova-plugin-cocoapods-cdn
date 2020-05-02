"use strict";

var sinon = require("sinon");
var faker = require("faker");
var warnExpectation = sinon.expectation.create(["warn"]);
global.console.warn = warnExpectation;
var logWarning = require("../scripts/logWarning");

describe("logWarning", function () {
    it("should call console warn with style", function () {
        warnExpectation.once();
        var message = faker.lorem.sentence();
        warnExpectation.withExactArgs("\x1b[1m\x1b[33m%s\x1b[0m", message);
        logWarning(message);
        warnExpectation.verify();
    });
});
