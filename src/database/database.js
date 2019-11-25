//importando o sequelize
const Sequelize = require('sequelize');

//informo qual ambiente estou usando
const environment = process.env.NODE_ENV || 'development'

//importo o modulo de configuração
const config = require('../config/config.js')[environment];

//crio um construtor do sequelize
const sequelize = new Sequelize(
    config.database.name,
    config.database.user,
    config.database.password,
    {
        host: config.database.host,
        dialect: config.database.dialect
    }
);

module.exports = sequelize;