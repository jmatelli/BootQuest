'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AttackmagictypeSchema = new Schema({
  name: String,
  value: String,
  description: String
});

module.exports = mongoose.model('Attackmagictype', AttackmagictypeSchema);