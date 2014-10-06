'use strict';

var _ = require('lodash'),
    Character = require('../character/character.model'),
    Attribute = require('../attribute/attribute.model'),
    CharacterAttribute = require('./characterAttribute.model');

// Get list of characterAttributes
exports.index = function(req, res) {
  CharacterAttribute.find(function (err, characterAttributes) {
    if(err) { return handleError(res, err); }
    return res.json(200, characterAttributes);
  });
};

// Get a single characterAttribute
exports.show = function(req, res) {
  CharacterAttribute.findById(req.params.id, function (err, characterAttribute) {
    if(err) { return handleError(res, err); }
    if(!characterAttribute) { return res.send(404); }
    return res.json(characterAttribute);
  });
};

// Creates a new characterAttribute in the DB.
exports.create = function(req, res) {
  CharacterAttribute.create(req.body, function(err, characterAttribute) {
    if(err) { return handleError(res, err); }
    return res.json(201, characterAttribute);
  });
};

// Updates an existing characterAttribute in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  CharacterAttribute.findById(req.params.character_attribute_id, function (err, characterAttribute) {
    var characterId = characterAttribute._character;
    var constitutionId, intelligenceId;

    // get the id of the constitution attribute
    Attribute.findOne({ label: 'constitution' }, function (err, attribute) {
      if (err) { return handleError(res, err); }
      if(!attribute) { return res.send(404); }
      constitutionId = attribute._id;
    });

    // get the id of the intelligence attribute
    Attribute.findOne({ label: 'intelligence' }, function (err, attribute) {
      if (err) { return handleError(res, err); }
      if(!attribute) { return res.send(404); }
      intelligenceId = attribute._id;
    });

    if (err) { return handleError(res, err); }
    if(!characterAttribute) { return res.send(404); }
    var updated = _.merge(characterAttribute, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }


      // if attribute is constitution, edit hp according to the new value and save character
      if (characterAttribute._attribute === constitutionId) {
        Character.findById(characterId, function (err, character) {
          character.hp = Math.floor(character.hp + (((characterAttribute.value-10)/2) * character.level));
          if (character.hp < character.currentHp) {
            character.currentHp = character.hp;
          }
          character.save();
          return res.json(200, characterAttribute);
        });
      }


      // if attribute is intelligence, edit mp according to the new value and save character
      if (characterAttribute._attribute === intelligenceId) {
        Character.findById(characterId, function (err, character) {
          character.mp = Math.floor(character.mp + (((characterAttribute.value-10)/2) * character.level));
          if (character.mp < character.currentMp) {
            character.currentMp = character.mp;
          }
          character.save();
          return res.json(200, characterAttribute);
        });
      }

      return res.json(200, characterAttribute);
    });
  });
};

// Deletes a characterAttribute from the DB.
exports.destroy = function(req, res) {
  CharacterAttribute.findById(req.params.character_attribute_id, function (err, characterAttribute) {
    if(err) { return handleError(res, err); }
    if(!characterAttribute) { return res.send(404); }
    characterAttribute.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}