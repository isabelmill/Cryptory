import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadCoinMarketData, loadCoinData } from '../store/actions/cryptoActions'
import { updateUser } from '../store/actions/userActions'
import { userService } from '../srvices/userService'

export const BuyModal = (props) => {

    // TODO make coins as object and then map it and send as a props
    const [coin, setCoin] = useState(props.coin)
    const [qty, setQty] = useState(0)
    const [price, setPrice] = useState(0)

    useEffect(() => {
        dispatch(loadCoinData(coin))
        calculateQty(price)
        // eslint-disable-next-line
    }, [coin])

    const { coinData } = useSelector(state => state.cryptoModule)
    const dispatch = useDispatch()

    const handleChange = ({ target }) => {
        setCoin(target.value)
    }

    const changePrice = ({ target }) => {
        calculateQty(target.value)
        setPrice(target.value)
    }

    const calculateQty = (price) => {
        const qty = +price / coinData.coinPrice
        setQty(qty)
    }

    const close = () => {
        props.onHandleModal(false, '');
    }

    const buy = () => {
        if (!price || +price > props.user.coins
            ) return console.log('cant buy');
        console.log('buying');

        //TODO Should i place it in the actions or make a custom hook?

        const asset = userService.makeAsset(coin, price, qty, coinData.coinPrice)
        const transaction = userService.makeTransaction(props.transactionType, coin, price, qty)

        const user = JSON.parse(JSON.stringify(props.user))
        user.transactions = [...user.transactions, transaction]
        user.assets = [...user.assets, asset]
        user.coins -= +price
        dispatch(updateUser(user))

    }

    const sell = () => {
        console.log('sellng');
    }



    if (!coinData) return <div>Loading...</div>
    let button
    if (props.transactionType === 'buy') {
        button = <button onClick={buy}>Buy</button>
    } else {
        button = <button onClick={sell}>Sell</button>
    }

    return (
        <section className="buy-modal">
            <div>
                <h1>Buy-Modal!</h1>
                <button onClick={close}>X</button>
                <p>Hello {props.user.name}</p>
                <p>Your Balance {props.user.coins}$</p>
                <p>{coin} {coinData.coinPrice}$</p>
                <select id="coins" onChange={handleChange} value={coin}>
                    <option value="bitcoin">Bitcoin</option>
                    <option value="ethereum">Ethereum</option>
                    <option value="cardano">Cardano</option>
                    <option value="polkadot">Polkadot</option>
                    <option value="litecoin">Litecoin</option>
                    <option value="dogecoin">Dogecoin</option>
                </select >
                <label>Price in USD</label>
                <input type="number" placeholder={price} min={0} onChange={changePrice} value={price} />
                {button}
                <p>{price}</p>
                <p>qty {qty}</p>
            </div>
        </section>
    )
}