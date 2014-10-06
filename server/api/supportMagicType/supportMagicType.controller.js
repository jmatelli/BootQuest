'use strict';

var _ = require('lodash');
var Supportmagictype = require('./supportMagicType.model');

// Get list of supportMagicTypes
exports.index = function(req, res) {
  Supportmagictype.find(function (err, supportMagicTypes) {
    if(err) { return handleError(res, err); }
    return res.json(200, supportMagicTypes);
  });
};

// Get a single supportMagicType
exports.show = function(req, res) {
  Supportmagictype.findById(req.params.id, function (err, supportMagicType) {
    if(err) { return handleError(res, err); }
    if(!supportMagicType) { return res.send(404); }
    return res.json(supportMagicType);
  });
};

// Creates a new supportMagicType in the DB.
exports.create = function(req, res) {
  Supportmagictype.create(req.body, function(err, supportMagicType) {
    if(err) { return handleError(res, err); }
    return res.json(201, supportMagicType);
  });
};

// Updates an existing supportMagicType in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Supportmagictype.findById(req.params.id, function (err, supportMagicType) {
    if (err) { return handleError(res, err); }
    if(!supportMagicType) { return res.send(404); }
    var updated = _.merge(supportMagicType, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, supportMagicType);
    });
  });
};

// Deletes a supportMagicType from the DB.
exports.destroy = function(req, res) {
  Supportmagictype.findById(req.params.id, function (err, supportMagicType) {
    if(err) { return handleError(res, err); }
    if(!supportMagicType) { return res.send(404); }
    supportMagicType.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}