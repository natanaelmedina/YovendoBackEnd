const Joi = require('joi')

const create = Joi.object({
    name: Joi.string().required(),
    parentId: Joi.number().allow(null).optional()
})


module.exports = {
    create,
    update: create
}