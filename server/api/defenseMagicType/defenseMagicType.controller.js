'use strict';

var _ = require('lodash');
var Defensemagictype = require('./defenseMagicType.model');

// Get list of defenseMagicTypes
exports.index = function(req, res) {
  Defensemagictype.find(function (err, defenseMagicTypes) {
    if(err) { return handleError(res, err); }
    return res.json(200, defenseMagicTypes);
  });
};

// Get a single defenseMagicType
exports.show = function(req, res) {
  Defensemagictype.findById(req.params.id, function (err, defenseMagicType) {
    if(err) { return handleError(res, err); }
    if(!defenseMagicType) { return res.send(404); }
    return res.json(defenseMagicType);
  });
};

// Creates a new defenseMagicType in the DB.
exports.create = function(req, res) {
  Defensemagictype.create(req.body, function(err, defenseMagicType) {
    if(err) { return handleError(res, err); }
    return res.json(201, defenseMagicType);
  });
};

// Updates an existing defenseMagicType in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Defensemagictype.findById(req.params.id, function (err, defenseMagicType) {
    if (err) { return handleError(res, err); }
    if(!defenseMagicType) { return res.send(404); }
    var updated = _.merge(defenseMagicType, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, defenseMagicType);
    });
  });
};

// Deletes a defenseMagicType from the DB.
exports.destroy = function(req, res) {
  Defensemagictype.findById(req.params.id, function (err, defenseMagicType) {
    if(err) { return handleError(res, err); }
    if(!defenseMagicType) { return res.send(404); }
    defenseMagicType.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}