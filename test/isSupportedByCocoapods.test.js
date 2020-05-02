"use strict";

var expect = require("chai").expect;
var sinon = require("sinon");
var faker = require("faker");
var mockRequire = require("mock-require");
var ChildProcessMock = {
    exec: sinon.stub()
};
mockRequire("child_process", ChildProcessMock);
var isSupportedByCocoapods = require("../scripts/isSupportedByCocoapods");

describe("isSupportedByCocoapods", function () {
    beforeEach(function () {
        ChildProcessMock.exec.reset();
    });

    it("should return false when an error occurs", function (done) {
        ChildProcessMock.exec.callsFake(function (command, callback) {
            callback(faker.lorem.sentence());
        });
        isSupportedByCocoapods(function (isIt) {
            expect(isIt).to.be.false;
            done();
        });
    });

    ["1.7.2", "1.7.3", "1.8.0", "2.0.0"].forEach(function (version) {
        it("should return true when version is '" + version + "'", function (done) {
            ChildProcessMock.exec.callsFake(function (command, callback) {
                callback(null, version);
            });
            isSupportedByCocoapods(function (isIt) {
                expect(isIt).to.be.true;
                done();
            });
        });
    });

    ["1.7.1", "1.6.9", "1.6.99", "0.9.9", "0.99.99", ""].forEach(function (version) {
        it("should return false when version is '" + version + "'", function (done) {
            ChildProcessMock.exec.callsFake(function (command, callback) {
                callback(null, version);
            });
            isSupportedByCocoapods(function (isIt) {
                expect(isIt).to.be.false;
                done();
            });
        });
    });
});
