const Joi = require('joi')

const CreateMessages = Joi.object({
    id: Joi.string().uuid().required(),
    chatId: Joi.string().uuid().required(),
    publicationId: Joi.string().uuid(),
    message: Joi.string().required(),
    fromUserId: Joi.number().required(),
    toUserId: Joi.number().required(),
    status: Joi.number().default(1),
    createdAt:Joi.date()
})
module.exports = {
    CreateMessages
}