import {GraphQLFloat, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString} from 'graphql'
import {Cast, Genre, Movie, Person} from './models'
import {Op} from 'sequelize'

const DEFAULT_PAGE = 1
const DEFAULT_PAGE_SIZE = 25

export const Query  = new GraphQLObjectType({
    name: 'Query',
    description: 'Root query',
    fields: () => ({
        movies: {
            type: GraphQLList(MovieType),
            description: 'List of movies available in our date store',
            args: {
                page: {type: GraphQLInt},
                pageSize: {type: GraphQLInt},
                searchTerm: {type: GraphQLString}
            },
            resolve: async (_, {page = DEFAULT_PAGE, pageSize = DEFAULT_PAGE_SIZE, searchTerm = ''}) => Movie.findAll({
                include: ['cast', 'genres'],
                limit: Math.abs(pageSize),
                offset: Math.abs(pageSize * (page - 1)),
                where: {
                    [Op.or]: ['title'].map(field => ({[field]: {[Op.iLike]: `%${searchTerm}%`}}))
                }
            })
        },
        people: {
            type: GraphQLList(PersonType),
            description: 'List of people in show business',
            args: {
                page: {type: GraphQLInt},
                pageSize: {type: GraphQLInt},
                searchTerm: {type: GraphQLString}
            },
            resolve: async (_, {page = DEFAULT_PAGE, pageSize = DEFAULT_PAGE_SIZE, searchTerm = ''}) =>  Person.findAll({
                include: ['castings'],
                limit: Math.abs(pageSize),
                offset: Math.abs(pageSize * (page - 1)),
                where: {
                    [Op.or]: ['title'].map(field => ({[field]: {[Op.iLike]: `%${searchTerm}%`}}))
                }
            })
        },
        genres: {
            type: GraphQLList(GenreType),
            description: 'List of all available genres',
            resolve: async () => Genre.findAll()
        },
        cast: {
            type: GraphQLList(CastType),
            description: 'List of cast members across all movies',
            resolve: async () => Cast.findAll()
        }
    })
})

export const MovieType = new GraphQLObjectType({
    name: 'Movie',
    description: 'This represents the movie object',
    fields: () => ({
        movie_id: {type: GraphQLNonNull(GraphQLInt)},
        title: {type: GraphQLString},
        overview: {type: GraphQLString},
        budget: {type: GraphQLFloat},
        release_date: {type: GraphQLString},
        vote_average: {type: GraphQLFloat},
        cast: {type: GraphQLList(CastType)},
        genres: {type: GraphQLList(GenreType)}
    })
})

export const PersonType = new GraphQLObjectType({
    name: 'Person',
    description: 'This represents the person object',
    fields: () => ({
        person_id: {type: GraphQLNonNull(GraphQLInt)},
        person_name: {type: GraphQLString},
        castings: {type: GraphQLList(CastType)}
    })
})

export const CastType = new GraphQLObjectType({
    name: 'Cast',
    description: 'This represents the one to many relationship between cast and movie objects',
    fields: () => ({
        movie_id: {type: GraphQLNonNull(GraphQLInt)},
        person_id: {type: GraphQLNonNull(GraphQLInt)},
        character_name: {type: GraphQLString},
        cast_order: {type: GraphQLInt}
    })
})



export const GenreType = new GraphQLObjectType({
    name: 'Genre',
    description: 'This represents the genre object',
    fields: () => ({
        genre_id: {type: GraphQLNonNull(GraphQLInt)},
        genre_name: {type: GraphQLString},
    })
})

export const MovieGenreType = new GraphQLObjectType({
    name: 'MovieGenre',
    description: 'This represents the many to many relationship between movies and genres',
    fields: () => ({
        movie_id: {type: GraphQLNonNull(GraphQLInt)},
        genre_id: {type: GraphQLNonNull(GraphQLInt)},
    })
})
