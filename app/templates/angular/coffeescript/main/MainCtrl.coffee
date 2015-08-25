'use strict';

angular
  .module '<%= slugify(appname) %>'
  .controller 'MainCtrl', ($scope)->
    $scope.awesomeThings = [
      'HTML5 Boilerplate'
      'AngularJS'
      'Karma'
    ]

    console.log 'running main controller'
