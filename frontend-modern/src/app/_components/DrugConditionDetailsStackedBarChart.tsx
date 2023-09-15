"use client"

import React, { useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

export default function  DrugConditionDetailsStackedBarChart() {
    const [hoverData, setHoverData] = useState(null);
    const [chartOptions, setChartOptions] = useState({
        chart: {
            type: 'column'
        },xAxis: {
            categories: ['Arsenal', 'Chelsea', 'Liverpool', 'Manchester United']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Count trophies'
            },
            stackLabels: {
                enabled: true
            }
        },
        series: [{
            name: 'BPL',
            data: [3, 5, 1, 13]
        }, {
            name: 'FA Cup',
            data: [14, 8, 8, 12]
        }, {
            name: 'CL',
            data: [0, 2, 6, 3]
        }],    tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true
                }
            }
        },
    });

    const updateSeries = () => {
        setChartOptions({
            chart: {
                type: 'column'
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
