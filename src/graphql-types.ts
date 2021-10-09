import {GraphQLFloat, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString} from 'graphql'
import {Movie} from './models'
// import { resolver } from 'graphql-sequelize'
const {resolver} = require('graphql-sequelize')


export const Query  = new GraphQLObjectType({
    name: 'Query',
    description: 'Root query',
    fields: () => ({
        movie: {
            type: MovieType,
            description: 'A single movies available in our date store',
            args: {
                id: {type: GraphQLInt}
            },
            resolve: (parent, args) => ({})
        },
        movies: {
            type: GraphQLList(MovieType),
            description: 'List of movies available in our date store',
            resolve: resolver(Movie)
        },
        person: {
            type: PersonType,
            description: 'A single person in show business',
            args: {
                id: {type: GraphQLInt}
            },
            resolve: (parent, args) => ({})
        },
        people: {
            type: GraphQLList(PersonType),
            description: 'List of people in show business',
            resolve: () => ([])
        },
        genres: {
            type: GraphQLList(GenreType),
            description: 'List of all available genres',
            resolve: () => ([])
        },
        cast: {
            type: GraphQLList(CastType),
            description: 'List of cast members across all movies',
            resolve: () => ([])
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
        vote_average: {type: GraphQLFloat}
    })
})

export const PersonType = new GraphQLObjectType({
    name: 'Person',
    description: 'This represents the person object',
    fields: () => ({
        person_id: {type: GraphQLNonNull(GraphQLInt)},
        person_name: {type: GraphQLString},
    })
})

export const CastType = new GraphQLObjectType({
    name: 'Cast',
    description: 'This represents the one to many relationship between cast and movie objects',
    fields: () => ({
        movie_id: {type: GraphQLNonNull(GraphQLInt)},
        person_id: {type: GraphQLNonNull(GraphQLInt)},
        character_name: {type: GraphQLString},
        cast_order: {type: GraphQLInt},
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
