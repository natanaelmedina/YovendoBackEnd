const { User } = require('../db/conn')

const CreateUser = async (req, h) => {
    try {
       //req.payload
       //req.params
       //req.query  
       
        const data = req.payload
        createData = await User.create(data)

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

module.exports = {
    CreateUser
}