
exports.up = function(knex) {
     return knex.schema.createTable('cars', tbl => {
          //a primary key, called id, integer, autoincrements
          tbl.increments();
          tbl.integer('VIN').notNullable().unique();
          tbl.integer('year').notNullable();
          tbl.string('make').notNullable();
          tbl.string('model').notNullable();
          tbl.integer('mileage').notNullable();
          tbl.boolean('automatic_transmission');
          tbl.string('title_status');
     })
   };
   
   exports.down = function(knex) {
     return knex.schema.dropTableIfExists('cars')
   };
   