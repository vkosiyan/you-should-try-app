const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');

router.post('/tvshows/:id/comments', commentsCtrl.create);
router.get('/comments/:id/edit', commentsCtrl.edit)
router.delete('/comments/:id', commentsCtrl.delete)
router.put('/comments/:id', commentsCtrl.update);

module.exports = router;