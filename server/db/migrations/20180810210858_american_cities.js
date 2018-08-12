
exports.up = function(knex, Promise) {
  return knex.schema.createTable('american_cities', function(t) {
        t.increments()
        t.string("USPS");
        t.integer("GEOID");
        t.string("ANSICODE");
        t.string("NAME")
        t.string("PLACE_TYPE");
        t.string("LSAD")
        t.string("FUNCSTAT")
        t.integer("ALAND")
        t.integer("AWATER")
        t.integer("ALAND_SQMI")
        t.integer("AWATER_SQMI")
        t.integer("INTPTLAT")
        t.integer("INTPTLONG")
    });
};
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('american_cities');
};
