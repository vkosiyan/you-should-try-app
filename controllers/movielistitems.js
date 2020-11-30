const MovieList = require('../models/movielist');
const MovieListItem = require('../models/movielistitem')
const Movie = require('../models/movie');
module.exports = {
  create,
  addToList,
  new: newListItem,
  show
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
  res.render('movielistitems/new', { title: 'Add List Item' });
}

function show(req, res) {
  MovieListItem.findById(req.params.id).populate('movies').exec(function(err, movielistitem) {
    Movie.find(
      {_id: {$nin: movielistitem.movie}},
      function(err, movies) {
        console.log(movies);
        res.render('movielistitems/show', {
          title: 'Movie List Item Detail', movielistitem, movies
        })
      }
    )
  });
}