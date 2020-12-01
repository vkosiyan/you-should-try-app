const TvshowRec = require('../models/tvshowrec');
const Tvshow = require('../models/tvshow');

module.exports = {
    new: newTvshowRec,
    create,
    show,
    index,
    edit,
    update,
    delete: deleteTvShowRec
  };

function newTvshowRec(req, res){
  res.render('tvshowrecs/new', { title: 'Enter a New Tv Show'});
}

function create(req, res){
  const tvshowRec = new TvshowRec(req.body);
  tvshowRec.user = req.user._id;
  tvshowRec.save(function(err){
    if(err) return res.render('tvshowrecs/new');
    res.redirect(`/tvshowrecs/${tvshowRec._id}`);
  })
}

function show(req, res) {
    TvshowRec.findById(req.params.id).populate('tvshows').exec(function(err, tvshowrec){
        Tvshow.find(
            {_id: {$nin: tvshowrec.tvshows}},
            function(err, tvshows) {
                res.render('tvshowrecs/show', { title: `${tvshowrec.title}`, tvshowrec, tvshows });
        });
      }
    )
}

function deleteTvShowRec(req, res) {
  TvshowRec.findById(req.params.id, function(err, tvshowrec) {
  if (!tvshowrec.user.equals(req.user._id)) return res.redirect(`/tvshowrecs/${tvshowrec._id}`);
    tvshowrec.remove();
    tvshowrec.save(function(err){
      res.redirect('tvshowsrecs');
    })
  })
}

function index(req,res){
  TvshowRec.find({}, function(err, tvshowrecs) {
      res.render('tvshowrecs/index', { title: 'TV Recommendation Lists', tvshowrecs });
  });
}

function edit(req, res) {
  TvshowRec.findById(req.params.id, function(err, tvshowrec) {
    // Verifies tv show is "owned" by logged in user
    if (!tvshowrec.user.equals(req.user._id)) return res.redirect(`/tvshowrecs/${tvshowrec._id}`);
      res.render(`tvshowrecs/edit`, { title: 'Edit List Details', tvshowrec});
  });
}

function update(req, res) {
  TvshowRec.findById(req.params.id, function(err, tvshowrec) {
    tvshowrec.title = req.body.title;
    tvshowrec.listDesc = req.body.listDesc;
    tvshowrec.save(function(err) {
      res.redirect(`/tvshowrecs/${tvshowrec._id}`);
    });
  });  
}