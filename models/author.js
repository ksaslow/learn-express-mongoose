var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// review the Author entity in the schema from class slides!
var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, maxLength: 100}, // validation constsraints, must have first and family name!
    family_name: {type: String, required: true, maxLength: 100}, // constraint, cant be longer than 100 characters!
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// virtual properties are NOT stored in the DB themselves, but are CALCULATED from the existing properties
// aka "calculated fields"!!!
// virtual properties: see how they are an example of ENCAPSULATION! We are hiding the details of the entity from the user!

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () { // we are defining a function but making it look like a property!!! This is an example of ENCAPSULATION!
// To avoid errors in cases where an author does not have either a family name or first name
// We want to make sure we handle the exception by returning an empty string for that case
  var fullname = '';
  if (this.first_name && this.family_name) {
    fullname = this.family_name + ', ' + this.first_name
  }
  if (!this.first_name || !this.family_name) {
    fullname = '';
  }
  return fullname;
});

// Virtual for author's lifespan - TO DO in class!
AuthorSchema
.virtual('lifespan')
.get(function() {
  // return string of form <birthYear - deathYear>, e.g. "1992 - 2014"
  var lifespan = '';
  if (this.date_of_birth && this.date_of_death) {
    lifespan = this.date_of_birth.getFullYear().toString() + ' - ' + this.date_of_death.getFullYear().toString();
  }
  return lifespan;
});

//Export model
// compile! Use the 'Author' as an object within our server
module.exports = mongoose.model('Author', AuthorSchema);
