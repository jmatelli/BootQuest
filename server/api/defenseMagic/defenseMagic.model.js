'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DefensemagicSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Defensemagic', DefensemagicSchema);