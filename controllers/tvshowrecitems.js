const TvtvshowRec = require('../models/tvshowrec');
const TvtvshowRecItem = require('../models/tvshowrecitem')
const Tvtvshow = require('../models/tvshow');
module.exports = {
  create,
  addToList,
  new: newListItem,
  show
};

function addToList(req,res){
  console.log('THIS IS REQ' + req.body)
  console.log('THIS IS REQ.Params' + req.params)
    TvtvshowRec.findById(req.params.id, function(err, tvshowrec){
        tvshowrec.tvshowrecitem.push(req.body.tvshowrecitemId);
        tvshowrec.save(function(err) {
            res.redirect(`/tvshowrecs/${tvshowrec._id}`);
        });
    });
}

function create(req, res) {
  console.log('THIS IS THE REQ' + req.body);
    TvtvshowRecItem.create(req.body, function (err, tvshowrecitem) {
      
      res.redirect(`/tvshowrecs/${req.params.id}`);
    });
  }

function newListItem(req, res) {
  res.render('tvshowrecitems/new', { title: 'Add List Item', tvshowrecitem, tvshows});
}

function newListItem(req, res) {
  TvtvshowRecItem.find({}, function (err, tvshowrecitem) {
    TvtvshowRec.findById(req.params.id, function(err, tvshowrec){
      Tvtvshow.find(
        {_id: {$nin: tvshowrecitem.tvshows}},
        function(err, tvshows) {
          res.render('tvshowrecitems/new', {
            title: 'Add Tvtvshow List Item',
            tvshowrecitem, tvshowrec, tvshows
          });
        }
      )      
    })
  });
}


function show(req, res) {
  TvtvshowRecItem.findById(req.params.id).populate('tvshows').exec(function(err, tvshowrecitem) {
    Tvtvshow.find(
      {_id: {$nin: tvshowrecitem.tvshow}},
      function(err, tvshows) {
        res.render('tvshowrecitems/tvshow', {
          title: 'Tvtvshow List Item Detail', tvshowrecitem, tvshows
        })
      }
    )
  });
}