const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movieListSchema = new Schema({
    title: String,
    listDesc: String,
    user: String,
    movies: [String]
});

module.exports = mongoose.model('MovieList', movieListSchema);