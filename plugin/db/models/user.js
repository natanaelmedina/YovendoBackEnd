const { Sequelize, DataTypes, Model } = require('sequelize')
const sequelize = require('../conn')



const User = sequelize.define("User",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrementIdentity: true,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    },
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
        allowNull: false,
        unique: true
    },
    userType: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    birthDay: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: "1800-01-01"
    },
    cedulaRnc: {
        type: DataTypes.STRING(11),
        allowNull: true
    },
    address: {
        type: DataTypes.STRING(200),
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING(15),
        allowNull: true,
        unique: true
    },
    ws: {
        type: DataTypes.STRING(15),
        allowNull: true,
        unique: true
    },

    profileImage: {
        type: DataTypes.STRING,
        allowNull: true
    },

    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    publicationsQty: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    cityId: {
        type: DataTypes.INTEGER,
        allowNull: true
    }

}, {
    //Other model options go here
    // sequelize: conn, //We need to pass the connection instance
    modelName: 'User' //We need to choose the model name
});



module.exports = User

