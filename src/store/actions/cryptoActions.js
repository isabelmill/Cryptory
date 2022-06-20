import { cryptoService } from "../../srvices/cryptoService"

export function loadCoinMarketData(coin) {
    return async (dispatch) => {
        try {
            const data = await cryptoService.getMarketData(coin)
            dispatch({ type: 'SET_MARKET_DATA', data })
        } catch (err) {
            console.log('err:', err)
        }

    }
}

export function loadCoinData(coin) {
    return async (dispatch) => {
        try {
            const coinData = await cryptoService.getCoinData(coin)
            dispatch({ type: 'SET_COIN_DATA', coinData })
        } catch (err) {
            console.log('err:', err)
        }

    }
}