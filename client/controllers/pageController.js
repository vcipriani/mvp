angular.module('mvpApp.pages', ['mvpApp.services'])
  .controller('PageController', function ($scope, Interactions, Pages) {
    // When user adds a new link, put it in the collection
    $scope.data = {};
    Interactions.getActiveInteractions()
      .then(function(res){
        $scope.data.interactions = res.data;
      });
    $scope.data.availableInteractions =  Interactions.getAllInteractions();
   
    $scope.data.page = Pages.getPageInfo();
  });
