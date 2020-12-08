const handlers = require('./handlers')
const schemas = require('./schemes')
const {handleRequestError} = require('../../utils')

module.exports = [
    {
        method: 'POST',
        path: '/Api/User/Register',
        handler: handlers.register,
        options: {
            description: 'crea un usuario',
            tags: ['user', 'CreateUser'],
            validate: {
                payload: schemas.CreateUser,
                failAction: handleRequestError
            }
           // auth: "jwt",
        }
    },
    {
        method: 'PATCH',
        path: '/Api/User/resetPassword',
        handler: handlers.resetPassword,
        options: {
            description: 'Modifica Password',
            tags: ['user', 'resetPassword'],
            validate: {
                payload: schemas.resetPassword,
                failAction: handleRequestError
            },
            auth: "jwt",
        }
    },

    {
        method: 'PATCH',
        path: '/Api/User/Update/{id}',
        handler: handlers.updateUser,
        options: {
            description: 'actualiza información del usuario',
            tags: ['user', 'update'],
            validate: {
                payload: schemas.updateUser,
                failAction: handleRequestError
            },
            payload: {
                allow: 'multipart/form-data',
                output: 'stream',
                parse:    true,
                maxBytes: 10000000,
                multipart: {
                    output: 'stream'
                }
            },
            auth: "jwt",
        }
    },
    {
        method: 'POST',
        path: '/Api/User/Login',
        handler: handlers.login,
        options: {
            description: 'Loguear el usuario al sistema',
            tags: ['user', 'login'],
            validate: {
                payload: schemas.login,
                failAction: handleRequestError
            }
            //auth: "jwt",
        }
    },
    {
        method: 'POST',
        path: '/Api/User/LoginFromGoogle',
        handler: handlers.login,
        options: {
            description: 'Loguear el usuario al sistema via google',
            tags: ['user', 'googleLogin'],
            validate: {
                payload: schemas.login,
                failAction: handleRequestError
            }
            //auth: "jwt",
        }
    },
    {
        method: 'GET',
        path: '/Api/User/{id}',
        handler: handlers.getUser,
        options: {
            description: "busca información de un usuario",
            tags: ['user', 'getUser'],
            
        },
        //auth: "jwt"
    }
    ,
    {
        method: 'POST',
        path: '/Api/User/SendCodeEmail',
        handler: handlers.SendCodeEmail,
        options: {
            description: "Enviá código de confirmación para verificar el correo",
            tags: ['user', 'confirmar email'],
            
        }
    } ,
    {
        method: 'POST',
        path: '/Api/User/confirmWs',
        handler: handlers.confirmWs,
        options: {
            description: "Enviá código de confirmación para verificar el whatsApp del cliente",
            tags: ['user', 'confirmar whatsApp'],
            
        }
    }
]