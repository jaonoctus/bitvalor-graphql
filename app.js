const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./src/schema')
const { exchangesLoader } = require('./src/loaders')

const app = express()

app.use('/', graphqlHTTP({
    schema,
    context: {
        exchangesLoader
    },
    graphiql: true
}))

const port = process.env.PORT || 4000

app.listen(port, () => { console.log('Server running...', `http://localhost:${port}`) })