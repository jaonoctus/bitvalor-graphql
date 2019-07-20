const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLEnumType
} = require('graphql')

const ExchangeIDType = new GraphQLEnumType({
    name: 'ExchangeID',
    description: 'Código identificador da Exchange',
    values: {
        ARN: { value: 'ARN', description: 'Arena Bitcoin' },
        B2U: { value: 'B2U', description: 'BitcoinToYou' },
        BAS: { value: 'BAS', description: 'Basebit' },
        BIV: { value: 'BIV', description: 'Bitinvest' },
        BSQ: { value: 'BSQ', description: 'Bitsquare' },
        BTD: { value: 'BTD', description: 'BitcoinTrade' },
        BZX: { value: 'BZX', description: 'Braziliex' },
        CAM: { value: 'CAM', description: 'BitCambio' },
        FLW: { value: 'FLW', description: 'flowBTC' },
        FOX: { value: 'FOX', description: 'FoxBit' },
        LOC: { value: 'LOC', description: 'LocalBitcoins' },
        MBT: { value: 'MBT', description: 'Mercado Bitcoin' },
        NEG: { value: 'NEG', description: 'Negocie Coins' },
        PAX: { value: 'PAX', description: 'Paxful' },
        PFY: { value: 'PFY', description: 'Profitfy' },
        WAL: { value: 'WAL', description: 'Walltime' }
    }
})

const ExchangeType = new GraphQLObjectType({
    name: 'Exchange',
    fields: () => ({
        id: { type: ExchangeIDType },
        name: { type: GraphQLString },
        color: { type: GraphQLString },
        url: { type: GraphQLString },
        url_book: { type: GraphQLString }
    })
})

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: () => ({
            exchange: {
                type: ExchangeType,
                args: {
                    id: { type: ExchangeIDType }
                },
                resolve: async (root, { id }, context) => {
                    const exchanges = await context.exchangesLoader()

                    const exchange = exchanges[id]

                    return exchange
                }
            }
        })
    })
})

module.exports = schema