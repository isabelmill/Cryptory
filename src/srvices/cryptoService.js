import Axios from 'axios'
// import { storageService } from './storageService.js'

let axios = Axios.create({
    withCredentials: false,
})

export const cryptoService = {
    getMarketData,
    getCoinData,
}

async function getMarketData(coin = 'bitcoin') {
    try {
        const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=14&interval=daily`)
        res.data.prices.length = 14
        let marketPrice = res.data.prices.map((data) => {
            return {
                time: makeDate(data[0]),
                value: data[1],
            }
        })
        return marketPrice
    } catch (error) {
        throw error
    }
}

async function getCoinData(coin = 'bitcoin') {
    try {
        const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}?tickers=true&market_data=true&community_data=true&developer_data=false&sparkline=false
        `)
        let coinData = {
            id: res.data.id,
            coinPrice: res.data.market_data.current_price.usd,
            coinImage: res.data.image.thumb
        }
        return coinData
    } catch (error) {
        throw error
    }
}

const makeDate = (date) => {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate()
    let year = d.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day;

    let newDate = [year, month, day].join('-')
    return newDate
}