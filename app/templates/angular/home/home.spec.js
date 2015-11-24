/* globals beforeEach, module, inject, expect, describe, it */
'use strict';

describe('HomeController', function() {
	beforeEach(module('<%= slugify(appname) %>'));

	var $controller;

	beforeEach(inject(function(_$controller_){
		$controller = _$controller_;
	}));

	describe('test $scope properties', function() {
		it('viewName should be "Home"', function() {
			var controller = $controller('HomeController');
			expect(controller.viewName).to.be.equal('Home');
		});
	});
});
