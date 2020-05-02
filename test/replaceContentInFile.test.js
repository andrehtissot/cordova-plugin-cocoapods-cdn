"use strict";

var expect = require("chai").expect;
var sinon = require("sinon");
var faker = require("faker");
var mockRequire = require("mock-require");
var FSMock = {
    readFileSync: sinon.stub(),
    writeFileSync: sinon.stub()
};
mockRequire("fs", FSMock);
var replaceContentInFile = require("../scripts/replaceContentInFile");

describe("replaceContentInFile", function () {
    var FAKE_PREPEND = faker.lorem.paragraphs();
    var FAKE_APPEND = faker.lorem.paragraphs();
    var FAKE_FROM = faker.lorem.words();
    var FAKE_TO = faker.lorem.words();
    var FAKE_READ_CONTENT = FAKE_PREPEND + FAKE_FROM + FAKE_APPEND;
    var FAKE_WRITE_CONTENT = FAKE_PREPEND + FAKE_TO + FAKE_APPEND;
    var FAKE_FILE_PATH = faker.system.filePath() || "/dev/null/" + faker.system.fileName();

    var callReplace = function () {
        replaceContentInFile(FAKE_FILE_PATH, FAKE_FROM, FAKE_TO);
    };

    beforeEach(function () {
        FSMock.writeFileSync.reset();
        FSMock.readFileSync.reset();
        FSMock.readFileSync.returns(FAKE_READ_CONTENT);
    });

    it("should replace text if the content match", function () {
        callReplace();
        expect(FSMock.writeFileSync.calledOnce).to.be.true;
        expect(FSMock.writeFileSync.calledWithExactly(FAKE_FILE_PATH, FAKE_WRITE_CONTENT)).to.be
            .true;
    });

    it("should not change text if the content doesn't match", function () {
        FSMock.readFileSync.returns(FAKE_PREPEND + FAKE_APPEND);
        callReplace();
        expect(FSMock.writeFileSync.called).to.be.false;
    });

    it("should throw error if the file is unreadable", function () {
        var errorMessage = faker.lorem.sentence();
        FSMock.readFileSync.throws(new Error(errorMessage));
        expect(function () {
            callReplace();
        }).to.throw(errorMessage);
    });

    it("should throw error if the file is unwrittable", function () {
        var errorMessage = faker.lorem.sentence();
        FSMock.writeFileSync.throws(new Error(errorMessage));
        expect(function () {
            callReplace();
        }).to.throw(errorMessage);
    });

    it("should throw error if the file is unreadable", function () {
        FSMock.readFileSync.returns(undefined);
        expect(function () {
            callReplace();
        }).to.throw(FAKE_FILE_PATH + " could not be read");
    });

    it("should throw error if the file is empty", function () {
        FSMock.readFileSync.returns("");
        expect(function () {
            callReplace();
        }).to.throw(FAKE_FILE_PATH + " could not be read");
    });
});
