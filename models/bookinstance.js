var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// notice that (unlike Author, which is made of primitive types only) BookInstance has a reference to the Book Object!

var BookInstanceSchema = new Schema(
  {
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true }, //reference to the associated Book Object!
    imprint: {type: String, required: true},
    status: {type: String, required: true, enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance'},
    due_back: {type: Date, default: Date.now}
  }
);

// first define the Model (above), then compile it (below)!

//Export model
module.exports = mongoose.model('BookInstance', BookInstanceSchema);
