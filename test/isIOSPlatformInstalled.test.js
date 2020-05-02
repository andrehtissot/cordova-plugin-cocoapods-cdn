"use strict";

var expect = require("chai").expect;
var sinon = require("sinon");
var faker = require("faker");
var mockRequire = require("mock-require");
var FSMock = {
    statSync: sinon.stub()
};
mockRequire("fs", FSMock);
var isIOSPlatformInstalled = require("../scripts/isIOSPlatformInstalled");

describe("isIOSPlatformInstalled", function () {
    beforeEach(function () {
        FSMock.statSync.reset();
        FSMock.statSync.returns({
            isDirectory: function () {
                return true;
            }
        });
    });

    it("should return false when an error occurs", function () {
        FSMock.statSync.throws(faker.lorem.sentence());
        expect(isIOSPlatformInstalled()).to.be.false;
    });

    it("should return true when it ios's diretory is present", function () {
        expect(isIOSPlatformInstalled()).to.be.true;
    });

    it("should return false when it ios's diretory is absent", function () {
        FSMock.statSync.returns({
            isDirectory: function () {
                return false;
            }
        });
        expect(isIOSPlatformInstalled()).to.be.false;
    });
});
