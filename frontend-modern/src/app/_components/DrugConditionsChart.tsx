"use client"

import React, { useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import Highcharts from 'highcharts';

// Initialize highcharts-more module
HighchartsMore(Highcharts);
export default function  DrugConditionsChart() {
    const [hoverData, setHoverData] = useState(null);
    const [chartOptions, setChartOptions] = useState({
        chart: {
            type: 'columnrange',
            inverted: false  // Changed to false to make the chart vertical
        },

        accessibility: {
            description: '...'
        },

        title: {
            text: 'Temperature variation by month'
        },

        subtitle: {
            text: 'Observed in Vik i Sogn, Norway, 2021 | Source: Vikjavev'
        },

        xAxis: {  // Corrected from "Axis" to "xAxis"
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },

        yAxis: {
            title: {
                text: 'Temperature ( °C )'
            }
        },

        tooltip: {
            valueSuffix: '°C'
        },

        plotOptions: {
            columnrange: {
                borderRadius: '50%',
                dataLabels: {
                    enabled: true,
                    format: '{y}°C'
                }
            }
        },

        legend: {
            enabled: false
        },

        series: [{
            name: 'Temperatures',
            data: [
                [-13.9, 5.2],
                [-16.7, 10.6],
                [-4.7, 11.6],
                [-4.4, 16.8],
                [-2.1, 27.2],
                [5.9, 29.4],
                [6.5, 29.1],
                [4.7, 25.4],
                [4.3, 21.6],
                [-3.5, 15.1],
                [-9.8, 12.5],
                [-11.5, 8.4]
            ]
        }]
    });

    const updateSeries = () => {
        setChartOptions({
            chart: {
                type: 'columnrange',
                inverted: false  // Changed to false to make the chart vertical
            },
            title: {
                text: 'Major trophies for some English teams',
                align: 'left'
            },
        });
    }

    return (
        <div className="w-full">
            <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
            />
            <h3>Hovering over {hoverData}</h3>
            <button onClick={updateSeries}>Update Series</button>
        </div>
    )
}
