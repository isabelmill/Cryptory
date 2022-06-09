import Axios from 'axios'
import { storageService } from './storageService.js'

let axios = Axios.create({
    withCredentials: false,
})

export const cryptoService = {
    getMarketPrice,
}

const KEY = 'coins'
let gCoins = storageService.load(KEY) || null

async function getMarketPrice(coin = 'ethereum') {
    try {
        if (gCoins) return gCoins
        const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=14&interval=daily`)
        gCoins = res.data
        storageService.store(KEY, gCoins)
        return res.data
    } catch (error) {
        throw error
    }
}