const { User, Tienda } = require('../db/models')
const save = require('save-file')
const path = require('path')
const { server, twilio } = require('../../config')
const utils = require('../../utils')
const moment = require('moment')
const Bcrypt = require('bcrypt')
const mimeTypes = require('mime-types')
const Joi = require('joi')


const client = require('twilio')(twilio.accountSid, twilio.authToken)

const register = async (req, h) => {
    try {

        const data = req.payload
        data.email=String(data.email).trim().toLowerCase()
        data.password = await Bcrypt.hash(data.password, 10)
        const find = await User.findOne({ where: { email: data.email } })
        if (find)
            throw {
                message: `El correo ${data.email} ya esta en uso.`,
                name: "email error"
            }
        const createData = await User.create(data)

        return {
            message: "Te has registrado correctamente",
            success: true,
            data: createData
        }

    } catch (error) {
        return {
            message: error.message,
            success: false,
            data: null
        }
    }
}

const updateUser = async (req, h) => {
    try {
        const data = req.payload
        const { id } = req.params
        if (typeof data.file === "object") {
            const fileName = "profile." + mimeTypes.extension(data.file.hapi.headers["content-type"]) || 'png'
            const fullDir = path.join(__dirname, `../../public/users/${id}/`, fileName)
            await save(fullDir, data.file._data)
            data.profileImage = `${server.domain}/public/users/${id}/${fileName}`
            delete data.file
        }

        await User.update(data, { where: { id } })

        return {
            message: "Datos actualizados.!",
            success: true,
            data
        }

    } catch (error) {
        return {
            message: error.message,
            success: false,
            data: null
        }
    }
}

const resetPassword = async (req, h) => {
    try {
        const data = req.payload
        const user = req.user


        const dataUser = await User.findByPk(user.id, {
            attributes: ['password']
        })

        if (await Bcrypt.compare(data.oldPassword, dataUser.password)) {
            data.password = await Bcrypt.hash(data.newPassword, 10)
            await User.update({
                password: data.password
            }, { where: { id: user.id } })
        }
        else
            throw new Error('Vieja contraseña incorrecta.!')


        return {
            message: "La contraseña ha sido cambiada.",
            success: true,
            data: null
        }

    } catch (error) {
        return {
            message: error.message,
            success: false,
            data: null
        }
    }
}



const getUser = async (req, h) => {
    try {
        const { id } = req.params
        const user = await User.findByPk(id)

        return {
            message: "OK",
            success: true,
            data: user
        }
    } catch (error) {
        return {
            message: error.message,
            success: false,
            data: null
        }
    }
}

const login = async (req, h) => {

    try {
        const { email, password } = req.payload
        const user = await User.findOne({
            where: { email },
            include: [{
                model: Tienda
            }]
        })

        if (!user || !(await Bcrypt.compare(password, user.password)))
            throw new Error('Usuario y (o) contraseña incorrecta!')

        if (!user.active)
            throw new Error('Usuario inactivo!')



        user.dataValues.exp = moment().add(5, "year").unix()
        delete user.dataValues.password

        const token = utils.generateJWT({
            id: user.dataValues.id,
            email: user.dataValues.email,
            userType: user.dataValues.userType,
        })
        user.dataValues.token = token


        return {
            message: "Login success",
            success: true,
            data: user
        }
    } catch (error) {
        return {
            message: error.message,
            success: false,
            data: null
        }
    }
}

const SendCodeEmail = async (req, h) => {
    try {
        await new Promise(e=>setTimeout(e, 20000))
        const email = String(req.payload.email).trim().toLowerCase()
        const isValidEmail = Joi.string().email().validate(email)
        if (isValidEmail.error)
            throw new Error("Email no es valido.!")
        const emailCode = Math.floor(Math.random() * 8999 + 1000)
        const user = await User.findOne({ where: { email } })
        if (user)
            throw new Error(`Email ya esta en uso.!`)

        await utils.sendEmail({
            html: `Su código de verificación es: <b>${emailCode}</b>`,
            to: email,
            subject: "YoVendoRd código de verificación"
        })
        return {
            message: "Código de confirmación",
            success: true,
            data: { emailCode }
        }

    } catch (error) {
        return {
            message: error.message,
            success: false,
            data: null
        }
    }

}

const confirmWs = async (req, h) => {
    try {
        const { ws } = req.payload
        const code = Math.floor(Math.random() * 89999999 + 10000000)

        const resp = await client.messages.create({
            body: `Su código de verificación es \n${code}`,
            from: '+14154494214',
            to: "+1" + ws,
        })

        return {
            message: "Código de confirmación",
            success: true,
            data: { code }
        }

    } catch (error) {
        return {
            message: error.message,
            success: false,
            data: null
        }
    }

}
module.exports = {
    register,
    getUser,
    login,
    updateUser,
    resetPassword,
    SendCodeEmail,
    confirmWs
}