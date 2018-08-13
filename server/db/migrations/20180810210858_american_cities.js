
exports.up = function(knex, Promise) {
  return knex.schema.createTable('american_cities', function(t) {
        t.increments();
        t.string('USPS');
        t.integer('GEOID');
        t.string('ANSICODE');
        t.string('NAME');
        t.string('PLACE_TYPE');
        t.string('LSAD');
        t.string('FUNCSTAT');
        t.bigint('ALAND');
        t.bigint('AWATER');
        t.float('ALAND_SQMI');
        t.float('AWATER_SQMI');
        t.float('INTPTLAT');
        t.float('INTPTLONG');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('american_cities');
};
