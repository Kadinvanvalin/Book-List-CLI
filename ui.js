const Promise = require("bluebird");
const GoogleClient = require("./googleClient");
const UI = {
  menuText: () =>
    "Welcome to the google books cli \n" +
    " query: query the google books api \n" +
    " shelf: view your saved books \n" +
    " exit: exit the program \n" +
    "please enter a command and press enter.",
  searchText: () => "please type your search term and press enter.",
  saveBookText: () =>
    "you can save a book to your shelf by typing the corresponding number or exit",
  savedBookText: book => `You saved the book ${book.title} to your list \n`,
  emptyShelfText: () => "Your bookshelf is empty!",
  printWelcome() {
    return this.ask(this.menuText());
  },
  async makeGoogleRequest() {
    const response = await this.ask(this.searchText());
    return await GoogleClient.queryForBooks(response);
  },
  makeBookSelection(books) {
    books.forEach((book, index) => {
      this.renderBook(book, index);
    });
    return this.ask(this.saveBookText());
  },
  ask(question) {
    this.log(question);
    return new Promise(function(resolve) {
      process.stdin.once("data", function(data) {
        resolve(data.toString().trim());
      });
    });
  },
  log(message) {
    console.log(message);
  },
  savedBookSucess(book) {
    this.log(this.savedBookText(book));
  },
  exitMessage() {
    this.log("Thanks for using the app, the app will now exit");
  },
  emptyShelf() {
    this.log(this.emptyShelfText());
  },
  renderBook(book, index) {
    this.log(`${index + 1}) Title: ${book.title}`);
    this.log(`   Author: ${book.authors}`);
    this.log(`   Publisher: ${book.publisher}`);
  }
};

module.exports = UI;
