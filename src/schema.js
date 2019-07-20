const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLEnumType,
    GraphQLFloat
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

const brlDepositResolver = data => {
    let [ porcentagem, valorFixado ] = data.in_BRL
    
    if (porcentagem === 0) return `R$${valorFixado}`
    
    porcentagem = (porcentagem * 100).toFixed(2)
    valorFixado = valorFixado.toFixed(2)

    return `${porcentagem}% + R$${valorFixado}`
}

const PorcentagemValorFixado = new GraphQLObjectType({
    name: 'PorcentagemValorFixado',
    fields: () => ({
        percentage: { type: GraphQLFloat },
        fixed: { type: GraphQLFloat }
    })
})

const feeResolver = (data, key) => {
    const [ percentage, fixed ] = data[key]

    return { percentage, fixed }
}

const FeeType = new GraphQLObjectType({
    name: 'ExchangeFee',
    fields: () => ({
        in_BRL: { type: PorcentagemValorFixado, resolve: data => feeResolver(data, 'in_BRL') },
        in_BTC: { type: PorcentagemValorFixado, resolve: data => feeResolver(data, 'in_BTC') },
        out_BRL: { type: PorcentagemValorFixado, resolve: data => feeResolver(data, 'out_BRL') },
        out_BTC: { type: PorcentagemValorFixado, resolve: data => feeResolver(data, 'out_BTC') },
        trade_book: { type: PorcentagemValorFixado, resolve: data => feeResolver(data, 'trade_book') },
        trade_market: { type: PorcentagemValorFixado, resolve: data => feeResolver(data, 'trade_market') }
    })
})

const ExchangeType = new GraphQLObjectType({
    name: 'Exchange',
    fields: () => ({
        id: { type: ExchangeIDType },
        name: { type: GraphQLString },
        color: { type: GraphQLString },
        url: { type: GraphQLString },
        url_book: { type: GraphQLString },
        fees: { type: FeeType, resolve: data => data.fees }
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