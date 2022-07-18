import Axios from 'axios'
// import { storageService } from './storageService.js'

let axios = Axios.create({
    withCredentials: false,
})

export const cryptoService = {
    getMarketData,
    getCoinData,
    getCoinMarketPrice,
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
        const newsData = await getCryptoNews(coin)
        newsData.articles.length = 4
        let coinData = {
            id: res.data.id,
            symbol: res.data.symbol,
            rank: res.data.market_cap_rank,
            coinPrice: res.data.market_data.current_price.usd,
            coinImage: res.data.image.thumb,
            markerCap: res.data.market_data.market_cap.usd,
            high24h: res.data.market_data.high_24h.usd,
            low24h: res.data.market_data.low_24h.usd,
            priceChange24: res.data.market_data.price_change_24h_in_currency.usd,
            priceChange24percent: res.data.market_data.price_change_percentage_24h_in_currency.usd,
            news: newsData.articles,
        }
        return coinData
    } catch (error) {
        throw error
    }
}

async function getCoinMarketPrice(coin = 'bitcoin') {
    try {
        const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}?tickers=true&market_data=true&community_data=true&developer_data=false&sparkline=false
        `)
        return res.data.market_data.current_price.usd
    } catch (error) {
        throw error
    }
}

async function getCryptoNews(coin = 'bitcoin') {
    const options = {
        method: 'GET',
        url: 'https://free-news.p.rapidapi.com/v1/search',
        params: { q: coin, lang: 'en' },
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
            'X-RapidAPI-Host': 'free-news.p.rapidapi.com'
        }
    };
    
    try {
        const res = await axios.request(options)
        return res.data
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