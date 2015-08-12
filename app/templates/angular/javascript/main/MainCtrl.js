'use strict';

angular
  .module('<%= slugify(appname) %>')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    console.log('running main controller');
  });
