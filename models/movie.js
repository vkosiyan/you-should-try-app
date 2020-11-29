const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {type: String, required: true, unique: true},
    releaseYear: Number,
    mpaaRating: String,
    movielink: String,
    genre: String,
    whereToWatch: String
});

module.exports = mongoose.model('Movie', movieSchema);