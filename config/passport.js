const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//Require your Viewer Model here!
const Viewer = require('../models/viewer');
// configuring Passport!
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK
},
function(accessToken, refreshToken, profile, cb) {
  Viewer.findOne({ 'googleId': profile.id }, function(err, viewer) {
    if (err) return cb(err);
    if (viewer) {
      return cb(null, viewer);
    } else {
      // we have a new viewer via OAuth!
      var newViewer = new Viewer({
        name: profile.displayName,
        email: profile.emails[0].value,
        googleId: profile.id
      });
      newViewer.save(function(err) {
        if (err) return cb(err);
        return cb(null, newViewer);
      });
    }
  });
}
));

passport.serializeUser(function(viewer, done) {
  done(null, viewer.id);
});

passport.deserializeUser(function(id, done) {
  Viewer.findById(id, function(err, viewer) {
    done(err, viewer);
  });
});



