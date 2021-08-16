/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Line } from 'react-chartjs-2';
import {
  LineChart,
  Line as Line2,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useMetrics from '../hooks/useMetrics';
import { Card, Dropdown, ProgressBar } from '../partials';
import InfoRightNode from './info-right-node';
import ArrowIcon from '../../public/images/ic_arrow_down.svg';
import {
  getNodesFromAdmin,
  getNodeDetail,
} from '../../shared/redux-saga/admin/actions';
import { getPriceTokenGraphInfo } from '../../shared/redux-saga/dashboard/dashboard-actions';
import { AppContext } from '../../pages/_app';

const PriceTokenGraph = ({ graphData }) => (
  <ResponsiveContainer width="100%" height={250}>
    <LineChart data={graphData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line2 type="monotone" dataKey="Price" stroke="#FF473E" />
    </LineChart>
  </ResponsiveContainer>
);

const ContentNode = () => {
  const { metrics, metricConfig } = useMetrics();
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
          callback(value) {
            return `${value}%`;
          },
        },
      },
    },
  };

  const userInfo = useSelector(state => state.authReducer.userInfo.fullInfo);
  const [isAdmin, setIsAdmin] = useState(null);
  const [nodesList, setNodesList] = useState([]);
  const [currentNode, setCurrentNode] = useState();
  const [priceTokenGraphInfo, setPriceTokenGraphInfo] = useState([]);
  const [nodeDetail, setNodeDetail] = useState(null);

  const dispatch = useDispatch();
  const { setLoading } = useContext(AppContext);

  const fetchNodes = () => {
    dispatch(
      getNodesFromAdmin({ page: 1, limit: 9999 }, result => {
        setNodesList(result);
        setCurrentNode(result[0]);
      })
    );
  };

  const fetchPriceToken = () => {
    dispatch(
      getPriceTokenGraphInfo(
        res => {
          setPriceTokenGraphInfo(res);
        },
        () => {}
      )
    );
  };

  const fetchNodeDetail = nodeName => {
    setLoading(true);
    dispatch(
      getNodeDetail(
        nodeName,
        res => {
          setLoading(false);
          setNodeDetail(res);
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  useEffect(() => {
    fetchPriceToken();
  }, []);

  useEffect(() => {
    if (userInfo) {
      const isAdminTemp = ['admin', 'sub-admin'].includes(userInfo?.role);
      setIsAdmin(isAdminTemp);
      if (isAdminTemp) {
        fetchNodes();
      }
    }
  }, [userInfo]);

  useEffect(() => {
    if (currentNode) {
      fetchNodeDetail(currentNode.public_address_node);
    }
  }, [currentNode]);

  return (
    <div className="flex gap-5 flex-col lg:justify-between w-full h-full lg:pr-6">
      <div className="flex gap-5 flex-wrap lg:flex-nowrap lg:h-1/10">
        <div className="hidden lg:block lg:w-4/6">
          <Card className="h-full lg:flex-grow">
            <div className="flex flex-col px-9 h-full justify-center">
              <div className="flex">
                <span className="text-lg font-normal">Node Name</span>
                <img
                  className="pl-3"
                  src="/images/ic_feather_info.svg"
                  alt="Info"
                />
              </div>
              <div className="flex w-full">
                {isAdmin && (
                  <Dropdown
                    className="mt-2 w-full"
                    trigger={
                      <div className="flex items-center gap-2">
                        <p className="w-full relative h-6">
                          <span className="text-base font-thin truncate absolute inset-0">
                            {currentNode?.public_address_node}
                          </span>
                        </p>
                        <ArrowIcon />
                      </div>
                    }
                  >
                    <ul>
                      {nodesList.map(node => (
                        <li
                          className="p-2 hover:text-primary cursor-pointer"
                          onClick={() => setCurrentNode(node)}
                        >
                          <p className="w-full relative h-6">
                            <span className="text-base font-thin truncate absolute inset-0">
                              {node.public_address_node}
                            </span>
                          </p>
                        </li>
                      ))}
                    </ul>
                  </Dropdown>
                )}
                {!isAdmin && (
                  <>
                    <span className="text-base font-thin">
                      {userInfo.public_address_node}
                    </span>
                  </>
                )}
              </div>
            </div>
          </Card>
        </div>
        <div className="w-2/4 lg:w-1/3">
          <Card className="h-full lg:flex-none">
            <div className="flex flex-col px-5 lg:px-9 h-full justify-center">
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
            <div className="flex flex-col px-5 lg:px-9 h-full justify-center">
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
      <div className="flex gap-5 flex-col lg:h-8.75/10 lg:justify-between">
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
            <div className="w-full py-5 flex flex-col h-full justify-between">
              <p className="text-lg px-9">Price</p>
              <div className="w-full relative pr-9">
                <PriceTokenGraph graphData={priceTokenGraphInfo} />
              </div>
            </div>
          </Card>
          <div className="flex gap-5 flex-col justify-between w-full lg:w-3/5 h-auto lg:h-full">
            <Card className="flex items-center px-5 h-auto lg:h-3/5 w-full">
              <div className="h-8/10 flex flex-col justify-between w-full">
                <div className="flex flex-col">
                  <div className="flex flex-row py-1">
                    <span className="text-lg">Uptime</span>
                    <img
                      className="pl-3"
                      src="/images/ic_feather_info.svg"
                      alt="Info"
                    />
                  </div>
                  <ProgressBar
                    value={isAdmin ? +nodeDetail?.uptime : metrics?.uptime}
                    total={metricConfig?.max?.uptime}
                    mask="x%"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-row py-1">
                    <span className="text-lg">Block Height</span>
                    <img
                      className="pl-3"
                      src="/images/ic_feather_info.svg"
                      alt="Info"
                    />
                  </div>
                  <ProgressBar
                    value={
                      isAdmin
                        ? +nodeDetail?.block_height_average
                        : metrics?.block_height_average
                    }
                    total={metricConfig?.max?.block_height_average}
                    mask="x/y"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-row py-1">
                    <span className="text-lg">Update Responsiveness</span>
                    <img
                      className="pl-3"
                      src="/images/ic_feather_info.svg"
                      alt="Info"
                    />
                  </div>
                  <ProgressBar
                    value={
                      isAdmin
                        ? +nodeDetail?.update_responsiveness
                        : metrics?.update_responsiveness
                    }
                    total={metricConfig?.max?.update_responsiveness}
                    mask=""
                    options={{
                      startText: 'Needs Improvement',
                      endText: 'Great',
                    }}
                  />
                </div>
              </div>
            </Card>
            <Card className="flex flex-row py-4 lg:py-6 lg:h-2/5">
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
