'use strict';

angular.module('bootquestApp')
  .factory('Character', function ($resource) {
    return $resource('/api/characters/:id', {}, {
      list:   { method: 'GET', isArray: true },
      mine:   { method: 'GET', isArray: true, params: { id: 'mine' } },
      create: { method: 'POST' },
      read:   { method: 'GET' },
      update: { method: 'PUT' },
      delete: { method: 'DELETE' }
    });
  })

  .factory('Attribute', function ($resource) {
    return $resource('/api/attributes/:id', {}, {
      list:   { method: 'GET', isArray: true },
      create: { method: 'POST' },
      read:   { method: 'GET' },
      update: { method: 'PUT' },
      delete: { method: 'DELETE' }
    });
  })

  .factory('CharacterAttribute', function ($resource) {
    return $resource('/api/characters/:character_id/character-attributes/:character_attribute_id', {}, {
      list:   { method: 'GET', isArray: true },
      create: { method: 'POST' },
      read:   { method: 'GET' },
      update: { method: 'PUT' }
    });
  })

  .factory('Race', function ($resource) {
    return $resource('/api/races/:id', {}, {
      list:   { method: 'GET', isArray: true },
      create: { method: 'POST' },
      read:   { method: 'GET' },
      update: { method: 'PUT' },
      delete: { method: 'DELETE' }
    });
  })

  .factory('Klass', function ($resource) {
    return $resource('/api/klasses/:id', {}, {
      list:   { method: 'GET', isArray: true },
      create: { method: 'POST' },
      read:   { method: 'GET' },
      update: { method: 'PUT' },
      delete: { method: 'DELETE' }
    });
  })

  /**
   * Album tag service
   */
  .factory('characterService', function( $q ,  Character ) {

      return {
        EVENT_TYPE_STAGE: 0,
        EVENT_TYPE_ERROR: 1,

        batchDelete: function(characters) {
          var deferred = $q.defer();
          var nbErrors = 0;
          var self = this;

          var _delete = function(i) {
            if (i === characters.length) {
              if(nbErrors === 0) deferred.resolve();
              else deferred.reject(nbErrors);

              return;
            }

            Character.delete({ id: characters[i]._id }).$promise
              .catch(function() {
                nbErrors++;
                deferred.notify({ type: self.EVENT_TYPE_ERROR });
              })
              .finally(function() {
                deferred.notify({ type: self.EVENT_TYPE_STAGE, stage: ++i });
                _delete(i);
              });
          };

          _delete(0);

          return deferred.promise;
        }
      };
    })

    /**
     * Album tag service
     */
    .factory('characterAttributeService', function( $q ,  CharacterAttribute ) {

      return {
        EVENT_TYPE_STAGE: 0,
        EVENT_TYPE_ERROR: 1,

        batchUpdate: function(characterId, characterAttributes) {
          var deferred = $q.defer();
          var nbErrors = 0;
          var self = this;

          console.log(characterAttributes);

          var _update = function(i) {
            if (i === characterAttributes.length) {
              if(nbErrors === 0) deferred.resolve();
              else deferred.reject(nbErrors);

              return;
            }

            CharacterAttribute.update(
              { character_id: characterId, character_attribute_id: characterAttributes[i]._id },
              characterAttributes[i]
            ).$promise
              .catch(function() {
                nbErrors++;
                deferred.notify({ type: self.EVENT_TYPE_ERROR });
              })
              .finally(function() {
                deferred.notify({ type: self.EVENT_TYPE_STAGE, stage: ++i });
                _update(i);
              });
          };

          _update(0);

          return deferred.promise;
        }
      };
    });