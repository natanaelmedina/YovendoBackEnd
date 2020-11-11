const { Sequelize, DataTypes, Model } = require('sequelize')

class publication extends Model { }

module.exports = (conn = new Sequelize()) => {
    
    publication.init({
        id:{
            type: DataTypes.INTEGER,
            autoIncrementIdentity:true,
            primaryKey:true,
            unique:true,
            autoIncrement:true,
        
        },
        // Model attributes are defined here
        tittle: {
            type: DataTypes.STRING(300),
            allowNull: false
        },
        desc: {
            type: DataTypes.STRING(1500)
            // allowNull defaults to true
        },
        imgDir: {
            type: DataTypes.ARRAY,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING(1),
            allowNull: false
        },  
        category: {
            type: DataTypes.ARRAY,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        condition: {
            type: DataTypes.string(1),
            allowNull: false
        },
        filters: {
            type: DataTypes.ARRAY,
            allowNull: false
        }
    }, {
        // Other model options go here
        sequelize: conn, // We need to pass the connection instance
        modelName: 'publication' // We need to choose the model name
    });

    return publication

    
}

