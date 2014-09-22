'use strict';

angular.module('bootquestApp')

  /**
   * Character controller
   */
  .controller('CharacterCtrl', function ($rootScope, $scope, Character, characterService) {

    $scope.list = function () {
      Character.mine().$promise
        .then(function (characters) {
          $scope.characters = characters
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
  .controller('CharacterNewCtrl', function ($location, $rootScope, $scope, Character) {

    var baseStatVal = 10;

    $scope.characterLimitReached = false;

    $scope.character = {};
    $scope.character.stats = {};
    $scope.character.stats.strength = 10;
    $scope.character.stats.constitution = 10;
    $scope.character.stats.dexterity = 10;
    $scope.character.stats.intelligence = 10;
    $scope.character.stats.luck = 10;

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
    $scope.modifiers.class = {};
    $scope.modifiers.class.knight = {
      intelligence: -2,
      strength: 2,
      constitution: 1,
      dexterity: -1,
      luck: 0
    };
    $scope.modifiers.class.rogue = {
      constitution: -2,
      dexterity: 2,
      luck: 1,
      strength: -1,
      intelligence: 0
    };
    $scope.modifiers.class.mage = {
      strength: -2,
      intelligence: 2,
      constitution: 1,
      dexterity: -1,
      luck: 0
    };
    $scope.modifiers.class.cleric = {
      dexterity: -2,
      intelligence: 2,
      luck: 1,
      strength: -1,
      constitution: 0
    };

    $scope.save = function (form) {
      var character = _.omit($scope.character, 'stats');
      character._creator = $rootScope.currentUser._id;

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

    var watchRace = function (newVal, oldVal) {
      if (typeof newVal !== 'undefined' && newVal !== oldVal) {
        for (var stat in $scope.character.stats) {
          if ($scope.character.stats.hasOwnProperty(stat) && $scope.modifiers.race[newVal].hasOwnProperty(stat)) {
            var otherModifier = typeof $scope.character.class !== 'undefined' ? $scope.modifiers.class[$scope.character.class][stat] : 0;
            $scope.character.stats[stat] = baseStatVal + $scope.modifiers.race[newVal][stat] + otherModifier;
            $scope.character[stat] = baseStatVal + $scope.modifiers.race[newVal][stat] + otherModifier;
          }
        }
      }
    };

    var watchClass = function (newVal, oldVal) {
      if (typeof newVal !== 'undefined' && newVal !== oldVal) {
        for (var stat in $scope.character.stats) {
          if ($scope.character.stats.hasOwnProperty(stat) && $scope.modifiers.class[newVal].hasOwnProperty(stat)) {
            var otherModifier = typeof $scope.character.race !== 'undefined' ? $scope.modifiers.race[$scope.character.race][stat] : 0;
            $scope.character.stats[stat] = baseStatVal + $scope.modifiers.class[newVal][stat] + otherModifier;
            $scope.character[stat] = baseStatVal + $scope.modifiers.class[newVal][stat] + otherModifier;
          }
        }
      }
    };


    /**
     * Watchers
     */
    $scope.$watch('character.race', watchRace);
    $scope.$watch('character.class', watchClass);

  })

  /**
   * Character details controller
   */
  .controller('CharacterDetailsCtrl', function ($rootScope, $routeParams, $scope, Character) {

    var stats = ['strength', 'constitution', 'dexterity', 'intelligence', 'luck'];
    var originalStatPoints;

    $scope.readCharacter = function () {
      Character.read({ id: $routeParams.id }).$promise
        .then(function (character) {
          $scope.character = character;
          $scope.character.stats = [];
          $scope.character.originalStats = [];
          originalStatPoints = $scope.character.statPoints;

          angular.forEach(stats, function (value) {
            var stat = {
              type: value,
              value: $scope.character[value]
            };

            var stat2 = angular.copy(stat);

            $scope.character.stats.push(stat);
            $scope.character.originalStats.push(stat2);
          });

        });
    };

    $scope.increase = function (stat, index) {
      $scope.character.stats[index].value += 1;
      $scope.character[stat] += 1;
      $scope.character.statPoints -= 1;
    };

    $scope.decrease = function (stat, index) {
      $scope.character.stats[index].value -= 1;
      $scope.character[stat] -= 1;
      $scope.character.statPoints += 1;
    };

    $scope.saveStatPoints = function () {
      Character.update({id: $scope.character._id}, $scope.character).$promise
        .then(function () {
          $scope.readCharacter();
        });
    };

    var watchStatPoints = function (newVal, oldVal) {
      if (typeof newVal !== 'undefined' && typeof oldVal !== 'undefined' && newVal !== oldVal) {
        $scope.statsModified = newVal !== originalStatPoints;
      }
    };

    $scope.readCharacter();

    $scope.$watch('character.statPoints', watchStatPoints);

  });
