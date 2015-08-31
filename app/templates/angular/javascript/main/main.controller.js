'use strict';

angular
  .module('<%= slugify(appname) %>')
  .controller('MainController', MainController);

function MainController ($scope) {
  $scope.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

  console.log('running main controller');
}
