'use strict';

var _ = require('lodash');
var Weapontype = require('./weaponType.model');

// Get list of weaponTypes
exports.index = function(req, res) {
  Weapontype.find(function (err, weaponTypes) {
    if(err) { return handleError(res, err); }
    return res.json(200, weaponTypes);
  });
};

// Get a single weaponType
exports.show = function(req, res) {
  Weapontype.findById(req.params.id, function (err, weaponType) {
    if(err) { return handleError(res, err); }
    if(!weaponType) { return res.send(404); }
    return res.json(weaponType);
  });
};

// Creates a new weaponType in the DB.
exports.create = function(req, res) {
  Weapontype.create(req.body, function(err, weaponType) {
    if(err) { return handleError(res, err); }
    return res.json(201, weaponType);
  });
};

// Updates an existing weaponType in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Weapontype.findById(req.params.id, function (err, weaponType) {
    if (err) { return handleError(res, err); }
    if(!weaponType) { return res.send(404); }
    var updated = _.merge(weaponType, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, weaponType);
    });
  });
};

// Deletes a weaponType from the DB.
exports.destroy = function(req, res) {
  Weapontype.findById(req.params.id, function (err, weaponType) {
    if(err) { return handleError(res, err); }
    if(!weaponType) { return res.send(404); }
    weaponType.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}