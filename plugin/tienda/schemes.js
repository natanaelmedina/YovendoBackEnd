const Joi = require('joi')

const CreateTienda = Joi.object({
    name: Joi.string().required(),
    eslogan: Joi.string().optional(),
    category: Joi.number().required(),
    webPage: Joi.string().optional(),
    socialNetwork: Joi.array().optional(),
    policy: Joi.string().optional(),
    bannerDir: Joi.string().optional(),
    about:Joi.string().optional()
})
module.exports = {
    CreateTienda
}