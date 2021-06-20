const { Category, Filter, Location } = require('../db/models')
const path = require('path')
const fs = require('fs')

const Initialize = async (req, h) => {
    try {
        const category = await Category.findAll({
            hierarchy: true,

        })
        const locations = await Location.findAll({ attributes: ['id', 'name'] })
        const slides = fs.readdirSync(path.join(__dirname, '../../public/homeSlides')).map(e => ("public/homeSlides/" + e))
        return {
            message: "OK",
            success: true,
            data: {
                category,
                slides,
                locations
            }
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
    Initialize,
}