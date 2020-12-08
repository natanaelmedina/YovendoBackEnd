const handlers = require('./handlers')
const schemas = require('./schemes')
const {handleRequestError} = require('../../utils')

module.exports = [
    {
        method: 'GET',
        path: '/Api/Messages/GetByChat/{chatId}',
        handler: handlers.getMessages,
        options: {
            description: "busca mensajes de un usuario",
            tags: ['messages', 'getMessages'],
            auth: "jwt"
            
        },
       
    },

    {
        method: 'POST',
        path: '/Api/Messages/Send',
        handler: handlers.sendMessage,
        options: {
            description: "enviá un mensaje a un usuario",
            tags: ['messages', 'sendMessage'],
            auth: "jwt",
            validate: {
                payload: schemas.CreateMessages,
                failAction: handleRequestError
            },
            
        }
    },

]