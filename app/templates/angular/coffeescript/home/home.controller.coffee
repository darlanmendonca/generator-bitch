angular
  .module '<%= slugify(appname) %>'
  .controller 'HomeController', ($scope)->
    $scope.viewName = 'Home';
    console.log 'running HomeController'
