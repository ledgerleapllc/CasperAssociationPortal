/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import IconCopy from '../../../public/images/ic_copy.svg';
import { LoadingScreen } from '../../../components/hoc/loading-screen';
import LayoutDashboard from '../../../components/layouts/layout-dashboard';
import {
  Card,
  ProgressBar,
  Dropdown,
  Tooltips,
} from '../../../components/partials';
import IconCamera from '../../../public/images/ic_camera.svg';
import ArrowIcon from '../../../public/images/ic_arrow_down.svg';
import {
  formatDate,
  getShortNodeAddress,
  numberWithCommas,
} from '../../../shared/core/utils';
import VerifiedIcon from '../../../public/images/ic_check_mark.svg';
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
  const [addressList, setAddressList] = useState([]);
  const [currentUserNode, setCurrentUserNode] = useState();
  const { openSnack } = useSnackBar();

  useEffect(() => {
    if (id) {
      setLoading(true);
      dispatch(
        getPublicMemberDetail(
          id,
          null,
          res => {
            setLoading(false);
            setMemberInfo(res);
            const addresses = res.addresses || [];
            setAddressList(addresses);
            if (addresses && addresses.length > 0) {
              setCurrentUserNode(addresses[0]);
            }
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
    if (
      memberInfo &&
      memberInfo.profile &&
      memberInfo.profile.casper_association_kyc_hash &&
      memberInfo.profile.casper_association_kyc_hash.length > 12
    ) {
      return ` ${memberInfo.profile.casper_association_kyc_hash.slice(
        0,
        6
      )}...${memberInfo.profile.casper_association_kyc_hash.slice(
        memberInfo.profile.casper_association_kyc_hash.length - 6
      )}`;
    }
    return '';
  };

  const renderCaKycHashFull = () => {
    if (
      memberInfo &&
      memberInfo.profile &&
      memberInfo.profile.casper_association_kyc_hash
    ) {
      return memberInfo.profile.casper_association_kyc_hash;
    }
    return '';
  };

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
                                {capitalize(memberInfo?.full_name)}
                                {', '}
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
                                  Owner of this validator node has not verified
                                  their details using the{' '}
                                  <a
                                    href="https://github.com/make-software/casper-account-info-standard"
                                    target="_blank"
                                    rel="noreferrer"
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
                              value={currentUserNode?.public_address_node ?? ''}
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
                <div className="flex gap-24 w-4/5">
                  <div className="flex-1 flex flex-col lg:py-1 2xl:py-2">
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
                    <ProgressBar value={currentUserNode?.uptime} mask="x%" />
                  </div>
                  <div className="flex-1 flex flex-col lg:py-1 2xl:py-2">
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
  );
};

export default LoadingScreen(UserProfile, 'final-all');
