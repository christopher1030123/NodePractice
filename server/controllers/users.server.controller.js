// similar to listings.server.controller.js

/* Dependencies */
var mongoose = require('mongoose'),
    User = require('../models/users.server.model.js');

/* Create a user */
exports.create_user = function(req, res) {
   var user = new User(req.body);

  /* Then save the user */
  user.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(user);
    }
  });
};

/* Show the current user */
exports.display_user = function(req, res) {
  /* send back the event as json from the request */
  res.json(req.user);
};

/* Update a user */
exports.update_user = function(req, res) {
  var user = req.user;
  /* Replace the article's properties with the new properties found in req.body */
  /* Save the article */
  user.password = req.body.password;
  user.email = req.body.email;
  user.created_at = req.body.created_at;
  user.updated_at = req.body.updated_at;
  user.profile_img.data = fs.readFileSync(req.files.userPhoto.path);
  user.profile_img.contentType = 'image/png';
  // have to save now that we updated
  user.save(function(err) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(user);
    }
  });
};

/* Delete a user */
exports.delete_user = function(req, res) {
  var user = req.user;

  /* Remove the article */
  user.remove(function(err) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else{
      res.end();
    }
  })
};

/* Retreive all the directory users, sorted alphabetically by usrname */
exports.display_all_users = function(req, res) {
  /* Your code here */
    User.find().sort('username').exec(function(err, users){
      if(err){
        res.status(400).send(err);
      } else {
        res.json(users);
      }
    });
};

/*
  Middleware: find a listing by its ID, then pass it to the next request handler.
  HINT: Find the listing using a mongoose query,
        bind it to the request object as the property 'listing',
        then finally call next
 */
exports.userByName = function(req, res, next, username) {
  User.find(username).exec(function(err, user) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.user = user;
      next();
    }
  });
};
