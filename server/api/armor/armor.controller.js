'use strict';

var _ = require('lodash');
var Armor = require('./armor.model');

// Get list of armors
exports.index = function(req, res) {
  Armor.find(function (err, armors) {
    if(err) { return handleError(res, err); }
    return res.json(200, armors);
  });
};

// Get a single armor
exports.show = function(req, res) {
  Armor.findById(req.params.id, function (err, armor) {
    if(err) { return handleError(res, err); }
    if(!armor) { return res.send(404); }
    return res.json(armor);
  });
};

// Creates a new armor in the DB.
exports.create = function(req, res) {
  Armor.create(req.body, function(err, armor) {
    if(err) { return handleError(res, err); }
    return res.json(201, armor);
  });
};

// Updates an existing armor in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Armor.findById(req.params.id, function (err, armor) {
    if (err) { return handleError(res, err); }
    if(!armor) { return res.send(404); }
    var updated = _.merge(armor, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, armor);
    });
  });
};

// Deletes a armor from the DB.
exports.destroy = function(req, res) {
  Armor.findById(req.params.id, function (err, armor) {
    if(err) { return handleError(res, err); }
    if(!armor) { return res.send(404); }
    armor.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}