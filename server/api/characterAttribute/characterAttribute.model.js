'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CharacterattributeSchema = new Schema({
  _character: { type: Schema.Types.ObjectId, ref: 'Character' },
  _attribute: { type: Schema.Types.ObjectId, ref: 'Attribute' },
  value: Number
});

module.exports = mongoose.model('CharacterAttribute', CharacterattributeSchema);