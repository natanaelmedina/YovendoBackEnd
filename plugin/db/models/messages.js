const { DataTypes, Model } = require('sequelize');
const sequelize = require('../conn')

const Messages =sequelize.define("messages",{
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    chatId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    publicationId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fromUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    toUserId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }

}, {
    // Other model options go here
  //  sequelize, // We need to pass the connection instance
    modelName: 'messages' // We need to choose the model name
});

module.exports = Messages

