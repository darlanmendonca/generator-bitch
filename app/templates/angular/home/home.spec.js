'use strict';

describe('HomeController', function() {
	beforeEach(module('<%= slugify(appname) %>'));

	let $controller;

	beforeEach(inject(function(_$controller_){
		$controller = _$controller_;
	}));

	describe('test $scope properties', function() {
		let controller = $controller('HomeController');

		it('viewName should be "Home"', function() {
			expect(controller.viewName).to.equal('Home');
		});
	});
});
