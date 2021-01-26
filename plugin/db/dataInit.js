const sequelize = require('./conn')
const Bcrypt = require('bcrypt')
const { Category, Filter, CategoryFilter,User } = require('./models')
//categorías
const categories = [

    {
        name: "Vehículos",
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
]

//input type

const dataType = [
    'string',
    'integer',
]

//filter
const filters = [
    {
        name: "Condición",
        values: ["Nuevo", "Usado", "Para piezas(Dañado)"],
        multiple: false,
        dataType: 1,
    },
    {
        name: "Marca",
        values: ["Nuevo", "Usado", "Para piezas(Dañado)"],
        multiple: false,
        dataType: 1,
    },

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
const user = [
    {
        name:"Natanael medina",
        password:Bcrypt.hashSync('123456', 10),
        email:"natanaelmedina@gmail.com",
        userType:2,
    }
]

const categoryFilter = [
    { filterId: 1, categoryId: 2 },
    { filterId: 1, categoryId: 3 },
    { filterId: 1, categoryId: 4 },
    { filterId: 1, categoryId: 5 },
    { filterId: 1, categoryId: 6 },
    { filterId: 1, categoryId: 7 },
    { filterId: 1, categoryId: 8 },
    { filterId: 1, categoryId: 9 },

    { filterId: 2, categoryId: 2 },
    { filterId: 2, categoryId: 3 },
    { filterId: 2, categoryId: 4 },
    { filterId: 2, categoryId: 5 },
    { filterId: 2, categoryId: 6 },
    { filterId: 2, categoryId: 7 },
    { filterId: 2, categoryId: 8 },
    { filterId: 2, categoryId: 9 },

]
const init = async () => {

    try {
        //category
       await (async function i(parentId, categories) {

            for (const { name, chillaren } of categories) {
                const create = await Category.create({ name, parentId })
                if (chillaren)
                    await i(create.dataValues.id, chillaren)
            }
        })(null, categories)

        //filters
        await Filter.bulkCreate(filters)
        await CategoryFilter.bulkCreate(categoryFilter)

        //user
        await User.bulkCreate(user)
         




    } catch (error) {
        console.log(error.message)

    }

}

module.exports = init
