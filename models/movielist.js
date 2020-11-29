const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const movieListSchema = new Schema({
  movielistitem: [{type: Schema.Types.ObjectId, ref: 'MovieListItem'}],
    title: String,
    listDesc: String,
    user: String
    });

module.exports = mongoose.model('MovieList', movieListSchema);