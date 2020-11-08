
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('users', table=>{
        //time stamp é um formato hora para a coluna
        table.timestamp('deletedAt');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('users', table=>{
        table.dropColumn('deletedAt');
    })
};
