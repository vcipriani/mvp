var secrets = require('../secrets');
var config = require('../config');

var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : 'localhost',
    user     : config.sqlUser,
    password : secrets.mysqlPassword,
    database : config.databaseName,
    charset  : 'utf8'
  }
});

var bookshelf = require('bookshelf')(knex);

bookshelf.knex.schema.hasTable('pages').then(function(exists) {
  if (!exists) {
    bookshelf.knex.schema.createTable('pages', function (page) {
      page.increments('id').primary();
      page.string('title', 255);
      page.integer('customer');
      page.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

bookshelf.knex.schema.hasTable('interactions').then(function(exists) {
  if (!exists) {
    bookshelf.knex.schema.createTable('interactions', function (interaction) {
      interaction.increments('id').primary();
      interaction.string('title', 255);
      interaction.string('description', 1000);
      interaction.integer('interaction_type_id');
      interaction.integer('visits');
      interaction.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

bookshelf.knex.schema.hasTable('interaction_types').then(function(exists) {
  if (!exists) {
    bookshelf.knex.schema.createTable('interaction_types', function (interaction_type) {
      interaction_type.increments('id').primary();
      interaction_type.string('type', 255);
      interaction_type.string('description', 1000);
      interaction_type.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

bookshelf.knex.schema.hasTable('rel_page_interaction').then(function(exists) {
  if (!exists) {
    bookshelf.knex.schema.createTable('rel_page_interaction', function (rel) {
      rel.increments('id').primary();
      rel.integer('interaction_id');
      rel.integer('page_id');
      rel.string('targetSelector',300);
      rel.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

bookshelf.knex.schema.hasTable('ab_testing_iterations').then(function(exists) {
  if (!exists) {
    bookshelf.knex.schema.createTable('ab_testing_iterations', function (ab) {
      ab.increments('id').primary();
      ab.integer('interaction_id');
      ab.integer('iteration_id');
      ab.string('iteration_description',300);
      ab.string('htmlContent', 10000);
      ab.integer('hits');
      ab.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

module.exports = bookshelf;
