import { createChart } from 'lightweight-charts';
import { useEffect, useRef } from 'react';

export function Chart(props) {
    
    const chartContainerRef = useRef();

    useEffect(
        () => {
            const handleResize = () => {
                chart.applyOptions({ width: chartContainerRef.current.clientWidth });
            };

            const { data } = props

            const chart = createChart(chartContainerRef.current, {
                width: chartContainerRef.current.clientWidth,
                height: 400,
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
                grid: {
                    horzLines: {
                        visible: false
                    },
                    vertLines: {
                        visible: false
                    },
                },
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