'use strict';

const users = require('./user');
//const Bcrypt = require('bcrypt')
const routes = require('./route')

const after = async function (server) {

    //autorizations for token
    await server.register(require('hapi-auth-jwt2'));
    server.auth.strategy('jwt', 'jwt', {
        key: process.env.JWT,
        validate: (decoded, request, h) => {
            request.userInfo = decoded;
            return { isValid: true }
        },
        verifyOptions: { algorithms: ['HS256'] }
    })
    //server.auth.default('jwt');
    server.route(routes)
}

exports.plugin = {
    name: 'ikompras-Simple-Auth',
    version: '1.0.0',
    register: async function (server, options) {

        await after(server);
        await server.register({
            plugin: require('hapi-auth-basic')
        });
        //autenticacion basica
        server.auth.strategy('simple', 'basic', {
            validate: async (request, username, password) => {
                const user =  users.find(e => e.username === username)
                if (!user) {
                    return { isValid: false }
                }
               // const isValid = await Bcrypt.compare(password, user.password)
                return { isValid, credentials: { id: user.id, username: user.username } }
            }
        })
        
    }
}