let async = require('async');
let Book = require('../models/book');
let BookInstance = require('../models/bookinstance');

function get_book(id) {
    if (typeof id !== "string") {
        return ({status: "error"});
    }
    return Book.findOne({'_id': {$eq: id}}).populate('author');
}

function get_book_dtl(id) {
  return BookInstance
          .find({ 'book': id })
              // note the security vulnerability here by usind id directly in the query!
              // we are directly using id without sanitizing the input first
              // could lead to a SQL injection!!!
              // use variables in a way that ensures that a script cannot be injected!
          .select('imprint status');
}

exports.show_book_dtls = async (res, id) => {
  const results = await Promise.all([get_book(id).exec(), get_book_dtl(id).exec()])
  try {
    let book = await results[0];
    let copies = await results[1];
    res.send({
      title: book.title,
      author: book.author.name,
      copies: copies,
    });
  }
  catch(err) {
    res.send(`Book ${id} not found`);
  } 
}
