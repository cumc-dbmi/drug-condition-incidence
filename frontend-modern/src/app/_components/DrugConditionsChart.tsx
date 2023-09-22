"use client"

import React, { useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import Highcharts from 'highcharts';

// Initialize highcharts-more module
HighchartsMore(Highcharts);
interface DrugConditionsChartProps {
    data: Promise< DrugCondition[]>
}

export const DrugConditionsChart = ({  data }: DrugConditionsChartProps) => {
    console.log("Render DrugConditionsChart");
    const [hoverData, setHoverData] = useState(null);
    const [chartOptions, setChartOptions] = useState({
        chart: {
            type: 'columnrange',
            inverted: false  // Changed to false to make the chart vertical
        },
        title: {
            text: 'Highest Drug Conditions Incidence Rate ',
            align: 'center'
        },
        subtitle: {
            text: 'Drug Condition Incidence Rate',
        },

        xAxis: {  // Corrected from "Axis" to "xAxis"
            categories: [
                'Cardiac arrhythmia',
                'Kidney disease',
                'Hypokalemia',
                'Renal impairment',
                'Renal failure syndrome',
                'Pneumonitis',
                'Constipation',
                'Nausea',
                'Diabetes mellitus',
                'Dizziness',
                'Vomiting',
                'Headache']
        },

        yAxis: {
            title: {
                text: 'Incidence Rate( % )'
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
                    format: '{y}°%'
                }
            }
        },

        legend: {
            enabled: false
        },

        series: [{
            name: 'Incidence Rate',
            data: [
                [45.68, 0.67],
                [42.11, 0.88],
                [37.16, 0.2],
                [35.87, 0.53],
                [33.23, 0.39],
                [27.43, 0.34],
                [25.03, 0.85],
                [23.10, 0.45],
                [21.45, 1.62],
                [18.55, 0.4],
                [18.39, 0.46],
                [15.97, 0.68]
            ]
        }]
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
