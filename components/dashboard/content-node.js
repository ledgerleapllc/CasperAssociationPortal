import { Line } from 'react-chartjs-2';
import useMetrics from '../hooks/useMetrics';
import { Card } from '../partials';
import InfoRightNode from './info-right-node';

const ContentNode = () => {
  const { metrics } = useMetrics();
  const lineData = {
    datasets: [
      {
        backgroundColor: 'rgba(255,71,62, 0.7)',
        data: [1400, 1600, 1500, 2000, 1800, 1600, 1850],
        fill: true,
        fillOpacity: 0.6,
        label: 'Current',
        pointRadius: 0,
        showLine: false,
      },
      {
        borderColor: '#FF473E',
        borderDash: [5, 5],
        data: [1500, 1550, 1650, 1900, 1700, 1650, 1780],
        fill: false,
        label: 'Previous',
        pointRadius: 0,
        showLine: true,
      },
    ],
    labels: ['Sun', 'Mon', 'Tues', 'Wed', 'Thrs', 'Fri', 'Sat'],
  };
  const lineOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          borderDash: [5, 5],
          drawBorder: false,
        },
      },
    },
  };

  const cpuUsageData = {
    datasets: [
      {
        borderColor: '#FF473E',
        borderWidth: 1,
        data: [11, 92, 53, 78, 54],
        fill: false,
        label: 'CPU',
        pointRadius: 0,
        showLine: true,
      },
    ],
    labels: ['12:00', '13:00', '14:00', '15:00', '16:00'],
  };

  const cpuUsageOption = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          borderDash: [5, 5],
          drawBorder: false,
        },
        position: 'left',
        ticks: {
          fontSize: 10,
          max: 100,
          min: 0,
          stepSize: 25,
          callback: function (value) {
            return value + '%';
          },
        },
      },
    },
  };

  return (
    <div className="flex gap-5 flex-col lg:justify-between w-full h-full lg:pr-6">
      <div className="flex gap-5 flex-wrap lg:flex-nowrap lg:h-1.5/10">
        <div className="hidden lg:block lg:w-4/6">
          <Card className="h-full lg:flex-grow">
            <div className="flex flex-col px-9 py-4">
              <div className="flex">
                <span className="text-lg font-normal">Node Name</span>
                <img
                  className="pl-3"
                  src="/images/ic_feather_info.svg"
                  alt="Info"
                />
              </div>
              <div className="flex">
                <span className="text-base font-thin">
                  0x961d61792ca1c5e08a3cec4261e08ef4eaea5b5d
                </span>
                <img className="pl-3" src="/images/ic_down.svg" alt="Info" />
              </div>
            </div>
          </Card>
        </div>
        <div className="w-2/4 lg:w-1/3">
          <Card className="h-full lg:flex-none">
            <div className="flex flex-col px-5 lg:px-9 py-4">
              <div className="flex">
                <span className="text-base lg:text-lg lg:text-lg font-normal text-black1">
                  Stake Amount
                </span>
                <img
                  className="hidden lg:block pl-3"
                  src="/images/ic_feather_info.svg"
                  alt="Info"
                />
              </div>
              <span className="text-base text-black1 font-thin">2,502,815</span>
            </div>
          </Card>
        </div>
        <div className="w-2/4 lg:w-1/3">
          <Card className="h-full lg:flex-none">
            <div className="flex flex-col px-5 lg:px-9 py-4">
              <div className="flex">
                <span className="text-base lg:text-lg lg:text-lg font-normal text-black1">
                  Delegators
                </span>
                <img
                  className="hidden lg:block pl-3"
                  src="/images/ic_feather_info.svg"
                  alt="Info"
                />
              </div>
              <span className="text-base text-black1 font-thin">8</span>
            </div>
          </Card>
        </div>
      </div>
      <Card className="block lg:hidden h-auto">
        <div className="h-auto w-full">
          <InfoRightNode />
        </div>
      </Card>
      <div className="flex gap-5 flex-col lg:h-8.5/10 lg:justify-between">
        <div className="hidden lg:flex h-auto lg:h-2/5">
          <Card className="h-full w-full px-9 py-5">
            <div className="flex flex-col h-full justify-between">
              <div className="flex flex-col lg:flex-row lg:justify-between">
                <div className="flex">
                  <p className="text-lg">Validator Rewards</p>
                  <div className="flex items-center">
                    <img
                      className="pl-10"
                      src="/images/ic_line_node.svg"
                      alt="Line"
                    />
                    <p className="text-xs pl-2">Previous</p>
                  </div>
                </div>
                <div>
                  <ul className="mt-4 lg:mt-0 flex items-center">
                    <li className="text-sm lg:mx-4">
                      <a>Day</a>
                    </li>
                    <li className="px-4">
                      <a className="rounded-lg px-4 py-1 text-primary text-sm shadow-activeLink">
                        Week
                      </a>
                    </li>
                    <li className="text-sm mx-4">
                      <a>Month</a>
                    </li>
                    <li className="text-sm mx-4">
                      <a>Year</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="h-full py-4">
                <Line data={lineData} options={lineOptions} />
              </div>
            </div>
          </Card>
        </div>
        <div className="flex gap-5 flex-col-reverse lg:mb-0 lg:flex-row auto lg:h-3/5">
          <Card className="flex-grow w-full lg:w-2/5 h-full">
            <div className="w-full px-9 py-5 flex flex-col h-full justify-between">
              <p className="text-lg">CPU Usage</p>
              <div className="h-full py-4">
                <Line data={cpuUsageData} options={cpuUsageOption} />
              </div>
            </div>
          </Card>
          <div className="flex gap-5 flex-col justify-between w-full lg:w-3/5 h-auto lg:h-full">
            <Card className="flex flex-col justify-between p-5 h-auto lg:h-3/5 w-full overflow-y-scroll">
              <div className="flex flex-col">
                <div className="flex flex-row py-1">
                  <span className="text-lg">Uptime</span>
                  <img
                    className="pl-3"
                    src="/images/ic_feather_info.svg"
                    alt="Info"
                  />
                </div>
                <div className="overflow-hidden h-4 mt-2 text-xs flex rounded-lg bg-gray bg-opacity-50">
                  <div
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white font-thin justify-center bg-primary"
                    style={{ width: `${metrics?.uptime}%` }}
                  >
                    {metrics?.uptime}%
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-row py-1">
                  <span className="text-lg">Peers</span>
                  <img
                    className="pl-3"
                    src="/images/ic_feather_info.svg"
                    alt="Info"
                  />
                </div>
                <div className="overflow-hidden h-4 mt-2 text-xs flex rounded-lg bg-gray bg-opacity-50">
                  <div
                    style={{ width: `calc(${metrics?.peers} / 88 * 100%)` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white font-thin justify-center bg-primary">
                    {Math.round((metrics?.peers / 88) * 100)} %
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-row py-1">
                  <span className="text-lg">Performance</span>
                  <img
                    className="pl-3"
                    src="/images/ic_feather_info.svg"
                    alt="Info"
                  />
                </div>
                <div className="overflow-hidden h-4 mt-2 text-xs flex rounded-lg bg-gray bg-opacity-50">
                  <div
                    style={{
                      width: `calc(${metrics?.update_responsiveness} / 5 * 100%)`,
                    }}
                    className="w-3/4 shadow-none flex flex-col text-center whitespace-nowrap text-white font-thin justify-center bg-primary">
                    {Math.round((metrics?.update_responsiveness / 5) * 100)} %
                  </div>
                </div>
              </div>
            </Card>
            <Card className="flex flex-row py-4 lg:py-6 lg:h-2/5 z-20">
              <div className="flex flex-col w-1/2 px-5 lg:px-0 border-r border-gray lg:pl-20 justify-center">
                <div className="flex flex-row">
                  <span className="text-lg">Daily Earnings</span>
                  <img
                    className="pl-3 lg:pl-5"
                    src="/images/ic_feather_info.svg"
                    alt="Info"
                  />
                </div>
                <div className="flex flex-row mt-3">
                  <img
                    width="18px"
                    height="18px"
                    src="/images/ic_logo_home.svg"
                    alt="Info"
                  />
                  <span className="text-base font-thin pl-3">0.0154</span>
                </div>
              </div>
              <div className="flex flex-col px-5 lg:px-0 w-1/2 lg:pl-20 justify-center">
                <div className="flex flex-row">
                  <span className="text-lg">Total Earnings</span>
                  <img
                    className="pl-3 lg:pl-5"
                    src="/images/ic_feather_info.svg"
                    alt="Info"
                  />
                </div>
                <div className="flex flex-row mt-3">
                  <img
                    width="18px"
                    height="18px"
                    src="/images/ic_logo_home.svg"
                    alt="Info"
                  />
                  <span className="text-base font-thin pl-3">6.101297</span>
                </div>
              </div>
            </Card>
            <div className="flex lg:hidden mt-5 h-auto">
              <Card className="w-full px-9 py-5">
                <div className="flex flex-col h-full justify-between">
                  <div className="flex flex-col lg:flex-row lg:justify-between">
                    <div className="flex justify-between">
                      <p className="text-2xl">Validator Rewards</p>
                      <div className="flex items-center">
                        <img
                          className="lg:pl-10"
                          src="/images/ic_line_node.svg"
                          alt="Line"
                        />
                        <p className="text-xs pl-2">Previous</p>
                      </div>
                    </div>
                    <div>
                      <ul className="mt-4 lg:mt-0 flex items-center">
                        <li className="text-sm lg:mx-4">
                          <a>Day</a>
                        </li>
                        <li className="px-4">
                          <a className="rounded-lg px-4 py-1 text-primary text-sm shadow-activeLink">
                            Week
                          </a>
                        </li>
                        <li className="text-sm mx-4">
                          <a>Month</a>
                        </li>
                        <li className="text-sm mx-4">
                          <a>Year</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="h-full py-4">
                    <Line data={lineData} options={lineOptions} />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentNode;
