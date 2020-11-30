const MovieRec = require('../models/movierec');
const MovieRecItem = require('../models/movierecitem');
const Movie = require('../models/movie');

module.exports = {
    new: newMovieRec,
    create,
    show,
    index,
    addListItem
  };

function addListItem(req, res){
  console.log('THIS IS REQ.body', req.body)
    req.body.flight = req.params.id;
    let movierecitem = new MovieRecItem(req.body);
    movierecitem.save(function(err){
        MovieRec.findById(req.params.id, function(e, movierec){
            console.log('THIS IS THE MOVIELIST ITEM ', movierecitem);
            movierec.movierecitem.push(movierecitem._id);
            movierec.save(function(er){
                console.log(movierec);
                if (err) return console.log(err)
                else {res.redirect(`/movierecs/${req.params.id}`)}
            })            
        })
        
    })
}


function newMovieRec(req, res){
  res.render('movierecs/new', { title: 'Enter a New Movie'});
}

function create(req, res){
  const movieRec = new MovieRec(req.body);
  movieRec.save(function(err){
    if(err) return res.render('movierecs/new');
    console.log(movieRec)
    res.redirect(`/movierecs/${movieRec._id}`);
  })
}

function show(req, res) {
    MovieRec.findById(req.params.id).populate('movierecitem').exec(function(err, movierec){
        console.log('THIS IS THE FLIGHT ', movierec)
        MovieRecItem.find(
            function(err, movierecitems) {
                res.render('movierecs/show', { title: 'Movie List Details', movierec, movierecitems });
            });
            }
        )
}

function index(req,res){
  MovieRec.find({}, function(err, movierecs) {
      res.render('movierecs/index', { title: 'Movie Lists', movierecs });
  });
}