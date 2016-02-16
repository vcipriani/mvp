var angular = require('angular');

//Angular moduels attach to the global angular variable
require('./services/services');
require('./controllers/pageController');
require('angular-route');

angular.module('mvpApp', ['ngRoute', 'mvpApp.pages'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/managePage', {
        templateUrl: 'templates/managePage.html',
        controller: 'PageController'
      })
      .otherwise({
        redirectTo: '/managePage'
      });
  });