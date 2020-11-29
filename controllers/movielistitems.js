const MovieList = require('../models/movielist');
const MovieListItem = require('../models/movielistitem')

module.exports = {
  create,
  addToList,
  new: newListItem
};

function addToList(req,res){
    MovieList.findById(req.params.id, function(err, movielist){
        movielist.movielistitem.push(req.body.movielistitemId);
        movielist.save(function(err) {
            res.redirect(`/movielists/${movielist._id}`);
        });
    });
}

function create(req, res) {
    MovieListItem.create(req.body, function (err, movielistitem) {
      res.redirect(`/movielists/${req.params.id}`);
    });
  }

function newListItem(req, res) {
    MovieListItem.find({}, function (err, movielistitem) {
      MovieList.findById(req.params.id, function(err, movielist){
        res.render('movielistitems/new', {
          title: 'Add List Item',
          movielistitem, movielist
        });
      })
    
  });
}
