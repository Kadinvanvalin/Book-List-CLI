const expect = require("chai").expect;
const sinon = require("sinon");
const App = require("../app");
const UI = require("../ui");
const mockedUserInput = require("bdd-stdin");

describe("UI", function() {
  let log;

  beforeEach(function() {
    log = sinon.spy(UI, "log");
  });

  afterEach(function() {
    sinon.restore();
  });

  describe("UI#printWelcome", function() {
    it("should display a prompt for the user", function(done) {
      mockedUserInput("ok");

      UI.printWelcome().then(function() {
        expect(log.calledWith(UI.menuText)).to.be.equal(true);
        done();
      });
    });
  });

  describe("UI#ask", function() {
    it("asks a question", function(done) {
      mockedUserInput("response");
      UI.ask("question: test").then(function(response) {
        expect(response).to.be.equal("response");
        done();
      });
    });
  });
});
