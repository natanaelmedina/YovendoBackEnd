const Joi = require('joi')

const create = Joi.object({
    userId:Joi.number().required(),
    title:Joi.string().max(300).required(),
    desc:Joi.string().max(1500).optional(),
    images:Joi.array().optional(),
    category:Joi.number(),
    currency:Joi.string().optional().default("DOP"),
    price:Joi.number().optional().default(0.0),
    condition:Joi.string().max(1).required(),
    filters:Joi.array().optional()
})


module.exports={
    create 
}
