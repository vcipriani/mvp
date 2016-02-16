var db = require('../database');

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
  return db.knex.raw(`select interaction_id,
                     title,
                     description,
                     target_selector
                     from interactions i
                     inner join rel_page_interaction pi on pi.interaction_id=i.id`)
    .then(function(result) {
      return result[0];
    });  
};

Interaction.getAllABInteractions = function() {
  
};

module.exports = Interaction;