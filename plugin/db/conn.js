const { Sequelize } = require('Sequelize')
require('sequelize-hierarchy')(Sequelize);


const { db } = require('../../config')

const conn = new Sequelize(db.name, db.user.name, db.user.password, {
    host: 'localhost',
    dialect: "postgres",
    port: db.port,
    logging: !!parseInt(process.env.logging||0),
})

module.exports = conn




