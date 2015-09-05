angular
  .module '<%= slugify(appname) %>'
  .controller 'AboutController', ($scope)->
    $scope.viewName = 'About';
    console.log 'running AboutController'
