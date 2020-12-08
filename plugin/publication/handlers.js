const { Publication } = require('../db/models')

const create = async (req, h) => {
    try {
        const data = req.payload
        const publication = await Publication.create(data)
        return {
            message: "Su anuncio ha sido creado, en breve esta disponible",
            success: true,
            data: publication
        }
    } catch (error) {
        return {
            message: error.message,
            success: false,
            data: null
        }
    }
}

const getPublicationById = async (req, h) => {
    try {
        const { id } = req.params
        const getPublicationById = await Publication.findAll({
            where: {id}
        })

        return {
            message: "OK",
            success: true,
            data: user
        }
    } catch (error) {
        return {
            message: error.message,
            success: false,
            data: null
        }
    }
}

const getPublicationByUser = async (req, h) => {
    try {
        const { userId } = req.params
        const getPublicationByUser = await Publication.findAll({
            where: {userId}
        })

        return {
            message: "OK",
            success: true,
            data: user
        }
    } catch (error) {
        return {
            message: error.message,
            success: false,
            data: null
        }
    }
}
const getPublications = async (req, h) => {
    try {
        const getPublications = await publication.findAll()
        return {
            message: "OK",
            success: true,
            data: user
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
    getPublicationById,
    getPublicationByUser,
    getPublications

}