'use strict';
const config = require('../../config');
exports.plugin = {
    name: 'yovendo-db',
    version: '1.0.0',
    register: async function (server, options) {
        try {
             const conn = require('./conn')
            if (parseInt(process.env.restoreDb)) {
               await conn.drop({cascade:true})
               await conn.sync({ force: true }) 

            }
            // else
            //     await conn.sync()

  
        } catch (err) {
            console.log(err);
        }
    }
}

