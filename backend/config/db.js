const config = require('../knexfile.js');
const knex = require('knex')(config);

//para rodar a migrate direto por aqui assim que startar a aplicação PERIGOSO
knex.migrate.latest([config]);

module.exports = knex;