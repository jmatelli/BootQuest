'use strict';

var _ = require('lodash');
var Armortype = require('./armorType.model');

// Get list of armorTypes
exports.index = function(req, res) {
  Armortype.find(function (err, armorTypes) {
    if(err) { return handleError(res, err); }
    return res.json(200, armorTypes);
  });
};

// Get a single armorType
exports.show = function(req, res) {
  Armortype.findById(req.params.id, function (err, armorType) {
    if(err) { return handleError(res, err); }
    if(!armorType) { return res.send(404); }
    return res.json(armorType);
  });
};

// Creates a new armorType in the DB.
exports.create = function(req, res) {
  Armortype.create(req.body, function(err, armorType) {
    if(err) { return handleError(res, err); }
    return res.json(201, armorType);
  });
};

// Updates an existing armorType in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Armortype.findById(req.params.id, function (err, armorType) {
    if (err) { return handleError(res, err); }
    if(!armorType) { return res.send(404); }
    var updated = _.merge(armorType, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, armorType);
    });
  });
};

// Deletes a armorType from the DB.
exports.destroy = function(req, res) {
  Armortype.findById(req.params.id, function (err, armorType) {
    if(err) { return handleError(res, err); }
    if(!armorType) { return res.send(404); }
    armorType.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}