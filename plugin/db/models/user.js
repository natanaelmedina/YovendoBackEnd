const { Sequelize, DataTypes, Model } = require('sequelize')

class User extends Model { }

module.exports = (conn = new Sequelize()) => {
    
    User.init({
        userId:{
            type: DataTypes.INTEGER,
            autoIncrementIdentity:true,
            primaryKey:true,
            unique:true,
            autoIncrement:true,
        },
        // Model attributes are defined here
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        userType: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue:1
        },
        birthDay: {
            type: DataTypes.DATE
        },
        cedulaRnc: {
            type: DataTypes.STRING(11)
        },
        address: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        phone:{
            type: DataTypes.STRING(10),
            allowNull: false
        },
        ws:         {
            type: DataTypes.STRING(10),
            allowNull: false
        },

        proflieImg: {
            type: DataTypes.STRING
        }, 

        status: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        publicationsQty: {
            type: DataTypes.INTEGER
        },
        cityId: {
            type: DataTypes.INTEGER
        }

    }, {
        // Other model options go here
        sequelize: conn, // We need to pass the connection instance
        modelName: 'User' // We need to choose the model name
    });

    return User

    
}

