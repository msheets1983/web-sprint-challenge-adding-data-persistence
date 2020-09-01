exports.up = function (knex) {
  return knex.schema
    .createTable("projects", (table) => {
      table.increments().unique();
      table.string("project", 128).notNullable();
      table.string("description");
      table.boolean("completed").notNullable().defaultTo(false);
    })

    .createTable("resources", (table) => {
      table.increments().unique();
      table.string("resource").notNullable().unique();
      table.string("description");
    })

    .createTable("tasks", (table) => {
      table.increments().unique();
      table.string("task").notNullable();
      table.string("notes");
      table.boolean("completed").notNullable().defaultTo(false);
    })

    .createTable("project_tasks", (table) => {
      table.increments();
      table
        .integer("projects_id")
        .unsigned()
        .notNull()
        .references("id")
        .inTable("projects")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
      table
        .integer("tasks_id")
        .unsigned()
        .notNull()
        .references("id")
        .inTable("tasks")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
    })

    .createTable("project_resources", (table) => {
      table.increments();
      table
        .integer("projects_id")
        .unsigned()
        .notNull()
        .references("id")
        .inTable("projects")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
      table
        .integer("resources_id")
        .unsigned()
        .notNull()
        .references("id")
        .inTable("resources")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("project_resources")
    .dropTableIfExists("project_tasks")
    .dropTableIfExists("tasks")
    .dropTableIfExists("resources")
    .dropTableIfExists("projects");
};
