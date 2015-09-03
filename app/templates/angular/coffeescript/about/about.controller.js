angular
  .module '<%= slugify(appname) %>'
  .controller 'MainCtrl', AboutController

AboutController = ->
  console.log 'running AboutController'
