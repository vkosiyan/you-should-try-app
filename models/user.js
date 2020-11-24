const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const factSchema = new mongoose.Schema({
    text: String
  }, {
    timestamps: true
  });

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    facts: [factSchema],
    dob: Date,
    avatar: String,
    googleId: String,
    favoriteMovie: String,
    favoriteShow: String
  }, {
    timestamps: true
  });

  module.exports = mongoose.model('User', userSchema);