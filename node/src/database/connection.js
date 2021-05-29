const dotenv = require('dotenv')
dotenv.config()
const env = process.env.NODE_ENV || 'production'
const config = require('../../config/config')[env]
const Sequelize = require('sequelize')
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    operatorAliases: false,
    dialectOptions: { decimalNumbers: true }
})

module.exports = sequelize
global.DB = sequelize