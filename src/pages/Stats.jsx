import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadCoinMarketData, loadCoinData } from '../store/actions/cryptoActions'
import { loadLoggedInUser } from '../store/actions/userActions'
import { Chart } from '../cmps/Chart'
import { BuyModal } from '../cmps/BuyModal'

export function Stats() {

    const [coin, setCoin] = useState('bitcoin')
    const [isModalOpen, setModal] = useState(false)
    const [transactionType, setType] = useState('')

    useEffect(() => {
        dispatch(loadLoggedInUser())
        dispatch(loadCoinMarketData(coin))
        dispatch(loadCoinData(coin))
        // eslint-disable-next-line
    }, [coin])

    const { loggedInUser } = useSelector(state => state.userModule)
    const { data, coinData } = useSelector(state => state.cryptoModule)
    const dispatch = useDispatch()

    const handleChange = ({ target }) => {
        setCoin(target.value)
    }

    const handleModal = (value, type) => {
        setModal(value);
        setType(type)
    }

    const checkCoin = () => {
        if (loggedInUser) {
            const findCoin = loggedInUser.assets.find(asset => asset.symbol === coin);
            if (findCoin) {
                return true
            } else return false
        }
    }


    if (!loggedInUser || !data || !coinData) return <div>Loading...</div>

    return (
        <section className="stats" >
            <div className="stats-info">

                <div className="header">
                    <h1>Hi, {loggedInUser.name}</h1>
                </div>

                <div className="info">
                    <div className="info-balance">
                        <p>Total Balance</p>
                        <div className="user-balance">
                            {loggedInUser.coins}
                            <p>USD</p>
                        </div>
                    </div>
                    <div className="info-btns">
                        {checkCoin() && <button className='sell' onClick={() => handleModal(true, 'sell')} > SELL</button>}
                        <button className='buy' onClick={() => handleModal(true, 'buy')} > BUY </button>
                    </div>
                </div>

                <div className="chart-info">
                    <div className="coins">
                        <div className="coin-info">
                            <img src={coinData.coinImage} alt="" />
                            <h6>{coinData.id}</h6>
                            <h6>{coinData.coinPrice}</h6>
                            <p>USD</p>
                        </div>
                        <select id="coins" onChange={handleChange} value={coin}>
                            <option value="bitcoin">Bitcoin</option>
                            <option value="ethereum">Ethereum</option>
                            <option value="cardano">Cardano</option>
                            <option value="polkadot">Polkadot</option>
                            <option value="litecoin">Litecoin</option>
                            <option value="dogecoin">Dogecoin</option>
                        </select >
                    </div>
                    {data && <Chart data={data} />}
                </div>

                {isModalOpen && <BuyModal coin={coin} user={loggedInUser} onHandleModal={handleModal} transactionType={transactionType} />}
            </div>
            <div className='stats-transactions'></div>
        </section>
    )
}