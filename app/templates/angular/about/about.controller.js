'use strict';

angular
  .module('<%= slugify(appName) %>')
  .controller('AboutController', AboutController);

function AboutController () {
  this.viewName = 'About';
}
