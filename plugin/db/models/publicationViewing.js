const { DataTypes } = require('sequelize');
const sequelize = require('../conn')

const publicationViewing = sequelize.define("publicationViewing", {
    publicationId: {
        primaryKey: true,
        type: DataTypes.UUID,
    },
    ipAddress: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
}, {
    freezeTableName:true,
    sequelize,
    modelName: 'publicationViewing'
});

module.exports = publicationViewing

