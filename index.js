'use strict';

process.stdout.write('\x1Bc'); 
process.env.smsToken = 'bb3d95d58e0430294cd6f8ca6aaddd49'
process.env.JWT = 'yovendoRd2020'


const Hapi = require('@hapi/hapi')
const Plugin = require('./plugin')
const config = require('./config')
const ServerEvent = require('./utils').serverEvent
const stream = require('stream').PassThrough



global.ServerEvent = ServerEvent
const init = async () => {

    const server = Hapi.server(config.server.http);

    await server.register(Plugin);
    server.route([
        {
            method: 'GET',
            path: '/',
            handler: () => "Server OK."
        },
        {
            method: 'GET',
            path: '/public/{path*}',
            handler: {
                directory: {
                    path: 'public',
                    listing: false,
                    index: false
                }
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
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
