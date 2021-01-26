const handlers = require('./handlers')
const schemas = require('./schemes')
const { handleRequestError } = require('../../utils')

module.exports = [
    {
        method: 'GET',
        path: '/Api/Chat/GetByUser/{userId}',
        handler: handlers.getChat,
        options: {
            description: "busca chats de un usuario",
            tags: ['chats', 'getChat'],
            auth: "jwt",
        }
    },

    {
        method: 'POST',
        path: '/Api/Chat/Create',
        handler: handlers.create,
        options: {
            description: "inserta chats de un usuario",
            tags: ['chats', 'getChat'],
            auth: "jwt",
            validate: {
                payload: schemas.create,
                failAction: handleRequestError
                
            }
            
        }
    },

    {
        method: 'PATCH',
        path: '/Api/Chat/Seen/{id}',
        handler: handlers.seen,
        options: {
            description: "coloca el chat visto por el usuario.",
            tags: ['chats', 'send Seen'],
            auth: "jwt",
            
        }
    },
    

]