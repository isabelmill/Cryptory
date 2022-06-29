import { storageService } from './storageService.js'
import { cryptoService } from './cryptoService'


export const userService = {
    login,
    getLoggedinUser,
    updateUser,
    signup,
    logout,
    query,
    makeTransaction,
    makeAsset,
    getEmptyUser,
}

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const STORAGE_KEY = 'users'

const gDefaultUsers = [
    {
        _id: 'u1',
        wallet: 'iHZ7f22jOdLfvQgBaQkf',
        name: 'Guest-user',
        email: 'Guest-user@gmail.com',
        password: '123',
        coins: 3000,
        assets: [{
            coin: "ethereum",
            id: "Rv8sb",
            symbol: "eth",
            totalCost: 1200,
            totalQty: 1.0856486298209584
        }, {
            coin: "bitcoin",
            id: "IRLZ3",
            symbol: "btc",
            totalCost: 1000,
            totalQty: 0.04730368968779565
        }],
        transactions: [{
            cost: "1000",
            date: 1656287026951,
            id: "FnUoI",
            mult: 47.30368968779565,
            qty: 0.04730368968779565,
            symbol: "bitcoin",
            type: "buy",
            img: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579"

        }, {
            cost: 1200,
            date: 1655994291198,
            id: "1Qp6s",
            mult: 1302.77835578515,
            qty: 1.0856486298209584,
            symbol: "ethereum",
            type: "buy",
            img: "https://assets.coingecko.com/coins/images/279/thumb/ethereum.png?1595348880"
        }],
        img: 'https://image.binance.vision/editor-uploads-original/9c15d9647b9643dfbc5e522299d13593.png'
    },
]

let gUsers = _loadUsers()

function query() {
    let usersToReturn = gUsers;
    return Promise.resolve([...usersToReturn]);
}

function login(userCred) {
    const user = gUsers.find(user => user.email === userCred.email)
    if (!user) return console.log('Cant login no user');
    storageService.store(STORAGE_KEY_LOGGEDIN_USER, user)
    return Promise.resolve({ ...user });
}


function updateUser(userToSave) {
    const idx = gUsers.findIndex(user => user._id === userToSave._id)
    gUsers.splice(idx, 1, userToSave)
    storageService.store(STORAGE_KEY, gUsers)
    storageService.store(STORAGE_KEY_LOGGEDIN_USER, userToSave)
    return Promise.resolve({ ...userToSave });
}

function signup(userToSave) {
    userToSave.coins = +userToSave.coins
    gUsers.push(userToSave)
    storageService.store(STORAGE_KEY, gUsers)
    return Promise.resolve({ ...userToSave })
}
function logout() {
    storageService.store(STORAGE_KEY_LOGGEDIN_USER, gUsers[0])
    const user = storageService.load(STORAGE_KEY_LOGGEDIN_USER)
    return Promise.resolve({ ...user })

}

async function getLoggedinUser() {
    let user = storageService.load(STORAGE_KEY_LOGGEDIN_USER)
    if (!user) logout()
    user = storageService.load(STORAGE_KEY_LOGGEDIN_USER)
    let updatedUser = await userCoins(user)
    user = updatedUser
    return Promise.resolve({ ...user })
}

const userCoins = async (user) => {
    user.assets.forEach(async (asset) => {
        asset.marketPrice = await cryptoService.getCoinMarketPrice(asset.coin)
    })
    return user
}

function _loadUsers() {
    let users = storageService.load(STORAGE_KEY)
    if (!users || !users.length) users = gDefaultUsers
    storageService.store(STORAGE_KEY, users)
    return users
}

function getEmptyUser() {
    return {
        _id: makeId(),
        wallet: makeId(20),
        name: '',
        email: '',
        password: '',
        coins: 0,
        assets: [],
        transactions: [],
        img: ''
    }
}

function makeAsset(coin, symbol, totalQty, totalCost) {
    return {
        id: makeId(),
        coin,
        symbol,
        totalQty,
        totalCost,
    }
}

function makeTransaction(type, symbol, cost, qty, img) {
    return {
        id: makeId(),
        date: Date.now(),
        type,
        symbol,
        cost,
        qty,
        img,
        mult: cost * qty
    }
}


function makeId(length = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}