'use strict';

var _ = require('lodash');
var Defensemagic = require('./defenseMagic.model');

// Get list of defenseMagics
exports.index = function(req, res) {
  Defensemagic.find(function (err, defenseMagics) {
    if(err) { return handleError(res, err); }
    return res.json(200, defenseMagics);
  });
};

// Get a single defenseMagic
exports.show = function(req, res) {
  Defensemagic.findById(req.params.id, function (err, defenseMagic) {
    if(err) { return handleError(res, err); }
    if(!defenseMagic) { return res.send(404); }
    return res.json(defenseMagic);
  });
};

// Creates a new defenseMagic in the DB.
exports.create = function(req, res) {
  Defensemagic.create(req.body, function(err, defenseMagic) {
    if(err) { return handleError(res, err); }
    return res.json(201, defenseMagic);
  });
};

// Updates an existing defenseMagic in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Defensemagic.findById(req.params.id, function (err, defenseMagic) {
    if (err) { return handleError(res, err); }
    if(!defenseMagic) { return res.send(404); }
    var updated = _.merge(defenseMagic, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, defenseMagic);
    });
  });
};

// Deletes a defenseMagic from the DB.
exports.destroy = function(req, res) {
  Defensemagic.findById(req.params.id, function (err, defenseMagic) {
    if(err) { return handleError(res, err); }
    if(!defenseMagic) { return res.send(404); }
    defenseMagic.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}