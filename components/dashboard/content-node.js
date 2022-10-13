/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from 'classnames';
import ReactLoading from 'react-loading';
import { useState, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Dropdown, ProgressBar, Tooltips } from '../partials';
import ArrowIcon from '../../public/images/ic_arrow_down.svg';
import IconCopy from '../../public/images/ic_copy.svg';
import { getPriceTokenGraphInfo } from '../../shared/redux-saga/dashboard/dashboard-actions';
import { numberWithCommas, getShortNodeAddress } from '../../shared/core/utils';
import { useSnackBar } from '../partials/snack-bar';
import { ValidatorChart } from '../charts/validator-chart';

const LineMemo = memo(({ type, name, data }) => (
  <ValidatorChart type={type} name={name} data={data} />
));

const ContentNode = ({ isAdmin, nodesInfo, sendHightlightNode }) => {
  const userInfo = useSelector(state => state.authReducer.userInfo.fullInfo);
  const [addressList, setAddressList] = useState([]);
  const [currentUserNode, setCurrentUserNode] = useState();
  const [priceTokenGraphInfo, setPriceTokenGraphInfo] = useState([]);
  const dispatch = useDispatch();
  const [earningChart, setEarningChart] = useState();
  const [optionChart, setOptionChart] = useState('day');
  const [optionPriceChart, setOptionPriceChart] = useState('day');
  const { openSnack } = useSnackBar();
  const [loadingDataChart, setLoadingDataChart] = useState(false);

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

  useEffect(() => {
    fetchPriceToken();
  }, []);

  useEffect(() => {
    if (isAdmin !== null && nodesInfo && Object.keys(nodesInfo).length > 0) {
      if (nodesInfo.addresses && Object.keys(nodesInfo.addresses).length > 0) {
        const addresses = [];
        let activeAddressRecord = null;
        Object.keys(nodesInfo.addresses).forEach(address => {
          const addressRecord = {
            ...nodesInfo.addresses[address],
            public_address_node: address,
          };
          if (
            !isAdmin &&
            userInfo.public_address_node === addressRecord.public_address_node
          ) {
            activeAddressRecord = addressRecord;
          }
          addresses.push(addressRecord);
        });
        if (addresses.length > 0) {
          setAddressList(addresses);
          if (!isAdmin && activeAddressRecord) {
            setCurrentUserNode(activeAddressRecord);
          } else if (isAdmin) {
            setCurrentUserNode(addresses[0]);
          }
        }
      }
    }
  }, [isAdmin, nodesInfo]);

  useEffect(() => {
    if (currentUserNode) {
      sendHightlightNode(currentUserNode);
      if (
        currentUserNode.validator_rewards &&
        Object.keys(currentUserNode.validator_rewards).length > 0
      ) {
        setEarningChart(currentUserNode.validator_rewards);
        setLoadingDataChart(false);
      }
    }
  }, [currentUserNode]);

  const copyClipboard = () => {
    const copyText = document.getElementById('public-address');
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    openSnack('primary', 'Copied Public Address!');
  };

  return (
    <div className="flex flex-col w-full h-full gap-5">
      <div className="w-full flex flex-col lg:flex-row gap-5">
        <Card className="w-full lg:w-1/2 h-24">
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
                value={currentUserNode?.public_address_node ?? ''}
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
                          title={currentUserNode?.public_address_node}
                          arrow
                        >
                          <span className="text-base font-thin truncate absolute inset-0">
                            {getShortNodeAddress(
                              currentUserNode?.public_address_node,
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
                    {addressList.map((node, index) => (
                      <li
                        className="p-2 hover:text-primary cursor-pointer"
                        onClick={() => {
                          setCurrentUserNode(node);
                        }}
                        key={`node_${index}`}
                      >
                        <p className="w-full relative h-6">
                          <span className="text-center text-base font-thin truncate absolute inset-0">
                            {getShortNodeAddress(node?.public_address_node, 30)}
                          </span>
                        </p>
                      </li>
                    ))}
                  </ul>
                </Dropdown>
              )}
              {!isAdmin && (
                <>
                  <Dropdown
                    className="mt-2 w-full"
                    trigger={
                      <div className="flex items-center gap-2">
                        <p className="w-full relative h-6">
                          <Tooltips
                            placement="bottom"
                            title={currentUserNode?.public_address_node}
                            arrow
                          >
                            <span className="text-base font-thin truncate absolute inset-0">
                              {getShortNodeAddress(
                                currentUserNode?.public_address_node,
                                30
                              )}
                            </span>
                          </Tooltips>
                        </p>
                        <ArrowIcon />
                      </div>
                    }
                  >
                    <Link to="/dashboard/nodes/new">
                      <span className="text-primary w-full flex items-center justify-center">
                        Add a new node
                      </span>
                    </Link>
                    <ul>
                      {addressList.map((address, index) => (
                        <li
                          className="p-2 hover:text-primary cursor-pointer"
                          onClick={() => {
                            setCurrentUserNode(address);
                          }}
                          key={`node_${index}`}
                        >
                          <p className="w-full relative h-6">
                            <span className="text-center text-base font-thin truncate absolute inset-0">
                              {getShortNodeAddress(
                                address?.public_address_node,
                                30
                              )}
                            </span>
                          </p>
                        </li>
                      ))}
                    </ul>
                  </Dropdown>
                </>
              )}
            </div>
          </div>
        </Card>
        <Card className="w-full lg:w-1/4 h-24">
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
                {numberWithCommas(currentUserNode?.stake_amount)}
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
        <Card className="w-full lg:w-1/4 h-24">
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
                {currentUserNode?.delegators}
              </span>
              <img
                width="18px"
                height="18px"
                src="/images/delegators.svg"
                alt="Info"
              />
            </div>
          </div>
        </Card>
      </div>
      <Card className="validator-rewards-tableWrapper w-full px-9 py-5">
        <div className="flex flex-col h-full justify-between">
          <div className="flex flex-col lg:flex-row lg:justify-between">
            <p className="text-lg">Validator Rewards</p>
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
              <LineMemo name="Self stake" data={earningChart[optionChart]} />
            )}
          </div>
        </div>
      </Card>
      <div className="flex flex-col lg:flex-row lg:flex-1 gap-5">
        <Card className="w-full lg:w-3/5 min-h-300px">
          <div className="w-full py-5 flex flex-col h-full justify-between">
            <div className="flex flex-col lg:flex-row lg:justify-between px-9">
              <p className="text-lg">Price</p>
              <div>
                <ul className="mt-4 gap-4 lg:mt-0 flex items-center">
                  <li className="text-sm w-16">
                    <button
                      className={classNames(
                        'w-full',
                        optionPriceChart === 'day' &&
                          'rounded-lg text-primary text-sm shadow-activeLink'
                      )}
                      type="button"
                      onClick={() => setOptionPriceChart('day')}
                    >
                      Day
                    </button>
                  </li>
                  <li className="text-sm w-16">
                    <button
                      className={classNames(
                        'w-full',
                        optionPriceChart === 'week' &&
                          'rounded-lg text-primary text-sm shadow-activeLink'
                      )}
                      type="button"
                      onClick={() => setOptionPriceChart('week')}
                    >
                      Week
                    </button>
                  </li>
                  <li className="text-sm w-16">
                    <button
                      className={classNames(
                        'w-full',
                        optionPriceChart === 'month' &&
                          'rounded-lg text-primary text-sm shadow-activeLink'
                      )}
                      type="button"
                      onClick={() => setOptionPriceChart('month')}
                    >
                      Month
                    </button>
                  </li>
                  <li className="text-sm w-16">
                    <button
                      className={classNames(
                        'w-full',
                        optionPriceChart === 'year' &&
                          'rounded-lg text-primary text-sm shadow-activeLink'
                      )}
                      type="button"
                      onClick={() => setOptionPriceChart('year')}
                    >
                      Year
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full relative pr-9 h-8.5/10">
              <LineMemo
                type="decimals"
                name="Price"
                data={priceTokenGraphInfo[optionPriceChart]}
              />
            </div>
          </div>
        </Card>
        <div className="w-full lg:w-2/5 flex flex-col gap-5">
          <Card className="flex flex-1 px-5 w-full">
            <div className="flex flex-col w-full">
              <p className="text-lg pt-5 pb-3">Node Metrics</p>
              <div className="flex flex-col">
                <div className="flex gap-3 flex-row py-1">
                  <span className="text-lg">Uptime</span>
                  <Tooltips
                    placement="right"
                    title="Uptime is calculated from the percentage of ERAs you have joined multiplied by the rewards offered per area minus any ERAs you missed while your bid was high enough to be in the validation pool."
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
                  value={currentUserNode?.uptime}
                  total={100}
                  mask="x%"
                />
                <div className="flex justify-between mb-3">
                  <p className="text-xs">
                    <b>Total ERAs:</b> {currentUserNode?.total_eras}
                  </p>
                  <p className="text-xs">
                    <b>ERAs since Redmark:</b>{' '}
                    {currentUserNode?.eras_since_bad_mark}
                  </p>
                  <p className="text-xs">
                    <b>Total Redmarks:</b> {currentUserNode?.total_bad_marks}
                  </p>
                </div>
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
                  value={currentUserNode?.update_responsiveness}
                  total={100}
                  mask=""
                  options={{
                    startText: 'Needs Improvement',
                    endText: 'Great',
                  }}
                />
              </div>
            </div>
          </Card>
          <Card className="w-full">
            <div className="flex">
              <div className="flex flex-col w-1/2 h-24 px-5 lg:px-9 border-r border-gray justify-center">
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
                    {numberWithCommas(
                      Math.round(currentUserNode?.daily_earning)
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
              <div className="flex flex-col w-1/2 h-24 px-5 lg:px-9 justify-center">
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
                    {numberWithCommas(Math.round(nodesInfo?.mbs))}
                  </span>
                  <img
                    width="18px"
                    height="18px"
                    src="/images/ic_logo_home.svg"
                    alt="Info"
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContentNode;
