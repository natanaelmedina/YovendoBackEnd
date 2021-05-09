const handlers = require('./handlers')
const schemas = require('./schemes')
const { handleRequestError } = require('../../utils')

module.exports = [
    {
        method: 'POST',
        path: '/Api/Publication/Create',
        handler: handlers.create,
        options: {
            description: 'crea un publication',
            tags: ['api', 'create'],
            //auth: "jwt",
            validate: {
                payload: schemas.create,
                failAction: handleRequestError
            },
            
        }
    },

    {
        method: 'GET',
        path: '/Api/Publication/GetById/{id}',
        handler: handlers.getPublicationById,
        options: {
            description: 'Traer una publication por id',
            tags: ['api', 'GetPublicationById'],
        },
    },
    {
        method: 'GET',
        path: '/Api/Publication/GetByUser',
        handler: handlers.getPublicationByUser,
        options: {
            description: 'Traer las publicationes de un usuario',
            tags: ['api', 'GetPublicationByUser'],
            auth: "jwt"
        },
       
    },
    {
        method: 'GET',
        path: '/Api/Publication/Get',
        handler: handlers.getPublications,
        options: {
            description: 'Traer una publication por id',
            tags: ['api', 'GetPublications'],
            auth: "jwt"
        },
    },
    {
        method: 'DELETE',
        path: '/Api/Publication/{id}',
        handler: handlers.delete,
        options: {
            description: 'Elimina una publicación de un usuario',
            tags: ['api', 'PublicationDelete'],
            auth: "jwt"
        },
    },
    {
        method: 'DELETE',
        path: '/Api/Publication/All',
        handler: handlers.deleteAll,
        options: {
            description: 'Elimina todas las publicaciónes de un usuario',
            tags: ['api', 'PublicationDeleteAll'],
            auth: "jwt"
        },
    },
    


]