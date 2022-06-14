import { Component } from 'react'
import { userService } from '../srvices/userService'


export class Data extends Component {

    state = {
        user: null,
    }

    componentDidMount() {
        this.getUser()
    }

    getUser() {
        const user = userService.getUser()
        this.setState({ user })
    }

    render() {
        const { user } = this.state
        if (!user) return
        return (
            <div>
                <h1>Data!</h1>
                <h2>Hello {user.name}</h2>
                {user.transactions.map(transaction =>
                    <div key={transaction} >
                        <p>symbol {transaction.symbol}</p>
                        <p>cost {transaction.cost}</p>
                        <p>qty {transaction.qty}</p>
                    </div>
                )}
                <h1>_______________</h1>
                {user.assets.map(asset =>
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
}