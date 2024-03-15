let Book = require('../models/book');
let Author = require('../models/author');

function get_books () {
  return Book.find({}, 'title author')
    .sort({title : 1})  // 1 indictes ascending order
    .populate('author');
}

exports.show_books = async () => { // async function
  try {
    let books = await get_books().exec(); // get_books function is actually a query (see above)
    return books.map(function(b) {
      return b._id + ' : ' + b.title + ' : ' + Author(b.author).name;
    });
  }
  catch(err) {
    console.log('Could not get books ' + err);
  }
}
