'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DefensemagictypeSchema = new Schema({
  name: String,
  description: String
});

module.exports = mongoose.model('Defensemagictype', DefensemagictypeSchema);