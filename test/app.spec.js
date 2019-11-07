const expect = require("chai").expect;
const sinon = require("sinon");
const App = require("../app");
const UI = require("../ui");
const mockedUserInput = require("bdd-stdin");

describe("App", function() {
  let log;

  beforeEach(function() {
    log = sinon.stub(UI, "log");
  });

  afterEach(function() {
    sinon.restore();
  });

  describe("App#run", function() {
    it("should call UI to display and call the wait for command", function() {
      const printWelcomeStub = sinon.spy(UI, "printWelcome");

      const app = new App();
      app.run();

      expect(printWelcomeStub.called).to.be.equal(true);
    });
  });

  xit("should prompt the user for a book search when the user types query", function() {
    mockedUserInput("query");
    const printGoogleRequestStub = sinon.stub(UI, "printGoogleRequest");

    const app = new App();
    app.run();

    expect(printGoogleRequestStub.called).to.be.equal(true);
  });
});
