import dotenv from 'dotenv-safe'
dotenv.config()

import express from 'express'
import {graphqlHTTP} from 'express-graphql'
import {GraphQLSchema} from 'graphql'
import {Query} from './graphql-types'

const app = express()

const schema = new GraphQLSchema({ query: Query });

app.use('/api', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));

app.listen(3000, () => 'Server running')
