/* globals angular */
'use strict';

angular
  .module('<%= slugify(appname) %>')
  .controller('HomeController', HomeController);

function HomeController () {
  this.viewName = 'Home';
}
