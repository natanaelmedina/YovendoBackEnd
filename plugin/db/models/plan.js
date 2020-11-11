const { Sequelize, DataTypes, Model } = require('sequelize')

class plan extends Model { }

module.exports = (conn = new Sequelize()) => {
    
    plan.init({
        planId:{
            type: DataTypes.INTEGER,
            autoIncrementIdentity:true,
            primaryKey:true,
            unique:true,
            autoIncrement:true,
        
        },
        // Model attributes are defined here
        planDesc: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        planInfo: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        qtyDay: {
            type: DataTypes.integer
            // allowNull defaults to true
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    }, {
        // Other model options go here
        sequelize: conn, // We need to pass the connection instance
        modelName: 'plan' // We need to choose the model name
    });

    return plan

    
    
}

