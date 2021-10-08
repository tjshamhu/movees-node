import express from 'express'
import expressGraphQL from 'express-graphql'

const app = express()

app.use('/graphql', expressGraphQL({
    graphiql: true
}))

app.listen(3000, () => 'Server running')
