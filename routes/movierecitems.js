var express = require('express');
var router = express.Router();
const movieRecItemsCtrl = require('../controllers/movierecitems')

router.post('/movierecs/:id/movierecitems', movieRecItemsCtrl.addToList);
router.post('/movierecitems', movieRecItemsCtrl.create);
router.get('/movierecs/:id/movierecitems/new', movieRecItemsCtrl.new);
router.get('/movierecitems/:id', movieRecItemsCtrl.show);

module.exports = router;


