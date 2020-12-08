'use strict';

const Hapi = require('@hapi/hapi')
const Plugin =require('./plugin')
const config =require('./config')
process.env.JWT = 'yovendoRd2020';

const init = async () => {

    const server = Hapi.server(config.server.http);

    await server.register(Plugin);
    server.route([
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