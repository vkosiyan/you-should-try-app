var express = require('express');
var router = express.Router();
const tvshowRecItemsCtrl = require('../controllers/tvshowrecitems')

router.post('/tvshowrecs/:id/tvshowrecitems', tvshowRecItemsCtrl.addToList);
router.post('/tvshowrecitems', tvshowRecItemsCtrl.create);
router.get('/tvshowrecs/:id/tvshowrecitems/new', tvshowRecItemsCtrl.new);
router.get('/tvshowrecitems/:id', tvshowRecItemsCtrl.show);

module.exports = router;


