const Joi = require('joi')

const login = Joi.object({
    userName: Joi.string().required(),
    passWord: Joi.string().required()
});

module.exports = {
    login
}