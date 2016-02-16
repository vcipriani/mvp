var express = require('express');
var router = express.Router();
var Promise = require('bluebird');

var db = require('../database');

// // middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//   console.log('Time: ', Date.now());
//   next();
// });

//A sample endpoint which would contain the logic required to render the content specified by the customer
router.get('/demo', function(req, res) {
  res.send('var div = document.createElement(\'div\'); ' +
                      'var text = document.createTextNode(\'Hello World\'); ' +
                      'div.appendChild(text); ' +
                      'document.body.appendChild(div);');
});

//Main route that delivers the dynamic content
router.get ('/:id', function(req, res) {
  var pageId = req.params.id;
  //Look up the interactions for a given page
  db.knex.raw ('select pi.interaction_id, i.interaction_type_id ' +
    'from pages p ' +
    'inner join rel_page_interaction pi on p.id=pi.page_id ' +
    'inner join interactions i on i.id=pi.interaction_id ' +
    'where p.id = ' + pageId +';')
  .then (function(interactions) {
    
    if (interactions[0].length>0) {
      //Iterate through all iteractions defined for a page
      var allJavascript = interactions[0].map( function(interaction){
        return interactionProcessor(interaction.interation_id, interaction.interaction_type_id);
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
var interactionProcessor = function (interactionId, interactionTypeId) {
  //A/B Test Handling
  if (interactionTypeId === 1) {
    //Randomly choose A or B
    
    //Pull HTML content for iteration
    
    //Generate JS that appends HTML to the target selector
  }
  
  //Default case - ie. we can't figure out how to process the interaction
  return 'console.log(\'Unknown interaction_type_id=' + interactionTypeId + '\');';
};


module.exports = router;