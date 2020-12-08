const { Tienda } = require('../db/models')
const { server } = require('../../config')

const create = async (req, h) => {
    try {

        const data = req.payload
        const createData = await Tienda.create(data)

        return {
            message: "OK",
            success: true,
            data: createData
        }
    } catch (error) {
        return {
            message: error.message,
            success: false,
            data: null
        }
    }
}


const getById = async (req, h) => {
    try {
        const { id } = req.params
        const tienda = await Tienda.findAll({
            where: {
                Id
            } /*,
            include:[
                {
                    model:Chat
                }
            ]*/
        })

        return {
            message: "OK",
            success: true,
            data: tienda
        }
    } catch (error) {
        return {
            message: error.message,
            success: false,
            data: null
        }
    }
}
 


module.exports = {
    getById,
    create
}