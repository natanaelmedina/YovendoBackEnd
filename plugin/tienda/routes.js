const handlers = require('./handlers')
const schemas = require('./schemes')
const {handleRequestError} = require('../../utils')

module.exports = [
    {
        method: 'GET',
        path: '/Api/Tienda/GetById/{id}',
        handler: handlers.getById,
        options: {
            description: "busca tienda por id",
            tags: ['tienda', 'getById'],
            //auth: "jwt",
        }
    },

    {
        method: 'POST',
        path: '/Api/Tienda/create',
        handler: handlers.create,
        options: {
            description: "crea tienda",
            tags: ['tienda', 'create'],
            validate: {
                payload: schemas.CreateTienda,
                failAction: handleRequestError
            }
            //auth: "jwt",
        }
    },

]