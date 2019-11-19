const UI = require("./ui");
const controlFlow = require("./controlFlow");
class App {
  constructor() {
    this.browsing = [];
    this.shelf = [];
    this.menuCommands = controlFlow.menuCommands(this, UI);
    this.bookSelectionCommands = controlFlow.bookSelectionCommands(this, UI);
  }

  async run() {
    const input = await UI.printWelcome();
    this.respondToUserInput(input, this.menuCommands);
  }

  async respondToUserInput(input, commands) {
    commands.find(command => command.matches(input)).execute(input);
  }

  async showBookOptions() { 
    const command = await UI.makeBookSelection(this.browsing);
    this.respondToUserInput(command, this.bookSelectionCommands);
  }

  alreadyOnShelf(checkedOutBook) {
    function compare(bookOnShelf) {
      for (var property in checkedOutBook) {
        if (!Object.is(bookOnShelf[property], checkedOutBook[property]))
          return false;
      }
      return true;
    }

    return this.shelf.find(compare);
  }

  inRange(x, min = 1, max = 5) {
    return (x - min) * (x - max) <= 0;
  }
}
module.exports = App;
