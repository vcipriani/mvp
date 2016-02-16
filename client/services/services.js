angular.module('mvpApp.services', [])

.factory('Interactions', function ($http) {
  var getActiveInteractions = function() {
    return [
      {
        title: 'title1',
        description: 'description2',
        targetSelector: '.target'
      }
    ];
  };

  var getAllInteractions = function() {
    return [
      {
        title: 'title1',
        description: 'description2',
        iterations: [
          {iterationDescription: 'Good offer',
          htmlContent: '<h1>Good News!</h1>'
          },
          {iterationDescription: 'Bad offer',
          htmlContent: '<h1>Bad News!</h1>'
          }
        ]
      }
    ];
  };


  return {
    getActiveInteractions: getActiveInteractions,
    getAllInteractions: getAllInteractions
  };
})