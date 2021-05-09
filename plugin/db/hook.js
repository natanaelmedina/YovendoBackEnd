const models = require('./models')
const { serverEvent } = require('../../utils')

module.exports = () => {

    models.User.addHook('afterBulkUpdate', async (udp) => {
        const { dataValues } = await models.User.findOne({ where: udp.where, attributes: udp.fields.concat('id') })
        serverEvent.send({
            to: dataValues.id,
            payload: dataValues,
            type: "UPDATE_PROFILE"
        })
    })

    models.Chat.addHook('afterCreate', async ({ dataValues }) => {
        const chat = await models.Chat.findOne({
            where: {
                id: dataValues.id
            },
            include: [
                { model: models.User, as: "fromUser", attributes: ["id", "name", "profileImage", "phone"] },
                { model: models.User, as: "toUser", attributes: ["id", "name", "profileImage", "phone"] },
                { model: models.Publication },
            ]
        })
        serverEvent.send({
            to: [dataValues.toUserId, dataValues.fromUserId],
            payload: [{ ...chat.dataValues, messages: [] }],
            type: "LOAD_CHATS"
        })
    })

    models.Messages.addHook('afterCreate', async ({ dataValues }) => {
        serverEvent.send({
            to: [dataValues.toUserId],
            payload: [dataValues],
            type: "RECEIVE_NEW_MESSAGE"
        })
    })



}