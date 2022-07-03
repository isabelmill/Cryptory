import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadLoggedInUser } from '../store/actions/userActions'
import { cryptoService } from '../srvices/cryptoService'
import Select from 'react-select'


export const Data = () => {
    const { loggedInUser } = useSelector(state => state.userModule)
    const dispatch = useDispatch()
    const [coins, setCoins] = useState()
    const [asset, setAsset] = useState({})
    const [options, setOptions] = useState([])


    useEffect(() => {
        dispatch(loadLoggedInUser())
        userCoins()
        makeOptions()
        if (loggedInUser) {
            setAsset(loggedInUser.assets[0])
        }
        // eslint-disable-next-line
    }, [])

    const handleChange = ({ value }) => {
        const asset = loggedInUser.assets.find((asset) =>
            asset.coin === value
        )
        setAsset(asset)
    }

    const showPrice = (coinName) => {
        let price = 0
        if (coins) {
            coins?.forEach(async (coin) => {
                if (coinName === coin.symbol) {
                    price = coin.price
                }
            })
            return price
        }
    }

    const userCoins = async () => {
        let coinsArr = []
        if (loggedInUser) {
            loggedInUser.assets?.forEach(async (asset) => {
                coinsArr.push({
                    symbol: asset.coin,
                    price: await cryptoService.getCoinMarketPrice(asset.coin)
                })
                setCoins(coinsArr);
            })
        }

    }

    const getAvg = (asset) => {

        let totalQty = loggedInUser.transactions.filter((trnsc) => trnsc.type === 'buy' && asset === trnsc.symbol).reduce(
            (previousValue, currentValue) => previousValue + currentValue.qty,
            0
        );
        let totalQtyRecieved = loggedInUser.transactions.filter((trnsc) => trnsc.type === 'recieved' && asset === trnsc.symbol).reduce(
            (previousValue, currentValue) => previousValue + currentValue.qty,
            0
        );

        let totalCostRecieved = loggedInUser.transactions.filter((trnsc) => trnsc.type === 'recieved' && asset === trnsc.symbol).reduce(
            (previousValue, currentValue) => previousValue + +currentValue.cost,
            0
        );
        let totalCost = loggedInUser.transactions.filter((trnsc) => trnsc.type === 'buy' && asset === trnsc.symbol).reduce(
            (previousValue, currentValue) => previousValue + +currentValue.cost,
            0
        );


        const avg = +totalCost + +totalCostRecieved / +totalQty + +totalQtyRecieved
        return Math.round((avg + Number.EPSILON) * 100) / 100
    }

    const getDate = (trnscDate) => {
        const date = new Date(trnscDate)
        return date.toLocaleString()
    }

    const makeOptions = async () => {
        const options = []
        if (loggedInUser) {
            loggedInUser.assets?.forEach((asset) => {
                options.push({ value: asset.coin, label: asset.coin })
                setOptions(options)
            })
        }
    }

    const makePlPercent = (asset) => {
        return Math.round((((((showPrice(asset.coin) - (asset.totalCost / asset.totalQty)) * asset.totalQty) * 100) / asset.totalCost) + Number.EPSILON) * 100) / 100
    }
    const makePl = (asset) => {
        return Math.round((((showPrice(asset.coin) - (asset.totalCost / asset.totalQty)) * asset.totalQty) + Number.EPSILON) * 100) / 100
    }

    const loadingScreen = <div className="box">
        <div class="spinner-box">
            <div class="pulse-container">
                <div class="pulse-bubble pulse-bubble-1"></div>
                <div class="pulse-bubble pulse-bubble-2"></div>
                <div class="pulse-bubble pulse-bubble-3"></div>
            </div>
        </div>
    </div>


    if (!loggedInUser) return loadingScreen
    return (
        <section className='data-main'>
            <div className="positions">
                <h2>My Assets</h2>


                <div className="user-assets">
                    <Select options={options} id="coins" onChange={handleChange} className='select' />
                    <div className="asset-info">
                        <div className="info">
                            <p>Symbol</p>
                            <p>{asset.symbol}</p>
                        </div>
                        <div className="info">
                            <p>Qty</p>
                            <p>{Math.round(((asset.totalQty) + Number.EPSILON) * 100) / 100}</p>
                        </div>
                        <div className="info">
                            <p>Avg Price</p>
                            <p>{getAvg(asset.coin)} $</p>
                        </div>
                        <div className="info">
                            <p>Last Price</p>
                            <p>{showPrice(asset.coin)} $</p>

                        </div>
                        <div className="info">
                            <p>Unrealized P/L $</p>
                            <p>{Math.round((((showPrice(asset.coin) - (asset.totalCost / asset.totalQty)) * asset.totalQty) + Number.EPSILON) * 100) / 100} $</p>
                        </div>
                        <div className="info">
                            <p>Unrealized P/L %</p>
                            <p>{Math.round((((((showPrice(asset.coin) - (asset.totalCost / asset.totalQty)) * asset.totalQty) * 100) / asset.totalCost) + Number.EPSILON) * 100) / 100} %</p>
                        </div>
                        <div className="info">
                            <p>Total Cost</p>
                            <p>{Math.round(((asset.totalCost) + Number.EPSILON) * 100) / 100} $</p>
                        </div>
                    </div>
                </div>


                <div className='pre-table'>
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>Position ID</th>
                                <th>Symbol</th>
                                <th>Qty</th>
                                <th>Avg Price</th>
                                <th>Last Price</th>
                                <th>Unrealized P/L $</th>
                                <th>Unrealized P/L %</th>
                                <th>Total Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loggedInUser?.assets?.map((asset) =>
                                <tr key={asset.id}>
                                    <td>{asset.id}</td>
                                    <td>{asset.symbol}</td>
                                    <td>{Math.round(((asset.totalQty) + Number.EPSILON) * 100) / 100}</td>
                                    <td>{getAvg(asset.coin)} $</td>
                                    <td>{showPrice(asset.coin)} $</td>
                                    <td style={{ color: makePl(asset) < 0 ? '#E34A4A' : '#4FAF4F' }}>{makePl(asset)} $</td>
                                    <td style={{ color: makePlPercent(asset) < 0 ? '#E34A4A' : '#4FAF4F' }}>{makePlPercent(asset)} %</td>
                                    <td>{Math.round(((asset.totalCost) + Number.EPSILON) * 100) / 100} $</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>



            </div>
            <div className="transactions">
                <h1>Recent Transactions</h1>
                {loggedInUser?.transactions?.map((trns) =>
                    <div className="transaction" key={trns.id}>
                        <div className="trnsc">
                            <img src={trns.img} alt="" />
                            <div className="trnsc-info">
                                <h1>{trns.symbol}</h1>
                                <p>{trns.type}</p>
                            </div>
                        </div>
                        <div className="trnsc-cost">
                            <h1>${trns.cost}</h1>
                            <p>{getDate(trns.date)}</p>
                        </div>
                    </div>
                )}
            </div>
        </section >
    )
}

