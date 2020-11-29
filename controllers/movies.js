const Movie = require('../models/movie');
const MovieList = require('../models/movielist');

module.exports = {
  index,
  new: newMovie,
  create,
  addToMovieList
};
function index(req,res){
  Movie.find({}, function(err, movies) {
      res.render('movies/index', { title: 'Movies', movies });
  });
}

function addToMovieList(req, res) {
  MovieList.findById(req.params.id, function (err, movielist) {
    movielist.movie.push(req.body.movieId);
    movielist.save(function (err) {
      res.redirect(`/movielists/${movielist._id}`);
    });
  });
}

function create(req, res) {
  // Need to "fix" date formatting to prevent day off by 1
  // This is due to the <input type="date"> returning the date
  // string in this format:  "YYYY-MM-DD"
  // https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
  Movie.create(req.body, function (err, movie) {
    res.redirect('/movies/new');
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

