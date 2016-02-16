var express = require('express');
var router = express.Router();
var Promise = require('bluebird');

var db = require('../database');
var traffic = require('../models/traffic');

//Main route that delivers the dynamic content
router.get ('/:id', function(req, res) {
  var pageId = req.params.id;
  //Look up the interactions for a given page
  db.knex.raw ('select pi.interaction_id, i.interaction_type_id, target_selector ' +
    'from pages p ' +
    'inner join rel_page_interaction pi on p.id=pi.page_id ' +
    'inner join interactions i on i.id=pi.interaction_id ' +
    'where p.id = ' + pageId +';')
  .then (function(interactions) {
    
    if (interactions[0].length>0) {
      //Iterate through all iteractions defined for a page
      var allJavascript = interactions[0].map( function(interaction){
        return interactionProcessor(interaction.interaction_id, interaction.interaction_type_id, 
        interaction.target_selector);
      });

      //Increase our page views.  this is async and we don't wait.
      traffic.increasePageViews(pageId)
        .then(function(result) {
          //Do nothing
        });
      
      //Wait for all interactions to be processed and return the javascript to the client
      Promise.all(allJavascript).then(function(results) {
        results = results.join('\n');
        res.send(results);
      });
    } else {
      res.send('console.log(\'Could not find the ID specified\')');
    }
  });
});

//Returns a promise which will resolve to the js code we should send to the client
var interactionProcessor = function (interactionId, interactionTypeId, targetSelector) {
  //A/B Test Handling
  if (interactionTypeId === 1) {
    //Randomly choose A or B
    var index = Math.floor(Math.random() * 2); //return 0/1;
    
    //Pull HTML content for iteration
    var sql = 'select id, html_content from ab_testing_iterations ' +
        'where interaction_id = ' + interactionId +
        ' and iteration_id = ' + index + ';';

    return db.knex.raw(sql)
        .then(function(resultSet) {
          var htmlContent = resultSet[0][0].html_content;
          var abId = resultSet[0][0].id;

          traffic.increaseABIterationViews(abId)
            .then(function(result){
              //do nothing
            });
            
          return appendAndWrap(htmlContent, abId, targetSelector);
        });
        
    //Generate JS that appends HTML to the target selector
  }
  
  //Default case - ie. we can't figure out how to process the interaction
  return 'console.log(\'Unknown interaction_type_id=' + interactionTypeId + '\');';
};

var appendAndWrap = function(htmlContent, abId, targetSelector) {
  var htmlJs = `$(\'${targetSelector}\').append(\'${htmlContent}\');`;
  
  var clickTrackingJs = `$('a').on('click', function(e) {
        $.ajax({
          type: 'POST',
          url:'http://localhost:3000/traffic/ab/hit/${abId}',
        });
      });`;
      
  return `${htmlJs}\n${clickTrackingJs}`;
};

module.exports = router;