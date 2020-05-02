"use strict";

var expect = require("chai").expect;
var sinon = require("sinon");
var faker = require("faker");
var mockRequire = require("mock-require");
var FSMock = {
    readdirSync: sinon.stub(),
    statSync: sinon.stub()
};
mockRequire("fs", FSMock);
var findPluginXMLFiles = require("../scripts/findPluginXMLFiles");

describe("findPluginXMLFiles", function () {
    beforeEach(function () {
        FSMock.statSync.reset();
        FSMock.statSync.returns({
            isFile: function () {
                return true;
            }
        });
        FSMock.readdirSync.reset();
        FSMock.readdirSync.returns([
            faker.lorem.slug(),
            faker.lorem.slug(),
            faker.lorem.slug(),
            faker.lorem.slug(),
            faker.lorem.slug()
        ]);
    });

    it("should return an empty array when an error occurs on statSync", function () {
        FSMock.statSync.throws(faker.lorem.sentence());
        var files = findPluginXMLFiles();
        expect(files).to.be.an("array");
        expect(files).to.be.empty;
    });

    it("should return an empty array when an error occurs on readdirSync", function () {
        FSMock.readdirSync.throws(faker.lorem.sentence());
        var files = findPluginXMLFiles();
        expect(files).to.be.an("array");
        expect(files).to.be.empty;
    });

    it("should return an empty array when no plugins have plugin.xml", function () {
        FSMock.statSync.returns({
            isFile: function () {
                return false;
            }
        });
        var files = findPluginXMLFiles();
        expect(files).to.be.an("array");
        expect(files).to.be.empty;
    });

    it("should return a non-empty array when plugins have plugin.xml", function () {
        var countdown = 3;
        FSMock.statSync.returns({
            isFile: function () {
                return countdown-- > 0;
            }
        });
        var files = findPluginXMLFiles();
        expect(files).to.be.an("array");
        expect(files).to.have.lengthOf(3);
    });
});
