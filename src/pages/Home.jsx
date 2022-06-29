import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadLoggedInUser } from '../store/actions/userActions'

export function Home() {

    useEffect(() => {
        dispatch(loadLoggedInUser())
        // eslint-disable-next-line
        if (loggedInUser) {
            checkPl()
            // eslint-disable-next-line
        }
    }, [])

    const dispatch = useDispatch()
    const [profitLoss, setProfitLoss] = useState()
    const [value, setValue] = useState()
    const copied = useRef(null);

    const { loggedInUser } = useSelector(state => state.userModule)

    const copy = () => {
        const copyText = loggedInUser.wallet
        navigator.clipboard.writeText(copyText);
        copied.current.style.visibility = 'visible'
        setTimeout(() => {
            copied.current.style.visibility = 'hidden'
        }, 1500)

    }

    const checkPl = () => {

        const pl = []
        const total = []
        loggedInUser?.assets?.forEach((asset) => {
            const i = (asset.marketPrice - (asset.totalCost / asset.totalQty)) * asset.totalQty
            pl.push(i)
            total.push(asset.totalCost)
        })

        const UnrealizedPL = pl.reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
        );
        const totalValue = total.reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
        );
        const value = UnrealizedPL + loggedInUser?.coins + totalValue
        setProfitLoss(Math.round(((UnrealizedPL) + Number.EPSILON) * 100) / 100)
        setValue(Math.round(((value) + Number.EPSILON) * 100) / 100)
    }

    if (!loggedInUser) return <div>Loading...</div>
    return (
        <section className='home'>
            <div className='home-info'>
                <div className="header">
                    <h1>Hello, {loggedInUser?.name}
                        <img src={require("../assets/imgs/wave.png")} alt="" />
                    </h1>
                    <p>Welcome back to
                        <h2>CRYPTORY</h2>
                    </p>
                    <div className="portfolio">
                        <div className="balance">
                            <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40"><path d="M36.958 9.542v20.916q0 1.292-.937 2.23-.938.937-2.229.937H6.208q-1.291 0-2.229-.937-.937-.938-.937-2.23V9.542q0-1.292.937-2.23.938-.937 2.229-.937h27.584q1.291 0 2.229.937.937.938.937 2.23Zm-30.75 4h27.584v-4H6.208Zm0 5.833v11.083h27.584V19.375Zm0 11.083V9.542v20.916Z" /></svg>
                            <div className="data">
                                <h3>Total Balance</h3>
                                <p>{Math.round(((loggedInUser?.coins) + Number.EPSILON) * 100) / 100} $</p>
                            </div>
                        </div>
                        <div className="balance">
                            <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40"><path d="M18.625 31.875h2.625V29.75q2.375-.292 3.833-1.562 1.459-1.271 1.459-3.563 0-2-1.146-3.396t-4.104-2.562q-2.417-.959-3.438-1.688-1.021-.729-1.021-1.979 0-1.167.855-1.833.854-.667 2.354-.667 1.25 0 2.125.604t1.416 1.688l2.334-1.042q-.667-1.5-1.834-2.417-1.166-.916-2.75-1.125V8.167h-2.625v2.041q-2.125.375-3.333 1.709-1.208 1.333-1.208 3.125 0 2.041 1.25 3.291t3.833 2.25q2.625 1.042 3.646 1.896 1.021.854 1.021 2.146 0 1.333-1.021 2.063-1.021.729-2.604.729-1.542 0-2.73-.896-1.187-.896-1.687-2.521l-2.458.875q.791 2 2.062 3.167 1.271 1.166 3.146 1.666ZM20 36.958q-3.5 0-6.583-1.333-3.084-1.333-5.396-3.646-2.313-2.312-3.646-5.396Q3.042 23.5 3.042 20q0-3.542 1.333-6.625T8.021 8q2.312-2.292 5.396-3.625Q16.5 3.042 20 3.042q3.542 0 6.625 1.333T32 8q2.292 2.292 3.625 5.375 1.333 3.083 1.333 6.625 0 3.5-1.333 6.583-1.333 3.084-3.625 5.396-2.292 2.313-5.375 3.646-3.083 1.333-6.625 1.333Zm0-3.166q5.75 0 9.771-4.021Q33.792 25.75 33.792 20q0-5.75-4.021-9.771Q25.75 6.208 20 6.208q-5.75 0-9.771 4.021Q6.208 14.25 6.208 20q0 5.75 4.021 9.771Q14.25 33.792 20 33.792ZM20 20Z" /></svg>
                            <div className="data">
                                <h3>Portfolio Value</h3>
                                <p> {value} $</p>
                            </div>
                        </div>
                        <div className="balance">
                            <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40"><path d="m5.458 31.083-2.375-2.375 12.75-12.75 6.667 6.667 12.208-13.75 2.209 2.208L22.5 27.375l-6.667-6.667Z" /></svg>
                            <div className="data">
                                <h3>Unrealized P&L</h3>
                                <p>{profitLoss} $</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="user-info">
                <img src={loggedInUser.img} alt="" />
                <p>{loggedInUser.name}</p>
                <div className="wallet">
                    <h1>
                        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M13.292 11.229q.541 0 .885-.344.344-.343.344-.885t-.344-.885q-.344-.344-.885-.344-.542 0-.886.344-.344.343-.344.885t.344.885q.344.344.886.344Zm-8.98 4.459V4.312v11.376Zm0 1.979q-.833 0-1.406-.573t-.573-1.406V4.312q0-.833.573-1.406t1.406-.573h11.376q.833 0 1.406.573t.573 1.406v1.876h-1.979V4.312H4.312v11.376h11.376v-1.896h1.979v1.896q0 .833-.573 1.406t-1.406.573Zm6.48-3.459q-.688 0-1.198-.5-.511-.5-.511-1.187V7.5q0-.688.5-1.208.5-.521 1.188-.521h6.041q.688 0 1.188.521.5.52.5 1.208v5.021q0 .687-.5 1.187t-1.188.5Zm5.958-1.75V7.521h-5.917v4.937Z" /></svg>
                        Wallet</h1>
                    <p onClick={copy}>{loggedInUser.wallet}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#d0d1d4" height="24" width="24"><path d="M9.2 18.075q-.925 0-1.6-.675t-.675-1.6V3.925q0-.925.675-1.6t1.6-.675h8.875q.925 0 1.6.675t.675 1.6V15.8q0 .925-.675 1.6t-1.6.675Zm0-2.275h8.875V3.925H9.2V15.8Zm-4.275 6.55q-.925 0-1.6-.675t-.675-1.6V6.15h2.275v13.925H15.85v2.275ZM9.2 3.925V15.8 3.925Z" /></svg>
                    </p>
                    <h6 ref={copied}>copied!</h6>
                </div>
            </div>
        </section>
    )
}