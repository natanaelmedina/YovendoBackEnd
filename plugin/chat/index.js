'use strict';
const routes = require('./routes')
exports.plugin = {
    name: 'chat',
    version: '1.0.0',
    register: async function (server, options) {
        server.route(routes)
    }
}
