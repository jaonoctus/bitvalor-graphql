const express = require('express')
const graphqlHTTP = require('express-graphql')
const fetch = require('node-fetch')
const schema = require('./src/schema')

const app = express()

const fetchExchanges = () => fetch('https://api.bitvalor.com/v1/exchanges.json')
    .then(response => response.json())

app.use('/', graphqlHTTP({
    schema,
    context: {
        exchanges: fetchExchanges()
    },
    graphiql: true
}))

app.listen(4000, () => { console.log('Server running...') })