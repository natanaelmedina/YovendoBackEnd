const Joi = require('joi')

const CreateUser = Joi.object({
    name: Joi.string().max(50).required(),
    email: Joi.string().lowercase().trim().max(100).email().required(),
    password: Joi.string().max(100).required(),
    address: Joi.string().max(200).optional(),
    phone: Joi.string().max(10).optional(),
    ws: Joi.string().max(10).optional(),
    birthDay: Joi.date().optional()
})
const RegisterFromGoogle = Joi.object({
    id_token: Joi.string().required(),
    profileImage: Joi.string().optional().allow("", null),
    name: Joi.string().max(50).required(),
    email: Joi.string().lowercase().trim().max(100).email().required(),
})

const Register = Joi.object({
    token:Joi.string()
})

const updateUser = Joi.object({
    name: Joi.string().max(50).optional().allow(null, ""),
    address: Joi.string().max(200).optional().allow(null, ""),
    phone: Joi.string().max(15).min(11).optional().allow(null, ""),
    ws: Joi.string().max(15).min(11).optional().allow(null, ""),
    birthDay: Joi.date().optional().optional().allow(null, ""),
    file: Joi.any().optional().allow(null, ""),
    cedulaRnc: Joi.string().max(11).optional().allow(null, ""),
    address: Joi.string().max(200).optional().allow(null, ""),
    cityId: Joi.number().optional().allow(null, "")

})

const login = Joi.object({
    email: Joi.string().lowercase().trim().max(100).email().required(),
    password: Joi.string().min(6).max(50),
})


const resetPassword = Joi.object({
    oldPassword: Joi.string().max(100).required(),
    newPassword: Joi.string().max(100).required()
})

module.exports = {
    CreateUser,
    RegisterFromGoogle,
    Register,
    login,
    updateUser,
    resetPassword

}