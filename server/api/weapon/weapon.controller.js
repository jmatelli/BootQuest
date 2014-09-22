'use strict';

var _ = require('lodash');
var Weapon = require('./weapon.model');

// Get list of weapons
exports.index = function(req, res) {
  Weapon.find(function (err, weapons) {
    if(err) { return handleError(res, err); }
    return res.json(200, weapons);
  });
};

// Get a single weapon
exports.show = function(req, res) {
  Weapon.findById(req.params.id, function (err, weapon) {
    if(err) { return handleError(res, err); }
    if(!weapon) { return res.send(404); }
    return res.json(weapon);
  });
};

// Creates a new weapon in the DB.
exports.create = function(req, res) {
  Weapon.create(req.body, function(err, weapon) {
    if(err) { return handleError(res, err); }
    return res.json(201, weapon);
  });
};

// Updates an existing weapon in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Weapon.findById(req.params.id, function (err, weapon) {
    if (err) { return handleError(res, err); }
    if(!weapon) { return res.send(404); }
    var updated = _.merge(weapon, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, weapon);
    });
  });
};

// Deletes a weapon from the DB.
exports.destroy = function(req, res) {
  Weapon.findById(req.params.id, function (err, weapon) {
    if(err) { return handleError(res, err); }
    if(!weapon) { return res.send(404); }
    weapon.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}