const INITIAL_STATE = {
    data: null,
    coinData: null,
}

export function cryptoReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_MARKET_DATA':
            return {
                ...state,
                data: action.data
            }
        case 'SET_COIN_DATA':
            return {
                ...state,
                coinData: action.coinData
            }

        default:
            return state;
    }
}