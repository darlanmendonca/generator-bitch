'use strict';
/* globals angular */

angular
  .module('<%= slugify(appname) %>')
  .controller('AboutController', AboutController);

function AboutController () {
  this.viewName = 'About';
}
