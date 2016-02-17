angular.module('mvpApp.services', [])

.factory('Interactions', function ($http) {
  var getActiveInteractions = function() {
    return $http({
      method: 'GET',
      url: '/api/interactions/active'
    });
  };

  var getAllInteractions = function() {
    return $http({
      method: 'GET',
      url: '/api/interactions'
    });
  };

  var addInteractionToPage = function(pageId, interactionId, targetSelector) {
    return $http({
      method: 'POST',
      url: '/api/interactions/active',
      data: {pageId: pageId,
        interactionId: interactionId,
        targetSelector: targetSelector 
      }
    });
  };
  
  var removeInteractionFromPage = function(interactionInstanceId) {
    return $http({
      method: 'DELETE',
      url: '/api/interactions/active/' + interactionInstanceId
    });
  };
  
  var createInteraction = function(obj){
    return $http({
      method: 'POST',
      url: '/api/interactions',
      data: obj
    });
  };
  
  return {
    getActiveInteractions: getActiveInteractions,
    getAllInteractions: getAllInteractions,
    addInteractionToPage: addInteractionToPage,
    removeInteractionFromPage: removeInteractionFromPage,
    createInteraction: createInteraction
  };
})
.factory('Pages', function($http){
  var getPageInfo = function(pageId) {
    return $http({
      method: 'GET',
      url: '/api/pages/' + pageId 
    });
  };
  
  return {getPageInfo: getPageInfo};
});