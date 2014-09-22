'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PotionSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Potion', PotionSchema);