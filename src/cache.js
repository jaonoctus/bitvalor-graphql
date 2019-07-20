const cacheManager = require('cache-manager')
const redisStore = require('cache-manager-redis')

const redisConfig = {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    user: process.env.REDIS_USER || '',
    auth_pass: process.env.REDIS_PASS || ''
}

const cache = cacheManager.caching({
    store: redisStore,
    ...redisConfig,
    db: 0,
    ttl: 600
})

module.exports = cache