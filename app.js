const UI = require('./ui');
class App {
  constructor() {

  }

  run() {
    UI.printWelcome();
    UI.waitForCommand();
  }
}
module.exports = App;
