const { DataTypes } = require('sequelize')
const sequelize = require('../conn')

const Filter = sequelize.define("filter", {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    values: {
        type: DataTypes.JSONB,
        allowNull: true
    },
    multiple: {
        type:DataTypes.BOOLEAN,
    },
    dataType: {
        type:DataTypes.INTEGER,
    }
},
    {
        sequelize,
        modelName: 'filter'
    }
);

module.exports = Filter


