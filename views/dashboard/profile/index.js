/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import ReactLoading from 'react-loading';
import Head from 'next/head';
import { LoadingScreen } from '../../../components/hoc/loading-screen';
import LayoutDashboard from '../../../components/layouts/layout-dashboard';
import {
  Card,
  Button,
  ProgressBar,
  Dropdown,
  Tooltips,
} from '../../../components/partials';
import { uploadAvatar } from '../../../shared/redux-saga/dashboard/dashboard-actions';
import IconCamera from '../../../public/images/ic_camera.svg';
import ArrowIcon from '../../../public/images/ic_arrow_down.svg';
import {
  formatDate,
  getShortNodeAddress,
  numberWithCommas,
} from '../../../shared/core/utils';
import VerifiedIcon from '../../../public/images/ic_check_mark.svg';
import { logoutApp, updateUser } from '../../../shared/redux-saga/auth/actions';
import { getNodesByUser } from '../../../shared/redux-saga/admin/actions';
import IconCopy from '../../../public/images/ic_copy.svg';
import { useSnackBar } from '../../../components/partials/snack-bar';
import { AppContext } from '../../../pages/_app';

const StylesBasic = styled.div`
  .basic-info-table {
    width: 100%;
    tr {
      td {
        vertical-align: top;
        padding-bottom: 0.625rem;
      }
      td:nth-child(1) {
        width: 200px;
        font-weight: 500;
      }
      td:nth-child(2) {
        width: calc(100% - 200px);
      }
    }
  }
`;

const StylesAdvanced = styled.div`
  .advanced-info-table {
    width: 100%;
    tr {
      td {
        vertical-align: top;
        padding-bottom: 0.625rem;
      }
      td:nth-child(1) {
        width: 12rem;
        font-weight: 500;
      }
      td:nth-child(2) {
        width: calc(100% - 12rem);
      }
    }
  }
`;

const UserProfile = () => {
  const dispatch = useDispatch();
  const [addressList, setAddressList] = useState([]);
  const [currentUserNode, setCurrentUserNode] = useState();
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const userInfo = useSelector(state => state.authReducer.userInfo.fullInfo);
  const { openSnack } = useSnackBar();
  const router = useHistory();
  const { setLoading } = useContext(AppContext);

  useEffect(() => {
    setLoading(true);
    dispatch(
      getNodesByUser(
        {},
        result => {
          setLoading(false);
          const addresses = result.addresses || [];
          setAddressList(addresses);
          setCurrentUserNode(addresses[0]);
        },
        () => {
          setLoading(false);
        }
      )
    );
  }, []);

  const changeAvatar = e => {
    setIsUploadingAvatar(true);
    const file = e.target.files[0];
    dispatch(
      uploadAvatar(
        { file },
        () => {
          setIsUploadingAvatar(false);
          const reader = new FileReader();
          reader.onloadend = () => {
            dispatch(
              updateUser({
                fullInfo: {
                  ...userInfo,
                  avatar_url: reader.result,
                },
              })
            );
          };
          reader.readAsDataURL(file);
        },
        () => {
          setIsUploadingAvatar(false);
        }
      )
    );
  };

  const capitalize = s => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const renderLabel = () => {
    if (
      userInfo &&
      userInfo.profile &&
      userInfo.profile.status === 'approved'
    ) {
      if (userInfo.profile.extra_status) {
        return userInfo.profile.extra_status;
      }
      return 'VERIFIED';
    }
    return 'Not Verified';
  };

  const renderCaKycHash = () => {
    if (
      userInfo &&
      userInfo.profile &&
      userInfo.profile.casper_association_kyc_hash &&
      userInfo.profile.casper_association_kyc_hash.length > 12
    ) {
      return ` ${userInfo.profile.casper_association_kyc_hash.slice(
        0,
        6
      )}...${userInfo.profile.casper_association_kyc_hash.slice(
        userInfo.profile.casper_association_kyc_hash.length - 6
      )}`;
    }
    return '';
  };

  const renderCaKycHashFull = () => {
    if (
      userInfo &&
      userInfo.profile &&
      userInfo.profile.casper_association_kyc_hash
    ) {
      return userInfo.profile.casper_association_kyc_hash;
    }
    return '';
  };

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
        <title>Profile - Casper Association Portal</title>
      </Head>
      <LayoutDashboard>
        <Card className="h-full lg:pl-card lg:py-5 lg:shadow-2xl" noShadow>
          <div className="flex flex-col w-full h-full">
            <div className="card-header lg:mr-card">
              <div className="flex justify-between items-end mb-3.5">
                <div className="flex items-center">
                  <h3 className="mr-card text-gray text-lg font-medium">
                    <Link to="/dashboard/settings/">
                      <span>User Settings</span>
                    </Link>
                  </h3>
                  <h3 className="text-dark2 text-lg font-medium">
                    <Link to="/dashboard/profile">
                      <span>My Profile</span>
                    </Link>
                  </h3>
                </div>
                <div className="flex items-center">
                  {!userInfo?.approve_at && (
                    <Button
                      primaryOutline
                      className="mr-5 px-4 py-2"
                      onClick={async e => {
                        e.preventDefault();
                        router.push('/dashboard/verification');
                      }}
                    >
                      <VerifiedIcon className="mr-2" /> Get Verified
                    </Button>
                  )}
                  <Button
                    primary
                    className="px-4 py-2"
                    onClick={async e => {
                      e.preventDefault();
                      dispatch(logoutApp());
                    }}
                  >
                    Log Out
                  </Button>
                </div>
              </div>
              <div className="border-primary border-b-2" />
            </div>
            <div className="card-body overflow-y-auto flex-1 min-h-0 pt-8">
              <div className="lg:pr-card">
                <section className="basic-info">
                  <div className="flex">
                    <div className="upload-avatar-box mr-9">
                      <label
                        htmlFor="upload-avatar"
                        className="relative overflow-hidden cursor-pointer w-32 h-32 block border border-gray shadow-md rounded-md flex justify-center items-center"
                      >
                        <IconCamera className="text-2xl" />
                        {!!userInfo?.avatar_url && (
                          <>
                            <div className="absolute inset-0">
                              <img
                                className="w-full h-full object-cover"
                                src={userInfo?.avatar_url}
                                alt=""
                              />
                            </div>
                            <div className="opacity-0 hover:opacity-100 absolute inset-0 w-full h-full transition duration-100 ease-in-out">
                              <div className="relative flex justify-center items-center w-full h-full">
                                <div className="absolute inset-0 w-full h-full bg-white opacity-80" />
                                <IconCamera className="text-2xl z-40" />
                              </div>
                            </div>
                          </>
                        )}
                        {isUploadingAvatar && (
                          <div className="opacity-100 absolute inset-0 w-full h-full transition duration-100 ease-in-out">
                            <div className="relative flex justify-center items-center w-full h-full">
                              <div className="absolute inset-0 w-full h-full bg-white opacity-80" />
                              <ReactLoading
                                className="z-50"
                                type="spinningBubbles"
                                color="#FF473E"
                                width={20}
                                height={20}
                              />
                            </div>
                          </div>
                        )}
                      </label>
                      <input
                        id="upload-avatar"
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={changeAvatar}
                      />
                    </div>
                    <div>
                      <StylesBasic>
                        <table className="basic-info-table border-0">
                          <tbody>
                            <tr>
                              <td>
                                <span>Name:</span>
                              </td>
                              <td>
                                <span className="flex gap-2 items-center">
                                  {capitalize(userInfo?.full_name)}
                                  {', '}
                                  {userInfo?.profile?.blockchain_name}{' '}
                                  {userInfo?.profile?.status === 'approved' && (
                                    <VerifiedIcon className="text-primary" />
                                  )}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span>&ensp;</span>
                              </td>
                              <td>
                                {userInfo?.profile?.blockchain_name ? (
                                  <span>
                                    {userInfo?.profile?.blockchain_desc}
                                  </span>
                                ) : (
                                  <span className="text-sm text-gray">
                                    Owner of this validator node has not{' '}
                                    verified their details using the{' '}
                                    <a
                                      rel="noreferrer"
                                      href="https://github.com/make-software/casper-account-info-standard"
                                      target="_blank"
                                      className="text-sm text-primary"
                                    >
                                      Casper Account Info Standard
                                    </a>
                                  </span>
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span>Registered:</span>
                              </td>
                              <td>
                                <span>
                                  {`${formatDate(
                                    userInfo?.email_verified_at,
                                    'dd/MM/yyyy'
                                  )}`}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span>Member Type:</span>
                              </td>
                              <td>
                                <span className="text-primary uppercase font-medium">
                                  {userInfo?.profile?.type || userInfo?.type}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span>Membership Status:</span>
                              </td>
                              <td>
                                <span className="text-primary pr-2">
                                  {renderLabel()}
                                </span>
                                <span className="text-sm text-gray underline">
                                  <a
                                    target="_blank"
                                    rel="noreferrer"
                                    href={`${
                                      process.env.NEXT_PUBLIC_BASE_URL
                                    }/api/v1/members/ca-kyc-hash/${renderCaKycHashFull()}`}
                                  >
                                    {renderCaKycHash()}
                                  </a>
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span>Verified Since:</span>
                              </td>
                              <td>
                                {userInfo?.approve_at ? (
                                  <span>
                                    {`${formatDate(
                                      userInfo?.approve_at,
                                      'dd/MM/yyyy'
                                    )}`}
                                  </span>
                                ) : (
                                  <span>-</span>
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </StylesBasic>
                    </div>
                  </div>
                </section>
                <div className="border-gray border-b my-8" />
                <section className="advanced-info">
                  <StylesAdvanced>
                    <table className="advanced-info-table border-0">
                      <tbody>
                        <tr>
                          <td>
                            <span>Node Address:</span>
                          </td>
                          <td>
                            <div className="flex items-center">
                              <div style={{ width: '300px' }}>
                                <Dropdown
                                  className="w-full"
                                  trigger={
                                    <div className="flex items-center gap-2">
                                      <p className="w-full relative h-6">
                                        <Tooltips
                                          disableTheme
                                          placement="bottom"
                                          title={
                                            currentUserNode?.public_address_node
                                          }
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
                                          <span className="text-base font-thin truncate absolute inset-0">
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
                              <button
                                className="ml-6"
                                type="button"
                                onClick={() => copyClipboard()}
                                style={{ marginBottom: '5px' }}
                              >
                                <IconCopy />
                              </button>
                              <input
                                id="public-address"
                                value={currentUserNode?.public_address_node}
                                readOnly
                                hidden
                              />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span>Validator Fee:</span>
                          </td>
                          <td>
                            <span>{currentUserNode?.bid_delegation_rate}%</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span>Total Stake:</span>
                          </td>
                          <td>
                            <span>
                              {numberWithCommas(
                                currentUserNode?.bid_total_staked_amount
                              )}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span>Self Stake:</span>
                          </td>
                          <td>
                            <span>
                              {numberWithCommas(
                                currentUserNode?.bid_self_staked_amount
                              )}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </StylesAdvanced>
                  <div
                    className="grid grid-flow-col grid-cols-2 grid-rows-2 gap-x-32 2xl:gap-y-1"
                    style={{ width: '40rem' }}
                  >
                    <div className="flex flex-col py-2">
                      <div className="flex flex-row mb-1">
                        <span className="text-lg">Uptime</span>
                        <img
                          className="pl-3"
                          width="10px"
                          height="10px"
                          src="/images/ic_feather_info.svg"
                          alt="Info"
                        />
                      </div>
                      <ProgressBar mask="x%" value={currentUserNode?.uptime} />
                    </div>
                    <div className="flex flex-col lg:py-1 2xl:py-2">
                      <div className="flex flex-row mb-1">
                        <span className="text-lg">Update Responsiveness</span>
                        <img
                          className="pl-3"
                          width="10px"
                          height="10px"
                          src="/images/ic_feather_info.svg"
                          alt="Info"
                        />
                      </div>
                      <ProgressBar
                        value={currentUserNode?.update_responsiveness}
                        mask="x%"
                        options={{
                          startText: 'Needs Improvement',
                          endText: 'Great',
                        }}
                      />
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </Card>
      </LayoutDashboard>
    </>
  );
};

export default LoadingScreen(UserProfile, 'final-all');
