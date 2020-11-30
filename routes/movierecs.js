const express = require('express');
const router = express.Router();
const movielistsCtrl = require('../controllers/movierecs');
	
// GET /movies/new
router.get('/new', movielistsCtrl.new);
router.post('/', movielistsCtrl.create);
router.get('/', movielistsCtrl.index);
router.get('/:id', movielistsCtrl.show);
router.post('/:id', movielistsCtrl.addListItem)
	
module.exports = router;