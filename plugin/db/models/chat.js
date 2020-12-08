const { DataTypes, Model } = require('sequelize');
const sequelize = require('../conn')

const Chat = sequelize.define("chat", {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    lastResponse: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: "1800-01-01"
    },
    lastMsg: {
        type: DataTypes.STRING,
        allowNull: false
    },
    toUserId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fromUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    publicationId: {
        type: DataTypes.UUID,
        allowNull: false

    },
    seen: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }

}, {
    // Other model options go here
    //  sequelize, // We need to pass the connection instance
    modelName: 'chat' // We need to choose the model name
});

module.exports = Chat





