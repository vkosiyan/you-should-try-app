var router = require('express').Router();
const passport = require('passport');
const request = require('request');

const key = process.env.TMDB_KEY;
const rootURL = 'https://api.themoviedb.org';

// The root route renders our only view
router.get('/', function(req, res, next) {
  const username = req.query.username;

  request(`${rootURL}/3/movie/550?api_key=${key}`, 
  function(err, response, body){
    console.log(body);
    console.log(process.env.key)
    res.render('index', {title: 'Popular Movies'})
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
    successRedirect : '/movies', // where do you want the client to go after you login 
    failureRedirect : '/movies' // where do you want the client to go if login fails
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;