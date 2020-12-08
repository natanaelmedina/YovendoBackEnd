'use strict';
const { db } = require('../../config')
const setRelations = require('./relations')
exports.plugin = {
    name: 'yovendo-db',
    version: '1.0.0',
    register: async function (server, options) {
        try {
            
            const conn = require('./conn')
            setRelations()
            await conn.sync()
            

        } catch (err) {
            console.log(err);
        }
    }
}

