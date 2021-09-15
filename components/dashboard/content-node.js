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
import { useState, useEffect, useContext, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useMetrics from '../hooks/useMetrics';
import { Card, Dropdown, ProgressBar, Tooltips } from '../partials';
import InfoRightNode from './info-right-node';
import ArrowIcon from '../../public/images/ic_arrow_down.svg';
import IconCopy from '../../public/images/ic_copy.svg';

import {
  getNodesFromAdmin,
  getNodeDetail,
} from '../../shared/redux-saga/admin/actions';
import {
  getPriceTokenGraphInfo,
  getEarningChart,
  getEarningData,
} from '../../shared/redux-saga/dashboard/dashboard-actions';
import { AppContext } from '../../pages/_app';
import { numberWithCommas, getShortNodeAddress } from '../../shared/core/utils';
import {
  DEFAULT_BASE_BLOCKS,
  DEFAULT_LINE_OPTIONS,
} from '../../shared/core/constants';
import useValidatorChart from '../hooks/useValidatorChart';
import { useSnackBar } from '../partials/snack-bar';

const PriceTokenGraph = ({ graphData }) => (
  <ResponsiveContainer width="100%" height="100%">
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

const LineMemo = memo(({ data, options = DEFAULT_LINE_OPTIONS }) => (
  <Line data={data} options={options} />
));

const ContentNode = ({ sendHightlightNode }) => {
  const { metrics, metricConfig } = useMetrics();
  const userInfo = useSelector(state => state.authReducer.userInfo.fullInfo);
  const [isAdmin, setIsAdmin] = useState(null);
  const [nodesList, setNodesList] = useState([]);
  const [currentNode, setCurrentNode] = useState();
  const [priceTokenGraphInfo, setPriceTokenGraphInfo] = useState([]);
  const [nodeDetail, setNodeDetail] = useState(null);
  const dispatch = useDispatch();
  const { setLoading } = useContext(AppContext);
  const [earning, setEarning] = useState();
  const { mappingData, options, data } = useValidatorChart();
  const [earningChart, setEarningChart] = useState();
  const { openSnack } = useSnackBar();

  const fetchNodes = () => {
    dispatch(
      getNodesFromAdmin({ page: 1, limit: 9999 }, result => {
        setNodesList(result);
        setCurrentNode(result[0]);
        sendHightlightNode(result[0]);
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

  const applyDataForChart = key => {
    mappingData(earningChart, key);
  };

  useEffect(() => {
    fetchPriceToken();
  }, []);

  const fetchNodeEarning = address => {
    dispatch(
      getEarningData(
        { node: address },
        res => {
          setEarning(res);
        },
        () => {}
      )
    );
  };

  const fetchNodeChart = address => {
    dispatch(
      getEarningChart(
        { node: address },
        res => {
          res.day = res.day.map(x => x.weight);
          res.month = res.month.map(x => x.weight);
          res.week = res.week.map(x => x.weight);
          res.year = res.year.map(x => x.weight);
          setEarningChart(res);
          mappingData(res);
        },
        () => {}
      )
    );
  };

  useEffect(() => {
    if (userInfo) {
      const isAdminTemp = ['admin', 'sub-admin'].includes(userInfo?.role);
      setIsAdmin(isAdminTemp);
      if (isAdminTemp) {
        fetchNodes();
      } else {
        fetchNodeChart(userInfo.public_address_node);
        fetchNodeEarning(userInfo.public_address_node);
      }
    }
  }, [userInfo]);

  // only for Admin
  useEffect(() => {
    if (currentNode) {
      fetchNodeDetail(currentNode.public_address_node);
      fetchNodeEarning(currentNode.public_address_node);
      fetchNodeChart(currentNode.public_address_node);
    }
  }, [currentNode]);

  const copyClipboard = () => {
    const copyText = document.getElementById('public-address');
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
    navigator.clipboard.writeText(copyText.value);
    openSnack('primary', 'Copied Public Address!');
  };

  return (
    <div className="flex gap-5 flex-col lg:justify-between w-full h-full lg:pr-6">
      <div className="flex gap-5 flex-wrap lg:flex-nowrap lg:h-1/10">
        <div className="hidden lg:block lg:w-4/6">
          <Card className="h-full lg:flex-grow">
            <div className="flex flex-col px-9 h-full justify-center">
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <span className="text-lg font-normal">Node Name</span>
                  <Tooltips
                    placement="top"
                    title="Displays the selected node address"
                    arrow
                  >
                    <img src="/images/ic_feather_info.svg" alt="Info" />
                  </Tooltips>
                </div>
                <button
                  className="ml-6"
                  type="button"
                  onClick={() => copyClipboard()}
                >
                  <IconCopy />
                </button>
                <input
                  id="public-address"
                  value={
                    isAdmin
                      ? currentNode?.public_address_node
                      : userInfo.public_address_node
                  }
                  readOnly
                  hidden
                />
              </div>
              <div className="flex w-full">
                {isAdmin && (
                  <Dropdown
                    className="mt-2 w-full"
                    trigger={
                      <div className="flex items-center gap-2">
                        <p className="w-full relative h-6">
                          <Tooltips
                            placement="bottom"
                            title={currentNode?.public_address_node}
                            arrow
                          >
                            <span className="text-base font-thin truncate absolute inset-0">
                              {getShortNodeAddress(
                                currentNode?.public_address_node,
                                30
                              )}
                            </span>
                          </Tooltips>
                        </p>
                        <ArrowIcon />
                      </div>
                    }
                  >
                    <ul>
                      {nodesList.map(node => (
                        <li
                          className="p-2 hover:text-primary cursor-pointer"
                          onClick={() => {
                            setCurrentNode(node);
                            sendHightlightNode(node);
                          }}
                        >
                          <p className="w-full relative h-6">
                            <span className="text-center text-base font-thin truncate absolute inset-0">
                              {getShortNodeAddress(
                                node?.public_address_node,
                                30
                              )}
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
                      {getShortNodeAddress(userInfo?.public_address_node, 30)}
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
              <div className="flex gap-2">
                <span className="text-base lg:text-lg lg:text-lg font-normal text-black1">
                  Stake Amount
                </span>
                <Tooltips
                  placement="top"
                  title="Amount staked to the selected node"
                  arrow
                >
                  <img src="/images/ic_feather_info.svg" alt="Info" />
                </Tooltips>
              </div>
              <span className="text-base text-black1 font-thin">
                {numberWithCommas(
                  isAdmin ? nodeDetail?.stake_amount : metrics?.stake_amount
                )}
              </span>
            </div>
          </Card>
        </div>
        <div className="w-2/4 lg:w-1/3">
          <Card className="h-full lg:flex-none">
            <div className="flex flex-col px-5 lg:px-9 h-full justify-center">
              <div className="flex gap-2">
                <span className="text-base lg:text-lg lg:text-lg font-normal text-black1">
                  Delegators
                </span>
                <Tooltips
                  placement="top"
                  title="Number of delegators to the selected node."
                  arrow
                >
                  <img src="/images/ic_feather_info.svg" alt="Info" />
                </Tooltips>
              </div>
              <span className="text-base text-black1 font-thin">
                {isAdmin ? nodeDetail?.delegators : metrics?.delegators}
              </span>
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
                      <button
                        className={
                          options === 'day' &&
                          'rounded-lg px-4 py-1 text-primary text-sm shadow-activeLink'
                        }
                        type="button"
                        onClick={() => applyDataForChart('day')}
                      >
                        Day
                      </button>
                    </li>
                    <li className="px-4">
                      <button
                        className={
                          options === 'week' &&
                          'rounded-lg px-4 py-1 text-primary text-sm shadow-activeLink'
                        }
                        type="button"
                        onClick={() => applyDataForChart('week')}
                      >
                        Week
                      </button>
                    </li>
                    <li className="text-sm mx-4">
                      <button
                        className={
                          options === 'month' &&
                          'rounded-lg px-4 py-1 text-primary text-sm shadow-activeLink'
                        }
                        type="button"
                        onClick={() => applyDataForChart('month')}
                      >
                        Month
                      </button>
                    </li>
                    <li className="text-sm mx-4">
                      <button
                        className={
                          options === 'year' &&
                          'rounded-lg px-4 py-1 text-primary text-sm shadow-activeLink'
                        }
                        type="button"
                        onClick={() => applyDataForChart('year')}
                      >
                        Year
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="h-full py-4">
                <LineMemo data={data} />
              </div>
            </div>
          </Card>
        </div>
        <div className="flex gap-5 flex-col-reverse lg:mb-0 lg:flex-row auto lg:h-3/5">
          <Card className="flex-grow w-full lg:w-2/5 h-full">
            <div className="w-full py-5 flex flex-col h-full justify-between">
              <p className="text-lg px-9">Price</p>
              <div className="w-full relative pr-9 h-8.5/10">
                <PriceTokenGraph graphData={priceTokenGraphInfo} />
              </div>
            </div>
          </Card>
          <div className="flex gap-5 flex-col justify-between w-full lg:w-3/5 h-auto lg:h-full">
            <Card className="flex items-center px-5 h-auto lg:h-3/5 w-full">
              <div className="h-8/10 flex flex-col justify-between w-full">
                <div className="flex flex-col">
                  <div className="flex gap-3 flex-row py-1">
                    <span className="text-lg">Uptime</span>
                    <Tooltips
                      placement="right"
                      title="Uptime for the selected node."
                      arrow
                    >
                      <img src="/images/ic_feather_info.svg" alt="Info" />
                    </Tooltips>
                  </div>
                  <ProgressBar
                    value={isAdmin ? +nodeDetail?.uptime : metrics?.uptime}
                    total={metricConfig?.max?.uptime}
                    mask="x%"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex gap-3 flex-row py-1">
                    <span className="text-lg">Block Height</span>
                    <Tooltips
                      placement="right"
                      title="Block height for the selected node."
                      arrow
                    >
                      <img src="/images/ic_feather_info.svg" alt="Info" />
                    </Tooltips>
                  </div>
                  <ProgressBar
                    value={
                      isAdmin
                        ? +nodeDetail?.block_height_average
                        : metrics?.block_height_average
                    }
                    total={
                      isAdmin
                        ? DEFAULT_BASE_BLOCKS
                        : metricConfig?.max?.block_height_average
                    }
                    mask="x/y"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex gap-3 flex-row py-1">
                    <span className="text-lg">Update Responsiveness</span>
                    <Tooltips
                      placement="right"
                      title="Update responsiveness for the selected node."
                      arrow
                    >
                      <img src="/images/ic_feather_info.svg" alt="Info" />
                    </Tooltips>
                  </div>
                  <ProgressBar
                    value={
                      isAdmin
                        ? +nodeDetail?.update_responsiveness
                          ? nodeDetail?.update_responsiveness
                          : nodeDetail?.max_update_responsiveness || 1
                        : metrics?.update_responsiveness
                    }
                    total={
                      isAdmin
                        ? nodeDetail?.max_update_responsiveness || 1
                        : metricConfig?.max?.update_responsiveness
                    }
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
                <div className="flex gap-3 flex-row">
                  <span className="text-lg">Daily Earnings</span>
                  <Tooltips
                    placement="top"
                    title="Displays today's earnings."
                    arrow
                  >
                    <img src="/images/ic_feather_info.svg" alt="Info" />
                  </Tooltips>
                </div>
                <div className="flex flex-row mt-3">
                  <img
                    width="18px"
                    height="18px"
                    src="/images/ic_logo_home.svg"
                    alt="Info"
                  />
                  <span className="text-base font-thin pl-3">
                    {numberWithCommas(Math.round(earning?.daily_earning))}
                  </span>
                </div>
              </div>
              <div className="flex flex-col px-5 lg:px-0 w-1/2 lg:pl-20 justify-center">
                <div className="flex gap-3 flex-row">
                  <span className="text-lg">Total Earnings</span>
                  <Tooltips
                    placement="top"
                    title="Displays the total earnings for the selected node since onboarding."
                    arrow
                  >
                    <img src="/images/ic_feather_info.svg" alt="Info" />
                  </Tooltips>
                </div>
                <div className="flex flex-row mt-3">
                  <img
                    width="18px"
                    height="18px"
                    src="/images/ic_logo_home.svg"
                    alt="Info"
                  />
                  <span className="text-base font-thin pl-3">
                    {numberWithCommas(Math.round(earning?.total_earning))}
                  </span>
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
                    <LineMemo data={data} />
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
