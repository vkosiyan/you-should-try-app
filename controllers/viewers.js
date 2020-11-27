const Viewer = require('../models/viewer');

module.exports = {
    index,
    addFact,
    delFact
  };

  function index(req, res, next) {
    console.log(req.query)
    // Make the query object to use with Student.find based up
    // the viewer has submitted the search form or now
    let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
    // Default to sorting by name
    let sortKey = req.query.sort || 'name';
    Viewer.find(modelQuery)
    .sort(sortKey).exec(function(err, viewer) {
      if (err) return next(err);
      // Passing search values, name & sortKey, for use in the EJS
      res.render('viewers/index', {
        viewers,
        user: req.user,
        name: req.query.name,
        sortKey
      });
    });
  }

function addFact(req, res, next) {
    req.user.facts.push(req.body);
    req.user.save(function(err) {
      res.redirect('/viewers');
    });
  }

  function delFact(req, res, next){
    Viewer.findOne({'facts._id': req.params.id}, function (err, viewer) {
      viewer.facts.id(req.params.id).remove();
      viewer.save(function(err){
        res.redirect('/viewers');
      });
    });
  }
