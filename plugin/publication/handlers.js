const { Publication, publicationViewing } = require('../db/models')
const utils = require('../../utils')

const create = async (req, h) => {
    try {
        const data = req.payload
        data.thumbnail = 'no image'
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
        let userId = 0
        if (req.headers.authorization) {

            try {
                const token = req.headers.authorization.split(' ')[1]
                const user = utils.tokenVerify(token);
                userId = user.id
            } catch (error) {

            }
        }
        const publication = await Publication.findAll({ where: { id } })
        if (publication.length > 0) {
            publicationViewing.create({
                publicationId: id,
                userId,
                ipAddress: req.info.remoteAddress
            }).catch(e => { })
        }
        return {
            message: "OK",
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
//[Sequelize.fn('COUNT', Sequelize.col('views.publicationId')), 'views']
const getPublicationByUser = async (req, h) => {
    try {
        const { id: userId } = req.user
        const publications = await Publication.findAll({
            where: { userId },
            attributes: [
                `${Publication.name}.*`,
                [Publication.sequelize.fn('COUNT', 'views.*'), 'views'],
            ],
            include: [
                {
                    model: publicationViewing,
                    as: "views",
                    attributes: [],
                }
            ],
            group: ['id'],
            raw: true
        })
        return {
            message: "OK",
            success: true,
            data: publications
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

const _delete = async (req, h) => {
    try {
        const { id: userId } = req.user
        const { id } = req.params
        const deleted = await Publication.destroy({
            where: {
                id,
                userId
            }
        })
        if (!deleted)
            throw { message: "Publicación no existe.!" }

        const data = await Publication.findAll({
            where: { userId }
        })
        return {
            message: "OK",
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

const deleteAll = async (req, h) => {
    try {
        const { id: userId } = req.user
        const { id } = req.params
        await Publication.destroy({
            where: {
                userId
            }
        })
        return {
            message: "Todas tu Publicaciones han sido eliminadas.!",
            success: true,
            data:[]
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
    delete: _delete,
    deleteAll,
    getPublicationById,
    getPublicationByUser,
    getPublications

}