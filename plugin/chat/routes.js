const handlers = require('./handlers')
const schemas = require('./schemes')
const {handleRequestError} = require('../../utils')

module.exports = [
    {
        method: 'GET',
        path: '/Api/Chat/GetByUser/{userId}',
        handler: handlers.getChat,
        options: {
            description: "busca chats de un usuario",
            tags: ['chats', 'getChat'],
            //auth: "jwt",
        }
    },

    {
        method: 'POST',
        path: '/Api/Chat/Create',
        handler: handlers.create,
        options: {
            description: "inserta chats de un usuario",
            tags: ['chats', 'getChat'],
            validate: {
                payload: schemas.create,
                failAction: handleRequestError
            }
            //auth: "jwt",
        }
    }

]