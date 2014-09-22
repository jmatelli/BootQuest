'use strict';

angular.module('bootquestApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: { method: 'PUT', params: { controller:'password' } },
      editSettings: { method: 'PUT', params: { controller:'settings' } },
      get: { method: 'GET', params: { id:'me' } }
	  });
  });
