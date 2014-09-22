'use strict';

angular.module('bootquestApp')
  .directive('confirm', function ($modal, $parse, $timeout) {
    return {
      priority: -1,
      restrict: 'A',
      link: function (scope, element, attrs) {
        scope.btnColorType = 'btn-danger';

        if(typeof attrs.buttonType !== 'undefined')
          scope.btnColorType = attrs.buttonType;

        if(typeof attrs.titleIcon !== 'undefined')
          scope.titleIcon = attrs.titleIcon;

        element.bind('click', function(e){

          e.stopImmediatePropagation();
          e.preventDefault();

          scope.cancel = function() {
            modalInstance.dismiss('cancel');
          };

          scope.ok = function() {
            modalInstance.close();
          };

          scope.title = attrs.confirmTitle;
          scope.message = attrs.confirmMessage;

          var modalInstance = $modal.open({
            templateUrl: 'directives/confirm/confirm.html',
            scope: scope
          });

          modalInstance.result.then(function() {
            $timeout(function() {
              scope.$apply(function() {
                $parse(attrs.confirm)(scope);
              });
            }, 300); // To wait CSS transition
          });
        });
      }
    };
  });