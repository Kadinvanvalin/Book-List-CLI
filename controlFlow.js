const GoogleClient = require("./googleClient");
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
          const request = await UI.makeGoogleRequest();
          app.browsing =  await GoogleClient.queryForBooks(request);
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
            UI.renderBook(book, index);
          });
          app.run();
        }
      },
      {
        matches: () => true,
        execute: () => {
          UI.commandNotFoundMainMenu();
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
          UI.bookNotSaved();
          app.showBookOptions();
        }
      },
      {
        matches: input => !app.inRange(+input),
        execute: async () => {
          UI.commandNotFoundBookSelection();
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
