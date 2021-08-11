/* eslint-disable no-plusplus */
/* eslint-disable arrow-body-style */
import Link from 'next/link';
import { useEffect, useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import router from 'next/router';

import { Card, BackButton, ProgressBar } from '../../components/partials';
import AppFooter from '../../components/layouts/app-footer';
import { formatDate } from '../../shared/core/utils';
import { AppContext } from '../_app';
import { getPublicMemberDetail } from '../../shared/redux-saga/member-viewer/actions';
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

const MembersViewerDetail = () => {
  const { setLoading } = useContext(AppContext);
  const { id } = router.query;
  const dispatch = useDispatch();
  const [memberInfo, setMemberInfo] = useState(null);
  const { metrics, metricConfig } = useMetrics();

  useEffect(() => {
    if (id) {
      setLoading(true);
      dispatch(
        getPublicMemberDetail(
          id,
          res => {
            setLoading(false);
            setMemberInfo(res);
          },
          () => {
            setLoading(false);
          }
        )
      );
    }
  }, [id]);

  return (
    <div className="flex justify-center min-h-screen">
      <div
        className="
          h-screen
          flex flex-col w-full
          p-4
          lg:max-w-380 lg:p-9
          xl:max-w-screen-xl xl:p-9
          2xl:max-w-screen-2xl"
      >
        <Card className="lg:py-10 lg:shadow-2xl my-10 h-9/10" noShadow>
          <div className="bg-transparent h-full px-24">
            <div className="w-full h-70px">
              <div className="lg:h-70px flex items-center justify-between">
                <div className="flex flex-col justify-center">
                  <BackButton href="/member-viewer" text="Back" force />
                  <p className="text-sm text-gray pb-3.5">
                    Member Type:{' '}
                    <span className="text-primary uppercase">Individual</span>
                  </p>
                </div>
                <Link href="/register-type">
                  <button
                    type="button"
                    className="transition text-lg text-white px-5 mb-2.5 w-auto h-12 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
                  >
                    Become a Member
                  </button>
                </Link>
              </div>
              <div className="border-primary border-b-2" />
            </div>
            <div className="flex w-full mt-10 h-100%-70px">
              <div className="lg:pr-24">
                <section className="basic-info">
                  <div className="flex">
                    <div className="upload-avatar-box mr-9">
                      <label
                        htmlFor="upload-avatar"
                        className="relative overflow-hidden cursor-pointer w-32 h-32 block border border-gray shadow-md rounded-md flex justify-center items-center"
                      >
                        <div className="absolute inset-0">
                          <img
                            className="w-full h-full object-cover"
                            src={
                              memberInfo?.avatar_url ||
                              '/images/img_signature.png'
                            }
                            alt="avatar"
                          />
                        </div>
                      </label>
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
                                <span>{memberInfo?.full_name}</span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span>Member Since:</span>
                              </td>
                              <td>
                                <span>
                                  {formatDate(
                                    memberInfo?.email_verified_at,
                                    'dd/MM/yyyy'
                                  )}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span>Verified Since:</span>
                              </td>
                              <td>
                                {memberInfo?.kyc_verified_at ? (
                                  <span>
                                    {formatDate(
                                      memberInfo?.kyc_verified_at,
                                      'dd/MM/yyyy'
                                    )}
                                  </span>
                                ) : (
                                  <span>-</span>
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span>Average Peers:</span>
                              </td>
                              <td>
                                <span>18</span>
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
                            <span>{memberInfo?.public_address_node}</span>
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
                      <p className="text-sm text-gray lg:mb-1 2xl:mb-2">{`Average: {X}%`}</p>
                      <ProgressBar value={metrics.uptime} mask="x%" />
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
                        Current: 1 block behind
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
                        Average: 2+ days early
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
                        Average: 63
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
        <AppFooter theme="dark" />
      </div>
    </div>
  );
};

export default MembersViewerDetail;
