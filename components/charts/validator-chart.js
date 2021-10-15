/* eslint-disable global-require */
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const options = {
  markers: {
    size: 3,
    colors: undefined,
    strokeColors: '#ff473e',
    strokeWidth: 4,
    strokeOpacity: 0.6,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    shape: 'circle',
    radius: 4,
    offsetX: 0,
    offsetY: 0,
    onClick: undefined,
    onDblClick: undefined,
    showNullDataPoints: true,
    hover: {
      size: undefined,
      sizeOffset: 2,
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    type: 'datetime',
    tickAmount: 1,
  },
  yaxis: {
    labels: {
      formatter(val, index) {
        return val.toLocaleString();
      },
    },
  },
  tooltip: {
    x: {
      format: 'dd MMM yyyy',
    },
  },
  colors: ['#ff473e', '#ff473e', '#ff473e'],
  fill: {
    type: 'gradient',
    colors: ['#ff473e', '#ff473e'],
    gradient: {
      // shade: 'dark',
      opacityFrom: 0.6,
      opacityTo: 0.1,
      // shadeIntensity: 1,
    },
  },
  stroke: {
    width: 4,
    curve: 'smooth',
  },
};

export const ValidatorChart = ({ name, data }) => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const chart_data = [];
    Object.entries(data).forEach(([key, value], index) => {
      chart_data.push([+key * 1000, +data[key]]);
    });

    setSeries(chart_data);
  }, [data]);

  return (
    <div className="validator-chart h-full">
      <ReactApexChart
        options={options}
        series={[{ name, data: series }]}
        type="area"
        height="100%"
      />
    </div>
  );
};
