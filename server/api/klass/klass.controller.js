'use strict';

var _ = require('lodash');
var Klass = require('./klass.model');

// Get list of klasss
exports.index = function(req, res) {
  Klass.find(function (err, klasss) {
    if(err) { return handleError(res, err); }
    return res.json(200, klasss);
  });
};

// Get a single klass
exports.show = function(req, res) {
  Klass.findById(req.params.id, function (err, klass) {
    if(err) { return handleError(res, err); }
    if(!klass) { return res.send(404); }
    return res.json(klass);
  });
};

// Creates a new klass in the DB.
exports.create = function(req, res) {
  Klass.create(req.body, function(err, klass) {
    if(err) { return handleError(res, err); }
    return res.json(201, klass);
  });
};

// Updates an existing klass in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Klass.findById(req.params.id, function (err, klass) {
    if (err) { return handleError(res, err); }
    if(!klass) { return res.send(404); }
    var updated = _.merge(klass, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, klass);
    });
  });
};

// Deletes a klass from the DB.
exports.destroy = function(req, res) {
  Klass.findById(req.params.id, function (err, klass) {
    if(err) { return handleError(res, err); }
    if(!klass) { return res.send(404); }
    klass.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}