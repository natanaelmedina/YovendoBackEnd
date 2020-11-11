const handlers = require('./handlers')
const schemas = require('./schemes')
const {handleRequestError} = require('../../utils')

module.exports = [
    {
        method: 'POST',
        path: '/api/user/CreateUser',
        handler: handlers.CreateUser,
        options: {
            description: 'crea un usuario',
            tags: ['api', 'CreateUser'],
            validate: {
                payload: schemas.CreateUser,
                failAction: handleRequestError
            }
            //auth: "jwt",
        }
    },
]