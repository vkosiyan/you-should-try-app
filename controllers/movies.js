const Movie = require('../models/movie');
const MovieRecItem = require('../models/movierecitem');

module.exports = {
  new: newMovie,
  create,
  addToListItem,
  show,
  index,
  edit,
  delete: deleteMovie,
  update
};

function addToListItem(req, res) {
  MovieRecItem.findById(req.params.id, function (err, movierecitem) {
    movierecitem.movies.push(req.body.movieId);
    movierecitem.save(function (err) {
      res.redirect(`/movierecitems/${movierecitem._id}`);
    });
  });
}

function create(req, res) {
  Movie.create(req.body, function (err, movie) {
    res.redirect(`/movies`);
  });
}

function newMovie(req, res) {
  Movie.find({}, function (err, movies) {
    res.render('movies/new', {
      title: 'Add Movie',
      movies
    });
  })
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

function edit(req, res) {
  Movie.findById(req.params.id, function(err, movie) {
    console.log(movie)
    res.render('movies/edit', { title: 'Movie Detail', movie });
  });
}

function deleteMovie(req, res) {
  Movie.deleteOne(req.params.id);
  res.redirect('/movies');
}

function update(req, res) {
  Movie.update(req.params.id, req.body);
  res.redirect(`/movies/${req.params.id}`);
}
