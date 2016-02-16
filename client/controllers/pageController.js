angular.module('mvpApp.pages', ['mvpApp.services'])
  .controller('PageController', function ($scope, Interactions, Pages) {
    // When user adds a new link, put it in the collection
    var forcedPageId = 1;
    
    $scope.data = {};
    
    updateActiveInteractions();
    Pages.getPageInfo(forcedPageId)
      .then(function(results) {
        $scope.data.page = results.data;
      });
      
    $scope.showTarget = false;
    
    Interactions.getAllInteractions()
      .then(function(results) {
        $scope.data.availableInteractions =  results.data;
      });
    
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
