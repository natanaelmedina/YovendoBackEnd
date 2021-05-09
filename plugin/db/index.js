'use strict';
const setRelations = require('./relations')
const setHooks = require('./hook')
const config = require('../../config');
exports.plugin = {
    name: 'yovendo-db',
    version: '1.0.0',
    register: async function (server, options) {
        try {
            const conn = require('./conn')
            const dataInit = require('./dataInit');

            setRelations()
            setHooks()

            if (config.db.restoreDb) {
                await conn.drop({cascade:true})
                await conn.sync({ force: true })
                await dataInit(conn)
            }
            else
                await conn.sync()

  
        } catch (err) {
            console.log(err);
        }
    }
}

