const sql = require('mssql')
const utils = require('../../utils')
const moment = require('moment')


const login = async (req, h) => {
    try {
        const { passWord, userName } = req.payload
        const user = await new sql
            .Request()
            .input('pass', sql.VarChar(50), passWord)
            .input('user', sql.VarChar(200), userName)
            .query(`select * from login_vw 
                    where userPass = @pass 
                    and (userName= @user or cedula= @user or rnc= @user or email = @user or phone= @user)
                    for json path,without_array_wrapper`)
        if (user.recordset.length > 0 && user.recordset[0]) {
            const loginUser = user.recordset[0]
            if (loginUser.user_state != 'A')
                throw new Error('Usuario no activo.!')

            delete loginUser.userPass
            const token = utils.generateJWT({
                exp: moment().add(24, "hour").unix(),
                ...loginUser
            }, process.env.JWT)

            const data = {
                token: token,
                ...loginUser       
            }
            return {
                success: true,
                message: 'login success',
                data
            }
        }
        throw new Error('Invalid username or password.!')

    } catch (error) {
        return utils.buildResponse(h, 400, false, error.message)
    }
}

const handleRequestError = function (request, h, err) {
    console.log("err: ", err);
    if (err.isJoi && Array.isArray(err.details) && err.details.length > 0) {
        const errorMessages = err.details.map(e => e.message.replace(/\"/g, ""))

        return h
            .response({
                success: false,
                message: errorMessages
            })
            .code(400)
            .takeover();
    }
    return h.response().takeover();
}

module.exports = {
    handleRequestError,
    login
}