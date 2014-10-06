'use strict';

var _ = require('lodash');
var Attackmagic = require('./attackMagic.model');

// Get list of attackMagics
exports.index = function(req, res) {
  Attackmagic.find(function (err, attackMagics) {
    if(err) { return handleError(res, err); }
    return res.json(200, attackMagics);
  });
};

// Get a single attackMagic
exports.show = function(req, res) {
  Attackmagic.findById(req.params.id, function (err, attackMagic) {
    if(err) { return handleError(res, err); }
    if(!attackMagic) { return res.send(404); }
    return res.json(attackMagic);
  });
};

// Creates a new attackMagic in the DB.
exports.create = function(req, res) {
  Attackmagic.create(req.body, function(err, attackMagic) {
    if(err) { return handleError(res, err); }
    return res.json(201, attackMagic);
  });
};

// Updates an existing attackMagic in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Attackmagic.findById(req.params.id, function (err, attackMagic) {
    if (err) { return handleError(res, err); }
    if(!attackMagic) { return res.send(404); }
    var updated = _.merge(attackMagic, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, attackMagic);
    });
  });
};

// Deletes a attackMagic from the DB.
exports.destroy = function(req, res) {
  Attackmagic.findById(req.params.id, function (err, attackMagic) {
    if(err) { return handleError(res, err); }
    if(!attackMagic) { return res.send(404); }
    attackMagic.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}