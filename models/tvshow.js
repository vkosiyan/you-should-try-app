const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    wouldRecommend: String,
    userId: { type: Schema.Types.ObjectId, ref: 'User'},
    userName: String,
    content: String
  }, {
    timestamps: true
  });

const tvshowSchema = new Schema({
    title: {type: String, required: true, unique: true},
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    releaseYear: Number,
    mpaaRating: String,
    tvshowlink: String,
    genre: String,
    whereToWatch: String,
    comments: [commentSchema]
    });

module.exports = mongoose.model('Tvshow', tvshowSchema);