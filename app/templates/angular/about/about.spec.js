'use strict';

describe('AboutController', function() {
	beforeEach(module('<%= slugify(appname) %>'));

	let $controller;

	beforeEach(inject(function(_$controller_){
		$controller = _$controller_;
	}));

	describe('test $scope properties', function() {
		let controller = $controller('AboutController');

		it('viewName should be "About"', function() {
			expect(controller.viewName).to.equal('About');
		});
	});
});
