/* globals angular */
'use strict';

angular
  .module('<%= slugify(appName) %>')
  .controller('HomeController', HomeController);

function HomeController () {
  this.viewName = 'Home';
}
