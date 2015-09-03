angular
  .module '<%= slugify(appname) %>'
  .controller 'MainCtrl', HomeController

HomeController = ->
  console.log 'running HomeController'
