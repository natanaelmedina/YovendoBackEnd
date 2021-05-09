const Joi = require('joi')

const create = Joi.object({
    userId: Joi.number().required(),
    eslogan: Joi.string().allow('').optional(),
    category: Joi.any().allow('').optional(),
    webPage: Joi.string().allow('').optional(),
    socialNetwork: Joi.any().optional(),
    policy: Joi.string().allow('').optional(),
    bannerUrl: Joi.string().allow('').optional(),
    about:Joi.string().allow('').optional(),
    file:Joi.any().optional(),
})
const update =Joi.object({
    userId: Joi.number().required(),
    eslogan: Joi.string().allow('').optional(),
    category: Joi.any().allow('').optional(),
    webPage: Joi.string().allow('').optional(),
    socialNetwork: Joi.any().optional(),
    policy: Joi.string().allow('').optional(),
    bannerUrl: Joi.string().allow('').optional(),
    about:Joi.string().allow('').optional(),
    file:Joi.any().optional()
})
module.exports = {
    create,
    update
}