const { DataTypes } = require('sequelize')
const sequelize = require('../conn')

const CategoryFilter = sequelize.define("categoryFilter", {

    filterId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
},
    {
        sequelize,
        modelName: 'category',

    }
);

module.exports = CategoryFilter


