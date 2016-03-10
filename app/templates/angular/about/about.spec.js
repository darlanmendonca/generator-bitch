/* globals beforeEach, module, inject, expect, describe, it */
'use strict';

describe('AboutController', function() {
	beforeEach(module('<%= slugify(appname) %>'));

	let $controller;

	beforeEach(inject(function(_$controller_){
		$controller = _$controller_;
	}));

	describe('test $scope properties', function() {
		it('viewName should be "About"', function() {
			let controller = $controller('AboutController');
			expect(controller.viewName).to.be.equal('About');
		});
	});
});
