angular.module('mvpApp.pages', [])
  .controller('PageController', function ($scope) {
    // When user adds a new link, put it in the collection
    $scope.data = {};
    $scope.data.interactions = [
      {
        title: 'title1',
        description: 'description2',
        targetSelector: '.target'
      }
    ];
   
  });
