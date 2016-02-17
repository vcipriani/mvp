var db = require('../database');
var Promise = require('bluebird');

var Interaction = {};

//Return a promise which resolves to an array of AB iterations for a given interaction
Interaction._getABIterations = function() {
  return db.knex.raw(`select interaction_id
            iteration_id,
            iteration_description,
            html_content,
            hits
            from ab_testing_iterations`)
  .then(function(result) {
    //Return array of JSON objects defined by above SQL
    return result[0];
  });
};

Interaction.getActiveInteractions = function() {
  return db.knex.raw(`select pi.id, 
                     interaction_id,
                     title,
                     description,
                     target_selector
                     from interactions i
                     inner join rel_page_interaction pi on pi.interaction_id=i.id`)
    .then(function(result) {
      return result[0];
    });  
};

Interaction.getAllInteractions = function() {
  var sql = `select id,
              title,
              description,
              html_content_a,
              views_a,
              hits_a,
              desc_a,
              html_content_b,
              views_b,
              hits_b,
              desc_b
              from interactions i
              left join (select interaction_id, html_content as html_content_a, 
                        views as views_a, hits as hits_a, iteration_description as desc_a
                        from ab_testing_iterations
                        where iteration_id=0) a on a.interaction_id=i.id
              left join (select interaction_id, html_content as html_content_b,
                        views as views_b, hits as hits_b, iteration_description as desc_b
                        from ab_testing_iterations
                        where iteration_id=1) b on b.interaction_id=i.id`;
  return db.knex.raw(sql)
    .then(function(result) {
      return result[0];
    });
};

// Interaction.getAllABInteractions = function() {
//   var allInteractions = Interaction.getAllInteractions();
//   var allABIteractions = Interaction._getABIterations();
  
//   return Promise.all([allInteractions, allABIteractions])
//     .then(function(results) {
//       var interactions = results[0];
//       var abTests = results[1];
      
//       interactions.forEach(function(interaction) {
//         interaction.
//       });
//     });
// };


Interaction.addInteractionToPage = function(pageId, interactionId, targetSelector) {
  var sql = `insert into rel_page_interaction (page_id, interaction_id, target_selector)
                       values (${pageId}, ${interactionId}, '${targetSelector}');`;
  return db.knex.raw(sql)
          .then(function(result){
            return result;
          });
};

Interaction.removeInteractionFromPage = function(instanceId) {
  var sql = `delete from rel_page_interaction where id=${instanceId};`;
  
  return db.knex.raw(sql);
};

module.exports = Interaction;