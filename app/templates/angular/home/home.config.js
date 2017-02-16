angular
  .module('<%= applicationSlug %>')
  .config(HomeConfig)

<% if (angularRoute === 'uiRouter') { %>function HomeConfig($stateProvider) {
  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'templates/home.template.html',
    controller: 'HomeController',
    controllerAs: 'homeController',
  })
}<% } %><% if (angularRoute === 'ngRoute') { %>function HomeConfig($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'templates/home.template.html',
    controller: 'HomeController',
    controllerAs: 'homeController',
  })
}<% } %>
