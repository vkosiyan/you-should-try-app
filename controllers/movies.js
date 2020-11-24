const Movie = require('../models/movie');

module.exports = {
    new: newMovie,
    create,
    show,
    index
  };

function newMovie(req, res){
  res.render('movies/new', { title: 'Enter a New Movie'});
}

function create(req, res){
  // req.body.whereToWatch = req.body.whereToWatch.replace(/\s*,\s*/g, ',');
  // if (req.body.whereToWatch) req.body.whereToWatch = req.body.whereToWatch.split(',');
  const movie = new Movie(req.body);
  movie.save(function(err){
    if(err) return res.render('movies/new');
    res.redirect('/movies/new');
  })
}

function show(req, res){
  res.render('movies/show', { title: req.body.title})
}

function index(req,res){
  Movie.find({}, function(err, movies) {
      res.render('movies/index', { title: 'Movies List', movies });
  });
}