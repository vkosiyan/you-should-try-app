const TvshowRec = require('../models/tvshowrec');
const Tvshow = require('../models/tvshow');

module.exports = {
    new: newTvshowRec,
    create,
    show,
    index,
  };

function newTvshowRec(req, res){
  res.render('tvshowrecs/new', { title: 'Enter a New Tv Show'});
}

function create(req, res){
  const tvshowRec = new TvshowRec(req.body);
  tvshowRec.user = req.user._id;
  tvshowRec.save(function(err){
    if(err) return res.render('tvshowrecs/new');
    console.log(tvshowRec)
    res.redirect(`/tvshowrecs/${tvshowRec._id}`);
  })
}

function show(req, res) {
    TvshowRec.findById(req.params.id).populate('tvshows').exec(function(err, tvshowrec){
        console.log('THIS IS THE FLIGHT ', tvshowrec)
        Tvshow.find(
            {_id: {$nin: tvshowrec.tvshows}},
            function(err, tvshows) {
                res.render('tvshowrecs/show', { title: `${tvshowrec.title}`, tvshowrec, tvshows });
            });
            }
        )
}

function index(req,res){
  TvshowRec.find({}, function(err, tvshowrecs) {
      res.render('tvshowrecs/index', { title: 'Tvtvshow Lists', tvshowrecs });
  });
}