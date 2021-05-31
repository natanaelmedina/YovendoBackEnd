const { DataTypes } = require('sequelize');
const sequelize = require('../conn')
//locations
const locations = [{ "name": "Azua" }, { "name": "Bahoruco" }, { "name": "Barahona" }, { "name": "Dajabón" }, { "name": "Duarte" }, { "name": "Elías Piña" }, { "name": "El Seibo" }, { "name": "Espaillat" }, { "name": "Hato Mayor" }, { "name": "Hermanas Mirabal" }, { "name": "Independencia" }, { "name": "La Altagracia" }, { "name": "La Romana" }, { "name": "La Vega" }, { "name": "María Trinidad Sánchez" }, { "name": "Monseñor Nouel" }, { "name": "Monte Cristi" }, { "name": "Monte Plata" }, { "name": "Pedernales" }, { "name": "Peravia" }, { "name": "Puerto Plata" }, { "name": "Samaná" }, { "name": "Sánchez Ramírez" }, { "name": "San Cristóbal" }, { "name": "San José de Ocoa" }, { "name": "San Juan" }, { "name": "San Pedro de Macorís" }, { "name": "Santiago" }, { "name": "Santiago Rodríguez" }, { "name": "Santo Domingo" }, { "name": "Valverde" }]
const Location = sequelize.define("location", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    coordinates: {
        type: DataTypes.JSONB,
        allowNull: true
    }

}, {
    freezeTableName:true,
    sequelize,
    modelName: 'location',
    hooks: {
        async afterSync(opts) {
            //const models = require('./index')
            opts.force && await Location.bulkCreate(locations)
        }
    }
});

module.exports = {Location,locations}


