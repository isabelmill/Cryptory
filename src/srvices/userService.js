import { storageService } from './storageService.js'

export const userService = {
    login,
    getLoggedinUser,
    updateUser,
    signup,
    logout,
    query,
    makeTransaction,
    makeAsset,
}

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const STORAGE_KEY = 'users'

const gDefaultUsers = [
    {
        _id: 'u1',
        name: 'Guest-user',
        coins: 1500,
        assets: [{ symbol: 'ethereum', cost: '1400', qty: 1.1439871219735414, marketPrice: 1223.79 }],
        transactions: [{ type: 'buy', symbol: 'ethereum', cost: '1400', qty: 1.1439871219735414 }]
    },
]

let gUsers = _loadUsers()

function query() {
    let usersToReturn = gUsers;
    return Promise.resolve([...usersToReturn]);
}

function login(userCred) {
    const user = gUsers.find(user => user.name === userCred.name)
     storageService.store(STORAGE_KEY_LOGGEDIN_USER, user)
}


function updateUser(userToSave) {
    const idx = gUsers.findIndex(user => user._id === userToSave._id)
    gUsers.splice(idx, 1, userToSave)
    storageService.store(STORAGE_KEY, gUsers)
    storageService.store(STORAGE_KEY_LOGGEDIN_USER, userToSave)
    return Promise.resolve({...userToSave});
}

function signup(userToSave) {
    userToSave._id = makeId()
    gUsers.push(userToSave)
}
function logout() {
    storageService.store(STORAGE_KEY_LOGGEDIN_USER, gUsers[0])
}

function getLoggedinUser() {
    logout() //change that
    const user = storageService.load(STORAGE_KEY_LOGGEDIN_USER)
    return Promise.resolve({ ...user })
}

function _loadUsers() {
    let users = storageService.load(STORAGE_KEY)
    if (!users || !users.length) users = gDefaultUsers
    storageService.store(STORAGE_KEY, users)
    return users
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


 function makeId(length = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}


// function updateUser(coin, price, amount, marketPrice) {
//     const user = getUser()
//     user.coins = user.coins - +price

//     const transaction = makeTransaction('buy', coin, price, amount)
//     const asset = makeAsset(coin, price, amount, marketPrice)

//     user.transactions.push(transaction)
//     user.assets.push(asset)

//     storageService.store('Logged-In User', user)
// }