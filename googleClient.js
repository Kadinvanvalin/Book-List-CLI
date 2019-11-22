const request = require("request");

class Book {
  constructor(googleResponse) {
    this.title = Book.normalizeField(googleResponse.title) || "unknown";
    this.authors = Book.normalizeField(googleResponse.authors) || "unknown";
    this.publisher = Book.normalizeField(googleResponse.publisher) || "unknown";
  }

  static normalizeField(input) {
    return Array.isArray(input) ? input.join(", ") : input;
  }
}

const GoogleClient = {
  baseUrl: "https://www.googleapis.com/books/v1/volumes?maxResults=5&q=",
  queryForBooks(searchTerm) {
    return new Promise((resolve, reject) => {
      request(this.baseUrl + searchTerm, { json: true }, (err, res, body) => {
        if (err) {
          return reject(err);
        }
        const books = body.items.map(book => new Book(book.volumeInfo));
        resolve(books);
      });
    });
  }
};

module.exports = GoogleClient;
