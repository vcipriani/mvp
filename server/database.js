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
      interaction.string('htmlToRender',10000);
      interaction.string('targetSelector',300);
      interaction.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

bookshelf.knex.schema.hasTable('rel_page_interaction').then(function(exists) {
  if (!exists) {
    bookshelf.knex.schema.createTable('rel_page_interaction', function (rel) {
      rel.increments('id').primary();
      rel.string('title', 255);
      rel.string('description', 1000);
      rel.string('htmlToRender',10000);
      rel.string('targetSelector',300);
      rel.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

exports.bookshelf = bookshelf;
