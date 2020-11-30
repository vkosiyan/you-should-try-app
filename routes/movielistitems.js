var express = require('express');
var router = express.Router();
const movieListItemsCtrl = require('../controllers/movielistitems')

router.post('/movielists/:id/movielistitems', movieListItemsCtrl.addToList);
router.post('/movielistitems', movieListItemsCtrl.create);
router.get('/movielistitems/new', movieListItemsCtrl.new);
router.get('/:id', movieListItemsCtrl.show);

module.exports = router;


