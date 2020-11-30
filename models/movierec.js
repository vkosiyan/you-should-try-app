const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const movieListSchema = new Schema({
  movierecitem: [{type: Schema.Types.ObjectId, ref: 'MovieRecItem'}],
    title: String,
    listDesc: String,
    user: String
    });

module.exports = mongoose.model('MovieRec', movieListSchema);