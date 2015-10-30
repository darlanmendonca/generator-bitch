'use strict';

describe('AboutController', function() {
	beforeEach(module('<%= slugify(appname) %>'));

	var $controller;

	beforeEach(inject(function(_$controller_){
		$controller = _$controller_;
	}));

	describe('test $scope properties', function() {
		it('viewName should be "About"', function() {
			var $scope = {};
			$controller('AboutController', { $scope: $scope });
			expect($scope.viewName).to.equal('About');
		});
	});
});
