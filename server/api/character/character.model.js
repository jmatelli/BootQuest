'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    slug = require('slug');

var CharacterSchema = new Schema({
  _creator :          { type: Schema.Types.ObjectId, ref: 'User' },
  name:               String,
  race:               String,
  class:              String,
  level:              { type: Number, default: 1 },
  strength:           Number,
  constitution:       Number,
  dexterity:          Number,
  intelligence:       Number,
  luck:               Number,
  exp:                { type: Number, default: 0 },
  nextLevel:          { type: Number, default: 1000 },
  statPoints:         { type: Number, default: 0 },
  statPointsPerLevel: { type: Number, default: 5 },
  hp:                 { type: Number, default: 100 },
  currentHp:          { type: Number, default: 100 },
  mp:                 { type: Number, default: 60 },
  currentMp:          { type: Number, default: 60 },
  cooldown:           { type: Number, default: 1000 },
  slug:               String
});

// Validate name is not taken
CharacterSchema
  .path('name')
  .validate(function(value, respond) {
    var self = this;
    this.constructor.findOne({name: value}, function(err, character) {
      if(err) throw err;
      if(character) {
        if(self.id === character.id) return respond(true);
        return respond(false);
      }
      respond(true);
    });
  }, 'This Character already exists.');

CharacterSchema.pre('save', function (next) {
  this.slug = slug(this.name).toLowerCase();
  this.hp = Math.floor(this.hp + (((this.constitution-10)/2) * this.level));
  this.mp = Math.floor(this.mp + (((this.intelligence-10)/2) * this.level));
  if (this.hp < this.currentHp) {
    this.currentHp = this.hp;
  }
  if (this.mp < this.currentMp) {
    this.currentMp = this.mp;
  }
  next();
});

module.exports = mongoose.model('Character', CharacterSchema);