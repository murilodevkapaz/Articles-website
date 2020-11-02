const app = require('express')();
const consign = require('consign');
const db = require('./config/db');

app.db = db;
//com isso não precisso dar require('express') nas outras pastas basta module.exports=> app => app.use..
consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/validator.js')
    .then('./api') //todos os arquivos que estão dentro da pasta api
    .then('./config/routes.js')
    .into(app);

app.listen(3000, ()=>{
    console.log("Bacend working2...");
})