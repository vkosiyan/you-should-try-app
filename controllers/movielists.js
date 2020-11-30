const MovieList = require('../models/movielist');
const MovieListItem = require('../models/movielistitem');
const Movie = require('../models/movie');

module.exports = {
    new: newMovieList,
    create,
    show,
    index,
    addListItem
  };

function addListItem(req, res){
    // req.body.flight = req.params.id;
    let movielistitem = new MovieListItem(req.body);
    movielistitem.save(function(err){
        MovieList.findById(req.params.id, function(e, movielist){
            console.log('THIS IS THE MOVIELIST ITEM ', movielistitem);
            movielist.movielistitem.push(movielistitem._id);
            movielist.save(function(er){
                console.log(movielist);
                if (err) return console.log(err)
                else {res.redirect(`/movielists/${req.params.id}`)}
            })            
        })
        
    })
}


function newMovieList(req, res){
  res.render('movielists/new', { title: 'Enter a New Movie'});
}

function create(req, res){
  const movieList = new MovieList(req.body);
  movieList.save(function(err){
    if(err) return res.render('movielists/new');
    console.log(movieList)
    res.redirect(`/movielists/${req.params.id}`);
  })
}

function show(req, res) {
    MovieList.findById(req.params.id).populate('movielistitem').exec(function(err, movielist){
        console.log('THIS IS THE FLIGHT ', movielist)
        MovieListItem.find(
            function(err, movielistitems) {
                res.render('movielists/show', { title: 'Movie List Details', movielist, movielistitems });
            });
            }
        )
     
}

function index(req,res){
  MovieList.find({}, function(err, movielists) {
      res.render('movielists/index', { title: 'Movie Lists', movielists });
  });
}