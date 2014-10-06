'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AttributeSchema = new Schema({
  name: String,
  label: String,
  value: Number,
  description: String,
  active: Boolean
});

module.exports = mongoose.model('Attribute', AttributeSchema);