import { Component } from 'react'
import { userService } from '../srvices/userService'
import { cryptoService } from '../srvices/cryptoService'


export class BuyModal extends Component {

    state = {
        user: null,
        coin: this.props.coin,
        coinPrice: null,
        price: 0,
        amount: 0,
    }

    componentDidMount() {
        this.getUser()
        this.getCoinPrice()
    }

    getCoinPrice = async (coin) => {
        if (!coin) coin = this.props.coin
        const coinData = await cryptoService.getCoinData(coin)
        let coinPrice = coinData.market_data.current_price.usd
        this.setState({ coinPrice })
    }

    getUser() {
        const user = userService.getUser()
        this.setState({ user })
    }

    changePrice = ({ target }) => {
        const price = target.value
        this.setState({ price })
        this.calculateAmount(price)
    }

    calculateAmount = (price) => {
        const amount = +price / this.state.coinPrice
        this.setState({ amount })
    }

    changeCoin = ({ target }) => {
        this.setState({ coin: target.value })
        this.getCoinPrice(target.value)
    }

    close = () => {
        this.props.onHandleModal(false);
    }

    buy = () => {
        console.log('buyin');
        userService.updateUser(this.state.coin, this.state.price, this.state.amount, this.state.coinPrice)
    }

    render() {
        const { user, coinPrice, coin, price, amount } = this.state
        if (!user) return
        return (
            <section className="buy-modal">
                <div>
                    <h1>Buy-Modal!</h1>
                    <button onClick={this.close}>X</button>
                    <p>Hello {user.name}</p>
                    <p>Your Balance {user.coins}$</p>
                    <p>{coin} {coinPrice}$</p>
                    <select id="coins" onChange={this.changeCoin} value={coin}>
                        <option value="bitcoin">Bitcoin</option>
                        <option value="ethereum">Ethereum</option>
                        <option value="cardano">Cardano</option>
                        <option value="polkadot">Polkadot</option>
                        <option value="litecoin">Litecoin</option>
                        <option value="dogecoin">Dogecoin</option>
                        <option value="tether">Tether</option>
                    </select >
                    <label>Price in USD</label>
                    <input type="number" placeholder={price} min={0} onChange={this.changePrice} value={price} />
                    <button onClick={this.buy}>Buy</button>
                    <p>{price}</p>
                    <p>amount {amount}</p>
                </div>
            </section>
        )
    }
}