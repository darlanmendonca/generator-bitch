/* globals beforeEach, expect, describe, it */
'use strict';

let angular = require('angular');
let module = angular.mock.module;
let inject = angular.mock.inject;

describe('AboutController', function() {
  beforeEach(module('<%= slugify(appName) %>'));

  let $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  describe('test $scope properties', function() {
    it('viewName should be "About"', function() {
      let AboutController = $controller('AboutController');
      expect(AboutController.viewName).to.be.equal('About');
    });
  });
});
