const models = require('./models')


module.exports = () => {
    try {
        const { Chat, Messages,User,Publication } = models

        //relaciones entre chat mensajes,usuarios y publicaciones.
        Messages.belongsTo(Chat, { foreignKey: "chatId", targetKey: "id" })
        Chat.hasMany(Messages, {foreignKey: "chatId",targetKey:"id" })

        Chat.belongsTo(User, { as:'fromUser', foreignKey: 'fromUserId'})
        Chat.belongsTo(User, { as:'toUser', foreignKey: 'toUserId'})
        
        Chat.belongsTo(Publication)
        Publication.hasMany(Chat)
        //relaciones entre chat mensajes,usuarios y publicaciones.------


        


    } catch (error) {
        console.log(error.message)
        throw new Error(error.message)
    }
}
