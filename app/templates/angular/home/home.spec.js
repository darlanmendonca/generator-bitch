/* globals beforeEach, module, inject, expect, describe, it */
'use strict';

describe('HomeController', function() {
	beforeEach(module('<%= slugify(appname) %>'));

	let $controller;

	beforeEach(inject(function(_$controller_){
		$controller = _$controller_;
	}));

	describe('test $scope properties', function() {
		it('viewName should be "Home"', function() {
			let controller = $controller('HomeController');
			expect(controller.viewName).to.be.equal('Home');
		});
	});
});
