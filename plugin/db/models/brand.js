const { Sequelize, DataTypes, Model } = require('sequelize')

class brand extends Model { }

module.exports = (conn = new Sequelize()) => {
    
    brand.init({
        brandId:{
            type: DataTypes.INTEGER,
            autoIncrementIdentity:true,
            primaryKey:true,
            unique:true,
            autoIncrement:true,
        
        },
        // Model attributes are defined here
        branDesc: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    }, {
        // Other model options go here
        sequelize: conn, // We need to pass the connection instance
        modelName: 'brand' // We need to choose the model name
    });

    return brand

    
}

