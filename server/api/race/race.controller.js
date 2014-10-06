'use strict';

var _ = require('lodash');
var Race = require('./race.model');

// Get list of races
exports.index = function(req, res) {
  Race.find(function (err, races) {
    if(err) { return handleError(res, err); }
    return res.json(200, races);
  });
};

// Get a single race
exports.show = function(req, res) {
  Race.findById(req.params.id, function (err, race) {
    if(err) { return handleError(res, err); }
    if(!race) { return res.send(404); }
    return res.json(race);
  });
};

// Creates a new race in the DB.
exports.create = function(req, res) {
  Race.create(req.body, function(err, race) {
    if(err) { return handleError(res, err); }
    return res.json(201, race);
  });
};

// Updates an existing race in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Race.findById(req.params.id, function (err, race) {
    if (err) { return handleError(res, err); }
    if(!race) { return res.send(404); }
    var updated = _.merge(race, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, race);
    });
  });
};

// Deletes a race from the DB.
exports.destroy = function(req, res) {
  Race.findById(req.params.id, function (err, race) {
    if(err) { return handleError(res, err); }
    if(!race) { return res.send(404); }
    race.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}