'use strict';

angular.module('bootquestApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/character', {
        templateUrl: 'app/character/character.html',
        controller: 'CharacterCtrl',
        authenticate: true,
        title: 'BootQuest - My characters'
      })
      .when('/character/new', {
        templateUrl: 'app/character/new.html',
        controller: 'CharacterNewCtrl',
        authenticate: true,
        title: 'BootQuest - Create a new character'
      })
      .when('/character/:id', {
        templateUrl: 'app/character/details.html',
        controller: 'CharacterDetailsCtrl',
        authenticate: true,
        title: 'BootQuest - Character\'s details'
      });
  });
