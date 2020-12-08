const Joi = require('joi')

const create = Joi.object({
    id: Joi.string().uuid().required(),
    lastResponse: Joi.date().required(),
    lastMsg: Joi.string().required(),
    toUserId: Joi.number().required(),
    fromUserId: Joi.string().required(),
    publicationId: Joi.string().uuid()
})


module.exports = {
    create

}

