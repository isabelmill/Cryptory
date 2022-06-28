import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadCoinMarketData, loadCoinData } from '../store/actions/cryptoActions'
import { loadLoggedInUser , loadUsers } from '../store/actions/userActions'
import { Chart } from '../cmps/Chart'
import { BuyModal } from '../cmps/BuyModal'
import Select from 'react-select'


export function Stats() {

    const [coin, setCoin] = useState('bitcoin')
    const [isModalOpen, setModal] = useState(false)
    const [transactionType, setType] = useState('')

    useEffect(() => {
        dispatch(loadLoggedInUser())
        dispatch(loadCoinMarketData(coin))
        dispatch(loadCoinData(coin))
        dispatch(loadUsers())
        // eslint-disable-next-line
    }, [coin])

    const { loggedInUser } = useSelector(state => state.userModule)
    const { data, coinData } = useSelector(state => state.cryptoModule)
    const { users } = useSelector(state => state.userModule)

    const dispatch = useDispatch()

    const handleChange = ({ value }) => {
        setCoin(value)
    }

    const handleModal = (value, type) => {
        setModal(value);
        setType(type)
    }

    const checkCoin = () => {
        if (loggedInUser) {
            const findCoin = loggedInUser.assets.find(asset => asset.coin === coin);
            if (findCoin) {
                return true
            } else return false
        }
    }

    const options = [
        { value: 'bitcoin', label: 'Bitcoin' },
        { value: 'ethereum', label: 'Ethereum' },
        { value: 'cardano', label: 'Cardano' },
        { value: 'litecoin', label: 'Litecoin' },
        { value: 'polkadot', label: 'Polkadot' },
        { value: 'dogecoin', label: 'Dogecoin' },
        { value: 'solana', label: 'Solana' },
    ]

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    if (!loggedInUser || !data || !coinData || !users) return <div>Loading...</div>

    return (
        <section className="stats" >
            <div className="stats-info">
                <div className="stats-chart-user">

                    <div className="user-info">
                        <div className="user-balance">
                            <p>Total Balance</p>
                            <div className="user-coins">
                                {Math.round(((loggedInUser.coins) + Number.EPSILON) * 100) / 100}
                                <p>USD</p>
                            </div>
                        </div>
                        <div className="info-btns">
                            {checkCoin() && <button onClick={() => handleModal(true, 'transfer')} className='transfer'>TRANSFER</button>}
                            {checkCoin() && <button className='sell' onClick={() => handleModal(true, 'sell')} > SELL</button>}
                            <button className='buy' onClick={() => handleModal(true, 'buy')} > BUY </button>
                        </div>
                    </div>

                    <div className="stats-chart">
                        <div className="chart-info">
                            <div className="coins">
                                <div className="coin-info">
                                    <div className="coin-img">
                                        <img src={coinData.coinImage} alt="" />
                                        <h1>{capitalizeFirstLetter(coinData.id)} price in USD</h1>
                                    </div>
                                    <h2>${coinData.coinPrice}</h2>
                                </div>
                                <Select options={options} id="coins" onChange={handleChange} className='select' />

                            </div>
                            <div className="chart-data">
                                {data && <Chart data={data} />}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="coin-data">
                    <div className="stats-coin-info">
                        <div className="stats-header">
                            <img src={coinData.coinImage} alt="" />
                            <h1>{coinData.symbol} Price Statistics</h1>
                        </div>
                        <div className="stats-body">
                            <div className="stat">
                                <p>{capitalizeFirstLetter(coin)} Price</p>
                                <p>{coinData.coinPrice}$</p>
                            </div>
                            <div className="stat">
                                <p>24h Low / 24h High</p>
                                <p>{Math.round(((coinData.low24h) + Number.EPSILON) * 100) / 100}$ / {Math.round(((coinData.high24h) + Number.EPSILON) * 100) / 100}$</p>
                            </div>
                            <div className="stat">
                                <p>Market Cap</p>
                                <p>{coinData.markerCap}$</p>
                            </div>
                            <div className="stat">
                                <p>Price Change 24h</p>
                                <p>{Math.round(((coinData.priceChange24) + Number.EPSILON) * 100) / 100}$ / {Math.round(((coinData.priceChange24percent) + Number.EPSILON) * 100) / 100}%</p>
                            </div>
                            <div className="stat">
                                <p>Market Rank </p>
                                <p>#{coinData.rank}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && <BuyModal coin={coin} user={loggedInUser} users={users} onHandleModal={handleModal} className="modal" transactionType={transactionType} />}

            <div className="stats-news">
                <h1>{capitalizeFirstLetter(coin)} News</h1>
                <div className="news">
                    <div className="first-article">
                        <a href={coinData.news[0].link} target="_blank">
                            <div className="img">
                                <img src={coinData.news[0].media} alt="" />
                            </div>
                            <div className="info">
                                <h1>{coinData.news[0].title}</h1>
                                <p>{coinData.news[0].summary}</p>
                                <div className="footer">
                                    <a >{coinData.news[0].rights}</a>
                                    <p>{coinData.news[0].published_date}</p>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="other-articles">
                        {coinData.news.slice(1).map((article) => <div key={article._id} className="article">
                            <a href={article.link} target="_blank">
                                <div className="info">
                                    <h1>{article.title}</h1>
                                    {/* <p>{article.summary}</p> */}
                                    <div className="footer">
                                        <p >{article.rights}</p>
                                        <p>{article.published_date}</p>
                                    </div>
                                </div>
                                <div className="img">
                                    <img src={article.media} alt="" />
                                </div>
                            </a>
                        </div>)}
                    </div>
                </div>
            </div>


        </section >
    )
}