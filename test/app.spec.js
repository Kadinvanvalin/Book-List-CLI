const expect = require('chai').expect;
const sinon = require('sinon');
const App = require('../app');
const UI = require('../ui');

describe('App', function () {

  afterEach(function () {
    sinon.restore();
  });
  describe('App#run', function () { 
    it('should output a message for the user and wait for a response', function () {
        const printWelcomeStub = sinon.stub(UI, 'printWelcome');
        const waitForCommandStub = sinon.stub(UI, 'waitForCommand');

        const app = new App();
        app.run();

        expect(printWelcomeStub.called).to.be.equal(true);
        expect(waitForCommandStub.called).to.be.equal(true);
      });
  });
});
