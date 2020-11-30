const express = require('express');
const router = express.Router();
const moviesCtrl = require('../controllers/movies');
	
// GET /movies/new
router.get('/', moviesCtrl.index);
router.get('/new', moviesCtrl.new);
router.get('/:id', moviesCtrl.show);
router.post('/', moviesCtrl.create);
router.delete('/:id', moviesCtrl.delete);
router.get('/:id/edit', moviesCtrl.edit);
router.put('/:id', moviesCtrl.update);
router.post('/movierecitems/:id/movies', moviesCtrl.addToListItem);

module.exports = router;