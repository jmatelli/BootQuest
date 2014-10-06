'use strict';

angular.module('bootquestApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/shop', {
        templateUrl: 'app/shop/shop.html',
        controller: 'ShopCtrl'
      });
  });
