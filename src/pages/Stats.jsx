import { Component } from 'react'
import { cryptoService } from '../srvices/cryptoService'
import { userService } from '../srvices/userService'
import { Chart } from '../cmps/Chart'
import { BuyModal } from '../cmps/BuyModal'

export class Stats extends Component {
    state = {
        marketPrice: null,
        user: null,
        coin: 'bitcoin',
        coinPrice: null,
        isModalOpen: false,
    }

    componentDidMount() {
        this.createData()
        this.getUser()
    }

    getUser() {
        const user = userService.getUser()
        this.setState({ user })
    }

    async createData(coin) {
        if (!coin) coin = 'bitcoin'
        const data = await cryptoService.getMarketData(coin)
        const coinData = await cryptoService.getCoinData(coin)
        let coinPrice = coinData.market_data.current_price.usd
        data.prices.length = 14
        let marketPrice = data.prices.map((data) => {
            return {
                time: this.makeDate(data[0]),
                value: data[1],
            }
        })
        this.setState({ marketPrice })
        this.setState({ coinPrice })
    }


    makeDate(date) {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate()
        let year = d.getFullYear()

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        let newDate = [year, month, day].join('-')

        return newDate
    }

    changeCoin = ({ target }) => {
        this.setState({ coin: target.value })
        this.createData(target.value)
    }

    buyCoin = () => {
        this.handleModal(true)
    }

    handleModal = (value) => {
        this.setState({isModalOpen: value});
    }


    render() {
        const { marketPrice, user, coin, coinPrice, isModalOpen} = this.state
        if (!user) return
        if (!marketPrice) return <div>Loading...</div>

        return (
            <section className="stats" >
                <h1>Hello, {user.name}</h1>
                <button onClick={this.buyCoin} >Buy {coin}</button>
                <div className="coin-list">
                    <select id="coins" onChange={this.changeCoin} value={coin}>
                        <option value="bitcoin">Bitcoin</option>
                        <option value="ethereum">Ethereum</option>
                        <option value="cardano">Cardano</option>
                        <option value="polkadot">Polkadot</option>
                        <option value="litecoin">Litecoin</option>
                        <option value="dogecoin">Dogecoin</option>
                        <option value="tether">Tether</option>
                    </select >
                    <p>{coin}</p>
                    <p>{coinPrice} $</p>
                </div>
                {marketPrice && <Chart data={marketPrice} />}
                {isModalOpen && <BuyModal coin={coin} onHandleModal={this.handleModal}/>}
            </section>
        )
    }
}