var router = require('express').Router();
const passport = require('passport');
const request = require('request');

const key = process.env.TMDB_KEY;
const rootURL = 'https://api.thetvshowdb.org';

// The root route renders our only view
router.get('/', function(req, res, next) {
  const genreName = req.query.name;
  request(`${rootURL}/3/genre/tvshow/list?api_key=${key}&language=en-US`, 
  function(err, response, body){
    console.log(body)
    res.render('index', {title: 'Popular Shows', tvshowData: body})
  })


});

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/tvshows', // where do you want the client to go after you login 
    failureRedirect : '/tvshows' // where do you want the client to go if login fails
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;