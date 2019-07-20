const cacheManager = require('cache-manager')
const redisStore = require('cache-manager-redis')

const cache = cacheManager.caching({
    store: redisStore,
    auth_pass: '',
    db: 0,
    ttl: 600
})

module.exports = cache