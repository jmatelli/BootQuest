'use strict';

angular.module('bootquestApp')
  .controller('SettingsCtrl', function ($rootScope, $scope, User, Auth) {
    $scope.errors = {};

    $scope.user = $rootScope.currentUser;

    $scope.editSettings = function (form) {
      $scope.submitted = true;
      if (form.$valid) {
        Auth.editSettings($scope.user)
          .then(function () {
            $rootScope.$emit('settingsSaved', $scope.user);
            $scope.message = 'Settings successfully changed.';
            $scope.success = true;
          })
          .catch(function () {
            form.password.$setValidity('mongoose', false);
            $scope.errors.other = 'Incorrect password';
            $scope.message = '';
            $scope.success = false;
          });
      }
    };
  });
