import { Sequelize, DataTypes } from 'sequelize'

const {DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE} = process.env
export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: DB_HOST,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE
})

export const Movie = sequelize.define('movie', {
    movie_id: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
    title: {type: DataTypes.STRING},
    overview: {type: DataTypes.STRING},
    budget: {type: DataTypes.FLOAT},
    release_date: {type: DataTypes.DATE},
    vote_average: {type: DataTypes.FLOAT}
}, {
    tableName: 'movie',
    timestamps: false
})

export const Person = sequelize.define('Person', {
    person_id: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
    person_name: {type: DataTypes.STRING, allowNull: false},
}, {
    tableName: 'person',
    timestamps: false
})

export const Cast = sequelize.define('cast', {
    movie_id: {type: DataTypes.INTEGER, allowNull: false},
    person_id: {type: DataTypes.INTEGER, allowNull: false},
    character_name: {type: DataTypes.STRING},
    cast_order: {type: DataTypes.INTEGER},
}, {
    tableName: 'cast',
    timestamps: false
})
