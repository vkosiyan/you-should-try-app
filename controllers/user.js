const User = require('../models/user');

module.exports = {
    index,
    addFact,
    delFact
    };

  function index(req, res, next) {
    let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
    let sortKey = req.query.sort || 'name';
    User.find(modelQuery)
    .sort(sortKey).exec(function(err, user) {
      if (err) return next(err);
      res.render('user/index', {
        title: 'Profile',
        user,
        user: req.user,
        name: req.query.name,
        sortKey
      });
    });
  }

function addFact(req, res, next) {
    req.user.facts.push(req.body);
    req.user.save(function(err) {
      res.redirect('/user');
    });
  }

  function delFact(req, res, next){
    User.findOne({'facts._id': req.params.id}, function (err, user) {
      user.facts.id(req.params.id).remove();
      puser.save(function(err){
        res.redirect('/user');
      });
    });
  }
