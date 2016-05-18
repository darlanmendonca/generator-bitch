'use strict';

let angular = require('angular');

angular
  .module('<%= slugify(appName) %>')
  .controller('AboutController', AboutController);

function AboutController () {
  this.viewName = 'About';
}
