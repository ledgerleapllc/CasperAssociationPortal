/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import InfoIcon from '@material-ui/icons/Info';
import { LoadingScreen } from '../../components/hoc/loading-screen';
import LayoutDashboard from '../../components/layouts/layout-dashboard';
import { Card, Tooltips, Dropdown, Table } from '../../components/partials';
import { useSnackBar } from '../../components/partials/snack-bar';
import { getNodesByUser } from '../../shared/redux-saga/admin/actions';
import { getMyERAs } from '../../shared/redux-saga/dashboard/dashboard-actions';
import { getShortNodeAddress, formatDate } from '../../shared/core/utils';
import { useTable } from '../../components/partials/table';
import IconCopy from '../../public/images/ic_copy.svg';
import ArrowIcon from '../../public/images/ic_arrow_down.svg';
import { AppContext } from '../../pages/_app';

const Styles = styled.div`
  .my-eras-table {
    display: flex;
    flex-direction: column;
    .col-1 {
      width: 18%;
    }
  }
`;

const ERAsTable = ({ addresses, eras }) => {
  const { data, register, appendData, setHasMore } = useTable();

  const makeTableData = () => {
    const items = [];
    Object.keys(eras).forEach(key => {
      const eraObject = eras[key];
      const singleItem = {
        era_start_time: eraObject?.era_start_time || '',
        addresses: [],
      };
      Object.keys(addresses).forEach(key2 => {
        if (eraObject.addresses && eraObject.addresses[key2]) {
          singleItem.addresses.push({
            address: key2,
            in_pool: parseInt(eraObject.addresses[key2].in_pool || 0, 10),
            rewards: eraObject.addresses[key2]?.rewards || 0,
          });
        } else {
          singleItem.addresses.push({
            address: key2,
            in_pool: 0,
            rewards: 0,
          });
        }
      });
      items.push(singleItem);
    });
    appendData(items);
    setHasMore(false);
  };

  useEffect(() => {
    makeTableData();
  }, [addresses, eras]);

  const renderTableHeaders = () => {
    const items = [];
    items.push(
      <Table.HeaderCell key="header_StartTime">
        <p className="text-sm">ERA Start Time</p>
      </Table.HeaderCell>
    );
    const { length } = Object.keys(addresses);
    Object.keys(addresses).forEach((key, index) => {
      items.push(
        <Table.HeaderCell
          key={`header_${index + 1}`}
          customStyle={{ width: `${parseFloat(82 / length)}%` }}
        >
          <p className="truncate text-sm pr-5">
            {getShortNodeAddress(key, 30)}
          </p>
        </Table.HeaderCell>
      );
    });
    return <Table.Header>{items}</Table.Header>;
  };

  const renderTableBodyRow = (row, index) => {
    const items = [];
    items.push(
      <Table.BodyCell key="body_StartTime">
        {row.era_start_time ? (
          <p className="text-sm">
            {formatDate(row.era_start_time, 'dd/MM/yyyy')}
            <br />
            {formatDate(row.era_start_time, 'HH:mm aa')}
          </p>
        ) : null}
      </Table.BodyCell>
    );
    const { length } = row.addresses;
    row.addresses.forEach((item, index2) => {
      items.push(
        <Table.BodyCell
          key={`body_${index2 + 1}`}
          customStyle={{ width: `${parseFloat(82 / length)}%` }}
        >
          {item.in_pool ? (
            <>
              <p className="text-sm">In Pool</p>
              <p className="text-sm">{item.rewards}% Rewards</p>
            </>
          ) : (
            <p className="text-red text-sm">Rejected from Pool</p>
          )}
        </Table.BodyCell>
      );
    });
    return <Table.BodyRow key={`b-${index}`}>{items}</Table.BodyRow>;
  };

  return (
    <Styles className="h-full">
      <Table
        {...register}
        className="my-eras-table h-full"
        onLoadMore={() => {}}
        hasMore={false}
        dataLength={data.length}
        noMargin
      >
        {renderTableHeaders()}
        <Table.Body className="custom-padding-tracker">
          {data.map((row, index) => renderTableBodyRow(row, index))}
        </Table.Body>
      </Table>
    </Styles>
  );
};

const MyERAs = () => {
  const userInfo = useSelector(state => state.authReducer.userInfo.fullInfo);
  const { openSnack } = useSnackBar();
  const [currentUserNode, setCurrentUserNode] = useState();
  const [addressList, setAddressList] = useState([]);
  const [erasData, setERAsData] = useState({});
  const [cardsInfo, setCardsInfo] = useState({});
  const dispatch = useDispatch();
  const { setLoading } = useContext(AppContext);

  const fetchUserNodes = () => {
    dispatch(
      getNodesByUser({}, result => {
        const addresses = result.addresses || [];
        if (addresses.length > 0) {
          setCurrentUserNode(addresses[0]);
        }
        setAddressList(addresses);
      })
    );
  };

  const fetchMyERAs = () => {
    setLoading(true);
    dispatch(
      getMyERAs(
        res => {
          setLoading(false);
          setERAsData(res);
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  useEffect(() => {
    if (userInfo) {
      fetchUserNodes();
      fetchMyERAs();
    }
  }, [userInfo]);

  useEffect(() => {
    if (
      currentUserNode &&
      currentUserNode.public_address_node &&
      erasData &&
      erasData.addresses
    ) {
      setCardsInfo(
        erasData.addresses[currentUserNode.public_address_node] || {}
      );
    } else {
      setCardsInfo({});
    }
  }, [currentUserNode, erasData]);

  const copyClipboard = () => {
    const copyText = document.getElementById('public-address');
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    openSnack('primary', 'Copied Public Address!');
  };

  return (
    <>
      <Head>
        <title>My ERAs - Casper Association Portal</title>
      </Head>
      <LayoutDashboard>
        <div className="w-full 2xl:w-4/5 h-full flex flex-col gap-5">
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="w-full lg:w-1/2">
              <Card className="w-full h-24">
                <div className="flex flex-col px-9 h-full justify-center">
                  <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                      <span className="text-lg font-normal">Public Key</span>
                      <Tooltips
                        placement="top"
                        title="Displays the selected node address"
                        arrow
                      >
                        <InfoIcon
                          style={{ color: 'black', fontSize: '16px' }}
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
                  </div>
                </div>
              </Card>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="grid grid-cols-2 gap-5">
                <Card className="w-full h-24">
                  <div className="flex flex-col px-5 h-full justify-center">
                    <span className="text-base lg:text-lg font-normal text-black1">
                      Uptime
                    </span>
                    <div className="flex flex-row gap-2">
                      <span className="text-base text-black1 font-thin">
                        {cardsInfo?.uptime}%
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
                <Card className="w-full h-24">
                  <div className="flex flex-col px-5 h-full justify-center">
                    <div className="flex gap-2">
                      <span className="text-base lg:text-lg font-normal text-black1">
                        ERAs Active
                      </span>
                    </div>
                    <div className="flex flex-row gap-2">
                      <span className="text-base text-black1 font-thin">
                        {cardsInfo?.eras_active}
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
                <Card className="w-full h-24">
                  <div className="flex flex-col px-5 h-full justify-center">
                    <div className="flex gap-2">
                      <span className="text-base lg:text-lg font-normal text-black1">
                        ERAs since Last Redmark
                      </span>
                    </div>
                    <div className="flex flex-row gap-2">
                      <span className="text-base text-black1 font-thin">
                        {cardsInfo?.eras_since_bad_mark}
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
                <Card className="w-full h-24">
                  <div className="flex flex-col px-5 h-full justify-center">
                    <div className="flex gap-2">
                      <span className="text-base lg:text-lg font-normal text-black1">
                        Total Redmarks
                      </span>
                    </div>
                    <div className="flex flex-row gap-2">
                      <span className="text-base text-black1 font-thin">
                        {cardsInfo?.total_bad_marks}
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
          <Card className="w-full h-full min-h-300px px-9 py-9">
            {erasData &&
            erasData.addresses &&
            erasData.eras &&
            JSON.stringify(erasData.addresses) !== '{}' &&
            JSON.stringify(erasData.eras) !== '{}' ? (
              <ERAsTable addresses={erasData.addresses} eras={erasData.eras} />
            ) : null}
          </Card>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default LoadingScreen(MyERAs, 'final-all');
