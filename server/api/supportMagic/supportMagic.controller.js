'use strict';

var _ = require('lodash');
var Supportmagic = require('./supportMagic.model');

// Get list of supportMagics
exports.index = function(req, res) {
  Supportmagic.find(function (err, supportMagics) {
    if(err) { return handleError(res, err); }
    return res.json(200, supportMagics);
  });
};

// Get a single supportMagic
exports.show = function(req, res) {
  Supportmagic.findById(req.params.id, function (err, supportMagic) {
    if(err) { return handleError(res, err); }
    if(!supportMagic) { return res.send(404); }
    return res.json(supportMagic);
  });
};

// Creates a new supportMagic in the DB.
exports.create = function(req, res) {
  Supportmagic.create(req.body, function(err, supportMagic) {
    if(err) { return handleError(res, err); }
    return res.json(201, supportMagic);
  });
};

// Updates an existing supportMagic in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Supportmagic.findById(req.params.id, function (err, supportMagic) {
    if (err) { return handleError(res, err); }
    if(!supportMagic) { return res.send(404); }
    var updated = _.merge(supportMagic, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, supportMagic);
    });
  });
};

// Deletes a supportMagic from the DB.
exports.destroy = function(req, res) {
  Supportmagic.findById(req.params.id, function (err, supportMagic) {
    if(err) { return handleError(res, err); }
    if(!supportMagic) { return res.send(404); }
    supportMagic.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}