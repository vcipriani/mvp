angular.module('mvpApp.interaction', ['mvpApp.services'])
  .controller('InteractionController', function ($scope, Interactions, Pages) {

    $scope.data = {};
    $scope.title = 'Example AB Test';
    $scope.description = 'Test giving away free puppies and free sandwiches';
    $scope.descA = 'Offer free puppy';
    $scope.htmlA = '<h1><a href="./nextPage.html">Click for free puppy!!!</a></h1>';
    $scope.descB = 'Offer free sandwich';
    $scope.htmlB = '<h1><a href="./nextPage.html">Click for free sandwich!!!</a></h1>';
    
    $scope.createInteraction = function() {
      var obj = {
        title: $scope.title,
        description: $scope.description,
        descA: $scope.descA,
        htmlA: $scope.htmlA,
        descB: $scope.descB,
        htmlB: $scope.htmlB
      };
      console.log(obj);
    };
  });