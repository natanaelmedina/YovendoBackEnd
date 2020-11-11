'use strict';

const Hapi = require('@hapi/hapi')
const Plugin =require('./plugin')

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: '0.0.0.0'
    });

    await server.register(Plugin);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};



process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();