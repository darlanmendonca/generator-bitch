'use strict';

angular
  .module('<%= slugify(appname) %>')
  .controller('AboutController', AboutController);

function AboutController ($scope) {
  $scope.viewName = 'About';
  console.log('running AboutController');
}
