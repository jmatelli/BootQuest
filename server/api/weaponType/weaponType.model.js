'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var WeapontypeSchema = new Schema({
  name: String,
  value: Number,
  hand_slots: Number,
  description: String
});

module.exports = mongoose.model('Weapontype', WeapontypeSchema);