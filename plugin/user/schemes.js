const Joi = require('joi')

const CreateUser = Joi.object({
    name:Joi.string().max(50).required(),
    email:Joi.string().max(100).required(),
    password:Joi.string().max(100).required(),
    address:Joi.string().max(200),
    phone:Joi.string().max(10),
    birthDay:Joi.date()
})


module.exports={
    CreateUser  
}