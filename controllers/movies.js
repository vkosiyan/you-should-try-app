const Movie = require('../models/movie');
const MovieListItem = require('../models/movielistitem');

module.exports = {
  new: newMovie,
  create,
  addToListItem,
  show,
  index
};

function addToListItem(req, res) {
  MovieListItem.findById(req.params.id, function (err, movielistitem) {
    movielistitem.movie.push(req.body.movielistitemId);
    movielistitem.save(function (err) {
      res.redirect(`/movielists/${movielist._id}/movielistsitems/${movielistitem._id}`);
    });
  });
}

function create(req, res) {
  Movie.create(req.body, function (err, movie) {
    res.redirect(`/movielistitems/${req.params.id}`);
  });
}

function newMovie(req, res) {
  Movie.find({}, function (err, movie) {
    MovieListItem.findById(req.params.id, function(err, movielistitem){
      res.render('movies/new', {
        title: 'Add Movie',
        movie, movielistitem
      });
    })
  
});
}

function show(req, res) {
  Movie.findById(req.params.id, function(err, movie) {
    console.log(movie)
    res.render('movies/show', { title: 'Movie Detail', movie });
  });
}

function index(req, res) {
  Movie.find({}, function(err, movies) {
    res.render('movies/index', { title: 'All Movies', movies });
  });
}