import { storageService } from './storageService.js'

export const userService = {
    getUser,
    updateUser,
}

function getUser() {
    const user = {
        name: 'Guest-user',
        coins: 1500,
        assets: [{symbol: 'ethereum', cost: '1400', qty: 1.1439871219735414, marketPrice: 1223.79}],
        transactions: [{type: 'buy', symbol: 'ethereum', cost: '1400', qty: 1.1439871219735414}]
    }
    storageService.store('Logged-In User', user)
    return user
}

function updateUser(coin, price, amount, marketPrice) {
    const user = getUser()
    user.coins = user.coins - +price

    const transaction = makeTransaction('buy', coin, price, amount)
    console.log('transaction:',transaction);
    const asset = makeAsset(coin, price, amount, marketPrice)
    console.log('asset:',asset);

    user.transactions.push(transaction)
    user.assets.push(asset)
    
    storageService.store('Logged-In User', user)
}

function makeAsset(symbol, cost, qty, marketPrice) {
    return {
        symbol,
        cost,
        qty,
        marketPrice
    }
}

function makeTransaction(type, symbol, cost, qty) {
    return {
        type,
        symbol,
        cost,
        qty,
    }
}