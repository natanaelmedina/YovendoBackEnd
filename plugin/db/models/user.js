const { DataTypes } = require('sequelize')
const sequelize = require('../conn')
const Bcrypt = require('bcrypt')

const user = [
    {
        name: "Natanael medina",
        password: Bcrypt.hashSync('123456', 10),
        email: "natanaelmedina@gmail.com",
        userType: 2,
    }
]

const User = sequelize.define("user", {
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
    userTypeId: {
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
    freezeTableName: true,
    modelName: 'user',
    hooks: {
        async afterSync(opts) {
            const models = require('.')
            opts.force && await User.bulkCreate(user)
            User.belongsTo(models.UserType, { foreignKey: "userTypeId" })
            User.hasOne(models.Store, { foreignKey: "userId" })
        }
    }
});



module.exports = User

