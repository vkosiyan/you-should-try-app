const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieListItemSchema = new Schema({
    listnumber: Number,
    movies: [{type: Schema.Types.ObjectId, ref: 'Movie'}],
    description: String
  });

module.exports = mongoose.model('MovieListItem', movieListItemSchema);