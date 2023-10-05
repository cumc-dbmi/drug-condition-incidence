'use client';

import React, { useEffect, useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { useRouter } from 'next/navigation';

function removeCategoryAndData(chart: any, categoryName: string) {
  const { categories } = chart.xAxis[0];
  const categoryIndex = categories.indexOf(categoryName);
  const { data } = chart.series[0];
  // Filter data and categories
  const filteredData = data
    .map((p: any) => p.y)
    .filter((v: any, i: number) => i !== categoryIndex);
  const filterdCategories = categories.filter(
    (v: any, i: number) => i !== categoryIndex
  );

  // Update chart with filtered data and categories
  chart.update({
    xAxis: { categories: filterdCategories },
    series: { data: filteredData },
  });
}

interface DrugConditionDetailsStackedBarChartProps {
  isLoading: boolean;
  drug: Drug;
  drugCondition: DrugCondition;
  chartCategories: string[];
  chartDataGroup1: number[];
  chartDataGroup2: number[];
  className: string;
}

export const DrugConditionDetailsStackedBarChart = ({
  isLoading,
  drug,
  drugCondition,
  chartCategories,
  chartDataGroup1,
  chartDataGroup2,
  className,
}: DrugConditionDetailsStackedBarChartProps) => {
  console.log('Render DrugConditionsChart');
  const router = useRouter();
  let [timeAtRiskInDays, setTimeAtRiskInDays] = React.useState(365);

  const [hoverData, setHoverData] = useState(null);
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    if (!isLoading) {
      let options = {
        chart: {
          type: 'column',
          events: {
            load: function () {
              const chart = this;
              // @ts-ignore
              const axis = this.xAxis[0];
              const ticks = axis.ticks;
              // @ts-ignore
              const points = this.series[0].points;
              // @ts-ignore
              const tooltip = this.tooltip;

              points.forEach(function (point: any, i: number) {
                if (ticks[i]) {
                  var label = ticks[i].label.element;

                  label.onclick = function () {
                    //     alert('clicked on ' + point.category)
                    removeCategoryAndData(chart, point.category);
                    //                                tooltip.getPosition(null, null, point)
                    //                              tooltip.refresh(point)
                  };
                }
              });
            },
          },
        },
        title: {
          text: 'Patients at Risk by Country',
          align: 'center',
        },
        xAxis: {
          categories: chartCategories,
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Patents at Risk',
          },
          stackLabels: {
            enabled: true,
          },
        },
        series: [
          {
            name: 'Required Full Time at Risk: YES',
            data: chartDataGroup1,
          },
          {
            name: 'Required Full Time at Risk: NO',
            data: chartDataGroup2,
          },
        ],
        tooltip: {
          headerFormat: '<b>{point.x}</b><br/>',
          pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}',
        },
        plotOptions: {
          column: {
            stacking: 'normal',
            dataLabels: {
              enabled: true,
            },
          },
        },
      };
      setChartOptions(options);
    }
  }, [isLoading, chartCategories, chartDataGroup1, chartDataGroup2]);
  return (
    <div className={className}>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};
