'use strict';

var _ = require('lodash');
var Potiontype = require('./potionType.model');

// Get list of potionTypes
exports.index = function(req, res) {
  Potiontype.find(function (err, potionTypes) {
    if(err) { return handleError(res, err); }
    return res.json(200, potionTypes);
  });
};

// Get a single potionType
exports.show = function(req, res) {
  Potiontype.findById(req.params.id, function (err, potionType) {
    if(err) { return handleError(res, err); }
    if(!potionType) { return res.send(404); }
    return res.json(potionType);
  });
};

// Creates a new potionType in the DB.
exports.create = function(req, res) {
  Potiontype.create(req.body, function(err, potionType) {
    if(err) { return handleError(res, err); }
    return res.json(201, potionType);
  });
};

// Updates an existing potionType in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Potiontype.findById(req.params.id, function (err, potionType) {
    if (err) { return handleError(res, err); }
    if(!potionType) { return res.send(404); }
    var updated = _.merge(potionType, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, potionType);
    });
  });
};

// Deletes a potionType from the DB.
exports.destroy = function(req, res) {
  Potiontype.findById(req.params.id, function (err, potionType) {
    if(err) { return handleError(res, err); }
    if(!potionType) { return res.send(404); }
    potionType.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}