module.exports = {
    db: {
        restoreDb:false,
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
}
