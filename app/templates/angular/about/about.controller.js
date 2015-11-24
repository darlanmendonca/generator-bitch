/* globals angular */
'use strict';

angular
  .module('<%= slugify(appname) %>')
  .controller('AboutController', AboutController);

function AboutController () {
  this.viewName = 'About';
}
