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
                        color: 'white'
                    },
                    textColor: 'black'
                }
            });
            chart.timeScale().fitContent();

            const newSeries = chart.addAreaSeries();
            newSeries.setData(data);
            newSeries.applyOptions({
                topFillColor2: 'white',
                topLineColor: 'white',
                topColor: 'white',
                bottomColor: 'white',
                lineColor: 'black',
                title: 'puki',
                baseLineColor: 'white'
            })
            window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);

                chart.remove();
            };
        },
    );


    return (
        <div className="stats">
            <h1>stats</h1>
            <div
                ref={chartContainerRef}
            />
        </div>
    )
}