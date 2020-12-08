const { Sequelize } = require('Sequelize')
const { db } = require('../../config')

const conn = new Sequelize(db.name, db.user.name, db.user.password, {
    host: 'localhost',
    dialect: "postgres",
    port: db.port,
    logging: console.log,

})

module.exports = conn




