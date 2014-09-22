'use strict';

angular.module('bootquestApp')
  .directive('goBack', function () {
    return {
      templateUrl: 'directives/go-back/go-back.html',
      restrict: 'E',
      link: function (scope, element, attrs) {
      }
    };
  });