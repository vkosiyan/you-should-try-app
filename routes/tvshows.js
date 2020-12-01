const express = require('express');
const router = express.Router();
const tvshowsCtrl = require('../controllers/tvshows');
	
// GET /tvshows/new
router.get('/', tvshowsCtrl.index);
router.get('/new', tvshowsCtrl.new);
router.get('/:id', tvshowsCtrl.show);
router.post('/', tvshowsCtrl.create);
router.delete('/:id', tvshowsCtrl.delete);
router.get('/:id/edit', tvshowsCtrl.edit);
router.put('/:id', tvshowsCtrl.update);
router.post('/tvshowrecitems/:id/tvshows', tvshowsCtrl.addToListItem);

module.exports = router;