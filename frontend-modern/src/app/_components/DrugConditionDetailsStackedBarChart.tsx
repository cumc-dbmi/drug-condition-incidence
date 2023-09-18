"use client"

import React, { useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

export const DrugConditionDetailsStackedBarChart = () => {
    const [hoverData, setHoverData] = useState(null);
    const [chartOptions, setChartOptions] = useState({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Patients at Risk by Country',
            align: 'center'
        },
        xAxis: {
            categories: ['US', 'Germany', 'Japan', 'France', 'Australia']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Patents at Risk'
            },
            stackLabels: {
                enabled: true
            }
        },
        series: [{
            name: 'Required Full Time at Risk',
            data: [729+1331540+22689+149164+526122+1331540+1915119, 206747, 4437, 10315,3004]
        }, {
            name: 'Out Patient',
            data: [2994+565972+32181+225403+666331+1832829+2693984, 260201, 5272, 22203, 5212]
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
    return (
        <div className="w-full">
            <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
            />
        </div>
    )
}
