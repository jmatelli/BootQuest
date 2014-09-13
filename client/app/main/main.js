'use strict';

angular.module('bootquestApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        title: 'BootQuest'
      });
  });