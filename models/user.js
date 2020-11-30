const mongoose = require('mongoose');

const factSchema = new mongoose.Schema({
    text: String
  }, {
    timestamps: true
  });

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    movierecss: [],
    avatar: String,
    googleId: String,
  }, {
    timestamps: true
  });

  module.exports = mongoose.model('User', userSchema);

  
