'use client';

import React, { useEffect, useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import Highcharts from 'highcharts';

// Initialize highcharts-more module
HighchartsMore(Highcharts);
interface DrugConditionsChartProps {
  drug: Drug;
  isLoading: boolean;
  categories: string[];
  data: number[][];
}

export const DrugConditionsChart = ({
  drug,
  isLoading,
  categories,
  data,
}: DrugConditionsChartProps) => {
  console.log('Render DrugConditionsChart');
  const [chartOptions, setChartOptions] = useState({});
  useEffect(() => {
    if (!isLoading) {
      let options = {
        chart: {
          type: 'columnrange',
          inverted: true,
          events: {
            load: function () {
              const chart = this;
              // @ts-ignore
              const axis = this.xAxis[0];
              const ticks = axis.ticks;
              // @ts-ignore
              const points = this.series[0].points;
              points.forEach((point: any, i: number) => {
                if (ticks[i]) {
                  var label = ticks[i].label.element;
                  label.onclick = function () {
                    alert('clicked on ' + point.category);
                  };
                }
              });
            },
          },
        },
        title: {
          text: 'Highest Drug Conditions Incidence Rate ',
          align: 'center',
        },
        subtitle: {
          text: 'Drug Condition Incidence Rate',
        },
        xAxis: {
          categories: categories,
        },
        yAxis: {
          title: {
            text: 'Incidence Rate( % )',
          },
        },
        tooltip: {
          valueSuffix: '°C',
        },
        plotOptions: {
          columnrange: {
            borderRadius: '50%',
            dataLabels: {
              enabled: true,
              format: '{y}°%',
            },
          },
        },
        legend: {
          enabled: false,
        },
        series: [
          {
            name: 'Incidence Rate',
            data: data,
          },
        ],
      };
      setChartOptions(options);
    }
  }, [isLoading, categories, data]);
  return (
    <div className='w-full'>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};
