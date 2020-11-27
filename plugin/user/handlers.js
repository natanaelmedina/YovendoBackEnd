const { User } = require('../db/models')
const FileType = require('file-type')
const uuid = require('uuid')
const save = require('save-file')
const path = require('path')
const { server } = require('../../config')


const register = async (req, h) => {
    try {

        const data = req.payload
        const createData = await User.create(data)

        return {
            message: "OK",
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
        if (data.profileImage && data.profileImage._data) {
            const { ext } = await FileType.fromBuffer(data.profileImage._data)
            const fileName = "profile" + id + "." + ext
            const fullDir = path.join(__dirname, '../../public/profileImage/', fileName)
            await save(fullDir, data.profileImage._data)
            data.profileImage = server.domain + '/public/profileImage/' + fileName
        }

        await User.update(data, { where: { id } })

        return {
            message: "OK",
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
            where: {
                email,
                password
            }
        })

        if (!user)
            throw new Error('Usuario y (o) contraseña incorrecta!')

        if (!user.active)
            throw new Error('Usuario inactivo!')

        delete user.dataValues.password

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

module.exports = {
    register,
    getUser,
    login,
    updateUser

}