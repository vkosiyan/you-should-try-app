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
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    title: String,
    releaseYear: Number,
    mpaaRating: String,
    tvshowlink: String,
    genre: String,
    whereToWatch: String,
    imageLink: String,
    comments: [commentSchema],
    tvshowrec: {type: Schema.Types.ObjectId, ref: 'TvshowRec'},
    usersWatching: []
    });

module.exports = mongoose.model('Tvshow', tvshowSchema);