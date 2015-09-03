'use strict';

angular
  .module('<%= slugify(appname) %>')
  .controller('HomeController', HomeController);

function HomeController () {
  console.log('running HomeController');
}
