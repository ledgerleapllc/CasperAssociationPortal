import { Component } from 'react';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

export class ValidatorChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [],
    };
  }

  componentDidMount() {
    this.setData();
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;
    if (JSON.stringify(data) !== JSON.stringify(prevProps.data)) {
      this.setData();
    }
  }

  setData() {
    const { data } = this.props;
    const chart_data = [];
    if (data) {
      Object.entries(data).forEach(([key]) => {
        chart_data.push([+key * 1000, +data[key]]);
      });
    }
    this.setState({ series: chart_data });
  }

  beforeZoom = (e, { xaxis }) => {
    const { series } = this.state;
    const limitMin = series[0][0];
    const limitMax = series[series.length - 1][0];

    let actualMin = xaxis.min;
    let actualMax = xaxis.max;

    if (actualMax > limitMax) actualMax = limitMax;
    if (actualMin < limitMin) actualMin = limitMin;

    return {
      xaxis: {
        min: actualMin,
        max: actualMax,
      },
    };
  };

  render() {
    const { name, type } = this.props;
    const { series } = this.state;

    return (
      <div className="validator-chart h-full">
        <ReactApexChart
          options={{
            markers: {
              size: 0,
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
                formatter(val) {
                  if (type === 'decimals') {
                    return val.toFixed(4);
                  }
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
                opacityFrom: 0.6,
                opacityTo: 0.1,
              },
            },
            stroke: {
              width: 4,
              curve: 'smooth',
            },
            chart: {
              zoom: {
                enabled: true,
              },
              events: {
                beforeZoom: this.beforeZoom,
              },
            },
          }}
          series={[{ name, data: series }]}
          type="area"
          height="100%"
        />
      </div>
    );
  }
}
