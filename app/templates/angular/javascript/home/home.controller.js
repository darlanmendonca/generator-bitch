'use strict';

angular
  .module('<%= slugify(appname) %>')
  .controller('HomeController', HomeController);

function HomeController ($scope) {
  $scope.viewName = 'Home';
  console.log('running HomeController');
}
