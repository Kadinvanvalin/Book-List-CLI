const ControlFlow = {
  menuCommands: (app, UI) => {
    return [
      {
        matches: input => input === "exit",
        execute: () => {
          UI.exitMessage();
          process.exit(0);
        }
      },
      {
        matches: input => input === "query",
        execute: async () => {
          app.browsing = await UI.makeGoogleRequest();
          app.showBookOptions();
        }
      },
      {
        matches: input => input === "shelf",
        execute: async () => {
          if (app.shelf.length === 0) {
            UI.emptyShelf();
            app.run();
            return;
          }
          app.shelf.forEach((book, index) => {
            UI.log(`${index + 1})`);
            UI.renderBook(book);
          });
          app.run();
        }
      },
      {
        matches: () => true,
        execute: () => {
          UI.log("I didn't understand that command");
          app.run();
        }
      }
    ];
  },
  bookSelectionCommands: (app, UI) => {
    return [
      {
        matches: input => input === "exit",
        execute: () => {
          app.run();
        }
      },
      {
        matches: input => app.alreadyOnShelf(app.browsing[input - 1]),
        execute: async () => {
          UI.log("You have already saved that book, select a different book or exit");
          this.showBookOptions();
        }
      },
      {
        matches: input => !app.inRange(+input),
        execute: async () => {
          UI.log("That is not a valid option, please select a book, or exit");
          app.showBookOptions();
        }
      },
      {
        matches: () => true,
        execute: input => {
          const checkedOutBook = app.browsing[input - 1];
          UI.savedBookSucess(checkedOutBook);
          app.shelf = [...app.shelf, checkedOutBook];
          app.run();
        }
      }
    ];
  }
};
module.exports = ControlFlow;
