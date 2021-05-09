const { DataTypes } = require('sequelize');
const sequelize = require('../conn')
const uuid = require('uuid')
const moment = require('moment')


const Publication = sequelize.define("publication", {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        unique:true,
        defaultValue: uuid.v4
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // Model attributes are defined here
    title: {
        type: DataTypes.STRING(300),
        allowNull: false
    },
    desc: {
        type: DataTypes.TEXT
        // allowNull defaults to true
    },
    images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    },
    thumbnail:{
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(1),
        allowNull: false,
        defaultValue: "A"
    },
    category: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    currency: {
        type: DataTypes.STRING(4),
        allowNull: false,
        defaultValue: "DOP"
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    condition: {
        type: DataTypes.STRING(1),
        allowNull: false
    },
    filters: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: true
    },
    endDate:{
        type:DataTypes.DATEONLY,
        defaultValue:()=> moment().add(15,'days')
    }
}, {
    sequelize,
    modelName: 'publication' // We need to choose the model name
});

module.exports = Publication

