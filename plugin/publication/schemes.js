const Joi = require('joi')

const CreateUser = Joi.object({
    firstName:Joi.string().max(50).required(),
    lastName:Joi.string().max(50).required(),
    userName:Joi.string().max(30).required(),
    email:Joi.string().max(100).required(),
    password:Joi.string().max(100).required(),
    address:Joi.string().max(200).required(),
    phone:Joi.string().max(10).required()
})


module.exports={
    CreateUser  
}