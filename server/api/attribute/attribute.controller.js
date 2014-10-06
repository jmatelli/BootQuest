'use strict';

var _ = require('lodash');
var Attribute = require('./attribute.model');

// Get list of attributes
exports.index = function(req, res) {
  Attribute.find(function (err, attributes) {
    if(err) { return handleError(res, err); }
    return res.json(200, attributes);
  });
};

// Get a single attribute
exports.show = function(req, res) {
  Attribute.findById(req.params.id, function (err, attribute) {
    if(err) { return handleError(res, err); }
    if(!attribute) { return res.send(404); }
    return res.json(attribute);
  });
};

// Creates a new attribute in the DB.
exports.create = function(req, res) {
  Attribute.create(req.body, function(err, attribute) {
    if(err) { return handleError(res, err); }
    return res.json(201, attribute);
  });
};

// Updates an existing attribute in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Attribute.findById(req.params.id, function (err, attribute) {
    if (err) { return handleError(res, err); }
    if(!attribute) { return res.send(404); }
    var updated = _.merge(attribute, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, attribute);
    });
  });
};

// Deletes a attribute from the DB.
exports.destroy = function(req, res) {
  Attribute.findById(req.params.id, function (err, attribute) {
    if(err) { return handleError(res, err); }
    if(!attribute) { return res.send(404); }
    attribute.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}