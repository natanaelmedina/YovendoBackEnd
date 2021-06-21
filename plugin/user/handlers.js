const { User, Store } = require('../db/models')
const save = require('save-file')
const path = require('path')
const { server, twilio } = require('../../config')
const utils = require('../../utils')
const moment = require('moment')
const Bcrypt = require('bcrypt')
const mimeTypes = require('mime-types')
const axios = require("axios").default
const fs = require('fs')
const registerGoogleTpl = fs.readFileSync(path.join(__dirname, "./registerGoogle.hbs"), "utf-8");
const registerTpl = fs.readFileSync(path.join(__dirname, "./register.hbs"), "utf-8");
const handlebars = require("handlebars");
const fileType = require("file-type")


const client = require('twilio')(twilio.accountSid, twilio.authToken)

const register = async (req, h) => {
    try {

        const data = utils.tokenVerify(req.payload.token)
        const find = await User.findOne({ where: { email: data.email } })

        const user = find ? find : await User.create(data)
        user.dataValues.exp = moment().add(5, "year").unix()
        delete user.dataValues.password

        const token = utils.generateJWT({
            id: user.dataValues.id,
            email: user.dataValues.email,
            userType: user.dataValues.userType,
        })
        user.dataValues.token = token
        user.dataValues.goToProfile = find ? true : false
        return {
            message: "Tu cuenta ha sido creada correctamente, te recomendamos que complete tu perfil para subir el nivel de confianza entre vendedores y compradores",
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
const registerFromGoogle = async (req, h) => {
    try {

        let { id_token, email, name, profileImage } = req.payload
        const { data } = await axios.get("https://oauth2.googleapis.com/tokeninfo", {
            params: {
                id_token
            }
        })
        if (email !== data.email.toLowerCase())
            throw new Error("Error no autorizado")

        const user = await User.findOne({ where: { email } })
        const passwordGen = Math.random().toString(16).substr(2, 9);
        const password = await Bcrypt.hash(passwordGen, 10)
        const createData = user ? user : await User.create({ email, name, password, profileImage })
        const token = utils.generateJWT({
            id: createData.dataValues.id,
            email: email,
            userType: createData.dataValues.userType,
        })
        createData.dataValues.token = token
        delete createData.dataValues.password
        if (!user) {
            createData.dataValues.newUser = true
            const tpl = handlebars.compile(registerGoogleTpl);
            const html = tpl({
                name: createData.dataValues.name,
                domain: `${process.env.frontEndDomain}`,
                loginUrl: `${process.env.frontEndDomain}/Login`,
                password: passwordGen,
            })
            utils.sendEmail({
                html: html,
                to: email,
                subject: "YoVendoRD registro existo.!",
                attachments: true
            })
        }
        const message = !user
            ? 'Tu cuenta ha sido creada correctamente, Hemos enviado tu contraseña temporal al email "' + email + '" \
               la cual puedes cambiar en tu perfil.\
               \n\nTe recomendamos que complete tu perfil para subir el nivel de confianza entre vendedores y compradores'
            : "Inicio de sesión correcto.!"


        return {
            message,
            success: true,
            data: createData
        }

    } catch (error) {
        return {
            message: error.isAxiosError ? error.response.data.error : error.message,
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
                model: Store
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

const preRegister = async (req, h) => {
    try {
        const { name, email, password } = req.payload
        const user = await User.findOne({ where: { email } })
        if (user)
            throw new Error(`Email ya esta en uso.!`)


        const passwordEnc = await Bcrypt.hash(password, 10)
        const token = utils.generateJWT({
            name,
            password: passwordEnc,
            email: email,
            exp: moment().add(1, "day").unix()
        })

        const tpl = handlebars.compile(registerTpl);
        const html = tpl({
            name: name,
            domain: `${process.env.frontEndDomain}`,
            loginUrl: `${process.env.frontEndDomain}/Login`,
            confirmUrl: `${process.env.frontEndDomain}/Register/Token/${token}`

        })
        await utils.sendEmail({
            html,
            to: email,
            subject: "YoVendoRd Activación de cuenta",
            attachments: true,
        })

        return {
            message: "Ok.",
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
const createUserExternal = async (req, h) => {
    try {

        let { phone, name, profileImage } = req.payload
        const password = await Bcrypt.hash(phone, 10)
        phone = utils.validatePhone(phone)
        const email = phone + '@yovendo.do'
        const user = await User.findOrCreate({
            where: { phone },
            defaults: {
                email, name, password, profileImage, phone, ws: phone
            }
        })

        new Promise(async e => {
            try {
                if (profileImage && user[1]) {
                    const { data } = await axios.get(profileImage, {
                        responseType: "arraybuffer",
                        headers: {
                            accept: "accept: image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
                            "cache-control": "no-cache",
                            "sec-fetch-dest": "image",
                            "sec-fetch-mode": " no-cors",
                            "sec-fetch-site": "same-site"
                        }
                    })
                    const type = await fileType.fromBuffer(data) || { ext: "jpj" }
                    const fileName = "profile." + type.ext
                    const fullDir = path.join(__dirname, `../../public/users/${user[0].id}/`, fileName)
                    await save(fullDir, data)
                    const url = `public/users/${user[0].id}/${fileName}`
                    await User.update({ profileImage: url }, { where: { id: user[0].id } })
                }
            } catch (error) {
                console.log(error)
            }
        })

        return {
            message: "ok",
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
module.exports = {
    register,
    registerFromGoogle,
    getUser,
    login,
    updateUser,
    resetPassword,
    preRegister,
    confirmWs,
    createUserExternal
}