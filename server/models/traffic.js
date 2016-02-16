var db = require('../database');

var traffic = {};

traffic.increasePageViews = function(pageId) {
  sql = `update pages set views = views + 1 where id=${pageId};`;
  return db.knex.raw(sql);
};

traffic.increaseABIterationHits = function(id) {
  sql = `update ab_testing_iterations set hits = hits + 1 where id=${id};`;
  return db.knex.raw(sql);
};

traffic.increaseABIterationViews = function(id) {
  sql = `update ab_testing_iterations set views = views + 1 where id=${id};`;
  return db.knex.raw(sql);
};

module.exports = traffic;