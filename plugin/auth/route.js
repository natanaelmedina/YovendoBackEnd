const handlers = require('./handlers.js');
const schemas = require('./schemas.js');

module.exports = [
    {
        method: 'POST',
        path: '/api/auth/login',
        handler: handlers.login,
        options: {
            
            tags: ['api','login'],
            validate: {
                payload: schemas.login,
                failAction: handlers.handleRequestError
            }
        }
    }
]