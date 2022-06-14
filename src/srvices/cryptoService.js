import Axios from 'axios'
// import { storageService } from './storageService.js'

let axios = Axios.create({
    withCredentials: false,
})

export const cryptoService = {
    getMarketData,
    getCoinData,
}

// const KEY = 'coins'
// let gCoins = storageService.load(KEY) || null

async function getMarketData(coin = 'bitcoin') {
    try {
        // if (gCoins) return gCoins
        const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=14&interval=daily`)
        // gCoins = res.data
        // storageService.store(KEY, gCoins)
        return res.data
    } catch (error) {
        throw error
    }
}
async function getCoinData(coin = 'bitcoin') {
    try {
        // if (gCoins) return gCoins
        const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}?tickers=true&market_data=true&community_data=true&developer_data=false&sparkline=false
        `)
        // gCoins = res.data
        // storageService.store(KEY, gCoins)
        return res.data
    } catch (error) {
        throw error
    }
}