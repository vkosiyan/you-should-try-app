const MovieList = require('../models/movielist');

module.exports = {
    new: newMovieList,
    create,
    show,
    index
  };

function newMovieList(req, res){
  res.render('movielists/new', { title: 'Enter a New Movie'});
}

function create(req, res){
  // req.body.whereToWatch = req.body.whereToWatch.replace(/\s*,\s*/g, ',');
  // if (req.body.whereToWatch) req.body.whereToWatch = req.body.whereToWatch.split(',');
  const movieList = new MovieList(req.body);
  movieList.save(function(err){
    if(err) return res.render('movielists/new');
    res.redirect('/movielists');
  })
}

function show(req, res){
  res.render('movielists/show', { title: req.body.title})
}

function index(req,res){
  MovieList.find({}, function(err, movielists) {
      res.render('movielists/index', { title: 'Movie Lists', movielists });
  });
}