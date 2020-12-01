const express = require('express');
const router = express.Router();
const tvshowsCtrl = require('../controllers/tvshows');
	
router.get('/tvshows/', tvshowsCtrl.index);
router.get('/tvshows/new', tvshowsCtrl.new);
router.get('/tvshows/:id', tvshowsCtrl.show);
router.post('/tvshows/', tvshowsCtrl.create);
router.delete('/tvshows/:id', tvshowsCtrl.delete);
router.get('/tvshows/:id/edit', tvshowsCtrl.edit);
router.put('/tvshows/:id', tvshowsCtrl.update);
router.post('/tvshowrecs/:id/tvshows', tvshowsCtrl.addToList);

module.exports = router;
