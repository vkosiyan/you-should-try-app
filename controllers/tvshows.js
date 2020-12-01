const Tvshow = require('../models/tvshow');
const TvshowRec = require('../models/tvshowrec')
const comments = require('./comments');

module.exports = {
  new: newTvshow,
  create,
  addToList,
  show,
  index,
  edit,
  delete: deleteTvshow,
  update,
  addWatching
};

function addToList(req, res) {
  TvshowRec.findById(req.params.id, function (err, tvshowrec) {
    tvshowrec.tvshows.push(req.body.tvshowId);
    console.log('CHECK ME', req.body);
    tvshowrec.save(function (err) {
      res.redirect(`/tvshowrecs/${tvshowrec._id}`);
    });
  });
}

function create(req, res) {
  const tvshow = new Tvshow(req.body);
  // Assign the logged in user's id
  tvshow.user = req.user._id;
  tvshow.save(function(err) {
    if (err) return render('tvshows/new');
    // Probably want to go to newly added book's show view
    res.redirect(`/tvshows/${tvshow._id}`);
  });
}

function newTvshow(req, res) {
  Tvshow.find({}, function (err, tvshows) {
    res.render('tvshows/new', {
      title: 'Add a TV Show',
      tvshows
    });
  })
}

function show(req, res) {
  Tvshow.findById(req.params.id, function(err, tvshow) {
    TvshowRec.find({}, function(err, tvshowrecs){
      console.log(tvshow);
      res.render('tvshows/show', { title: `${tvshow.title}`, tvshow, tvshowrecs });
    })   
  });
}

function index(req, res) {
  Tvshow.find({}, function(err, tvshows) {
    res.render('tvshows/index', { title: 'All TV Shows', tvshows });
  });
}

function edit(req, res) {
  Tvshow.findById(req.params.id, function(err, tvshow) {
    // Verify book is "owned" by logged in user
    if (!tvshow.user.equals(req.user._id)) return res.redirect(`/tvshows/${tvshow._id}`);
    res.render(`tvshows/edit`, { title: 'Edit Show', tvshow});
  });
}

function deleteTvshow(req, res) {
  Tvshow.findById(req.params.id, function(err, tvshow) {
  if (!tvshow.user.equals(req.user._id)) return res.redirect(`/tvshows/${tvshow._id}`);
  tvshow.remove();
  tvshow.save(function(err){
    res.redirect('/tvshows');
    })
  })
}

function update(req, res) {
  Tvshow.findById(req.params.id, function(err, tvshow) {
    tvshow.title = req.body.title;
    tvshow.releaseYear = req.body.releaseYear;
    tvshow.mpaaRating = req.body.mpaaRating;
    tvshow.tvshowlink = req.body.tvshowlink;
    tvshow.imageLink = req.body.imageLink;
    tvshow.genre = req.body.genre;
    tvshow.whereToWatch = req.body.whereToWatch;
    tvshow.save(function(err) {
      res.redirect(`/tvshows/${tvshow._id}`);
    });
  });  
}

function addWatching(req, res) {
  Tvshow.findById(req.params.id, function(err, tvshow) {
    // Ensure that user is not already in usersReading
    // See "Finding a Subdocument" in https://mongoosejs.com/docs/subdocs.html
    if (tvshow.usersWatching.id(req.user._id)) return res.redirect('/tvshows');
    tvshow.usersWatching.push(req.user._id);
    tvshow.save(function(err) {
      res.redirect(`/tvshows/${tvshow._id}`);
    });
  });
}

