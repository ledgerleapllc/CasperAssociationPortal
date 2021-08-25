/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Link from 'next/link';
import ReactLoading from 'react-loading';
import { LoadingScreen } from '../../components/hoc/loading-screen';
import LayoutDashboard from '../../components/layouts/layout-dashboard';
import { Card, Button, ProgressBar } from '../../components/partials';
import {
  getMyInfo,
  uploadAvatar,
} from '../../shared/redux-saga/dashboard/dashboard-actions';
import IconCamera from '../../public/images/ic_camera.svg';
import { formatDate, generateTextForEras } from '../../shared/core/utils';
import VerifiedIcon from '../../public/images/ic_check_mark.svg';
import { logoutApp, updateUser } from '../../shared/redux-saga/auth/actions';
import useMetrics from '../../components/hooks/useMetrics';

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
  const [myInfo, setMyInfo] = useState({});
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const { metrics, metricConfig } = useMetrics();
  const user = useSelector(state => state.authReducer.userInfo);

  useEffect(() => {
    dispatch(
      getMyInfo(
        data => {
          setMyInfo(data);
        },
        () => {}
      )
    );
  }, []);

  const changeAvatar = e => {
    setIsUploadingAvatar(true);
    const file = e.target.files[0];
    dispatch(
      uploadAvatar(
        { file },
        res => {
          setIsUploadingAvatar(false);
          const reader = new FileReader();
          reader.onloadend = () => {
            setMyInfo({
              ...myInfo,
              avatar_url: reader.result,
            });
            dispatch(
              updateUser({
                fullInfo: {
                  ...user.fullInfo,
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

  return (
    <LayoutDashboard>
      <Card className="h-full lg:pl-card lg:py-5 lg:shadow-2xl" noShadow>
        <div className="flex flex-col w-full h-full">
          <div className="card-header lg:mr-card">
            <div className="flex justify-between items-end mb-3.5">
              <div className="flex items-center">
                <h3 className="mr-card text-gray text-lg font-medium">
                  <Link href="/dashboard/settings/">
                    <a>User Settings</a>
                  </Link>
                </h3>
                <h3 className="text-dark2 text-lg font-medium">
                  <Link href="/dashboard/profile">
                    <a>My profile</a>
                  </Link>
                </h3>
              </div>
              <div className="flex">
                {!myInfo?.approve_at && (
                  <Button
                    primaryOutline
                    className="mr-5"
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
                      {!!myInfo?.avatar_url && (
                        <>
                          <div className="absolute inset-0">
                            <img
                              className="w-full h-full object-cover"
                              src={myInfo?.avatar_url}
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
                              <span>{myInfo?.full_name}</span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span>Member Since:</span>
                            </td>
                            <td>
                              <span>
                                {formatDate(
                                  myInfo?.email_verified_at,
                                  'dd/MM/yyyy'
                                )}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span>Member Type:</span>
                            </td>
                            <td>
                              <span className="text-primary uppercase font-medium">
                                {myInfo?.profile?.type}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span>Verified Since:</span>
                            </td>
                            <td>
                              {myInfo?.approve_at ? (
                                <span>
                                  {formatDate(myInfo?.approve_at, 'dd/MM/yyyy')}
                                </span>
                              ) : (
                                <Link href="/dashboard/verification">
                                  <a className="text-primary underline">
                                    Get Verified
                                  </a>
                                </Link>
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span>Average Peers:</span>
                            </td>
                            <td>
                              <span>{metrics?.average_peers}</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </StylesBasic>
                  </div>
                </div>
              </section>
              <div className="border-gray border-b lg:my-8 2xl:my-12" />
              <section className="advanced-info">
                <StylesAdvanced>
                  <table className="advanced-info-table border-0">
                    <tbody>
                      <tr>
                        <td>
                          <span>Node Address:</span>
                        </td>
                        <td>
                          <span>{myInfo?.public_address_node}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>Validator Fee:</span>
                        </td>
                        <td>
                          <span>5%</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>CSPR Delegated:</span>
                        </td>
                        <td>
                          <span>15,000,000</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>CSPR Self-Staked:</span>
                        </td>
                        <td>
                          <span>1,200,000</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </StylesAdvanced>
                <div
                  className="grid grid-flow-col grid-cols-2 grid-rows-2 gap-x-32 2xl:gap-y-1"
                  style={{ width: '40rem' }}
                >
                  <div className="flex flex-col lg:py-1 2xl:py-2">
                    <div className="flex flex-row">
                      <span className="text-lg">Uptime</span>
                      <img
                        className="pl-3"
                        src="/images/ic_feather_info.svg"
                        alt="Info"
                      />
                    </div>
                    <p className="text-sm text-gray lg:mb-1 2xl:mb-2">{`Average: ${metrics?.average_uptime}%`}</p>
                    <ProgressBar mask="x%" value={metrics?.uptime} />
                  </div>
                  <div className="flex flex-col lg:py-1 2xl:py-2">
                    <div className="flex flex-row">
                      <span className="text-lg">Block Height</span>
                      <img
                        className="pl-3"
                        src="/images/ic_feather_info.svg"
                        alt="Info"
                      />
                    </div>
                    <p className="text-sm text-gray lg:mb-1 2xl:mb-2">
                      Current: {metrics?.current_block_height} block behind
                    </p>
                    <ProgressBar
                      value={metrics?.block_height_average}
                      total={metricConfig?.max?.block_height_average}
                      mask="x/y"
                    />
                  </div>
                  <div className="flex flex-col lg:py-1 2xl:py-2">
                    <div className="flex flex-row">
                      <span className="text-lg">Update Responsiveness</span>
                      <img
                        className="pl-3"
                        src="/images/ic_feather_info.svg"
                        alt="Info"
                      />
                    </div>
                    <p className="text-sm text-gray lg:mb-1 2xl:mb-2">
                      Average:
                      {generateTextForEras(metrics?.average_responsiveness)}
                    </p>
                    <ProgressBar
                      value={metrics?.update_responsiveness}
                      total={metricConfig?.max?.update_responsiveness}
                      mask=""
                      options={{
                        startText: 'Needs Improvement',
                        endText: 'Great',
                      }}
                    />
                  </div>
                  <div className="flex flex-col lg:py-1 2xl:py-2">
                    <div className="flex flex-row">
                      <span className="text-lg">Peers</span>
                      <img
                        className="pl-3"
                        src="/images/ic_feather_info.svg"
                        alt="Info"
                      />
                    </div>
                    <p className="text-sm text-gray lg:mb-1 2xl:mb-2">
                      Average: {metrics?.average_peers}
                    </p>
                    <ProgressBar
                      value={metrics?.peers}
                      total={metricConfig?.max?.peers}
                      mask="x/y"
                    />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </Card>
    </LayoutDashboard>
  );
};

export default LoadingScreen(UserProfile, 'final-all');
