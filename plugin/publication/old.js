





        // console.log('filtros', new Date())

        // for (let index = 0; index < publications.length; index++) {
        //     const item = publications[index]
        //     const { features } = item
        //     let includeFeature = true
        //     if (items.features && items.features.length > 0)
        //         for (const key in filters) {
        //             const keys = []
        //             for (const feature of features) {
        //                 keys.push(feature.name)
        //                 if (feature.name !== key)
        //                     continue
        //                 const splitted = String(filters[key]).toUpperCase().split("|")
        //                 const value = feature.value.toUpperCase()


        //                 if (!splitted.includes(value)) {
        //                     includeFeature = false
        //                     break
        //                 }
        //             }
        //             if (!keys.includes(key) || !includeFeature) {
        //                 includeFeature = false
        //                 break
        //             }
        //         }
        //     if (includeFeature) {
        //         if (items.features && items.features.length > 0)
        //             for (const { id, value, name } of features) {
        //                 const { values } = find(featuresData, { id }) || {}
        //                 if (values) {
        //                     if (values[value])
        //                         values[value]++
        //                     else
        //                         values[value] = 1

        //                 } else {
        //                     featuresData.push({
        //                         id,
        //                         name,
        //                         values: { [value]: 1 }
        //                     })
        //                 }

        //             }
        //         location[item["location.name"]] ? (location[item["location.name"]].cnt++) : (location[item["location.name"]] = { cnt: 1, id: item["location.id"] })
        //         condition[item["condition.name"]] ? (condition[item["condition.name"]].cnt++) : (condition[item["condition.name"]] = { cnt: 1, id: item["condition.id"] })
        //         item.freeShipping && (showOnly["Envío gratis"] ? (showOnly["Envío gratis"].cnt++) : (showOnly["Envío gratis"] = { name: "free", cnt: 1 }))
        //         item.authorizedSeller && (showOnly["Tiendas"] ? (showOnly["Tiendas"].cnt++) : (showOnly["Tiendas"] = { name: "store", cnt: 1 }))
        //         item.guarantee && (showOnly["Garantía"] ? (showOnly["Garantía"].cnt++) : (showOnly["Garantía"] = { name: "guarantee", cnt: 1 }))
        //         categories.add(item.categoryId)
        //         item.condition = item["condition.name"]
        //         items.push(pick(item, ["id", "title", "price", "currency", "thumbnail", "condition"]))
        //     }
        // }

        // console.log('filtros end', new Date())

        // console.log('pagination', new Date())
        // const page = parseInt(pg) || 1,
        //     limit = 48,
        //     offset = (page - 1) * limit,
        //     pagedItems = drop(items, offset).slice(0, limit);

        // console.log('pagination end', new Date())