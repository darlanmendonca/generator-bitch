'use strict';

angular
  .module('<%= applicationSlug %>')
  .controller('AboutController', AboutController);

function AboutController () {
  this.viewName = 'About';
}
