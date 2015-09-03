angular
  .module '<%= slugify(appname) %>'
  .controller 'HomeController', HomeController

HomeController = ->
  console.log 'running HomeController'
