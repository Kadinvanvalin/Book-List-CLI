# Book List CLI
Book list cli is a tool to query the google books api for books, and save them to a local list.
The saved books do not persist between uses of the app.

## Getting started
Make sure you have Nodejs installed on your machine. 
```bash
$ npm install
$ npm start
```

## Structure of app

When you run the app, index.js is called which creates a new app.
Control flow is where all of the possible commands are evaluated. There are two "levels" of commands in the cli and their options are included in ControlFlow#menuCommands and controlFlow#bookSelectionCommands. UI is for all the inputs and output of the terminal and googleClient is were the request to the google books api happens.