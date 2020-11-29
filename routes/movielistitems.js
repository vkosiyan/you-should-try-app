var express = require('express');
var router = express.Router();
const movieListItemsCtrl = require('../controllers/movielistitems')

router.post('/movielists/:id/movielistitems', movieListItemsCtrl.addToList);
router.post('/movielistitems', movieListItemsCtrl.create);
router.get('/movielists/:id/movielistitems/new', movieListItemsCtrl.new);

module.exports = router;


