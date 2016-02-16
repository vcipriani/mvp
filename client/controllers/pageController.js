angular.module('mvpApp.pages', ['mvpApp.services'])
  .controller('PageController', function ($scope, Interactions, Pages) {
    // When user adds a new link, put it in the collection
    $scope.data = {};
    
    updateActiveInteractions();
    $scope.data.page = Pages.getPageInfo();
    $scope.data.availableInteractions =  Interactions.getAllInteractions();
    
    $scope.addInteraction = function(interactionId, targetSelector) {
      Interactions.addInteractionToPage($scope.data.page.id, interactionId, targetSelector)
        .then(updateActiveInteractions);
    };
    
    $scope.removeInteraction = function(interactionInstanceId) {
      Interactions.removeInteractionFromPage(interactionInstanceId)
        .then(updateActiveInteractions);
    };
    
    function updateActiveInteractions() {
      Interactions.getActiveInteractions()
      .then(function(res){
        $scope.data.interactions = res.data;
      });
    }
  });
