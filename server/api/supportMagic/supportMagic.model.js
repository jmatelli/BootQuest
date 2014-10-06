'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SupportmagicSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Supportmagic', SupportmagicSchema);