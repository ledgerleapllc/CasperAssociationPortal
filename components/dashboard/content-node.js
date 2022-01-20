/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from 'classnames';
import ReactLoading from 'react-loading';
import { useState, useEffect, useContext, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useMetrics from '../hooks/useMetrics';
import { Card, Dropdown, ProgressBar, Tooltips } from '../partials';
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
import { DEFAULT_BASE_BLOCKS } from '../../shared/core/constants';
import { useSnackBar } from '../partials/snack-bar';
import { ValidatorChart } from '../charts/validator-chart';

const LineMemo = memo(({ type, name, data }) => (
  <ValidatorChart type={type} name={name} data={data} />
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
  const [earningChart, setEarningChart] = useState();
  const [optionChart, setOptionChart] = useState('day');
  const { openSnack } = useSnackBar();
  const [loadingDataChart, setLoadingDataChart] = useState(false);

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
    setLoadingDataChart(true);
    dispatch(
      getEarningChart(
        { node: address },
        res => {
          setEarningChart(res);
          setLoadingDataChart(false);
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

  // Only for Admin
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
    <div className="flex flex-col w-full h-full">
      <div id="dashboard-content-node2__widgets" className="gap-5">
        <div className="custom-public-key-box h-full">
          <Card className="h-full lg:flex-grow">
            <div className="flex flex-col px-9 h-full justify-center">
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <span className="text-lg font-normal">Public Key</span>
                  <Tooltips
                    placement="top"
                    title="Displays the selected node address"
                    arrow
                  >
                    <img
                      width="10px"
                      height="10px"
                      src="/images/ic_feather_info.svg"
                      alt="Info"
                    />
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
                      ? currentNode?.public_address_node ?? ''
                      : userInfo.public_address_node ?? ''
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
                      {nodesList.map((node, index) => (
                        <li
                          className="p-2 hover:text-primary cursor-pointer"
                          onClick={() => {
                            setCurrentNode(node);
                            sendHightlightNode(node);
                          }}
                          key={`node_${index}`}
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
        <div className="custom-stake-amount-box h-full">
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
                  <img
                    width="10px"
                    height="10px"
                    src="/images/ic_feather_info.svg"
                    alt="Info"
                  />
                </Tooltips>
              </div>
              <div className="flex flex-row gap-2">
                <span className="text-base text-black1 font-thin">
                  {numberWithCommas(
                    isAdmin ? nodeDetail?.stake_amount : metrics?.stake_amount
                  )}
                </span>
                <img
                  width="18px"
                  height="18px"
                  src="/images/ic_logo_home.svg"
                  alt="Info"
                />
              </div>
            </div>
          </Card>
        </div>
        <div className="custom-deletagors-box h-full">
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
                  <img
                    width="10px"
                    height="10px"
                    src="/images/ic_feather_info.svg"
                    alt="Info"
                  />
                </Tooltips>
              </div>
              <div className="flex flex-row gap-2">
                <span className="text-base text-black1 font-thin">
                  {isAdmin ? nodeDetail?.delegators : metrics?.delegators}
                </span>
                <img
                  width="18px"
                  height="18px"
                  src="/images/ic_logo_home.svg"
                  alt="Info"
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div id="dashboard-content-node2__Detail">
        <div id="custom-validator-rewards-box">
          <Card className="h-full w-full px-9 py-5">
            <div className="flex flex-col h-full justify-between">
              <div className="flex flex-col lg:flex-row lg:justify-between">
                <div className="flex">
                  <p className="text-lg">Validator Rewards</p>
                </div>
                <div>
                  <ul className="mt-4 gap-4 lg:mt-0 flex items-center">
                    <li className="text-sm w-16">
                      <button
                        className={classNames(
                          'w-full',
                          optionChart === 'day' &&
                            'rounded-lg text-primary text-sm shadow-activeLink'
                        )}
                        type="button"
                        onClick={() => setOptionChart('day')}
                      >
                        Day
                      </button>
                    </li>
                    <li className="text-sm w-16">
                      <button
                        className={classNames(
                          'w-full',
                          optionChart === 'week' &&
                            'rounded-lg text-primary text-sm shadow-activeLink'
                        )}
                        type="button"
                        onClick={() => setOptionChart('week')}
                      >
                        Week
                      </button>
                    </li>
                    <li className="text-sm w-16">
                      <button
                        className={classNames(
                          'w-full',
                          optionChart === 'month' &&
                            'rounded-lg text-primary text-sm shadow-activeLink'
                        )}
                        type="button"
                        onClick={() => setOptionChart('month')}
                      >
                        Month
                      </button>
                    </li>
                    <li className="text-sm w-16">
                      <button
                        className={classNames(
                          'w-full',
                          optionChart === 'year' &&
                            'rounded-lg text-primary text-sm shadow-activeLink'
                        )}
                        type="button"
                        onClick={() => setOptionChart('year')}
                      >
                        Year
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="h-full pt-2">
                {loadingDataChart && (
                  <div className="h-full flex items-center">
                    <ReactLoading
                      className="mx-auto"
                      type="spinningBubbles"
                      color="#FF473E"
                      width={30}
                      height={30}
                    />
                  </div>
                )}
                {!loadingDataChart && earningChart && (
                  <LineMemo
                    name="Self stake"
                    data={earningChart[optionChart]}
                  />
                )}
              </div>
            </div>
          </Card>
        </div>
        <div id="dashboard-content-node2__SubDetail" className="gap-5">
          <div id="dashboard-content-node2__SubDetailLeft">
            <Card className="w-full h-full">
              <div className="w-full py-5 flex flex-col h-full justify-between">
                <p className="text-lg px-9">Price</p>
                <div className="w-full relative pr-9 h-8.5/10">
                  <LineMemo
                    type="decimals"
                    name="Price"
                    data={priceTokenGraphInfo}
                  />
                </div>
              </div>
            </Card>
          </div>
          <div id="dashboard-content-node2__SubDetailRight">
            <div id="custom-uptime-box">
              <Card className="flex items-center px-5 w-full h-full">
                <div className="h-8/10 flex flex-col justify-between w-full">
                  <div className="flex flex-col">
                    <div className="flex gap-3 flex-row py-1">
                      <span className="text-lg">Uptime</span>
                      <Tooltips
                        placement="right"
                        title="Uptime for the selected node."
                        arrow
                      >
                        <img
                          width="10px"
                          height="10px"
                          src="/images/ic_feather_info.svg"
                          alt="Info"
                        />
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
                        <img
                          width="10px"
                          height="10px"
                          src="/images/ic_feather_info.svg"
                          alt="Info"
                        />
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
                        <img
                          width="10px"
                          height="10px"
                          src="/images/ic_feather_info.svg"
                          alt="Info"
                        />
                      </Tooltips>
                    </div>
                    <ProgressBar
                      value={
                        isAdmin
                          ? +nodeDetail?.update_responsiveness
                          : metrics?.update_responsiveness
                      }
                      total={
                        isAdmin
                          ? nodeDetail?.max_update_responsiveness
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
            </div>
            <div id="custom-earnings-box">
              <Card className="custom-earnings-boxCard">
                <div className="custom-earnings-singleBox flex flex-col w-1/2 px-5 lg:px-9 border-r border-gray justify-center">
                  <div className="flex gap-3 flex-row">
                    <span className="text-lg">Daily Earnings</span>
                    <Tooltips
                      placement="top"
                      title="Displays today's earnings."
                      arrow
                    >
                      <img
                        width="10px"
                        height="10px"
                        src="/images/ic_feather_info.svg"
                        alt="Info"
                      />
                    </Tooltips>
                  </div>
                  <div className="flex flex-row mt-3">
                    <span className="text-base font-thin pr-3">
                      {numberWithCommas(Math.round(earning?.daily_earning))}
                    </span>
                    <img
                      width="18px"
                      height="18px"
                      src="/images/ic_logo_home.svg"
                      alt="Info"
                    />
                  </div>
                </div>
                <div className="custom-earnings-singleBox flex flex-col px-5 lg:px-9 w-1/2 justify-center">
                  <div className="flex gap-3 flex-row">
                    <span className="text-lg">Min Bid Slot</span>
                    <Tooltips
                      placement="top"
                      title="Displays the minimum bidding amount to win a slot in the validator pool"
                      arrow
                    >
                      <img
                        width="10px"
                        height="10px"
                        src="/images/ic_feather_info.svg"
                        alt="Info"
                      />
                    </Tooltips>
                  </div>
                  <div className="flex flex-row mt-3">
                    <span className="text-base font-thin pr-3">
                      {numberWithCommas(Math.round(earning?.mbs))}
                    </span>
                    <img
                      width="18px"
                      height="18px"
                      src="/images/ic_logo_home.svg"
                      alt="Info"
                    />
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
