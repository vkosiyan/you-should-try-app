const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const tvshowListSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User'},
    title: String,
    listDesc: String,
    imageLink: String,
    tvshows: [{type: Schema.Types.ObjectId, ref: 'Tvshow'}]
    });

module.exports = mongoose.model('TvshowRec', tvshowListSchema);