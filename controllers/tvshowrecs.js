const TvshowRec = require('../models/tvshowrec');
const TvshowRecItem = require('../models/tvshowrecitem');
const Tvshow = require('../models/tvshow');

module.exports = {
    new: newTvshowRec,
    create,
    show,
    index,
    addListItem
  };

function addListItem(req, res){
  console.log('THIS IS REQ.body', req.body)
    req.body.flight = req.params.id;
    let tvshowrecitem = new TvshowRecItem(req.body);
    tvshowrecitem.save(function(err){
        TvshowRec.findById(req.params.id, function(e, tvshowrec){
            console.log('THIS IS THE Tv Show LIST ITEM ', tvshowrecitem);
            tvshowrec.tvshowrecitem.push(tvshowrecitem._id);
            tvshowrec.save(function(er){
                console.log(tvshowrec);
                if (err) return console.log(err)
                else {res.redirect(`/tvshowrecs/${req.params.id}`)}
            })            
        })
        
    })
}

function newTvshowRec(req, res){
  res.render('tvshowrecs/new', { title: 'Enter a New Tv Show'});
}

function create(req, res){
  const tvshowRec = new TvshowRec(req.body);
  tvshowRec.save(function(err){
    if(err) return res.render('tvshowrecs/new');
    console.log(tvshowRec)
    res.redirect(`/tvshowrecs/${tvshowRec._id}`);
  })
}

function show(req, res) {
    TvshowRec.findById(req.params.id).populate('tvshowrecitem').exec(function(err, tvshowrec){
        console.log('THIS IS THE FLIGHT ', tvshowrec)
        TvshowRecItem.find(
            function(err, tvshowrecitems) {
                res.render('tvshowrecs/show', { title: 'Tv Show List Details', tvshowrec, tvshowrecitems });
            });
            }
        )
}

function index(req,res){
  TvshowRec.find({}, function(err, tvshowrecs) {
      res.render('tvshowrecs/index', { title: 'Tvtvshow Lists', tvshowrecs });
  });
}