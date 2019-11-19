const Promise = require("bluebird");
const UI = {
  printWelcome() {
    const menuText = "Welcome to the google books cli \n" +
    " query: query the google books api \n" +
    " shelf: view your saved books \n" +
    " exit: exit the program \n" +
    "please enter a command and press enter.";
    return this.ask(menuText);
  },
  makeGoogleRequest() {
    return this.ask("please type your search term and press enter.");
  },
  makeBookSelection(books) {
    books.forEach((book, index) => {
      this.renderBook(book, index);
    });
    return this.ask("you can save a book to your shelf by typing the corresponding number or exit");
  },
  ask(question) {
    this.log(question, "\x1b[36m%s\x1b[0m");
    return new Promise(function(resolve) {
      process.stdin.once("data", function(data) {
        resolve(data.toString().trim());
      });
    });
  },
  // reset color
  log(message, color = '\x1b[0m') {
    console.log(color, message);
  },
  savedBookSucess(book) {
    this.log(`You saved the book ${book.title} to your list \n`);
  },
  exitMessage() {
    this.log("Thanks for using the app, the app will now exit");
  },
  emptyShelf() {
    this.log("Your bookshelf is empty!");
  },
  commandNotFoundMainMenu() {
    this.log("I didn't understand that command", "\x1b[31m");
  },
  commandNotFoundBookSelection() {
    this.log("That is not a valid option, please select a book, or exit", "\x1b[31m");
  },
  bookNotSaved() {
    this.log("You have already saved that book, select a different book or exit", "\x1b[31m");
  },
  renderBook(book, index) {
    this.log(`${index + 1}) Title: ${book.title}`);
    this.log(`   Author: ${book.authors}`);
    this.log(`   Publisher: ${book.publisher}`);
  }
};

module.exports = UI;
