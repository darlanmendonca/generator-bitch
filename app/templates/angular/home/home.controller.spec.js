/* globals beforeEach, expect, describe, it */
'use strict';

let angular = require('angular');
let module = angular.mock.module;
let inject = angular.mock.inject;

describe('HomeController', function() {
  beforeEach(module('<%= slugify(appName) %>'));

  let $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  describe('test $scope properties', function() {
    it('viewName should be "Home"', function() {
      let HomeController = $controller('HomeController');
      expect(HomeController.viewName).to.be.equal('Home');
    });
  });
});
