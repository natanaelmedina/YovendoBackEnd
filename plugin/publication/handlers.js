const { Publication, publicationViewing, Condition, Location } = require('../db/models')
const { Op } = require('sequelize')
const { Sequelize } = require('../db/conn')
const utils = require('../../utils')
const { find, drop, countBy, map, orderBy } = require('lodash')
const fs = require('fs')
const sqlQuery = fs.readFileSync(__dirname + "/query.sql", "utf-8")
const axios = require("axios").default
const fileType = require("file-type")
const path = require('path')
const save = require('save-file')
const md5 = require('md5');

const create = async (req, h) => {
    try {
        const data = req.payload
        //data.thumbnail = 'no image'
        const publication = await Publication.create(data)
        const { id } = publication

        new Promise(async e => {
            if (data.images) {
                const images = []

                for (const img of [data.thumbnail, ...data.images]) {

                    try {
                        const { data } = await axios.get(img, {
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
                        const fileName = publication.id + "_" + new Date().getTime() + "_." + type.ext
                        const fullDir = path.join(__dirname, `../../public/items/${id}/`, fileName)
                        await save(fullDir, data)
                        const url = `public/items/${id}/${fileName}`
                        images.push(url)
                    } catch (error) {
                        console.log(error)
                    }

                }
                const thumbnail = images.shift()
                await Publication.update({ images, thumbnail }, { where: { id } })

            }
        })

        return {
            message: "Su anuncio ha sido creado, en breve esta disponible",
            success: true,
            data: publication
        }
    } catch (error) {
        return {
            message: error.message,
            success: false,
            data: null
        }
    }
}

const getPublicationById = async (req, h) => {
    try {
        const { id } = req.params
        let userId = 0
        if (req.headers.authorization) {

            try {
                const token = req.headers.authorization.split(' ')[1]
                const user = utils.tokenVerify(token);
                userId = user.id
            } catch (error) {

            }
        }
        const publication = await Publication.findAll({ where: { id } })
        if (publication.length > 0) {
            publicationViewing.create({
                publicationId: id,
                userId,
                ipAddress: req.info.remoteAddress
            }).catch(e => { })
        }
        return {
            message: "OK",
            success: true,
            data: publication
        }
    } catch (error) {
        return {
            message: error.message,
            success: false,
            data: null
        }
    }
}
//[Sequelize.fn('COUNT', Sequelize.col('views.publicationId')), 'views']
const getPublicationByUser = async (req, h) => {
    try {
        const { id: userId } = req.user
        const publications = await Publication.findAll({
            where: { userId },
            attributes: [
                `${Publication.name}.*`,
                [Publication.sequelize.fn('COUNT', 'views.*'), 'views'],
            ],
            include: [
                {
                    model: publicationViewing,
                    as: "views",
                    attributes: [],
                }
            ],
            group: ['id'],
            raw: true
        })
        return {
            message: "OK",
            success: true,
            data: publications
        }
    } catch (error) {
        return {
            message: error.message,
            success: false,
            data: null
        }
    }
}
const getPublications = async (req, h) => {
    try {
        const getPublications = await publication.findAll()
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

const _delete = async (req, h) => {
    try {
        const { id: userId } = req.user
        const { id } = req.params
        const deleted = await Publication.destroy({
            where: {
                id,
                userId
            }
        })
        if (!deleted)
            throw { message: "Publicación no existe.!" }

        const data = await Publication.findAll({
            where: { userId }
        })
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

const deleteAll = async (req, h) => {
    try {
        const { id: userId } = req.user
        const { id } = req.params
        await Publication.destroy({
            where: {
                userId
            }
        })
        return {
            message: "Todas tu Publicaciones han sido eliminadas.!",
            success: true,
            data: []
        }
    } catch (error) {
        return {
            message: error.message,
            success: false,
            data: null
        }
    }
}

const Search = async (req, h) => {

    try {
        if (!Object.keys(req.query).length) {
            throw new Error('no search fond')
        }
        const {
            cate,
            price,
            loca,
            sch,
            pg,
            free,
            guarantee,
            store,
            sort,
            cond,
            counter,
            ...filters
        } = req.query

        const limit = 48
        const offset = 0 + (parseInt(pg || 1) - 1) * parseInt(limit);
        let sortItem = []

        if (sort == 0 || !sort) { //relevante
            sch && sortItem.push([Sequelize.literal('ranking'), 'desc'])
            cate && sortItem.push(['categoryId', 'desc'])
            sortItem.push(['createdAt', 'desc'])
        } else if (sort == 1) { //reciente
            sortItem.push(['createdAt', 'desc'])
            sch && sortItem.push([Sequelize.literal('ranking'), 'desc'])
        } else if (sort == 2) { //precio bajo
            sortItem.push(['price', 'asc'])
            sch && sortItem.push([Sequelize.literal('ranking'), 'desc'])
        } else if (sort == 3) { //precio alto
            sortItem.push(['price', 'desc'])
            sch && sortItem.push([Sequelize.literal('ranking'), 'desc'])
        }

        const p1 = parseFloat(String(price).split("|")[0])
        const p2 = parseFloat(String(price).split("|")[1])
        const attributes = [
            "id", "title", "price", "currency", "thumbnail", "categoryId",
            "freeShipping", "guarantee", "isStore", "conditionId"
        ]
        sch && attributes.push(
            [
                Sequelize.literal(
                    `ts_rank(
                     _search, 
                     websearch_to_tsquery('spanish',:sch),
                    0
                )`
                ), 'ranking'
            ]
        )

        const otherWhere = []
        if (sch) {
            otherWhere.push(
                Sequelize.and(
                    Sequelize.fn(
                        `_search @@ websearch_to_tsquery`,
                        'spanish',
                        Sequelize.literal(':sch')
                    )
                )
            )
        }

        let where = {
            ...(cate ? { categoryId: cate.split(",") } : {}),
            ...(price ? { price: { [Op.between]: [p1, p2 === Infinity ? Number.MAX_SAFE_INTEGER : p2] } } : {}),
            ...(loca ? { locationId: parseInt(loca) } : {}),
            ...(free ? { freeShipping: Boolean(parseInt(free)) } : {}),
            ...(guarantee ? { guarantee: { [Op.gt]: 0 } } : {}),
            ...(store ? { isStore: Boolean(parseInt(store)) } : {}),
            ...(cond ? { conditionId: parseInt(cond) } : {}),
        }
        const replacements = { sch: sch ? sch : 0 };

        if (Object.keys(filters)) {
            otherWhere.push(Sequelize.and(Sequelize.literal(`${Publication.tableName}."features" is not null`)))
            otherWhere.push(Sequelize.and(Sequelize.literal(`${Publication.tableName}."features" @> :json`)))
            const formatFilters = {}
            for (const key in filters) {
                formatFilters[key] = { value: filters[key] }
            }
            replacements.json = JSON.stringify(formatFilters)
        }
        if (otherWhere.length)
            where = { ...where, [Op.and]: otherWhere }



        const promise = []

        console.log('sql consulta', new Date())

        let sql = Publication.sequelize.getQueryInterface().QueryGenerator.selectQuery(
            Publication.getTableName(), {
            replacements,
            where,
        },
            Publication
        )
        sql = sql.substr(sql.indexOf("WHERE")).trim()
        const sqlQueryArr = sqlQuery
            .replace(/--{where}/gi, sql)
            .replace(/;/gi, "")
            .split("--$$$")

        // console.log(sql)
        promise.push(Publication.findAll(
            {
                limit,
                raw: true,
                attributes,
                replacements,
                where,
                order: [['sponsorOrder', 'asc'], ...sortItem],
                offset: offset,
                logging(q) {
                    console.log(q)
                }
            }
        ));
        if (counter === undefined) {
            promise.push(Publication.sequelize.query(sqlQueryArr[0], { replacements })) //showOnly
            promise.push(Publication.sequelize.query(sqlQueryArr[1], { replacements })) //location
            promise.push(Publication.sequelize.query(sqlQueryArr[2], { replacements })) //features
            promise.push(Publication.sequelize.query(sqlQueryArr[3], { replacements }))//categories
        }
        const data = await Promise.all(promise)
        console.log('sql consulta end', new Date())
        const items = data[0]


        const { condition, show: showOnly, cnt: itemsCount } = counter === undefined ? data[1][0][0] : {}
        const location = counter === undefined ? data[2][0] : null
        const features = counter === undefined ? data[3][0].map(e => e.features) : []
        const rankCategory = counter === undefined ? orderBy(data[4][0], [['cnt', 'desc']]) : null



        return {
            success: true,
            items,

            ...(counter === undefined ?
                {
                    features,
                    condition,
                    showOnly,
                    location,
                    itemsCount,
                    rankCategory,
                    pageCount: Math.ceil(itemsCount / limit)
                } : {}
            )
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
    create,
    delete: _delete,
    deleteAll,
    getPublicationById,
    getPublicationByUser,
    getPublications,
    Search

}


