'use strict';

describe('Directive: confirm', function () {

  // load the directive's module and view
  beforeEach(module('bootquestApp'));
  beforeEach(module('directives/confirm/confirm.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<confirm></confirm>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the confirm directive');
  }));
});