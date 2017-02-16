angular
  .module('<%= applicationSlug %>')
  .config(AboutConfig)

<% if (angularRoute === 'uiRouter') { %>function AboutConfig($stateProvider) {
  $stateProvider.state('about', {
    url: '/about',
    templateUrl: 'templates/about.template.html',
    controller: 'AboutController',
    controllerAs: 'aboutController',
  })
}<% } %><% if (angularRoute === 'ngRoute') { %>function AboutConfig($routeProvider) {
  $routeProvider.when('/about', {
    templateUrl: 'templates/about.template.html',
    controller: 'AboutController',
    controllerAs: 'aboutController',
  })
}<% } %>
