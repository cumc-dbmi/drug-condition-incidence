"use client"

import React, {useState} from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';


function removeCategoryAndData(chart:any, categoryName:string) {
    const {categories} = chart.xAxis[0]
    const categoryIndex = categories.indexOf(categoryName)
    const {data} = chart.series[0]
    // Filter data and categories
    const filteredData = data.map((p:any) => p.y).filter((v:any, i:number) => i !== categoryIndex)
    const filterdCategories = categories.filter((v:any, i:number) => i !== categoryIndex)

    // Update chart with filtered data and categories
    chart.update({xAxis: {categories: filterdCategories}, series: {data: filteredData}})
}

export const DrugConditionDetailsStackedBarChart = () => {
    const [hoverData, setHoverData] = useState(null);
    const [chartOptions, setChartOptions] = useState({
        chart: {
            type: 'column',
            events: {
                load: function() {
                    var chart = this;
                    // @ts-ignore
                    var axis = this.xAxis[0]
                    var ticks = axis.ticks
                    // @ts-ignore
                    var points = this.series[0].points
                    // @ts-ignore
                    var tooltip = this.tooltip

                    points.forEach(function(point:any, i:number) {
                        if (ticks[i]) {
                            var label = ticks[i].label.element

                            label.onclick = function() {
                           //     alert('clicked on ' + point.category)
                                removeCategoryAndData(chart, point.category)
//                                tooltip.getPosition(null, null, point)
  //                              tooltip.refresh(point)
                            }
                        }

                    })
                }}
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
            data: [729 + 1331540 + 22689 + 149164 + 526122 + 1331540 + 1915119, 206747, 4437, 10315, 3004]
        }, {
            name: 'Out Patient',
            data: [2994 + 565972 + 32181 + 225403 + 666331 + 1832829 + 2693984, 260201, 5272, 22203, 5212]
        }], tooltip: {
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
