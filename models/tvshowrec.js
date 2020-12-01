const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const tvshowListSchema = new Schema({
  tvshowrecitem: [{type: Schema.Types.ObjectId, ref: 'TvshowRecItem'}],
    title: String,
    listDesc: String,
    user: String
    });

module.exports = mongoose.model('TvshowRec', tvshowListSchema);