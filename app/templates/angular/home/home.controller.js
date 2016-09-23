angular
  .module('<%= applicationSlug %>')
  .controller('HomeController', HomeController);

function HomeController () {
  this.viewName = 'Home';
}
