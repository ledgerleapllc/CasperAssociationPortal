/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Link } from 'react-router-dom';
import { LoadingScreen } from '../../components/hoc/loading-screen';
import LayoutDashboard from '../../components/layouts/layout-dashboard';
import { Card, Tooltips, Dropdown, Table } from '../../components/partials';
import { useSnackBar } from '../../components/partials/snack-bar';
import { getNodesByUser } from '../../shared/redux-saga/admin/actions';
import { getShortNodeAddress } from '../../shared/core/utils';
import IconCopy from '../../public/images/ic_copy.svg';
import ArrowIcon from '../../public/images/ic_arrow_down.svg';

const MyERAs = () => {
  const userInfo = useSelector(state => state.authReducer.userInfo.fullInfo);
  const { openSnack } = useSnackBar();
  const [currentUserNode, setCurrentUserNode] = useState();
  const [addressList, setAddressList] = useState([]);
  const dispatch = useDispatch();

  const fetchUserNodes = () => {
    dispatch(
      getNodesByUser({}, result => {
        const addresses = result.addresses || [];
        setCurrentUserNode(addresses[0]);
        setAddressList(addresses);
      })
    );
  };

  useEffect(() => {
    if (userInfo) {
      fetchUserNodes();
    }
  }, [userInfo]);

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
        <div id="landing-page__myEras">
          <div className="flex gap-5">
            <div className="w-1/2">
              <Card className="lg:flex-grow">
                <div className="flex flex-col px-9 justify-center">
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
                              /*
                              sendHightlightNode(address);
                              dispatch(
                                setAuthUserNode({
                                  authUserNode: address,
                                })
                              );
                              refreshMetrics(address.public_address_node);
                              */
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
            <div className="w-1/2">
              <div className="flex flex-wrap">
                <Card className="w-1/2">
                  <div className="flex flex-col px-5 lg:px-9 h-full justify-center">
                    <div className="flex gap-2">
                      <span className="text-base lg:text-lg lg:text-lg font-normal text-black1">
                        Uptime
                      </span>
                    </div>
                    <div className="flex flex-row gap-2">
                      <span className="text-base text-black1 font-thin">
                        X%
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
                <Card className="w-1/2">
                  <div className="flex flex-col px-5 lg:px-9 h-full justify-center">
                    <div className="flex gap-2">
                      <span className="text-base lg:text-lg lg:text-lg font-normal text-black1">
                        ERAs Active
                      </span>
                    </div>
                    <div className="flex flex-row gap-2">
                      <span className="text-base text-black1 font-thin">X</span>
                      <img
                        width="18px"
                        height="18px"
                        src="/images/ic_logo_home.svg"
                        alt="Info"
                      />
                    </div>
                  </div>
                </Card>
                <Card className="w-1/2">
                  <div className="flex flex-col px-5 lg:px-9 h-full justify-center">
                    <div className="flex gap-2">
                      <span className="text-base lg:text-lg lg:text-lg font-normal text-black1">
                        ERAs since Last Redmark
                      </span>
                    </div>
                    <div className="flex flex-row gap-2">
                      <span className="text-base text-black1 font-thin">X</span>
                      <img
                        width="18px"
                        height="18px"
                        src="/images/ic_logo_home.svg"
                        alt="Info"
                      />
                    </div>
                  </div>
                </Card>
                <Card className="w-1/2">
                  <div className="flex flex-col px-5 lg:px-9 h-full justify-center">
                    <div className="flex gap-2">
                      <span className="text-base lg:text-lg lg:text-lg font-normal text-black1">
                        Total Redmarks
                      </span>
                    </div>
                    <div className="flex flex-row gap-2">
                      <span className="text-base text-black1 font-thin">X</span>
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
          <div>
            <Card className="w-full px-9 py-5">
              <Table
                onLoadMore={() => {}}
                hasMore={false}
                dataLength={0}
                noMargin
              >
                <Table.Header>
                  <Table.HeaderCell key="header1">
                    <p>ERA Start Time</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell key="header2">
                    <p>[Validator Address]</p>
                  </Table.HeaderCell>
                </Table.Header>
                <Table.Body className="custom-padding-tracker"></Table.Body>
              </Table>
            </Card>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default LoadingScreen(MyERAs, 'final-all');
