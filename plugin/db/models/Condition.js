const { DataTypes } = require('sequelize');
const sequelize = require('../conn')
//condition
const condition = [
    { name: "Nuevo" },
    { name: "Usado" },
    { name: "Para partes" },
]

const Condition = sequelize.define("condition", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

}, {
    freezeTableName:true,
    sequelize,
    modelName: 'condition',
    hooks: {
        async afterSync(opts) {
            //const models = require('./index')
            opts.force && await Condition.bulkCreate(condition)
        }
    }
});

module.exports = Condition

