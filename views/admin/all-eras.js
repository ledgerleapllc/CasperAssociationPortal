/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useDispatch } from 'react-redux';
import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import InfoIcon from '@material-ui/icons/Info';
import { LoadingScreen } from '../../components/hoc/loading-screen';
import LayoutDashboard from '../../components/layouts/layout-dashboard';
import { Card, Tooltips, Dropdown, Table } from '../../components/partials';
import { useSnackBar } from '../../components/partials/snack-bar';
import {
  getAdminERAsByUser,
  getAllAdminERAs,
} from '../../shared/redux-saga/admin/actions';
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

const ERAsTable = ({ users }) => {
  const { data, register, hasMore, resetData, appendData, setHasMore } =
    useTable();
  const [currentUser, setCurrentUser] = useState({});
  const [addresses, setAddresses] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    resetData();
    setHasMore(false);
  }, []);

  useEffect(() => {
    if (currentUser && currentUser.user_id) {
      resetData();
      setHasMore(true);
      setAddresses([]);
      dispatch(
        getAdminERAsByUser(
          currentUser.user_id,
          results => {
            setHasMore(false);
            if (
              results &&
              results.addresses &&
              results.addresses.length > 0 &&
              results.eras &&
              Object.keys(results.eras).length > 0
            ) {
              const items = [];
              Object.keys(results.eras).forEach(eraId => {
                const singleERA = results.eras[eraId];
                const singleItem = {
                  era_start_time: singleERA.era_start_time,
                  addresses: [],
                };
                if (singleERA.addresses) {
                  results.addresses.forEach(singleAddress => {
                    if (singleERA.addresses[singleAddress]) {
                      singleItem.addresses.push({
                        ...singleERA.addresses[singleAddress],
                        public_key: singleAddress,
                      });
                    } else {
                      singleItem.addresses.push({
                        public_key: singleAddress,
                        in_pool: 0,
                        rewards: 0,
                      });
                    }
                  });
                }
                items.push(singleItem);
              });
              setAddresses(results.addresses);
              appendData(items);
            }
          },
          () => {}
        )
      );
    }
  }, [currentUser]);

  const renderTableHeaders = () => {
    const items = [];
    items.push(
      <Table.HeaderCell key="header_StartTime">
        <p className="text-sm">ERA Start Time</p>
      </Table.HeaderCell>
    );
    if (addresses && addresses.length > 0) {
      addresses.forEach((key, index) => {
        items.push(
          <Table.HeaderCell
            key={`header_${index + 1}`}
            customStyle={{ width: `${parseFloat(82 / addresses.length)}%` }}
          >
            <p className="truncate text-sm pr-5">
              {getShortNodeAddress(key, 30)}
            </p>
          </Table.HeaderCell>
        );
      });
    }
    return <Table.Header>{items}</Table.Header>;
  };

  const renderTableBodyRow = (row, index) => {
    const items = [];
    items.push(
      <Table.BodyCell key="body_StartTime">
        {row.era_start_time ? (
          <>
            <p className="text-sm">
              {formatDate(row.era_start_time, 'dd/MM/yyyy')}
            </p>
            <p className="text-sm">
              {formatDate(row.era_start_time, 'HH:mm aa')} UTC
            </p>
          </>
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
    <div className="flex flex-col w-full h-full">
      <div className="flex mb-3 items-center justify-between">
        <p className="text-lg font-medium">All ERAs</p>
        <Dropdown
          className="w-200px px-3 py-3 border border-gray1 shadow-md focus:outline-none"
          trigger={
            <div className="flex items-center justify-between">
              {currentUser && currentUser.user_id ? (
                <p className="relative">{currentUser.name}</p>
              ) : (
                <p className="text-gray relative">Filter by User</p>
              )}
              <ArrowIcon />
            </div>
          }
        >
          <ul>
            {users.map((singleUser, index) => (
              <li
                className="p-2 hover:text-primary cursor-pointer"
                onClick={() => {
                  setCurrentUser(singleUser);
                }}
                key={`node_${index}`}
              >
                <p className="w-full relative h-6">
                  <span className="text-center text-base font-thin truncate absolute inset-0">
                    {singleUser.name}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </Dropdown>
      </div>
      <div className="w-full h-full overflow-hidden">
        <Styles className="h-full">
          <Table
            {...register}
            className="my-eras-table h-full"
            onLoadMore={() => {}}
            hasMore={hasMore}
            dataLength={data.length}
            noMargin
          >
            {renderTableHeaders()}
            <Table.Body className="custom-padding-tracker">
              {data.map((row, index) => renderTableBodyRow(row, index))}
            </Table.Body>
          </Table>
        </Styles>
      </div>
    </div>
  );
};

const AllERAs = () => {
  const { openSnack } = useSnackBar();
  const [currentUserNode, setCurrentUserNode] = useState({});
  const [addressList, setAddressList] = useState([]);
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const { setLoading } = useContext(AppContext);

  useEffect(() => {
    setLoading(true);
    dispatch(
      getAllAdminERAs(
        results => {
          setLoading(false);
          const addresses = results.addresses || {};
          const addressItems = [];
          Object.keys(addresses).forEach(key => {
            addressItems.push({
              ...addresses[key],
              public_address_node: key,
            });
          });
          setAddressList(addressItems);
          if (addressItems.length > 0) {
            setCurrentUserNode(addressItems[0]);
          }
          setUsers(results.users || []);
        },
        () => {
          setLoading(false);
        }
      )
    );
  }, []);

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
        <title>All ERAs - Casper Association Portal</title>
      </Head>
      <LayoutDashboard>
        <div className="w-full h-full flex flex-col gap-5">
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
                        {currentUserNode.uptime || 0}%
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
                        {currentUserNode.eras_active || 0}
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
                        {currentUserNode.eras_since_bad_mark || 0}
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
                        {currentUserNode.total_bad_marks || 0}
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
          <Card className="w-full h-full flex flex-col px-9 py-9 min-h-300px">
            <ERAsTable users={users} />
          </Card>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default LoadingScreen(AllERAs, 'final-all');
