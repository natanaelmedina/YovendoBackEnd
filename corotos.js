const axios = require('axios').default
const https = require('https')
const { locations } = require('./plugin/db/models/Location')
const md5ToUuid = require('md5-to-uuid');
const md5 = require('md5');
const $ = require("jquery")

const req = axios.create({
    baseURL: `https://www.corotos.com.do`,
    withCredentials: true,
    headers: {
        common: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjYwNjIyIiwic2NwIjoiYXBwX3VzZXIiLCJhdWQiOm51bGwsImlhdCI6MTYyMDE3MzgwOCwiZXhwIjoxNjI3OTQ5ODA4LCJqdGkiOiIyMjE1MGVmNS01MjY1LTQ1ZDctOTBmYS00MjAxOGVkODRhNjMifQ.JOeXwByFta8buD-1RncFtgtDhAYBR1rFO1sHZRUwlAQ",
            Cookies: `_pulse2data=e4c32cff-04c5-4225-b2a9-b08ac48cc269%2Cv%2C%2C1604873892662%2CeyJpc3N1ZWRBdCI6IjIwMjAtMDUtMjRUMTc6MDA6MjlaIiwiZW5jIjoiQTEyOENCQy1IUzI1NiIsImFsZyI6ImRpciIsImtpZCI6IjIifQ..dwx05JgOAmztLsdFgSFRew.ojLCZetuyxM3e4mpMV1QaDTW8vZoi4XYdDwgJLI1_lSjHhy93lz8Hq83EGlGYFlGnI9i9NLHdGndMuQ9x9Z9sZsl-9medWTuQo2JhLpUSCbfpWC5t2yJC_p9eH6GjZhihhjqrRKXcBjo3doYfepjoCHo7GYgPJRrCU4WCkHdqRs8JRZg7PIeZkFtbDIPIlybSFGKqijeS5lIRuXdatbpPjzuFpoFMtL_jC6etvRFYho.3wjtMtq9YWrQctiORC7deg%2C3280134865033241768%2C1604887392662%2Ctrue%2C%2CeyJraWQiOiIyIiwiYWxnIjoiSFMyNTYifQ..i2NiUCmzpFnr3H3VNG0XLyTeR9PDbtOd3MTXGB7nTKA; __auc=d123edbe1788068ec4d3273d47a; _hjTLDTest=1; _hjid=35d2187c-aac1-48fa-a888-97130de980b1; ki_u=d4ad62fe-4e6d-d9cd-bb35-4942; __cfduid=d3f35eeb28f11950e1c9c5ed69ea921661619999367; _corotos_production_session=6b0cbb57896383955807729b6ffc44c8; ki_r=; _cc_id=ef62001e71745ebc77ee7fc822dea77c; __gads=ID=3a62c02fdf0f520e:T=1621146457:S=ALNI_MYrwBr1X5TX1W9SMYKmep9XbhaC2A; auth.strategy=cookie; ki_s=212568%3A1.0.0.1.2%3B212570%3A12.0.0.0.2%3B214477%3A3.0.0.1.2%3B214831%3A1.0.0.0.2%3B215116%3A1.0.0.0.2; _corotos_fingerprint=708691383705593813; _gid=GA1.3.390153106.1622034253; __asc=62e8ce45179ae96d509608a7dc3; _ga=GA1.1.914513795.1617062063; _ga_S4YWBZQV9L=GS1.1.1622131800.24.1.1622134567.0; ki_t=1617062067122%3B1622133402389%3B1622134567818%3B24%3B301`
        },
    },
})
const category = [
    // {
    //     link: "/sc/electr%C3%B3nica/celulares-tabletas",
    //     categoryId: 11
    // },
    {
        link: "/sc/veh%C3%ADculos/carros",
        categoryId: 2
    }
]
const { parse } = require('node-html-parser')
for (const { link, categoryId } of category) {
    !async function run(page) {
        const { data } = await req.get(page || link)
        const rootMs = parse(data)
        const listNode = rootMs.querySelectorAll('.listing__item .item__media a')
        while (listNode.length > 0) {

            try {
                const itemNode = listNode.shift()
                const href = itemNode.getAttribute('href')
                const { data } = await req.get(href)
                const root = parse(data)
                let freeShipping = false
                let conditionId = 1
                let loc = root.querySelector("#breadcrumb_province a").innerText.trim().toUpperCase()
                const locationId = locations.findIndex(e => e.name.toUpperCase() == loc) + 1
                let item = href.substr(0, href.indexOf('?'))
                corotoId = item.substr(item.lastIndexOf('-') + 1)
                const id = md5ToUuid(md5(corotoId))

                const { data: script } = await req.get(item + "/show_phone", {
                    responseType: "text",
                    headers: { "x-requested-with": "XMLHttpRequest" }
                })

                let phone = script.substr(script.lastIndexOf('tel:') + 4)
                phone = phone.substr(0, 10).replace(/[^0-9]/, '')
                const name = root.querySelector("h3.author__name").innerText.trim()
                const profileImage = root.querySelector(".author__image").getAttribute('style').replace("background-image: url('", '').replace("');", '')

                const features = {}
                const spec = root.querySelectorAll(".post__specs li")
                for (const el of spec) {
                    const label = el.querySelector(".specs__label").innerText
                    const value = el.querySelector(".specs__value").innerText
                    if (label == "Condición") {
                        conditionId = value == "Usado" ? 2 : 1
                    } else if (label == "Entrega a domicilio") {
                        freeShipping = value == "Sí"
                    } else if (label == "Sector") {

                    } else {
                        features[label] = {
                            value: value,
                            filtrable: true,
                            type: value > 0 ? 'Number' : ['Sí', 'No'].includes(value) ? 'Boolean' : 'Text'
                        }
                    }

                }
                const thumbnail = itemNode.getAttribute('style').replace("background-image: url('", '').replace("');", '')
                const images = [...root.querySelectorAll(".carousel-cell img")].map(e => e.getAttribute('src'))
                images.length === 0 ? images.push(thumbnail) : null
                const items = {

                    id,
                    title: root.querySelector('h1.post__title').innerText,
                    desc: [...root.querySelectorAll('.post__description > p')].map(e => e.innerText).join('\n'),
                    price: parseInt(root.querySelector('h2.post__price').innerText.replace(/[^0-9]/g, '') || 0),
                    currency: "DOP",
                    freeShipping,
                    conditionId,
                    userId: 1,
                    thumbnail,
                    status: "A",
                    locationId: locationId ? locationId : 1,
                    categoryId,
                    images,
                    features,
                }
                createUser(name, phone, profileImage).then((user) => {

                    items.userId = user.id
                    axios.post('https://yovendo.do/Api/Publication/Create', items, {
                        httpsAgent: new https.Agent({
                            rejectUnauthorized: false,
                        })
                    })
                        .then(({ data }) => console.log(data))
                        .catch(({ message }) => console.log(message))

                }).catch(({ message }) => console.log(message))

                //console.log(items) 
            } catch (error) {
                console.log(error)
            }
        }

        const more = rootMs.querySelector('#load-more-listings')
        if (more) {
            run(more.getAttribute('href'))
        }


    }()
}


async function createUser(name, phone, profileImage) {
    const { data } = await axios.post('https://yovendo.do/Api/User/createUserExternal', { name, phone, profileImage }, {
        httpsAgent: new https.Agent({
            rejectUnauthorized: false,
        })
    })
    return data.data[0]
}