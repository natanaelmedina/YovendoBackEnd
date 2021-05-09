const Joi = require('joi')

const create = Joi.object({
    categoryId: Joi.number().required(),
    name: Joi.string().required(),
    values: Joi.array().items(
        Joi.string().required()
    ).required(),
    parentId: Joi.number().allow(null).optional(),
    multiple: Joi.boolean().required(),
    inputType: Joi.number().required(),
})


module.exports = {
    create,
    update: create
}