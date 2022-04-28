import { useState } from 'react';

export default function useValidatorChart() {
  const [data, setData] = useState();
  const [options, setOptions] = useState();

  const mappingData = (raw, key = 'day') => {
    let labels;
    setOptions(key);
    if (key === 'day') {
      labels = [
        '0:00',
        '2:00',
        '4:00',
        '6:00',
        '8:00',
        '10:00',
        '12:00',
        '14:00',
        '16:00',
        '18:00',
        '20:00',
        '22:00',
        '24:00',
      ];
    }
    if (key === 'week') {
      labels = ['Sun', 'Mon', 'Tues', 'Wed', 'Thrs', 'Fri', 'Sat'];
    }
    if (key === 'month') {
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;
      const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
      labels = Array(daysInMonth)
        .fill(1)
        .map((x, index) => index + 1);
    }
    if (key === 'year') {
      labels = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
    }
    const chartData = {
      datasets: [
        {
          backgroundColor: 'rgba(255,71,62, 0.7)',
          data: raw[key],
          fill: true,
          fillOpacity: 0.6,
          label: 'Current',
          pointRadius: 0,
          showLine: false,
        },
        {
          borderColor: '#FF473E',
          borderDash: [5, 5],
          data: raw[key],
          fill: false,
          label: 'Previous',
          pointRadius: 0,
          showLine: true,
        },
      ],
      labels,
    };
    setData(chartData);
  };

  return { data, options, mappingData };
}
