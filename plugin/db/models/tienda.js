const { DataTypes, Model } = require('sequelize');
const sequelize = require('../conn')

const Tienda =sequelize.define("tienda",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrementIdentity: true,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    eslogan: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    webPage: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 1
    },
    socialNetwork: {
        type: DataTypes.ARRAY,
        allowNull: false,
        defaultValue: 1
    },
    policy: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bannerDir: {
        type: DataTypes.STRING,
        allowNull: false
    },
    about: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    // Other model options go here
  //  sequelize, // We need to pass the connection instance
    modelName: 'tienda' // We need to choose the model name
});

module.exports = Tienda

