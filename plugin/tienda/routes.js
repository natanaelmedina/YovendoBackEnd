const handlers = require('./handlers')
const schemas = require('./schemes')
const {handleRequestError} = require('../../utils')

module.exports = [
    {
        method: 'GET',
        path: '/Api/Tienda/GetByUserId/{id}',
        handler: handlers.GetByUserId,
        options: {
            description: "busca tienda por id",
            tags: ['tienda', 'GetByUserId'],
            auth: "jwt",
        }
    },

    {
        method: 'POST',
        path: '/Api/Tienda/Create',
        handler: handlers.create,
        options: {
            description: "crea la tienda de un usuario",
            tags: ['tienda', 'create'],
            validate: {
                payload: schemas.create,
                failAction: handleRequestError
            },
            payload: {
                allow: 'multipart/form-data',
                output: 'stream',
                parse: true,
                maxBytes: 10000000,
                multipart: {
                    output: 'stream'
                }
            },
            auth: "jwt",
          
        }
    },
    {
        method: 'PATCH',
        path: '/Api/Tienda/Update/{id}',
        handler: handlers.update,
        options: {
            description: "Actualizar  la tienda de un usuario",
            tags: ['tienda', 'update'],
            validate: {
                payload: schemas.update,
                failAction: handleRequestError
            },
            payload: {
                allow: 'multipart/form-data',
                output: 'stream',
                parse: true,
                maxBytes: 10000000,
                multipart: {
                    output: 'stream'
                }
            },
            auth: "jwt",
          
        }
    },

]