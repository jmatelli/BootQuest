'use strict';

var _ = require('lodash');
var Attackmagictype = require('./attackMagicType.model');

// Get list of attackMagicTypes
exports.index = function(req, res) {
  Attackmagictype.find(function (err, attackMagicTypes) {
    if(err) { return handleError(res, err); }
    return res.json(200, attackMagicTypes);
  });
};

// Get a single attackMagicType
exports.show = function(req, res) {
  Attackmagictype.findById(req.params.id, function (err, attackMagicType) {
    if(err) { return handleError(res, err); }
    if(!attackMagicType) { return res.send(404); }
    return res.json(attackMagicType);
  });
};

// Creates a new attackMagicType in the DB.
exports.create = function(req, res) {
  Attackmagictype.create(req.body, function(err, attackMagicType) {
    if(err) { return handleError(res, err); }
    return res.json(201, attackMagicType);
  });
};

// Updates an existing attackMagicType in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Attackmagictype.findById(req.params.id, function (err, attackMagicType) {
    if (err) { return handleError(res, err); }
    if(!attackMagicType) { return res.send(404); }
    var updated = _.merge(attackMagicType, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, attackMagicType);
    });
  });
};

// Deletes a attackMagicType from the DB.
exports.destroy = function(req, res) {
  Attackmagictype.findById(req.params.id, function (err, attackMagicType) {
    if(err) { return handleError(res, err); }
    if(!attackMagicType) { return res.send(404); }
    attackMagicType.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}