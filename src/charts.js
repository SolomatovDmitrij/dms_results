import React from 'react';
import { Chart } from 'react-charts';

export default function MyChart(props) {
    console.log('chart-data:', props.data)
    const data2 = [
            {
                label: props.name,
                /*
                data: [
                    {x: 1, y: 2},
                    {x: 2, y: 4},
                ],
                */
                data: props.data,
                color: 'rgba(250,216,186,0.9)',
            },
        ]
    const data = React.useMemo(
        () => [
            {
                label: props.name,
                /*
                data: [
                    {x: 1, y: 2},
                    {x: 2, y: 4},
                ],
                */
                data: props.data,
                color: 'rgba(250,216,186,0.9)',
            },
        ],
        [props.data]
    )

    const axes2 = [
            { primary: true, type: 'ordinal', position: 'bottom' },
            { type: 'linear', position: 'left', stacked: true },
        ]
    const axes = React.useMemo(
        () => [
            { primary: true, type: 'ordinal', position: 'bottom' },
            { type: 'linear', position: 'left', stacked: true },
        ],
        [props.data]
    )

    const series2 = ( { type: "bar" } )
    const series = React.useMemo(
        () => ({ type: "bar" }), [props.data]
    )

    return (
        <div
        style={{
            width: '400px',
           height: '300px',
        }}
        >
        <Chart data={data2} series={series2} axes={axes2} tooltip />
        </div>
    )
}
