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
    movie_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: Movie, key: 'movie_id'}
    },
    person_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: Person, key: 'person_id'}
    },
    character_name: {type: DataTypes.STRING},
    cast_order: {type: DataTypes.INTEGER},
}, {
    tableName: 'movie_cast',
    timestamps: false
})

export const Genre = sequelize.define('genre', {
    genre_id: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
    genre_name: {type: DataTypes.STRING},
}, {
    tableName: 'genre',
    timestamps: false
})

const MovieGenre = sequelize.define('MovieGenre', {
    movie_id: {
        type: DataTypes.INTEGER,
        references: {model: Movie, key: 'movie_id'}
    },
    genre_id: {
        type: DataTypes.INTEGER,
        references: {model: Genre, key: 'genre_id'}
    }
}, {
    timestamps: false,
    tableName: 'movie_genres'
});

// remove sequelize default props
Cast.removeAttribute('id')
MovieGenre.removeAttribute('id')

// associations
Movie.hasMany(Cast, {foreignKey: 'movie_id', as: 'cast'})
Cast.belongsTo(Movie, {foreignKey: 'movie_id', as: 'movie'})
Person.hasMany(Cast, {foreignKey: 'person_id', as: 'castings'})
Cast.belongsTo(Person, {foreignKey: 'person_id', as: 'person'})
Movie.belongsToMany(Genre, {through: MovieGenre, foreignKey: 'movie_id'})
Genre.belongsToMany(Movie, {through: MovieGenre, foreignKey: 'genre_id'})
