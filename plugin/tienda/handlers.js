const { Tienda } = require('../db/models')
const { server } = require('../../config')
const path = require('path')
const save = require('save-file')
const mimeTypes = require('mime-types')


const create = async (req, h) => {
    try {

        const data = req.payload

        data.category ? (data.category = JSON.parse(data.category)) : (delete data.category)
        data.socialNetwork ? (data.socialNetwork = JSON.parse(data.socialNetwork)) : (delete data.socialNetwork)

        if (typeof data.file === 'object') {
            const fileName = "banner_" + data.file.hapi.filename
            const fullDir = path.join(__dirname, `../../public/users/${data.userId}`, fileName)
            await save(fullDir, data.file._data)
            data.bannerUrl = `${server.domain}/public/users/${data.userId}/${fileName}`
        }
        const createData = await Tienda.create(data)
        return {
            message: "Se ha creado tu tienda.!",
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
        const data = req.payload

        data.category ? (data.category = JSON.parse(data.category)) : (delete data.category)
        data.socialNetwork ? (data.socialNetwork = JSON.parse(data.socialNetwork)) : (delete data.socialNetwork)

        if (typeof data.file === 'object') {
            const fileName = "banner." + mimeTypes.extension(data.file.hapi.headers["content-type"]) || 'png'
            const fullDir = path.join(__dirname, `../../public/user/${data.userId}`, fileName)
            await save(fullDir, data.file._data)
            data.bannerUrl = `${server.domain}/public/user/${data.userId}/${fileName}`
        }
        await Tienda.update(data, { where: { id } })
        const tienda = await Tienda.findByPk(id)
        return {
            message: "Datos de tienda actualizados",
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


const GetByUserId = async (req, h) => {
    try {
        const { id } = req.params
        const tienda = await Tienda.findOne({ where: { id } })
        return {
            message: "OK",
            success: true,
            data: tienda || {}
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
    GetByUserId,
    create,
    update
}