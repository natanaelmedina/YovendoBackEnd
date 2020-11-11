const { Sequelize, DataTypes, Model } = require('sequelize')

class User extends Model { }

module.exports = (conn = new Sequelize()) => {
    
    User.init({
        id:{
            type: DataTypes.INTEGER,
            autoIncrementIdentity:true,
            primaryKey:true,
            unique:true,
            autoIncrement:true,
        
        },
        // Model attributes are defined here
        firstName: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING(50)
            // allowNull defaults to true
        },
        userName: {
            type: DataTypes.STRING(30),
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
            allowNull: false
        },
        birthDay: {
            type: DataTypes.DATE
        },
        businessName: {
            type: DataTypes.STRING(50)
            // allowNull defaults to true
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

        pictureUrl: {
            type: DataTypes.STRING
        }, 

        userStatus: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        publicationsQty: {
            type: DataTypes.INTEGER
        }
    }, {
        // Other model options go here
        sequelize: conn, // We need to pass the connection instance
        modelName: 'User' // We need to choose the model name
    });

    return User

    
}

