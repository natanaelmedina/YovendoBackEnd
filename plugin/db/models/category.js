const { DataTypes } = require('sequelize')
const sequelize = require('../conn')

const Category = sequelize.define("category", {

    id: {
        type: DataTypes.INTEGER,
        autoIncrementIdentity: true,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    iconUrl: {
        type: DataTypes.STRING,
    },
    parentId: {
        type: DataTypes.INTEGER,
        hierarchy: true

    },
},
    {
        sequelize,
        modelName: 'category',

    }
);

module.exports = Category


