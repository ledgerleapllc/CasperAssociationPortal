import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import IconCopy from '../../../public/images/ic_copy.svg';
import { LoadingScreen } from '../../../components/hoc/loading-screen';
import LayoutDashboard from '../../../components/layouts/layout-dashboard';
import { Card, ProgressBar } from '../../../components/partials';
import IconCamera from '../../../public/images/ic_camera.svg';
import {
  formatDate,
  generateTextForEras,
  getShortNodeAddress,
  numberWithCommas,
} from '../../../shared/core/utils';
import VerifiedIcon from '../../../public/images/ic_check_mark.svg';
import { DEFAULT_BASE_BLOCKS } from '../../../shared/core/constants';
import { getPublicMemberDetail } from '../../../shared/redux-saga/member-viewer/actions';
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
  const { setLoading } = useContext(AppContext);
  const routerParams = useParams();
  const { id } = routerParams;
  const dispatch = useDispatch();
  const [memberInfo, setMemberInfo] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const { openSnack } = useSnackBar();

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

  const copyClipboard = () => {
    const copyText = document.getElementById('public-address');
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    openSnack('primary', 'Copied Public Address!');
  };

  const capitalize = s => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const renderLabel = () => {
    if (
      memberInfo &&
      memberInfo.profile &&
      memberInfo.profile.status === 'approved'
    ) {
      if (memberInfo.profile.extra_status)
        return memberInfo.profile.extra_status;
      return 'VERIFIED';
    }
    return 'Not Verified';
  };

  const renderCaKycHash = () => {
    if(
      memberInfo &&
      memberInfo.profile &&
      memberInfo.profile.casper_association_kyc_hash &&
      memberInfo.profile.casper_association_kyc_hash.length > 12
    ) {
      return (
        ' ' + 
        memberInfo.profile.casper_association_kyc_hash.slice(0, 6) +
        '...' +
        memberInfo.profile.casper_association_kyc_hash.slice(
          memberInfo.profile.casper_association_kyc_hash.length - 6
        )
      );
    }
    return '';
  }

  const renderCaKycHashFull = () => {
    if(
      myInfo &&
      myInfo.profile &&
      myInfo.profile.casper_association_kyc_hash
    ) {
      return myInfo.profile.casper_association_kyc_hash;
    }
    return '';
  }

  return (
    <LayoutDashboard>
      <Card className="h-full lg:pl-card lg:py-5 lg:shadow-2xl" noShadow>
        <div className="flex flex-col w-full h-full">
          <div className="card-header lg:mr-card">
            <div className="flex justify-between items-end mb-3.5">
              <div className="flex items-center">
                <h3 className="text-dark2 text-lg font-medium">User profile</h3>
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
                      {!!memberInfo?.avatar_url && (
                        <>
                          <div className="absolute inset-0">
                            <img
                              className="w-full h-full object-cover"
                              src={memberInfo?.avatar_url}
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
                              <span className="flex gap-2 items-center">
                                {capitalize(memberInfo?.full_name)}{', '}
                                {memberInfo?.profile?.blockchain_name}{' '}
                                {memberInfo?.profile?.status === 'approved' && (
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
                              {memberInfo?.profile?.blockchain_name ? (
                                <span>
                                  {memberInfo?.profile?.blockchain_desc}
                                </span>
                              ) : (
                                <span className="text-sm text-gray">
                                  Owner of this validator node has not verified their details using the <a href="https://github.com/make-software/casper-account-info-standard" target="_blank" className="text-sm text-primary">Casper Account Info Standard</a>
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
                                  memberInfo?.email_verified_at,
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
                                {memberInfo?.profile?.type}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span>Membership Status:</span>
                            </td>
                            <td>
                              <span className="text-primary">
                                {renderLabel()}
                              </span>
                              <span className="text-sm text-gray underline">
                               <a target="_blank" href={process.env.NEXT_PUBLIC_BASE_URL + '/api/v1/members/ca-kyc-hash/' + renderCaKycHashFull()}>
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
                              {memberInfo?.approve_at ? (
                                <span>
                                  {`${formatDate(
                                    memberInfo?.approve_at,
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
                          <span className="inline-flex gap-2 items-center">
                            {getShortNodeAddress(
                              memberInfo?.public_address_node
                            )}
                            {memberInfo?.profile?.status === 'approved' && (
                              <VerifiedIcon className="text-primary" />
                            )}
                          </span>
                          <button
                            className="ml-6"
                            type="button"
                            onClick={() => copyClipboard()}
                          >
                            <IconCopy />
                          </button>
                          <input
                            id="public-address"
                            value={memberInfo?.public_address_node || ''}
                            readOnly
                            hidden
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>Validator Fee:</span>
                        </td>
                        <td>
                          <span>{memberInfo?.validator_fee}%</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>Self Staked:</span>
                        </td>
                        <td>
                          <span>
                            {numberWithCommas(memberInfo?.metric?.stake_amount)}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>CSPR Self-Staked:</span>
                        </td>
                        <td>
                          <span>
                            {numberWithCommas(
                              memberInfo?.metric?.self_staked_amount
                            )}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </StylesAdvanced>
                <div className="flex gap-24 w-4/5">
                  <div className="flex-1 flex flex-col lg:py-1 2xl:py-2">
                    <div className="flex flex-row">
                      <span className="text-lg">Uptime</span>
                      <img
                        className="pl-3"
                        width="10px"
                        height="10px"
                        src="/images/ic_feather_info.svg"
                        alt="Info"
                      />
                    </div>
                    <p className="text-sm text-gray lg:mb-1 2xl:mb-2">{`Average: ${
                      metrics?.avg_uptime || 0
                    }%`}</p>
                    <ProgressBar value={metrics?.uptime} mask="x%" />
                  </div>
                  <div className="flex-1 flex flex-col lg:py-1 2xl:py-2">
                    <div className="flex flex-row">
                      <span className="text-lg">Block Height</span>
                      <img
                        className="pl-3"
                        width="10px"
                        height="10px"
                        src="/images/ic_feather_info.svg"
                        alt="Info"
                      />
                    </div>
                    <p className="text-sm text-gray lg:mb-1 2xl:mb-2">
                      Current: {metrics?.blocks_behind} block behind
                    </p>
                    <ProgressBar
                      value={metrics?.block_height}
                      total={DEFAULT_BASE_BLOCKS}
                      mask="x/y"
                    />
                  </div>
                  <div className="flex-1 flex flex-col lg:py-1 2xl:py-2">
                    <div className="flex flex-row">
                      <span className="text-lg">Update Responsiveness</span>
                      <img
                        className="pl-3"
                        width="10px"
                        height="10px"
                        src="/images/ic_feather_info.svg"
                        alt="Info"
                      />
                    </div>
                    <p className="text-sm text-gray lg:mb-1 2xl:mb-2">
                      Average:{' '}
                      {generateTextForEras(metrics?.avg_update_responsiveness)}
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
