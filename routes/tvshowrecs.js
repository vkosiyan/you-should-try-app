const express = require('express');
const router = express.Router();
const tvshowrecsCtrl = require('../controllers/tvshowrecs');

router.get('/new', tvshowrecsCtrl.new);
router.post('/', tvshowrecsCtrl.create);
router.get('/', tvshowrecsCtrl.index);
router.get('/:id', tvshowrecsCtrl.show);
router.get('/:id/edit', tvshowrecsCtrl.edit);
router.put('/:id', tvshowrecsCtrl.update);
router.delete('/:id', tvshowrecsCtrl.delete);

module.exports = router;