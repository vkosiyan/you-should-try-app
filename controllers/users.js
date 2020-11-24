const User = require('../models/user');

module.exports = {
    addFact
  };

function addFact(req, res, next) {
    req.user.facts.push(req.body);
    req.user.save(function(err) {
      res.redirect('/users');
    });
  }