angular
  .module '<%= slugify(appname) %>'
  .controller 'AboutController', AboutController

AboutController = ->
  console.log 'running AboutController'
