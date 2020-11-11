const handlers = require('./handlers')
const schemas = require('./schemes')
const {handleRequestError} = require('../../utils')

module.exports = [
    {
        method: 'POST',
        path: '/Api/User/Register',
        handler: handlers.CreateUser,
        options: {
            description: 'crea un usuario',
            tags: ['user', 'CreateUser'],
            validate: {
                payload: schemas.CreateUser,
                failAction: handleRequestError
            }
            //auth: "jwt",
        }
    },
    {
        method: 'PATCH',
        path: '/Api/User/Update',
        handler: handlers.CreateUser,
        options: {
            description: 'updatea informacion del usuario',
            tags: ['user', 'update'],
            validate: {
                payload: schemas.CreateUser,
                failAction: handleRequestError
            }
            //auth: "jwt",
        }
    },
    {
        method: 'POST',
        path: '/Api/User/Login',
        handler: handlers.login,
        options: {
            description: 'Loguea el usuario al sistema',
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
            description: 'Loguea el usuario al sistema via google',
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
        path: '/Api/User',
        handler: handlers.login,
        options: {
            description: '',
            tags: ['user', 'googleLogin'],
            validate: {
                payload: schemas.login,
                failAction: handleRequestError
            }
            //auth: "jwt",
        }
    },
]