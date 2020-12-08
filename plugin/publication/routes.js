const handlers = require('./handlers')
const schemas = require('./schemes')
const {handleRequestError} = require('../../utils')

module.exports = [
    {
        method: 'POST',
        path: '/Api/Publication/Create',
        handler: handlers.create,
        options: {
            description: 'crea un publication',
            tags: ['api', 'create'],
            validate: {
                payload: schemas.create,
                failAction: handleRequestError
            }
        }
    },
    {
        method: 'GET',
        path: '/Api/Publication/GetById/{id}',
        handler: handlers.getPublicationById,
        options: {
            description: 'Traer una publication por id',
            tags: ['api', 'GetPublicationById'],
        }
    },
    {
        method: 'GET',
        path: '/Api/Publication/GetByUser/{userId}',
        handler: handlers.getPublicationById,
        options: {
            description: 'Traer una publication por id',
            tags: ['api', 'GetPublicationByUser'],
        }
    },
    {
        method: 'GET',
        path: '/Api/Publication/Get',
        handler: handlers.getPublications,
        options: {
            description: 'Traer una publication por id',
            tags: ['api', 'GetPublications'],
        }
    }


]