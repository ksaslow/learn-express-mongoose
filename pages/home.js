let Book = require('../models/book');
let Author = require('../models/author');
let BookInstance = require('../models/bookinstance');
let Genre = require('../models/genre');

exports.show_home = async function (res) {
  let books = await Book.countDocuments({}); // will give us # of documents in Book collection, will return a Promise!
  let copies = await BookInstance.countDocuments({});
  let available = await BookInstance.countDocuments({status: 'Available'}); // look only for book instances (docs) which are available
  let authors = await Author.countDocuments({});
  let genres = await Genre.countDocuments({});
  // http response to be sent back to the server
  let msg = `<div><p> Books: ${books} </p> <p>Copies: ${copies}</p> Copies Available: ${available}</p> Authors: ${authors}</p><p>Genres: ${genres} </p></div>`
  res.send(msg);
}
