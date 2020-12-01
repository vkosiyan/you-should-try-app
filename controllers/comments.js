const Tvshow = require('../models/tvshow');

module.exports = {
create,
update,
delete: deleteOne,
edit
};

function create(req, res) {
    Tvshow.findById(req.params.id, function(err, tvshow) {
      // Update req.body to contain user info
      req.body.userId = req.user._id;
      req.body.userName = req.user.name;
      // Add the comment
      tvshow.comments.push(req.body);
      tvshow.save(function(err) {
        res.redirect(`/tvshows/${tvshow._id}`);
      });
    });
  }

  function update(req, res) {
    Tvshow.findOne({'comments._id': req.params.id}, function(err, tvshow) {
      // Finds the comment subdoc using the id method on Mongoose arrays
      // https://mongoosejs.com/docs/subdocs.html
      const commentSubdoc = tvshow.comments.id(req.params.id);
      // Ensures that the comment was created by the logged in user
      if (!commentSubdoc.userId.equals(req.user._id)) return res.redirect(`/tvshows/${tvshow._id}`);
      // Updates the text of the comment
      commentSubdoc.text = req.body.text;
      // Saves the updated tv show
      tvshow.save(function(err) {
        // Redirects back to the tv show's show view
        res.redirect(`/tvshows/${tvshow._id}`);
      });
    });
  }

  function deleteOne(req, res) {
    Tvshow.findOne({'comments._id': req.params.id}, function(err, tvshow) {
      // Finds the comment subdoc using the id method on Mongoose arrays
      // https://mongoosejs.com/docs/subdocs.html
      const commentSubdoc = tvshow.comments.id(req.params.id);
      // Ensures that the comment was created by the logged in user
      if (!commentSubdoc.userId.equals(req.user._id)) return res.redirect(`/tvshows/${tvshow._id}`);
      // Removes the comment using the remove method of the subdoc
      commentSubdoc.remove();
      // Saves the updated tv show
      tvshow.save(function(err) {
        // Redirects back to the tv show's show view
        res.redirect(`/tvshows/${tvshow._id}`);
      });
    });
  }

  function edit(req, res) {
    Tvshow.findById(req.params.id, function(err, tvshow) {
      // Verifies tv show is "owned" by logged in user
      if (!tvshow.user.equals(req.user._id)) return res.redirect(`/tvshows/${tvshow._id}`);
      res.render(`/tvshows/${tvshow._id}`);
    });
  }