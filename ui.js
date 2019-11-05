const Promise = require("bluebird");

class UI {
  constructor() {
    this.menuText = "Welcome to the google books cli, please enter a command";
  }
  printWelcome() {
    return this.ask(this.menuText);
  }

  waitForCommand() {}

  ask(question) {
    this.log(question);
    return new Promise(function(resolve) {
      process.stdin.once("data", function(data) {
        resolve(data.toString().trim());
      });
    });
  }

  log(message) {
    console.log(message);
  }
}

module.exports = new UI();
