
exports.up = function(knex, Promise) {
    return knex.schema.createTable('articles', table=>{
        table.increments('id').primary();
        table.string('name').notNull();
        table.string('description', 1000).notNull();
                    //(nome, e numero de caracteres)
        table.string('imageUrl', 1000);
        table.binary('content').notNull();
            //para armazenar o conteúdo em binario 'BLOB'
        table.integer('userId').references('id').inTable('users').notNull();
        table.integer('categoryId').references('id').inTable('categories').notNull();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('articles');
};
