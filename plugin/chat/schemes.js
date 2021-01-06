const Joi = require('joi')

const create = Joi.object({
    id: Joi.string().uuid().required(),
    lastResponse: Joi.date().required(),
    lastMsg: Joi.string().required(),
    toUserId: Joi.number().required(),
    fromUserId: Joi.number().required(),
    publicationId: Joi.string().uuid()
})


module.exports = {
    create

}

