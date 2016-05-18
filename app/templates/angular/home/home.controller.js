'use strict';

let angular = require('angular');

angular
  .module('<%= slugify(appName) %>')
  .controller('HomeController', HomeController);

function HomeController () {
  this.viewName = 'Home';
}
