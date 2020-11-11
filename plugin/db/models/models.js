const { Sequelize, DataTypes, Model } = require('sequelize')

class models extends Model { }

models.exports = (conn = new Sequelize()) => {
    
    models.init({
        modelsId:{
            type: DataTypes.INTEGER,
            autoIncrementIdentity:true,
            primaryKey:true,
            unique:true,
            autoIncrement:true,
        
        },
        // Model attributes are defined here
        modelsDesc: {
            type: DataTypes.STRING(50),
            allowNull: false
        },


        brandId:{
            type: DataTypes.INTEGER
        }

    }, {
        // Other model options go here
        sequelize: conn, // We need to pass the connection instance
        modelName: 'models' // We need to choose the model name
    });

    return models

    
}

