const { Filter } = require('../db/models')

const create = async (req, h) => {
    try {
        const data = req.payload
        const createData = await Filter.create(data)
        return {
            message: "Filtro creado.!",
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
const update = async (req, h) => {
    try {
        const { id } = req.params
        await Category.update(req.payload, { where: { id } })
        const data = await Filter.findByPk(id)
        return {
            message: "Filtro actualizad0.!",
            success: true,
            data
        }
    } catch (error) {
        return {
            message: error.message,
            success: false,
            data: null
        }
    }
}
const _delete = async (req, h) => {
    try {
        const { id } = req.params
        await Filter.destroy({ where: { id } })
        return {
            message: "Filtro eliminado.!",
            success: true,
            data: id
        }
    } catch (error) {
        return {
            message: error.message,
            success: false,
            data: null
        }
    }
}

const get = async (req, h) => {
    try {
        const data = await Filter.findAll({
             hierarchy: true 
        })
        return {
            message: "Lista de Filtros",
            success: true,
            data: data
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
    create,
    update,
    get,
    delete: _delete
}