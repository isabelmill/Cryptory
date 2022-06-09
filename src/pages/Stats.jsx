import { Component } from 'react'
import { cryptoService } from '../srvices/cryptoService'
import { Chart } from '../cmps/Chart'

export class Stats extends Component {
    state = {
        marketPrice: null,
    }

    componentDidMount() {
        this.createData()
    }

    async createData() {
        const data = await cryptoService.getMarketPrice()
        data.prices.length  = 14
        let marketPrice = data.prices.map((data) => {
            return {
                time: this.makeDate(data[0]),
                value: data[1],
            }
        })
        this.setState({ marketPrice })
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


    render() {
        const { marketPrice } = this.state
        return (
            <section className="stats">
                {marketPrice && <Chart data={marketPrice} />}
            </section>
        )
    }
}