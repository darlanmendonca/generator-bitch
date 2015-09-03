'use strict';

angular
  .module('<%= slugify(appname) %>')
  .controller('AboutController', AboutController);

function AboutController () {
  console.log('running AboutController');
}
