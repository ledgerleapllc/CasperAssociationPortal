/* eslint-disable no-plusplus */
/* eslint-disable arrow-body-style */
import Link from 'next/link';
import { useEffect, useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import router from 'next/router';
import { BackButton, Button, ProgressBar } from '../../components/partials';
import { formatDate, generateTextForEras } from '../../shared/core/utils';
import { AppContext } from '../_app';
import { getPublicMemberDetail } from '../../shared/redux-saga/member-viewer/actions';
import { DEFAULT_BASE_BLOCKS } from '../../shared/core/constants';
import CasperLogoDark from '../../public/images/casper_logo_dark.svg';

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
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      dispatch(
        getPublicMemberDetail(
          id,
          res => {
            setLoading(false);
            setMemberInfo(res);
            const temp = res.metric;
            let block_height =
              DEFAULT_BASE_BLOCKS -
              (temp.max_block_height_average - temp.block_height_average);
            if (block_height < 0) {
              block_height = 0;
            }
            const metricTemp = {
              ...temp,
              uptim: temp.uptime || 0,
              block_height,
              peers: temp.peers || 0,
              update_responsiveness: temp.update_responsiveness || 0,
              monitoring_criteria: temp.monitoring_criteria || null,
              average_uptime: temp.avg_uptime || 0,
              avg_update_responsiveness: temp.avg_update_responsiveness || 0,
              current_block_height:
                DEFAULT_BASE_BLOCKS - block_height > 0
                  ? DEFAULT_BASE_BLOCKS - block_height
                  : 0,
            };
            setMetrics(metricTemp);
          },
          () => {
            setLoading(false);
          }
        )
      );
    }
  }, [id]);

  return (
    <div>
      <header className="hidden lg:flex w-full bg-white shadow-light h-18">
        <div className="flex justify-between items-center container mx-auto">
          <CasperLogoDark />
          <Link href="/register-type">
            <a>
              <Button primary>Become a Member</Button>
            </a>
          </Link>
        </div>
      </header>
      <div className="mt-10 mx-auto w-container bg-transparent">
        <div className="w-full border-primary border-b-2 pb-3">
          <BackButton href="/member-viewer" text="Back" force />
        </div>
        <div className="flex w-full mt-10">
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
                          memberInfo?.avatar_url || '/images/img_signature.png'
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
                        <span>Public Node Address:</span>
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
                        <span>Delegators:</span>
                      </td>
                      <td>
                        <span>{metrics?.delegators}</span>
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
                    <tr>
                      <td>
                        <span>CSPR Delegated:</span>
                      </td>
                      <td>
                        <span>15,000,000</span>
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
                  <p className="text-sm text-gray lg:mb-1 2xl:mb-2">{`Average: ${
                    metrics?.avg_uptime || 0
                  }%`}</p>
                  <ProgressBar value={metrics?.uptime} mask="x%" />
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
                    value={metrics?.block_height}
                    total={DEFAULT_BASE_BLOCKS}
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
                    Average: {generateTextForEras(metrics?.average_responsiveness)}
                  </p>
                  <ProgressBar
                    value={metrics?.update_responsiveness}
                    total={metrics?.max_update_responsiveness}
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
                    Average: {metrics?.avg_peers}
                  </p>
                  <ProgressBar
                    value={metrics?.peers}
                    total={metrics?.max_peers}
                    mask="x/y"
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembersViewerDetail;
