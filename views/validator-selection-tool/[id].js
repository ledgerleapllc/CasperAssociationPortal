/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Head from 'next/head';
import PublicHeader from '../../components/layouts/public-header';
import {
  BackButton,
  ProgressBar,
  Dropdown,
  Tooltips,
} from '../../components/partials';
import {
  formatDate,
  numberWithCommas,
  getShortNodeAddress,
} from '../../shared/core/utils';
import { AppContext } from '../../pages/_app';
import { getPublicMemberDetail } from '../../shared/redux-saga/member-viewer/actions';
import IconCopy from '../../public/images/ic_copy.svg';
import { useSnackBar } from '../../components/partials/snack-bar';
import VerifiedIcon from '../../public/images/ic_check_mark.svg';
import ArrowIcon from '../../public/images/ic_arrow_down.svg';
import AppFooter from '../../components/layouts/app-footer';

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

const NodeExplorerDetail = () => {
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

  return (
    <>
      <Head>
        <title>Validator Selection Tool - Casper Association Portal</title>
      </Head>
      <div className="flex flex-col h-screen">
        <PublicHeader />
        <div className="flex-1 min-h-0 pt-10 mx-auto w-container bg-transparent">
          <div className="w-full border-primary border-b-2 pb-3">
            <BackButton href="/validator-selection-tool" text="Back" force />
          </div>
          <div className="flex w-full mt-10">
            <div className="w-full">
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
                              <div className="flex items-center gap-2">
                                {capitalize(memberInfo?.full_name)}
                                {', '}
                                {memberInfo?.profile?.blockchain_name}{' '}
                                {memberInfo?.profile?.status === 'approved' && (
                                  <VerifiedIcon className="text-primary" />
                                )}
                              </div>
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
                              {memberInfo?.email_verified_at ? (
                                <span>
                                  {formatDate(
                                    memberInfo?.email_verified_at,
                                    'dd/MM/yyyy HH:mm aa'
                                  )}
                                </span>
                              ) : (
                                <span>-</span>
                              )}
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
                              <span className="text-primary underline">
                                {renderLabel()}
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
                                  {formatDate(
                                    memberInfo?.approve_at,
                                    'dd/MM/yyyy HH:mm aa'
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
                          <span>Delegators:</span>
                        </td>
                        <td>
                          <span>
                            {numberWithCommas(
                              currentUserNode?.bid_delegators_count
                            )}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>Self Staked:</span>
                        </td>
                        <td>
                          <span>
                            {numberWithCommas(
                              currentUserNode?.bid_self_staked_amount
                            )}
                          </span>
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
                    </tbody>
                  </table>
                </StylesAdvanced>
                <div className="flex gap-24 w-3/5">
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
        <div className="pb-3">
          <AppFooter />
        </div>
      </div>
    </>
  );
};

export default NodeExplorerDetail;
