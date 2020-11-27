var express = require('express');
var router = express.Router();
const viewersCtrl = require('../controllers/viewers');

router.get('/viewers', viewersCtrl.index);
router.post('/facts', isLoggedIn, viewersCtrl.addFact);
router.delete('/facts/:id', isLoggedIn, viewersCtrl.delFact);


function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}


module.exports = router;
