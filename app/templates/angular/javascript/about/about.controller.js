'use strict';

angular
  .module('<%= slugify(appname) %>')
  .controller('MainController', AboutController);

function AboutController () {
  console.log('running AboutController');
}
