const models = require('./models')


module.exports = () => {
    try {
        const { Chat, Messages, User, Publication, Tienda, Category,
            publicationViewing, Filter, CategoryFilter } = models

        //relaciones entre chat mensajes,usuarios y publicaciones.
        Messages.belongsTo(Chat, { foreignKey: "chatId", targetKey: "id" })
        Chat.hasMany(Messages, { foreignKey: "chatId", targetKey: "id" })

        Chat.belongsTo(User, { as: 'fromUser', foreignKey: 'fromUserId' })
        Chat.belongsTo(User, { as: 'toUser', foreignKey: 'toUserId' })

        Chat.belongsTo(Publication)
        Publication.hasMany(Chat)
        //relaciones entre chat mensajes,usuarios y publicaciones.------

        //tienda
        Tienda.belongsTo(User, { foreignKey: "userId", targetKey: "id", })
        User.hasOne(Tienda, { foreignKey: "id", targetKey: "userId" })


        //Category and filters
        Filter.belongsToMany(Category, { through: CategoryFilter,as: 'filters' })
        Category.belongsToMany(Filter, { through: CategoryFilter,as: 'filters' })

        //publications
        Publication.hasMany(publicationViewing, {
            foreignKey: "publicationId",
            targetKey: "id",
            onDelete: 'CASCADE',
            as: 'views'
        })





    } catch (error) {
        console.log(error.message)
        throw new Error(error.message)
    }
}
