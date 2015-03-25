'use strict';

angular.module('bootquestApp')

  /**
   * Character controller
   */
  .controller('CharacterCtrl', function ($rootScope, $scope, _, Character, characterService, Race, Klass) {

    var parseResponse = function (data) {
      _.each(data, function (character) {
        Race.read({ id: character._race }).$promise
          .then(function (race) {
            character.race = race.name;
          });

        Klass.read({ id: character._klass }).$promise
          .then(function (klass) {
            character.klass = klass.name;
          });
      });
    };

    $scope.list = function () {
      Character.mine().$promise
        .then(function (characters) {
          parseResponse(characters);
          $scope.characters = characters;
          $scope.nbCharacters = characters.length;
          $scope.charactersLimitReached = $scope.nbCharacters === $rootScope.currentUser.nbCharMax;
        })
        .catch(function (err) {
          console.log(err);
        });
    };

    $scope.deleteCharacter = function (id) {
      Character.delete({id: id}).$promise
        .then(function () {
          $scope.list();
        })
        .catch(function () {
          $scope.deleteError = true;
        });
    };

    $scope.deleteAllCharacters = function () {
      characterService.batchDelete($scope.characters)
        .then(function () {
          $scope.list();
        });
    };

    $scope.list();

  })

  /**
   * New character controller
   */
  .controller('CharacterNewCtrl', function ($location, $rootScope, $scope, Character, Klass, Race) {

    var baseStatVal = 10;

    $scope.characterLimitReached = false;

    $scope.character = {};
    $scope.character._creator = $rootScope.currentUser._id;
    $scope.character.strength = 10;
    $scope.character.constitution = 10;
    $scope.character.dexterity = 10;
    $scope.character.intelligence = 10;
    $scope.character.luck = 10;

    $scope.modifiers = {};
    $scope.modifiers.race = {};
    $scope.modifiers.race.human = {
      strength: -2,
      luck: 2,
      intelligence: 1,
      constitution: -1,
      dexterity: 0
    };
    $scope.modifiers.race.elf = {
      luck: -2,
      dexterity: 2,
      strength: 1,
      intelligence: -1,
      constitution: 0
    };
    $scope.modifiers.race.dwarf = {
      luck: -2,
      strength: 2,
      constitution: 1,
      dexterity: -1,
      intelligence: 0
    };
    $scope.modifiers.race.orc = {
      intelligence: -2,
      strength: 2,
      dexterity: 1,
      constitution: -1,
      luck: 0
    };
    $scope.modifiers.klass = {};
    $scope.modifiers.klass.fighter = {
      intelligence: -2,
      strength: 2,
      constitution: 1,
      dexterity: -1,
      luck: 0
    };
    $scope.modifiers.klass.rogue = {
      constitution: -2,
      dexterity: 2,
      luck: 1,
      strength: -1,
      intelligence: 0
    };
    $scope.modifiers.klass.wizard = {
      strength: -2,
      intelligence: 2,
      constitution: 1,
      dexterity: -1,
      luck: 0
    };
    $scope.modifiers.klass.cleric = {
      dexterity: -2,
      intelligence: 2,
      luck: 1,
      strength: -1,
      constitution: 0
    };

    $scope.readRaces = function () {
      Race.list().$promise
        .then(function (races) {
          $scope.races = races;
        });
    };

    $scope.readKlasses = function () {
      Klass.list().$promise
        .then(function (klasses) {
          $scope.klasses = klasses;
        });
    };

    $scope.save = function (form) {
      var character = _.omit($scope.character, 'stats');

      $scope.submitted = true;

      if(form.$valid) {
        Character.create(character).$promise
          .then(function () {
            $location.path('/character');
          })
          .catch(function (err) {
            err = err.data;

            if (err.hasOwnProperty('type') && err.type === 'limitReached') {
              $scope.characterLimitReached = true;
              $scope.characterLimitReachedMessage = err.message;
            } else {
              $scope.errors = {};

              $scope.characterLimitReached = false;

              // Update validity of form fields that match the mongoose errors
              angular.forEach(err.errors, function (error, field) {
                form[field].$setValidity('mongoose', false);
                $scope.errors[field] = error.message;
              });
            }
          });
      }
    };

    $scope.readRaces();
    $scope.readKlasses();

    var watchRace = function (newVal, oldVal) {
      if (typeof newVal !== 'undefined' && newVal !== oldVal) {
        Race.read({ 'id': newVal }).$promise
          .then(function (race) {
            $scope.race = race.label;
            for (var stat in $scope.character) {
              if ($scope.character.hasOwnProperty(stat) && $scope.modifiers.race[race.label].hasOwnProperty(stat)) {
                var otherModifier = typeof $scope.klass !== 'undefined' ? $scope.modifiers.klass[$scope.klass][stat] : 0;
                $scope.character[stat] = baseStatVal + $scope.modifiers.race[race.label][stat] + otherModifier;
              }
            }
          });
      }
    };

    var watchKlass = function (newVal, oldVal) {
      if (typeof newVal !== 'undefined' && newVal !== oldVal) {
        Klass.read({ 'id': newVal }).$promise
          .then(function (klass) {
            $scope.klass = klass.label;
            for (var stat in $scope.character) {
              if ($scope.character.hasOwnProperty(stat) && $scope.modifiers.klass[klass.label].hasOwnProperty(stat)) {
                var otherModifier = typeof $scope.race !== 'undefined' ? $scope.modifiers.race[$scope.race][stat] : 0;
                $scope.character[stat] = baseStatVal + $scope.modifiers.klass[klass.label][stat] + otherModifier;
              }
            }
          });
      }
    };


    /**
     * Watchers
     */
    $scope.$watch('character.race', watchRace);
    $scope.$watch('character.klass', watchKlass);

  })

  /**
   * Character details controller
   */
  .controller('CharacterDetailsCtrl', function ($rootScope, $routeParams, $scope, _, Attribute, Character, CharacterAttribute, characterAttributeService) {

    var parseAttributes = function (data) {
      _.each(data, function (characterAttribute) {
        Attribute.read({ id: characterAttribute._attribute }).$promise
          .then(function (attribute) {
            attribute = _.omit(attribute, '_id');
            attribute = _.omit(attribute, 'value');
            angular.extend(characterAttribute, attribute);
          });
      });
    };

    $scope.readCharacter = function () {
      Character.read({ id: $routeParams.id }).$promise
        .then(function (character) {
          $scope.character = character;
          $scope.character.statPoints = 20;
          $scope.character.originalStatPoints = angular.copy($scope.character.statPoints);

          CharacterAttribute.list({ character_id: $scope.character._id }).$promise
            .then(function (characterAttributes) {
              parseAttributes(characterAttributes);
              $scope.character.attributes = characterAttributes;
              $scope.character.originalAttributes = angular.copy($scope.character.attributes);
            });
        });
    };

    $scope.increase = function (stat, index) {
      $scope.character.attributes[index].value += 1;
      $scope.character.statPoints -= 1;
    };

    $scope.decrease = function (stat, index) {
      $scope.character.attributes[index].value -= 1;
      $scope.character.statPoints += 1;
    };

    $scope.saveStatPoints = function () {
      characterAttributeService.batchUpdate($scope.character._id, $scope.character.attributes)
        .finally(function () {
          $scope.readCharacter();
        })
        .catch(function () {

        });
    };

    var watchStatPoints = function (newVal, oldVal) {
      if (typeof newVal !== 'undefined' && typeof oldVal !== 'undefined' && newVal !== oldVal) {
        $scope.statsModified = newVal !== $scope.character.originalStatPoints;
      }
    };

    $scope.readCharacter();

    $scope.$watch('character.statPoints', watchStatPoints);

  });
