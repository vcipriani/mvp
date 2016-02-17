var angular = require('angular');

//Angular moduels attach to the global angular variable
require('./services/services');
require('./controllers/pageController');
require('./controllers/interactionController');
require('angular-route');

angular.module('mvpApp', ['ngRoute', 'mvpApp.pages', 'mvpApp.interaction'])
  .filter('sanitize',['$sce', function($sce) { return $sce.trustAsHtml; }])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/managePage', {
        templateUrl: 'templates/managePage.html',
        controller: 'PageController'
      })
      .when('/reporting', {
        templateUrl: 'templates/reporting.html',
        controller: 'PageController'
      })
      .when('/addInteraction', {
        templateUrl: 'templates/addInteraction.html',
        controller: 'InteractionController'
      })
      .otherwise({
        redirectTo: '/managePage'
      });
  });
 
