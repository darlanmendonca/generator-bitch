'use strict';

describe('AboutController', function() {
	beforeEach(module('<%= slugify(appname) %>'));

	var $controller;

	beforeEach(inject(function(_$controller_){
		$controller = _$controller_;
	}));

	describe('test $scope properties', function() {
		it('viewName should be "About"', function() {
			var controller = $controller('AboutController');
			expect(controller.viewName).to.be.equal('About');
		});
	});
});
