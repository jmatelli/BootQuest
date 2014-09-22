'use strict';

var _ = require('lodash');
var Potion = require('./potion.model');

// Get list of potions
exports.index = function(req, res) {
  Potion.find(function (err, potions) {
    if(err) { return handleError(res, err); }
    return res.json(200, potions);
  });
};

// Get a single potion
exports.show = function(req, res) {
  Potion.findById(req.params.id, function (err, potion) {
    if(err) { return handleError(res, err); }
    if(!potion) { return res.send(404); }
    return res.json(potion);
  });
};

// Creates a new potion in the DB.
exports.create = function(req, res) {
  Potion.create(req.body, function(err, potion) {
    if(err) { return handleError(res, err); }
    return res.json(201, potion);
  });
};

// Updates an existing potion in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Potion.findById(req.params.id, function (err, potion) {
    if (err) { return handleError(res, err); }
    if(!potion) { return res.send(404); }
    var updated = _.merge(potion, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, potion);
    });
  });
};

// Deletes a potion from the DB.
exports.destroy = function(req, res) {
  Potion.findById(req.params.id, function (err, potion) {
    if(err) { return handleError(res, err); }
    if(!potion) { return res.send(404); }
    potion.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}