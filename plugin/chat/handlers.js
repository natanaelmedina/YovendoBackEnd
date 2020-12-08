const { Chat, Messages, User, Publication } = require('../db/models')
const { server } = require('../../config')
const { Op } = require('sequelize');


const getChat = async (req, h) => {
    try {
        const { userId } = req.params
        const chat = await Chat.findAll({
            where: {
                [Op.or]: [{ fromUserId: userId }, { toUserId: userId }]
            },
            include: [
                { model: User, as: "fromUser", attributes: ["id", "name", "profileImage", "phone"] },
                { model: User, as: "toUser", attributes: ["id", "name", "profileImage", "phone"] },
                { model: Publication },
            ]
        })


        return {
            message: "OK",
            success: true,
            data: chat.map(e => { e.dataValues.messages = []; return e })
        }
    } catch (error) {
        return {
            message: error.message,
            success: false,
            data: null
        }
    }
}

const create = async (req, h) => {
    try {

        const data = req.payload
        const createData = await Chat.create(data)

        return {
            message: "OK",
            success: true,
            data: createData
        }
    } catch (error) {
        return {
            message: error.message,
            success: false,
            data: null
        }
    }
}



module.exports = {
    getChat,
    create
}