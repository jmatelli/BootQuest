/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Character = require('../api/character/character.model');
var Race = require('../api/race/race.model');
var Klass = require('../api/klass/klass.model');
var Attribute = require('../api/attribute/attribute.model');
var CharacterAttribute = require('../api/characterAttribute/characterAttribute.model');
var WeaponType = require('../api/weaponType/weaponType.model');

/**
 * Fixtures Races
 */
Race.find({}).remove(function () {
  Race.create({
    name: 'Human',
    label: 'human',
    value: 0,
    description: '',
    active: true
  }, {
    name: 'Elf',
    label: 'elf',
    value: 1,
    description: '',
    active: true
  }, {
    name: 'Dwarf',
    label: 'dwarf',
    value: 2,
    description: '',
    active: true
  }, {
    name: 'Orc',
    label: 'orc',
    value: 3,
    description: '',
    active: true
  }, function () {
    console.log('finished populating races');
  });
});


/**
 * Fixtures Klasses
 */
Klass.find({}).remove(function () {
  Klass.create({
    name: 'Fighter',
    label: 'fighter',
    value: 0,
    description: '',
    active: true
  }, {
    name: 'Rogue',
    label: 'rogue',
    value: 1,
    description: '',
    active: true
  }, {
    name: 'Wizard',
    label: 'wizard',
    value: 2,
    description: '',
    active: true
  }, {
    name: 'CLeric',
    label: 'cleric',
    value: 3,
    description: '',
    active: true
  }, function () {
    console.log('finished populating klasses');
  });
});


/**
 * Fixtures Attributes
 */
Attribute.find({}).remove(function () {
  Attribute.create({
    name: 'Strength',
    label: 'strength',
    value: 0,
    description: '',
    active: true
  }, {
    name: 'Constitution',
    label: 'constitution',
    value: 1,
    description: '',
    active: true
  }, {
    name: 'Dexterity',
    label: 'dexterity',
    value: 2,
    description: '',
    active: true
  }, {
    name: 'Intelligence',
    label: 'intelligence',
    value: 3,
    description: '',
    active: true
  }, {
    name: 'Luck',
    label: 'luck',
    value: 4,
    description: '',
    active: true
  }, function () {
    console.log('finished populating attributes')
  })
});


/**
 * Fixtures Users
 */
User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {

      /**
       * Fixtures characters
       */
      Character.find({}).remove(function () {
        User.findOne({ email: 'test@test.com' }, function (err1, doc1) {
          Race.findOne({ label: 'human' }, function (err2, doc2) {
            Klass.findOne({ label: 'rogue' }, function (err3, doc3) {
              Character.create({
                name: 'Jan Uary',
                _creator: doc1._id,
                _race: doc2._id,
                _klass: doc3._id
              }, function () {

                /**
                 * Character's attributes
                 */
                Character.findOne({ _creator: doc1._id }, function (err4, doc4) {
                  CharacterAttribute.find({}).remove(function () {
                    Attribute.findOne({ label: 'strength' }, function (err5, doc5) {
                      CharacterAttribute.create({
                        _character: doc4._id,
                        _attribute: doc5._id,
                        value: 10
                      }, function () {
                        console.log('finished giving strength to character')
                      });
                    });
                    Attribute.findOne({ label: 'constitution' }, function (err5, doc5) {
                      CharacterAttribute.create({
                        _character: doc4._id,
                        _attribute: doc5._id,
                        value: 10
                      }, function () {
                        console.log('finished giving constitution to character')
                      });
                    });
                    Attribute.findOne({ label: 'dexterity' }, function (err5, doc5) {
                      CharacterAttribute.create({
                        _character: doc4._id,
                        _attribute: doc5._id,
                        value: 10
                      }, function () {
                        console.log('finished giving dexterity to character')
                      });
                    });
                    Attribute.findOne({ label: 'intelligence' }, function (err5, doc5) {
                      CharacterAttribute.create({
                        _character: doc4._id,
                        _attribute: doc5._id,
                        value: 10
                      }, function () {
                        console.log('finished giving intelligence to character')
                      });
                    });
                    Attribute.findOne({ label: 'luck' }, function (err5, doc5) {
                      CharacterAttribute.create({
                        _character: doc4._id,
                        _attribute: doc5._id,
                        value: 10
                      }, function () {
                        console.log('finished giving luck to character')
                      });
                    });
                  });
                });
                console.log('finished populating characters')
              });
            });
          });
        });
      });
      console.log('finished populating users');
    }
  );
});


/**
 * Fixtures weapon types
 */
WeaponType.find({}).remove(function () {
  WeaponType.create({
    name: 'Short Sword',
    value: 0,
    hand_slots: 1,
    description: 'A one handed short sword'
  }, {
    name: 'Long Sword',
    value: 1,
    hand_slots: 2,
    description: 'A two handed long sword'
  }, {
    name: 'Short Axe',
    value: 2,
    hand_slots: 1,
    description: 'A one handed short axe'
  }, {
    name: 'Big Axe',
    value: 3,
    hand_slots: 2,
    description: 'A two handed big axe'
  }, function () {
    console.log('finished populating weapons types')
  })
});