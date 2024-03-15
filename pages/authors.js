let Author = require('../models/author');

get_author_list = async () => {
  let authors_list = await Author.find()
  .sort([['family_name', 'ascending']]) // don't need to sort here, but could
  .exec()
  return authors_list.map(function(author) {
    return author.name + " : " + author.lifespan;
  });
};

exports.show_all_authors = function(res) {
  get_author_list()
    .then((data) => res.send(data))
    .catch((_) => res.send('No authors found'));
}
