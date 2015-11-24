'use strict';
/* globals angular */

angular
  .module('<%= slugify(appname) %>')
  .controller('HomeController', HomeController);

function HomeController () {
  this.viewName = 'Home';
}
