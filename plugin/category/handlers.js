const { Category, Filter } = require('../db/models')

const create = async (req, h) => {
    try {
        const data = req.payload
        const createData = await Category.create(data)
        return {
            message: "Categoría creada.!",
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
        const data = await Category.findByPk(id)
        return {
            message: "Categoría actualizada.!",
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
        await Category.destroy({ where: { id } })
        return {
            message: "Categoría eliminada.!",
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
        const data = await Category.findAll({
          //  hierarchy: true,
            include: [{
                model: Filter,
                as: "filters",
                required: true
            }]
        })
        return {
            message: "Lista de categorías",
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