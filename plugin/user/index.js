'use strict';
const routes = require('./routes')

exports.plugin = {
    name: 'user',
    version: '1.0.0',
    register: async function (server, options) {

        //autorizations for token
        await server.register(require('hapi-auth-jwt2'));
        server.auth.strategy('jwt', 'jwt', {
            key: process.env.JWT,
            validate: (decoded, request, h) => {
                request.user = decoded;
                return { isValid: true }
            },
            verifyOptions: { algorithms: ['HS256'] }
        })

        server.auth.default('jwt')
        server.route(routes)
    }
}
