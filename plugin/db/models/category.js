const { Sequelize, DataTypes, Model } = require('sequelize')

class category extends Model { }

module.exports = (conn = new Sequelize()) => {
    
    category.init({
        categoryId:{
            type: DataTypes.INTEGER,
            autoIncrementIdentity:true,
            primaryKey:true,
            unique:true,
            autoIncrement:true,
        
        },
        parentId:{
            type: DataTypes.INTEGER
        },
        // Model attributes are defined here
        categoryDesc: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
        }, {
        // Other model options go here
        sequelize: conn, // We need to pass the connection instance
        modelName: 'category' // We need to choose the model name
    });

    return category

    
}

