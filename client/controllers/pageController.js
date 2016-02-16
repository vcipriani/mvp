angular.module('mvpApp.pages', ['mvpApp.services'])
  .controller('PageController', function ($scope, Interactions) {
    // When user adds a new link, put it in the collection
    $scope.data = {};
    $scope.data.interactions = Interactions.getActiveInteractions();
    $scope.data.availableInteractions =  Interactions.getAllInteractions();
   
  });
