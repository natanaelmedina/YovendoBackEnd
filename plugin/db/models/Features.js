const { DataTypes } = require('sequelize')
const sequelize = require('../conn')

//filter
const filters = [
    {
        name: "Tipo",
        values: ["Convertible", "Coupe", "Furgoneta", "Hatchback", "Jeepeta", "Minivan", "Sedán (4 puertas)"],
        multiple: true,
        dataType: 1,
    },
    {
        name: "Kilometraje",
        values: null,
        multiple: false,
        dataType: 2,
    },
    {
        name: "Combustible",
        values: ["Diesel", "Eléctrico", "Gas", "Gasolina", "Híbrido"],
        multiple: true,
        dataType: 1,
    },
    {
        name: "Transmisión",
        values: ["Automática", "Manual", "Tiptronic"],
        multiple: true,
        dataType: 1,
    },
    {
        name: "Tracción",
        values: ["2WD", "4WD"],
        multiple: true,
        dataType: 1,
    },

    {
        name: "Color",
        values: ["Amarillo", "Azul", "Blanco", "Crema", "Dorado", "Gris", "Marrón", "Morado", "Naranja", "Negro", "Otro", "Rojo", "Verde"],
        dataType: 1,
    },


]

const Features = sequelize.define("features", {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    values: {
        type: DataTypes.JSONB,
        allowNull: true
    },
    multiple: {
        type:DataTypes.BOOLEAN,
    },
    dataType: {
        type:DataTypes.INTEGER,
    }
},
    {   freezeTableName:true,
        sequelize,
        modelName: 'features',
        hooks:{
            async afterSync(opts) {
                const models = require('./index')
                Features.belongsToMany(models.Category, { through: models.CategoryFeatures,as: 'features' })
                opts.force && await Features.bulkCreate(filters)
            }
        }
    }
);

module.exports = Features
        




