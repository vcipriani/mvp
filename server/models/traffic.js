var db = require('../database');

var traffic = {};

traffic.increasePageViews = function(pageId) {
  sql = `update pages set views = views + 1 where id=${pageId};`;
  return db.knex.raw(sql);
};

module.exports = traffic;