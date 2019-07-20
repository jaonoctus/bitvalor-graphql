const fetch = require('node-fetch')
const cache = require('./cache')

const minutes = (min = 1) => 60 * min

const fetchExchanges = () => fetch('https://api.bitvalor.com/v1/exchanges.json')
    .then(response => response.json())

const exchangesLoader = () => {
    return cache.wrap('exchanges', fetchExchanges, { ttl: minutes(2) })
}

exports.exchangesLoader = exchangesLoader