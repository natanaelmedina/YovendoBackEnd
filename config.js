module.exports = {
    db: {
        restoreDb: false,
        port: "5433",
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
        domain: "http://172.25.20.94:3000",
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
    gmailCred: {
        user: "rd.yovendo@gmail.com",
        pass: "Im@901811"
    },
    twilio: {
        accountSid: 'AC7890488d169dffbd2468847920cbf414',
        authToken: '66324a90cf3807ab78515ba30d94a188',
        chanels: [
            {
                name: "sms",
                phone: 14155238886
            }
        ]
    },
}
