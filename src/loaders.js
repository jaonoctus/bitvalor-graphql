const fetch = require('node-fetch')
const cache = require('./cache')

const ttl = 70

const fetchExchanges = () => fetch('https://api.bitvalor.com/v1/exchanges.json')
    .then(response => response.json())

const exchangesLoader = () => {
    return cache.wrap('exchanges', fetchExchanges, { ttl })
}

exports.exchangesLoader = exchangesLoader