'use strict';

describe('AboutController', function() {
	beforeEach(module('<%= slugify(appname) %>'));

	var $controller;

	beforeEach(inject(function(_$controller_){
		$controller = _$controller_;
	}));

	describe('test $scope properties', function() {
		var controller = $controller('AboutController');

		it('viewName should be "About"', function() {
			expect(controller.viewName).to.equal('About');
		});
	});
});
