'use strict';


process.stdout.write('\x1Bc');
process.stdout.write(
    String.fromCharCode(27) +
    "]0; YoVendo Api v1" +
    String.fromCharCode(7)
);
process.env.smsToken = 'bb3d95d58e0430294cd6f8ca6aaddd49'
process.env.JWT = 'yovendoRd2020'
process.env.apiVersion = process.env.apiVersion || "0.0.3"


const Hapi = require('@hapi/hapi')
const Plugin = require('./plugin')
const config = require('./config')
const ServerEvent = require('./utils').serverEvent
const stream = require('stream').PassThrough
const Boom = require('@hapi/boom');





global.ServerEvent = ServerEvent
const init = async () => {

    const server = Hapi.server(config.server.https);

    await server.register(Plugin);

    server.route([
        {
            method: 'GET',
            path: '/{path*}',
            options: {
                ext: {
                    onPreResponse: {
                        method(req, h) {
                            const isApi = req.path.substr(1)
                                .toLowerCase()
                                .trim()
                                .split('/')[0]
                                .replace(/\//g, "") === "api"
                            const response = req.response
                            if (response && req.response.output && req.response.output.statusCode === 404) {
                                if (isApi)
                                    return Boom.notFound("No encontrado")
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
            path: '/public/{path*}',
            options: {
                cache: {
                    expiresIn: Number.MAX_SAFE_INTEGER, // milliseconds 
                },
            },
            handler: {
                directory: {
                    path: __dirname + '/public',
                    listing: false,
                    index: false
                }
            }
        },
        {
            method: 'GET',
            path: '/cache',
            handler: (r,h) =>{
                const response = h.response([]);
                response.type('application/json');
                response.code(200)
                return response;
            } 
        },
        {
            method: 'GET',
            path: '/Api/Events/{user}',
            handler: function (req, h) {
                const { user } = req.params
                class ResponseStream extends stream {
                    setCompressor(compressor) {
                        this.compressor = compressor;
                        setTimeout(() => {
                            this.compose({
                                type: "connect",
                                payload: null,
                                to: user
                            })
                        }, 0)
                        ServerEvent.on("message", this.compose)
                        req.raw.req.on("close", this.error)
                    }
                    compose = (data = "") => {
                        const to = Array.isArray(data.to) ? data.to : [data.to ? data.to : 0]
                        if (data && to.includes(parseInt(user))) {
                            this.write(`id:${user}\n`)
                            this.write(`event:message\n`)
                            this.write(`data:${Buffer.from(JSON.stringify(data)).toString('base64')}\n\n`)
                            this.compressor.flush()
                        }
                    }

                    error = () => {
                        ServerEvent.off("message", this.compose)
                    }
                }
                const myStream = new ResponseStream()
                const resp = h.response(myStream).type('text/event-stream')
                return resp

            }

        }
    ])
    await server.start();
    // server.events.on('response', function (request) {
    //     console.log(
    //         request.info.remoteAddress
    //         + ': ' + request.method.toUpperCase()
    //         + ' ' + request.path
    //         + ' --> ' + request.response.statusCode
    //     );
    // });
    console.log('Server running on %s', server.info.uri);

};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
