const { DataTypes } = require('sequelize');
const sequelize = require('../conn')

const Tienda = sequelize.define("tienda", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrementIdentity: true,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false
    },
    eslogan: {
        type: DataTypes.STRING,
    },
    category: {
        type: DataTypes.ARRAY(DataTypes.JSON),
    },
    webPage: {
        type: DataTypes.STRING,
    },
    socialNetwork: {
        type: DataTypes.JSON,
    },
    policy: {
        type: DataTypes.STRING,
    },
    bannerUrl: {
        type: DataTypes.STRING,
    },
    about: {
        type: DataTypes.STRING,
    }

}, {
    sequelize, 
    modelName: 'tienda'
});

module.exports = Tienda

