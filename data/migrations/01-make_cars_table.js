exports.up = function (knex) {
  return knex.schema.createTable("cars", (table) => {
      table.increments();
      table.integer("VIN", 64).notNullable().unique();
      table.text("make", 128).notNullable();
      table.text("model").notNullable();
      table.integer("mileage").notNullable();
      table.text("title");
      table.text("transmission");
  });
};

exports.down = function (knex) {
  knex.schema.dropTableIfExists("cars");
};
