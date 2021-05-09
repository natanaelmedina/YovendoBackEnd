const handlers = require('./handlers')

module.exports = [
    {
        method: 'GET',
        path: '/Api/Initialize',
        handler: handlers.Initialize,
        options: {
            description: 'Datos iniciales al cargar',
            tags: ['Api', 'Initialize'],
            auth: false,
            cache: {
                privacy: "public",
                expiresIn: 999999999999999
            }
        }
    },
    {
        method: 'GET',
        path: '/Api/Version',
        handler: () => process.env.apiVersion,
        options: {
            description: 'Datos iniciales al cargar',
            tags: ['Api', 'Version'],
            auth: false
        }
    },

]