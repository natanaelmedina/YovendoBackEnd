const { Messages, Chat } = require('../db/models')


const getMessages = async (req, h) => {
    try {
        const { chatId } = req.params
        const messages = await Messages.findAll({
            where: {
                chatId
            } /*,
            include:[
                {
                    model:Chat
                }
            ]*/
        })

        return {
            message: "OK",
            success: true,
            data: messages
        }
    } catch (error) {
        return {
            message: error.message,
            success: false,
            data: null
        }
    }
}

const sendMessage = async (req, h) => {
    const t = await Messages.sequelize.transaction()
    try {
        
        const data = req.payload
        const createData = await Messages.create(data, { transaction: t })
        await Chat.update({
            "lastResponse": new Date(),
            "lastMsg": data.message,
            "pendingSeen": data.toUserId
        }, {
            where: { id: data.chatId },
            transaction: t
        })
       await t.commit()

        return {
            message: "OK",
            success: true,
            data: createData
        }
    } catch (error) {
        await t.rollback()
        return {
            message: error.message,
            success: false,
            data: null
        }
    }
}

module.exports = {
    getMessages,
    sendMessage
}