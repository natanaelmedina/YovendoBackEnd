const { DataTypes } = require('sequelize')
const sequelize = require('../conn');
const { orderBy } = require('lodash');



//categorías
const categories = [

    {
        name: "Vehículos & Accesorios",
        iconUrl: "category/icon/car.svg",
        chillaren: [
            { name: "Carros" },
            { name: "Jeepetas y Camionetas" },
            { name: "Motores y Pasolas" },
            { name: "Accesorios para vehículos" },
            { name: "Botes" },
            { name: "Vehículos recreativos" },
            { name: "Camiones y Vehículos pesados" },
            { name: "Otros vehículos" },
        ]
    },
    {
        name: "Teléfonos celulares & Accesorios",
        iconUrl: "category/icon/phone.svg",
        chillaren: [
            { name: "Celulares" },
            { name: "Accesorios para celulares" }
        ]
    },
    {
        name: "Bines raíces",
        iconUrl: "category/icon/realEstate.svg",
        chillaren: [
            { name: "Casas" },
            { name: "Apartamentos" },
            { name: "Solares" },
            { name: "Mejoras" },
            { name: "Fincas" }
        ]
    },
    {
        name: "Alimentos & bebidas",
        iconUrl: "category/icon/food.svg"
    },
    {
        name: "Medicamentos",
        iconUrl: "category/icon/health.svg"
    },
    {
        name: "Ropas, zapatos & Accesorios",
        iconUrl: "category/icon/clothing.svg"
    },
    {
        name: "Consolas & Video juegos",
        iconUrl: "category/icon/games.svg"
    },
    {
        name: "Música & Equipos",
        iconUrl: "category/icon/music.svg"
    },
    {
        name: "Deporte & Entretenimiento",
        iconUrl: "category/icon/fitness.svg"
    },
    {
        name: "Utensilios del hogar",
        iconUrl: "category/icon/stove.svg"
    },
    {
        name: "Bebes",
        iconUrl: "category/icon/baby.svg"
    },
    {
        name: "Libro & Audio libros",
        iconUrl: "category/icon/books.svg"
    },
    {
        name: "Arte",
        iconUrl: "category/icon/art.svg"
    },
    {
        name: "Monedas & Crypto monedas",
        iconUrl: "category/icon/bitcoin.svg"
    },
    {
        name: "Trabajos y servicios",
        iconUrl: "category/icon/job.svg"
    },
    {
        name: "Electronica reparación & Repuestos",
        iconUrl: "category/icon/electronic.svg"
    },
]

const Category = sequelize.define("category", {

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
        unique: true
    },
    iconUrl: {
        type: DataTypes.STRING,
    },
    parentId: {
        type: DataTypes.INTEGER,
        hierarchy: true

    },
},
    {   
        freezeTableName:true,
        sequelize,
        modelName: 'category',
        hooks: {
            async afterSync(opts) {

                const models = require('./index')
                Category.belongsToMany(models.Features, { through: models.CategoryFeatures, as: 'features' })
                opts.force && setTimeout(async () => {
                    await (async function i(parentId, categories) {

                        for (const { name, chillaren, iconUrl } of categories) {
                            const create = await Category.create({ name, parentId, iconUrl })
                            if (chillaren)
                                await i(create.dataValues.id, chillaren)
                        }
                    })(null, categories)
                }, 0);
            }

        }

    }
);

module.exports = Category


