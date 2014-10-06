'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AttackmagicSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Attackmagic', AttackmagicSchema);