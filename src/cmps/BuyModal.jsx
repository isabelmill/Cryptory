import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadCoinData } from '../store/actions/cryptoActions'
import { updateUser } from '../store/actions/userActions'
import { userService } from '../srvices/userService'

export const BuyModal = (props) => {

    const [coin, setCoin] = useState(props.coin)
    const [qty, setQty] = useState(0)
    const [price, setPrice] = useState(0)
    const [wallet, setWallet] = useState('')
    const amount = useRef(null)
    const shares = useRef(null)
    const walletNum = useRef(null)

    useEffect(() => {
        dispatch(loadCoinData(coin))
        calculateQty(price)
        // eslint-disable-next-line
    }, [coin])

    const { coinData } = useSelector(state => state.cryptoModule)
    const dispatch = useDispatch()

    const changePrice = ({ target }) => {
        calculateQty(target.value)
        setPrice(target.value)
    }

    const changeQty = ({ target }) => {
        calculatePrice(target.value)
        setQty(target.value)
    }

    const changeWallet = ({ target }) => {
        setWallet(target.value)
    }

    const calculateQty = (price) => {
        const qty = +price / coinData.coinPrice
        setQty(qty)
    }

    const calculatePrice = (qty) => {
        const price = +qty * coinData.coinPrice
        setPrice(price)
    }

    const close = () => {
        props.onHandleModal(false, '');
    }


    ////////// buy ///////////

    const buy = () => {
        // check()
        if (!price || +price < 0 || price === '0' || price === '-0') {
            amount.current.innerText = 'Please write correct number'
            amount.current.style.visibility = 'visible'
            setTimeout(() => {
                amount.current.style.visibility = 'hidden'
            }, 1500)
            return
        } else if (+price > props.user.coins) {
            amount.current.innerText = 'Insufficient funds'
            amount.current.style.visibility = 'visible'
            setTimeout(() => {
                amount.current.style.visibility = 'hidden'
            }, 1500)
            return
        }

        const user = JSON.parse(JSON.stringify(props.user))

        const transaction = userService.makeTransaction(props.transactionType, coin, price, qty, coinData.coinImage)
        user.transactions = [transaction, ...user.transactions]


        let totalQty = user.transactions.filter((trnsc) => trnsc.type === 'buy' && trnsc.symbol === coin).reduce(
            (previousValue, currentValue) => previousValue + +currentValue.qty,
            0
        );

        let recieved = user.transactions.filter((trnsc) => trnsc.type === 'recieved' && trnsc.symbol === coin).reduce(
            (previousValue, currentValue) => previousValue + +currentValue.qty,
            0
        );


        let totalCost = user.transactions.filter((trnsc) => trnsc.type === 'buy' && trnsc.symbol === coin).reduce(
            (previousValue, currentValue) => previousValue + +currentValue.cost,
            0
        );
        const asset = userService.makeAsset(coin, coinData.symbol, totalQty + recieved, totalCost)

        const coinIdx = user.assets.findIndex(asset => asset.coin === coin);
        if (coinIdx === -1) {
            user.assets = [...user.assets, asset]
        } else {
            user.assets.splice(coinIdx, 1, asset)
        }

        user.coins -= +price
        dispatch(updateUser(user))
        props.onHandleModal(false, '');
    }

    ////////// buy ///////////

    ////////// sell ///////////

    const sell = () => {
        const user = JSON.parse(JSON.stringify(props.user))
        const asset = user.assets.find((asset) => asset.coin === coin)
        if (!qty || +qty > asset.totalQty || qty < 0) {
            shares.current.innerText = 'Please write correct number'
            shares.current.style.visibility = 'visible'
            setTimeout(() => {
                shares.current.style.visibility = 'hidden'
            }, 1500)
            return
        }

        const transaction = userService.makeTransaction(props.transactionType, coin, price, qty, coinData.coinImage)
        user.transactions = [transaction, ...user.transactions]

        const pl = price - ((asset.totalCost / asset.totalQty) * qty)
        asset.totalQty -= +qty
        asset.totalCost -= (+price - pl)

        const coinIdx = user.assets.findIndex(asset => asset.coin === coin);
        if (asset.totalQty === 0) {
            user.assets.splice(coinIdx, 1)
        } else {
            user.assets.splice(coinIdx, 1, asset)
        }

        user.coins += (+price + pl)
        dispatch(updateUser(user))
        props.onHandleModal(false, '');
    }

    ////////// sell ///////////
    ////////// transfer ///////////

    const transfer = () => {
        const user = JSON.parse(JSON.stringify(props.user))
        const userTransfer = props.users.find((user) => user.wallet === wallet)

        const asset = user.assets.find((asset) => asset.coin === coin)
        if (!qty || +qty > asset.totalQty || qty < 0) {
            shares.current.innerText = 'Please write correct number'
            shares.current.style.visibility = 'visible'
            setTimeout(() => {
                shares.current.style.visibility = 'hidden'
            }, 1500)
            return
        } else if (user.wallet === wallet) {
            console.log('got here');
            walletNum.current.innerText = 'You cant transfer to yourself'
            walletNum.current.style.visibility = 'visible'
            setTimeout(() => {
                walletNum.current.style.visibility = 'hidden'
            }, 1500)
            return
        } else if (!userTransfer.wallet) {
            walletNum.current.innerText = 'No user with this wallet number was found'
            walletNum.current.style.visibility = 'visible'
            setTimeout(() => {
                walletNum.current.style.visibility = 'hidden'
            }, 1500)
            return
        }

        const transactionIn = userService.makeTransaction('recieved', coin, price, qty, coinData.coinImage)
        const transactionOut = userService.makeTransaction(props.transactionType, coin, price, qty, coinData.coinImage)

        user.transactions = [transactionOut, ...user.transactions]
        userTransfer.transactions = [transactionIn, ...userTransfer.transactions]

        const pl = price - ((asset.totalCost / asset.totalQty) * qty)
        asset.totalQty -= +qty
        asset.totalCost -= (+price - pl)

        const coinIdx = user.assets.findIndex(asset => asset.coin === coin);
        if (asset.totalQty === 0) {
            user.assets.splice(coinIdx, 1)
        } else {
            user.assets.splice(coinIdx, 1, asset)
        }
        
        
        /////////////////////////////
        const findAsset = userTransfer.assets.find(asset => asset.coin === coin);
        const findAssetIdx = userTransfer.assets.findIndex(asset => asset.coin === coin);
        if (findAsset) {
            findAsset.totalQty += +qty
            console.log();
            findAsset.totalCost += (+price - pl)
            userTransfer.assets.splice(findAssetIdx, 1, findAsset)
        } else {

        const makeAsset = userService.makeAsset(coin, coinData.symbol, +qty, +price - pl)
        userTransfer.assets = [makeAsset, ...userTransfer.assets]
        }
        /////////////////////////////



        //TODO update the data of revieving user

        user.coins += (+price + pl)
        dispatch(updateUser(userTransfer))
        dispatch(updateUser(user))
        props.onHandleModal(false, '');
    }

    ////////// transfer ///////////


    if (!coinData) return <div>Loading...</div>
    let button
    if (props.transactionType === 'buy') {
        button = <button className='buy' onClick={buy}>Buy</button>
    } else if (props.transactionType === 'sell') {
        button = <button className='sell' onClick={sell}>Sell</button>
    } else if (props.transactionType === 'transfer') {
        button = <button className='transfer' onClick={transfer}>Transfer</button>
    }

    return (
        <section className="buy-modal" >
            <div className="content" >
                <div className="header">
                    <h1>{props.transactionType}</h1>
                    <button className='close' onClick={close}><svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px"><path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z" /></svg></button>
                </div>
                <div className="coin-info">
                    <div className="coin">
                        <img src={coinData.coinImage} alt="" />
                        <p>{coin}</p>
                    </div>
                    <p>${coinData.coinPrice}</p>
                </div>
                <div className="buy-info">
                    <div className="shares">
                        <label>Shares</label>
                        <input type="number" placeholder={qty} min={0} onChange={changeQty} value={qty} />
                        <p ref={shares}>problem</p>
                    </div>
                    <div className="shares">
                        <label>Amount</label>
                        <input type="number" placeholder={price} min={0} onChange={changePrice} value={price} />
                        <p ref={amount}>problem</p>
                    </div>
                    {props.transactionType === 'transfer' && <div className="shares">
                        <label>Wallet Number</label>
                        <input type="text" onChange={changeWallet} value={wallet} />
                        <p ref={walletNum}>problem</p>

                    </div>}
                </div>
                <h3>${Math.round(((props.user.coins) + Number.EPSILON) * 100) / 100} Available</h3>
                {props.transactionType !== 'buy' && props.user.assets.filter((asset) => asset.coin === coin).map((asset) => <h3> Coin Total QTY: {Math.round(((asset.totalQty) + Number.EPSILON) * 100) / 100}</h3>)}

                <div className="submit">
                    {button}
                </div>
            </div>
        </section>
    )
}
