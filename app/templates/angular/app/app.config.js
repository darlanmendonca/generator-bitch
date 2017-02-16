angular
  .module('<%= applicationSlug %>')
  .config(AppConfig)

<% if (angularRoute === 'uiRouter') { %>function AppConfig($locationProvider, $urlRouterProvider) {
  $locationProvider.html5Mode(true)
  $urlRouterProvider.otherwise('/')
}<% } %><% if (angularRoute === 'ngRoute') { %>function AppConfig($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true)
  $routeProvider.otherwise('/404')
}<% } %>
