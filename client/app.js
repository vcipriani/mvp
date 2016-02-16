var angular = require('angular');
require('./controllers/pageController');
// var ui-router = require('angular-ui-router');
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