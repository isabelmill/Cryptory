// import { Component } from 'react'
// import { userService } from '../srvices/userService'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadLoggedInUser } from '../store/actions/userActions'


export function Data() {

    useEffect(() => {
        dispatch(loadLoggedInUser())
        // eslint-disable-next-line
    }, [])

    const dispatch = useDispatch()

    const { loggedInUser } = useSelector(state => state.userModule)

    if (!loggedInUser) return <div>Loading...</div>
    return (
        <div>
            <h2>Hello {loggedInUser.name}</h2>
            {loggedInUser.transactions.map(transaction =>
                <div key={transaction} >
                    <p>symbol {transaction.symbol}</p>
                    <p>cost {transaction.cost}</p>
                    <p>qty {transaction.qty}</p>
                </div>
            )}
            <h1>_______________</h1>
            {loggedInUser.assets.map(asset =>
                <div key={asset} >
                    <p>symbol {asset.symbol}</p>
                    <p>cost {asset.cost}</p>
                    <p>qty {asset.qty}</p>
                    <p>market price {asset.marketPrice}</p>
                </div>
            )}
        </div>
    )
}