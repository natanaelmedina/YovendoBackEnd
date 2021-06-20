const { DataTypes } = require('sequelize')
const sequelize = require('../conn')

//genéricos
const genéricos = [
    {
        code: "color",
        name: "Color",
        values: ["Amarillo", "Azul", "Blanco", "Crema", "Dorado", "Gris", "Marrón", "Morado", "Naranja", "Negro", "Rojo", "Verde", "Otro",],
        entryType: "select",
        filterType: "checkbox",
        filterable: true,
    },
]


//filter
const vehículo = [
    {
        code: "vType",
        name: "Tipo",
        values: ["Convertible", "Coupe", "Furgoneta", "Hatchback", "Jeepeta", "Minivan", "Sedán"],
        entryType: "select",
        filterType: "checkbox",
        filterable: true,

    },
    {
        code: "vMiles",
        name: "Kilometraje",
        values: null,
        entryType: "number",
        filterType: "range",
        filterable: false,
    },
    {
        code: "vFuel",
        name: "Combustible",
        values: ["Diesel", "Eléctrico", "Gas", "Gasolina", "Híbrido"],
        entryType: "select",
        filterType: "checkbox",
        filterable: true,
    },
    {
        code: "vTransmission",
        name: "Transmisión",
        values: ["Automática", "Manual", "Tiptronic"],
        entryType: "select",
        filterType: "checkbox",
        filterable: true,
    },
    {
        code: "vTraction",
        name: "Tracción",
        values: ["2WD", "4WD"],
        entryType: "select",
        filterType: "checkbox",
        filterable: false,
    },
    {
        code: "vCC",
        name: "Motor/CC",
        values: null,
        entryType: "number",
        filterType: "range",
        filterable: false,
    },
    {
        code: "vAir",
        name: "Aire acondicionado",
        values: ["SI", "NO"],
        entryType: "select",
        filterType: "checkbox",
        filterable: true,
    },
    {
        code: "vAlarm",
        name: "Alarma",
        values: ["SI", "NO"],
        entryType: "select",
        filterType: "checkbox",
        filterable: false,
    },
    {
        code: "vRing",
        name: "Aros",
        values: ["Hierro", "Aluminio"],
        entryType: "select",
        filterType: "checkbox",
        filterable: false,
    },
    {
        code: "vMusic",
        name: "Radio/Música",
        values: ["SI", "NO"],
        entryType: "select",
        filterType: "checkbox",
        filterable: true,
    },
    {
        code: "vSeat",
        name: "Asientos",
        values: ["En piel", "Tela"],
        entryType: "select",
        filterType: "checkbox",
        filterable: true,
    },
    {
        code: "vSeat",
        name: "Faros",
        values: ["Xenon", "Led", "Halógeno"],
        entryType: "select",
        filterType: "checkbox",
        filterable: true,
    },




]

const Features = sequelize.define("features", {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    },
    code: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    values: {
        type: DataTypes.JSONB,
        allowNull: true
    },
    entryType: {
        type: DataTypes.ENUM,
        values: ["number", "select"],
        defaultValue: "select"
    },
    filterType: {
        type: DataTypes.ENUM,
        values: ["checkbox", "radio", "range"],
        defaultValue: "checkbox"
    },
    filterable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},
    {
        freezeTableName: true,
        sequelize,
        modelName: 'features',
        hooks: {
            async afterSync(opts) {
                const models = require('./index')
                Features.belongsToMany(models.Category, { through: models.CategoryFeatures, as: 'features' })
                opts.force && await Features.bulkCreate([
                    ...genéricos,
                    ...vehículo
                ])
            }
        }
    }
);

module.exports = Features





