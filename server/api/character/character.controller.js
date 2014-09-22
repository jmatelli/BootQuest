'use strict';

var _ = require('lodash'),
    Character = require('./character.model'),
    User = require('../user/user.model');

// Get list of characters
exports.index = function(req, res) {
  Character.find(function (err, characters) {
    if(err) { return handleError(res, err); }
    return res.json(200, characters);
  });
};

// Get list of characters for a specific user
exports.showMine = function(req, res) {
  var userId = req.user._id;

  Character.find({ _creator: userId }, function (err, characters) {
    if(err) { return handleError(res, err); }
    return res.json(200, characters);
  });
};

// Get a single character
exports.show = function(req, res) {
  Character.findById(req.params.id, function (err, character) {
    if(err) { return handleError(res, err); }
    if(!character) { return res.send(404); }
    return res.json(character);
  });
};

// Creates a new character in the DB.
//exports.create = function(req, res) {
//  Character.create(req.body, function(err, character) {
//    if(err) { return handleError(res, err); }
//    return res.json(201, character);
//  });
//};

exports.create = function (req, res) {
  var newCharacter = new Character(req.body);
  var userId = req.user._id;

  Character.count({_creator: userId}, function (err, count) {
    if (err) return res.json(400, err);

    if(count !== req.user.nbCharMax) {
      newCharacter.save(function(err) {
        if (err) return res.json(400, err);

        User.findByIdAndUpdate(
          userId,
          {$push: {characters: newCharacter._id}},
          {safe: true, upsert: true},
          function (err, model) {}
        );

        return res.json(req.body);
      });
    } else {
      res.json(500, {
        type: 'limitReached',
        message: 'You already have all the characters you can get. If you really want to create a new one, you have to delete a character first.'
      });
    }
  });
};

// Updates an existing character in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Character.findById(req.params.id, function (err, character) {
    if (err) { return handleError(res, err); }
    if(!character) { return res.send(404); }
    var updated = _.merge(character, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, character);
    });
  });
};

// Deletes a character from the DB.
exports.destroy = function(req, res) {
  Character.findById(req.params.id, function (err, character) {
    if(err) { return handleError(res, err); }
    if(!character) { return res.send(404); }
    character.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}