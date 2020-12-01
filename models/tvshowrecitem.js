const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tvshowRecItemSchema = new Schema({
    listnumber: Number,
    tvshow: {type: Schema.Types.ObjectId, ref: 'Tvshow'},
    description: String
  });

module.exports = mongoose.model('TvshowRecItem', tvshowRecItemSchema);