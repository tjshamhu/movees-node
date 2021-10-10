import dotenv from 'dotenv-safe'
dotenv.config()

import express from 'express'
import {graphqlHTTP} from 'express-graphql'
import {GraphQLSchema} from 'graphql'
import {sequelize} from './models'
import {Query} from './graphql-types'

const PORT = process.env.PORT || 3000
const app = express()

const schema = new GraphQLSchema({ query: Query });

app.use('/api', graphqlHTTP({
    schema: schema,
    graphiql: true,
}))

app.listen(PORT, () => console.log('Server running'))

sequelize.authenticate()
    .then(() => console.log('Database connection established'))
    .catch((error) => {
        console.error('Could not connecting to database, exiting...', error.message)
        process.exit(1)
    })
