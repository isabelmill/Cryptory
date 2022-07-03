import { createChart } from 'lightweight-charts';
import { useEffect, useRef } from 'react';

export function Chart(props) {

    const chartContainerRef = useRef();
    // const height = window.innerHeight - 340
    useEffect(
        () => {
            const handleResize = () => {
                chart.applyOptions({ width: chartContainerRef.current.clientWidth });
            };
            
            const makeHeight = () => {
                if (window.innerWidth < 1301) {
                    return 350
                } else {
                    return window.innerHeight - 340
                }
            }

            const { data } = props

            const chart = createChart(chartContainerRef.current, {
                width: chartContainerRef.current.clientWidth,
                height: makeHeight(),
                layout: {
                    background: {
                        color: 'transparent'
                    },
                    textColor: 'white'
                }
            });
            chart.timeScale().fitContent();

            const newSeries = chart.addAreaSeries();
            newSeries.setData(data);
            newSeries.applyOptions({
                topColor: 'transparent',
                bottomColor: '#A9BEFD',
                lineColor: 'rgb(160,117,237)',
                title: 'Price',

                baseLineColor: 'black'
            })
            window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);
                chart.remove();
            };
        },
    );


    return (
        <section className="chart">
            <div
                className='graph'
                ref={chartContainerRef}
            />
        </section>
    )
}