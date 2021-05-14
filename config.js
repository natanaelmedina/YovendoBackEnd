
const path = require("path")
const fs = require("fs")

module.exports = {
    db: {
        restoreDb: true,
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
        domain: process.env.domain || "https://yovendo.do",
        https: {
            port: process.env.port || 443,
            host: '0.0.0.0',
            tls: {
                key: fs.readFileSync(path.join(__dirname, "../ssl/private.key")),
                cert: fs.readFileSync(path.join(__dirname, "../ssl/cert.crt"))
            },
            routes: {
                cors: true,
                security: {
                    hsts: true
                },
                files: {
                    relativeTo: path.join(__dirname, '../FrontEnd/v1/build')
                }

            }
        }
    },
    gmailCred: {
        user: "smartsoftdo@gmail.com",
        pass: process.env.gmailPass
    },
    twilio: {
        accountSid: 'AC7890488d169dffbd2468847920cbf414',
        get authToken() { return process.env.smsToken },
        chanels: [
            {
                name: "sms",
                phone: 14155238886
            }
        ]
    },
}
