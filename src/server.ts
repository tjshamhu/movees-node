import express from 'express'
import {graphqlHTTP} from 'express-graphql'
import {GraphQLSchema, GraphQLObjectType, GraphQLString} from 'graphql'

const app = express()

const graphQLSchema  = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'helloworld',
        fields: () => ({
            name: {
                type: GraphQLString,
                resolve: () => 'Hello World'
            }
        })
    })
})

app.use('/graphql', graphqlHTTP({
    schema: graphQLSchema,
    graphiql: true
}))

app.listen(3000, () => 'Server running')
