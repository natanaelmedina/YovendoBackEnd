const { DataTypes } = require('sequelize')
const sequelize = require('../conn')

const categoryFeatures = [
    { filterId: 1, categoryId: 2 },
    { filterId: 1, categoryId: 3 },
    { filterId: 1, categoryId: 4 },
    { filterId: 1, categoryId: 5 },
    { filterId: 1, categoryId: 6 },
    { filterId: 1, categoryId: 7 },
    { filterId: 1, categoryId: 8 },
    { filterId: 1, categoryId: 9 },

    { filterId: 2, categoryId: 2 },
    { filterId: 2, categoryId: 3 },
    { filterId: 2, categoryId: 4 },
    { filterId: 2, categoryId: 5 },
    { filterId: 2, categoryId: 6 },
    { filterId: 2, categoryId: 7 },
    { filterId: 2, categoryId: 8 },
    { filterId: 2, categoryId: 9 },

]

const CategoryFeatures = sequelize.define("categoryFeature", {

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
    {   freezeTableName:true,
        sequelize,
        modelName: 'categoryFeature',
        hooks:{
            async afterSync(opts) {
                setTimeout(() => {
                    opts.force && CategoryFeatures.bulkCreate(categoryFeatures)
                }, 1000);

            }
        }

    }
);

module.exports = CategoryFeatures



