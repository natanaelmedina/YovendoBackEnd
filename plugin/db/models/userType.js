const { DataTypes } = require('sequelize')
const sequelize = require('../conn')


const userType = [
    { name: "Individual" },
    { name: "Empresas" },
    { name: "Master" }
]

const UserType = sequelize.define("userType", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrementIdentity: true,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique:true
    },

}, {
    freezeTableName: true,
    modelName: 'userType',
    hooks: {
        async afterSync(opts) {
            opts.force && await UserType.bulkCreate(userType)
        }
    }
});



module.exports = UserType

