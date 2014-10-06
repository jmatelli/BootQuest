'use strict';

angular.module('bootquestApp')
  .controller('NavbarCtrl', function ($cookieStore, $rootScope, $scope, $location, Auth, User) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/',
      authenticated: 'all'
    },{
      'title': 'Character',
      'link': '/character',
      authenticated: true
    },{
      'title': 'Shop',
      'link': '/shop',
      authenticated: true
    }];

    $rootScope.nameToShow = !$rootScope.currentUser.useRealName || typeof $rootScope.currentUser.name === 'undefined' ? $rootScope.currentUser.username : $rootScope.currentUser.name;

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });