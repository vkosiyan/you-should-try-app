const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieRecItemSchema = new Schema({
    listnumber: Number,
    movie: {type: Schema.Types.ObjectId, ref: 'Movie'},
    description: String
  });

module.exports = mongoose.model('MovieRecItem', movieRecItemSchema);