const Tvshow = require('../models/tvshow');
const TvshowRecItem = require('../models/tvshowrecitem');

module.exports = {
  new: newTvshow,
  create,
  addToListItem,
  show,
  index,
  edit,
  delete: deleteTvshow,
  update,
  addWatching
};

function addToListItem(req, res) {
  TvshowRecItem.findById(req.params.id, function (err, tvshowrecitem) {
    tvshowrecitem.tvshows.push(req.body.tvshowId);
    tvshowrecitem.save(function (err) {
      res.redirect(`/tvshowrecitems/${tvshowrecitem._id}`);
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
      title: 'Add Tvshow',
      tvshows
    });
  })
}

function show(req, res) {
  Tvshow.findById(req.params.id, function(err, tvshow) {
    res.render('tvshows/show', { title: 'Tvshow Detail', tvshow });
  });
}

function index(req, res) {
  Tvshow.find({}, function(err, tvshows) {
    res.render('tvshows/index', { title: 'All Tvshows', tvshows });
  });
}

function edit(req, res) {
  Tvshow.findById(req.params.id, function(err, tvshow) {
    // Verify book is "owned" by logged in user
    if (!tvshow.user.equals(req.user._id)) return res.redirect('/tvshows');
    res.render('tvshows/edit', { title: 'Edit Show', tvshow});
  });
}

function deleteTvshow(req, res) {
  Tvshow.deleteOne(req.params.id);
  res.redirect('/tvshows');
}

function update(req, res) {
  Tvshow.update(req.params.id, req.body);
  res.redirect(`/tvshows/${req.params.id}`);
}

function addWatching(req, res) {
  Tvshow.findById(req.params.id, function(err, tvshow) {
    // Ensure that user is not already in usersReading
    // See "Finding a Subdocument" in https://mongoosejs.com/docs/subdocs.html
    if (book.usersReading.id(req.user._id)) return res.redirect('/books');
    tvshow.usersWatching.push(req.user._id);
    tvshow.save(function(err) {
      res.redirect(`/tvshows/${tvshow._id}`);
    });
  });
}