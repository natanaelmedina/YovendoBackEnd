module.exports = {
    db: {
        restoreDb: false,
        port: "5432",
        host: "localhost",
        name: "YOVENDO",
        user: {
            name: "postgres",
            password: "123456"
        },
        options: {
            timestamps: false,
            underscored: false
        }
    },
    server: {
        domain:"http://172.25.20.94:3000",
        https: {
            port: 3001,
            host: '0.0.0.0',
            tls: {
              //  key: fs.readFileSync('c:/ssl/private.key'),
              //  cert: fs.readFileSync('c:/ssl/cert.crt')
            },
            routes: {
                cors: true,
                security: {
                    hsts: true
                }
            }
        },
        http: {
            port: 3000,
            host: '0.0.0.0',
            routes: {
                cors: true,
                security: {
                    hsts: false
                }
            }
        }
    },
}
