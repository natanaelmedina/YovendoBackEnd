//I tried to do this.
//version "@hapi/hapi": "^20.0.1"

const path = require("path")
const Hapi = require('@hapi/hapi')
const Boom = require('@hapi/boom');


const server = Hapi.server({
    port: 3000,
    host: '0.0.0.0',
    routes: {
        files: {
            relativeTo: path.join(__dirname, 'YOU BUILD REACT DIR')
        }

    }
});
(async () => {
    await server.register([
        require('vision'),
        require('inert')
    ]);
    server.route(
        [{
            method: 'GET',
            path: '/{path*}',
            options: {
                ext: {
                    onPreResponse: {
                        method(req, h) {
                            //for other path prefix /Api
                            const isApi = req.path.substr(1)
                                .toLowerCase()
                                .trim()
                                .split('/')[0]
                                .replace(/\//g, "") === "api"

                            const response = req.response
                            if (response && req.response.output && req.response.output.statusCode === 404) {
                                if (isApi)
                                    return Boom.notFound("Not Found")
                                return h.file('index.html');
                            }
                            return h.continue
                        },
                    }
                }
            },
            handler: {
                directory: {
                    path: ".",
                    listing: false,
                    index: true

                }
            }
        },
        {
            method: 'GET',
            path: '/Api/test',
            handler: () => "OK"
        }
    ])
    await server.start();
    console.log('Server running on %s', server.info.uri)
})()
