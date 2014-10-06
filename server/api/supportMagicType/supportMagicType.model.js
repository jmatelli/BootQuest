'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SupportmagictypeSchema = new Schema({
  name: String,
  description: String
});

module.exports = mongoose.model('Supportmagictype', SupportmagictypeSchema);