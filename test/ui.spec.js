const chai = require("chai")
const sinon = require("sinon");
const App = require("../app");
const UI = require("../ui");
const mockedUserInput = require("bdd-stdin");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
chai.use(sinonChai);
describe("UI", function() {
  let log;

  beforeEach(function() {
    log = sinon.stub(UI, "log");
  });

  afterEach(function() {
    sinon.restore();
  });

  describe("UI#printWelcome", function() {
    it("should display a prompt for the user", function() {
      const askStub = sinon.stub(UI, "ask");

      UI.printWelcome()

      
      const menuText = "Welcome to the google books cli \n" +
      " query: query the google books api \n" +
      " shelf: view your saved books \n" +
      " exit: exit the program \n" +
      "please enter a command and press enter.";
      expect(askStub).to.be.calledWith(menuText);
    });
  });
  describe("UI#makeGoogleRequest", function() {
    it("should display a prompt for the user", function() {
      const askStub = sinon.stub(UI, "ask");

      UI.makeGoogleRequest()

      
      const query = "please type your search term and press enter.";
      expect(askStub).to.be.calledWith(query);
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
  describe("UI#savedBookSucess", function() { 
    it("displays a success message when passed a book", function() {
      UI.savedBookSucess({title: "Code Complete" });
      expect(log).to.be.calledWith("You saved the book Code Complete to your list \n");
    });
  });
  describe("UI#exitMessage", function() { 
    it("displays a exit message", function() {
      UI.exitMessage();

      expect(log).to.be.calledWith("Thanks for using the app, the app will now exit");
    });
  });

  describe("UI#emptyShelf", function() { 
    it("displays a emptyShelf message", function() {
      UI.emptyShelf();

      expect(log).to.be.calledWith("Your bookshelf is empty!");
    });
  });

  describe("UI#commandNotFoundMainMenu", function() { 
    it("displays a commandNotFoundMainMenu message", function() {
      UI.commandNotFoundMainMenu();

      expect(log).to.be.calledWith("I didn't understand that command", "\x1b[31m");
    });
  });

  describe("UI#commandNotFoundBookSelection", function() { 
    it("displays a commandNotFoundBookSelection message", function() {
      UI.commandNotFoundBookSelection();

      expect(log).to.be.calledWith("That is not a valid option, please select a book, or exit", "\x1b[31m");
    });
  });

  describe("UI#bookNotSaved", function() { 
    it("displays a bookNotSaved message", function() {
      UI.bookNotSaved();

      expect(log).to.be.calledWith("You have already saved that book, select a different book or exit", "\x1b[31m");
    });
  });

  describe("UI#renderBook", function() { 
    it("displays a renderBook message", function() {
      const book = {
        title: "Clean Code",
        authors: ["Robert C. Martin"],
        publisher: "prentice hall"
      };
      UI.renderBook(book, 1);

      expect(log.calledThrice).to.equal(true);
      expect(log.firstCall).to.be.calledWith("2) Title: Clean Code");
      expect(log.secondCall).to.be.calledWith("   Author: Robert C. Martin");
      expect(log.thirdCall).to.be.calledWith("   Publisher: prentice hall");
    });
  });

  describe("UI#makeBookSelection", function() {  
    it("should call renderBook for each book provided, then call ask", function() {
      const askStub = sinon.stub(UI, "ask");
      const renderBookStub = sinon.stub(UI, "renderBook");
      const books = [
        {
        title: "Clean Code",
        authors: ["Robert C. Martin"],
        publisher: "prentice hall"
      },
      {
        title: "Pre-suasion",
        authors: ["Robert Cialdini"],
        publisher: "Simon and Schuster"
      },
    ];
    UI.makeBookSelection(books);
    expect(renderBookStub.firstCall).to.be.calledWith(books[0]);
    expect(renderBookStub.secondCall).to.be.calledWith(books[1])
    expect(askStub).to.be.calledWith("you can save a book to your shelf by typing the corresponding number or exit");

    });
  });
});
