const MovieRec = require('../models/movierec');
const MovieRecItem = require('../models/movierecitem')
const Movie = require('../models/movie');
module.exports = {
  create,
  addToList,
  new: newListItem,
  show
};

function addToList(req,res){
  console.log('THIS IS REQ' + req.body)
  console.log('THIS IS REQ.Params' + req.params)
    MovieRec.findById(req.params.id, function(err, movierec){
        movierec.movierecitem.push(req.body.movierecitemId);
        movierec.save(function(err) {
            res.redirect(`/movierecs/${movierec._id}`);
        });
    });
}

function create(req, res) {
  console.log('THIS IS THE REQ' + req.body);
    MovieRecItem.create(req.body, function (err, movierecitem) {
      
      res.redirect(`/movierecs/${req.params.id}`);
    });
  }

function newListItem(req, res) {
  res.render('movierecitems/new', { title: 'Add List Item', movierecitem, movies});
}

function newListItem(req, res) {
  MovieRecItem.find({}, function (err, movierecitem) {
    MovieRec.findById(req.params.id, function(err, movierec){
      Movie.find(
        {_id: {$nin: movierecitem.movies}},
        function(err, movies) {
          res.render('movierecitems/new', {
            title: 'Add Movie List Item',
            movierecitem, movierec, movies
          });
        }
      )      
    })
  });
}


function show(req, res) {
  MovieRecItem.findById(req.params.id).populate('movies').exec(function(err, movierecitem) {
    Movie.find(
      {_id: {$nin: movierecitem.movie}},
      function(err, movies) {
        res.render('movierecitems/show', {
          title: 'Movie List Item Detail', movierecitem, movies
        })
      }
    )
  });
}