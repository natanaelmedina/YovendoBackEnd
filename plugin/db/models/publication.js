
const { DataTypes } = require('sequelize');
const sequelize = require('../conn')
const uuid = require('uuid')
const moment = require('moment')

const dummyData = [
    {
        userId: 1,
        title: "Toyota corolla 1996",
        desc: "Vendo mi carro por motivo de superación en muy buenas condiciones",
        images: ["https://cdk.todobusco.com/galery/5f1867bbf3688-toyota-corolla-1996-los-restauradores-distrito-nacional-823361.jpg"],
        thumbnail: "https://cdk.todobusco.com/galery/5f1867bbf3688-toyota-corolla-1996-los-restauradores-distrito-nacional-823361.jpg",
        status: "A",
        categoryId: 2,
        locationId: 1,
        features: {
            "Tipo": "Sedán",
            "Tracción": "4WD",
            "Color": "Blanco",
            "Transmisión": "Mecánica",
            "aros": "Hierro",
            "motor": "2.0",
            "puertas": "6"
        },
        price: 100000,
        conditionId: 2
    },
    {
        userId: 1,
        title: "Honda civic 2016",
        desc: "en excelente condiciones",
        images: ["https://1000autosrd.com/oc-content/uploads/2/1691.jpg"],
        thumbnail: "https://1000autosrd.com/oc-content/uploads/2/1691.jpg",
        status: "A",
        categoryId: 2,
        locationId: 2,
        features:
        {
            "Tipo": "Sedán",
            "Tracción": "2WD",
            "Color": "Rojo",
            "Transmisión": "Automática",
            "aros": "magnesio",
            "motor": "4litros",
            "puertas": "4"
        }
        ,
        price: 200000,
        conditionId: 2,
        freeShipping: true
    }
]


const Publication = sequelize.define("publication", {

    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        unique: true,
        defaultValue: uuid.v4,

    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // Model attributes are defined here
    title: {
        type: DataTypes.STRING(300),
        allowNull: false
    },
    desc: {
        type: DataTypes.TEXT
    },
    images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    },
    thumbnail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.CHAR(1),
        allowNull: false,
        values: ["A", 'I', 'D'],
        defaultValue: "A"
    },
    sponsorOrder: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 9999
    },
    locationId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    buyingFormat: {
        type: DataTypes.STRING,
        allowNull: false,
        values: ["Comprar Ahora", "Subasta", "Contactar"],
        defaultValue: "Contactar"
    },
    freeShipping: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    guarantee: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    isStore: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    features: {
        type: DataTypes.JSONB,
        defaultValue: {}
    },
    currency: {
        type: DataTypes.CHAR(3),
        allowNull: false,
        values: ["DOP", "US"],
        defaultValue: "DOP"
    },
    price: {
        type: DataTypes.DECIMAL(20,2),
        allowNull: false
    },
    qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    conditionId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    endDate: {
        type: DataTypes.DATEONLY,
        defaultValue: () => moment().add(30, 'days')
    },


}, {
    indexes: [

        {
            fields: ['features'],
            using: 'gin',
            operator: 'jsonb_path_ops'
        },
        {
            fields: ['categoryId', 'conditionId', 'price', 'isStore', 'guarantee', 'freeShipping', 'locationId', 'status', 'buyingFormat'],
            using: 'btree',
        },
        {
            unique: true,
            fields: ['userId', 'title', 'price']
        }
    ],
    sequelize,
    freezeTableName: true,
    modelName: 'publication',
    hooks: {
        async afterSync(opts) {
            opts.force && await up()
            const models = require('./index')
            Publication.hasMany(models.publicationViewing, {
                foreignKey: "publicationId",
                targetKey: "id",
                onDelete: 'CASCADE',
                as: 'views'
            })
            Publication.hasMany(models.Chat)
            Publication.belongsTo(models.Condition, { foreignKey: "conditionId" })
            Publication.belongsTo(models.Location, { foreignKey: "locationId" })
            Publication.belongsTo(models.Category, { foreignKey: "categoryId" })
            // opts.force await Publication.bulkCreate(new Array(4000).fill(dummyData[index % 2]), { returning: false })

        }
    }

});

module.exports = Publication


async function up() {
    const table = Publication.getTableName()
    const fullTable = `public."${table}"`

    const _search = "_search"
    const _fullSearch = "_fullSearch"
    const transaction = await sequelize.transaction()
    try {

        await sequelize.query(`DROP TRIGGER IF EXISTS tsVector_${table}_tri on ${fullTable}`, { transaction });
        await sequelize.query(`ALTER TABLE ${fullTable} ADD COLUMN ${_search} TSVECTOR,ADD ${_fullSearch} TSVECTOR;`, { transaction })
        await sequelize.query(`CREATE INDEX ${table}_${_search} ON ${fullTable} USING gin(${_search})`, { transaction })
        await sequelize.query(`CREATE INDEX ${table}_${_fullSearch} ON ${fullTable} USING gin(${_fullSearch})`, { transaction })
        await sequelize.query(`
        CREATE OR REPLACE FUNCTION publication_tsVector()
        RETURNS trigger AS
            $BODY$
                begin
                new.${_fullSearch} :=
                    setweight(to_tsvector('pg_catalog.spanish', unaccent( coalesce( new.title,      ''))), 'A') ||
                    setweight(to_tsvector('pg_catalog.spanish', unaccent( coalesce( new.desc,  ''))), 'B') ;
                new.${_search} :=to_tsvector('pg_catalog.spanish', unaccent( coalesce( new.title,      '')));
                return new;
                end
            $BODY$
        LANGUAGE plpgsql VOLATILE
        COST 100;`, { transaction }
        )
        await sequelize.query(`CREATE TRIGGER tsVector_${table}_tri
        BEFORE INSERT OR UPDATE
        ON ${fullTable}
        FOR EACH ROW
        EXECUTE PROCEDURE publication_tsVector()`, { transaction })
        transaction.commit()
    } catch (error) {
        console.log(error.message)
        transaction.rollback()
    }
}

