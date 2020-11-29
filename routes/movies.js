const express = require('express');
const router = express.Router();
const moviesCtrl = require('../controllers/movies');
	
// GET /movies/new
router.get('/', moviesCtrl.index);
router.get('/new', moviesCtrl.new);
router.get('/:id', moviesCtrl.show);
router.post('/', moviesCtrl.create);
	
module.exports = router;