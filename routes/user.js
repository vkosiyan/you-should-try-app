var express = require('express');
var router = express.Router();
const userCtrl = require('../controllers/user');

router.get('/', userCtrl.index);
router.post('/facts', isLoggedIn, userCtrl.addFact);
router.delete('/facts/:id', isLoggedIn, userCtrl.delFact);

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}


module.exports = router;
