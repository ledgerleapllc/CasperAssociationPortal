/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-prototype-builtins */
import { useDispatch } from 'react-redux';
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Switch from 'react-switch';
import {
  bypassKYC,
  getUserDetail,
  reactivateUser,
  revokeUser,
  updateBlockAccess,
} from '../../../../shared/redux-saga/admin/actions';
import LayoutDashboard from '../../../../components/layouts/layout-dashboard';
import { BackButton, Card, Dropdown } from '../../../../components/partials';
import Countries from '../../../../public/json/country.json';
import { LoadingScreen } from '../../../../components/hoc/loading-screen';
import ArrowIcon from '../../../../public/images/ic_arrow_down.svg';
import { numberWithCommas } from '../../../../shared/core/utils';
import { AppContext } from '../../../../pages/_app';

const AdminUserDetail = () => {
  const dispatch = useDispatch();
  const routerParams = useParams();
  const { id } = routerParams;
  const [userDetail, setUserDetail] = useState({});
  const [blockAccess, setBlockAccess] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [currentAddress, setCurrentAddress] = useState({});
  const { setLoading } = useContext(AppContext);

  useEffect(() => {
    if (id) {
      setLoading(true);
      dispatch(
        getUserDetail(
          id,
          res => {
            setLoading(false);
            setUserDetail(res);
            const addressesTemp = res.addresses || [];
            setAddresses(addressesTemp);
            if (addressesTemp.length > 0) {
              setCurrentAddress(addressesTemp[0]);
            }
            if (res.page_permissions) {
              const permissions = res.page_permissions;
              const blockAccessV = {
                nodes: 0,
                discussions: 0,
                votes: 0,
                perks: 0,
              };
              if (permissions && permissions.length > 0) {
                permissions.forEach(permission => {
                  blockAccessV[permission.name] = 1 - permission.is_permission;
                });
              }
              setBlockAccess(blockAccessV);
            }
          },
          () => {
            setLoading(false);
          }
        )
      );
    }
  }, [id]);

  const renderShuftiproStatus = () => {
    if (userDetail?.shuftipro && userDetail?.shuftipro?.id) {
      if (userDetail.shuftipro.status === 'approved')
        return (
          <>
            VERIFIED
            <Link to={`/admin/users/${id}/kyc`}>
              <span className="pl-3 text-primary cursor-pointer underline">
                View Details
              </span>
            </Link>
          </>
        );
      return 'Rejected';
    }

    if (
      userDetail?.shuftipro_temp &&
      userDetail?.shuftipro_temp?.status !== 'pending'
    )
      return (
        <>
          Submitted / Pending
          <Link href={`/admin/users/${id}/kyc`}>
            <a className="pl-3 text-primary cursor-pointer underline">
              View Details
            </a>
          </Link>
        </>
      );
    return 'Not Submitted';
  };

  const updateBlockAccessState = key => {
    if (!blockAccess || !blockAccess.hasOwnProperty(key)) return;
    const blockAccessV = JSON.parse(JSON.stringify(blockAccess));
    blockAccessV[key] = 1 - blockAccessV[key];
    setBlockAccess(blockAccessV);
    dispatch(
      updateBlockAccess(
        {
          userId: userDetail?.id,
          name: key,
          blocked: blockAccessV[key],
        },
        () => {},
        () => {}
      )
    );
  };

  const clickManualApprove = () => {
    if (!userDetail || !userDetail.id) return;
    setLoading(true);
    dispatch(
      bypassKYC(
        userDetail.id,
        () => {
          window.location.reload();
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  const clickRevoke = e => {
    e.preventDefault();
    if (!userDetail || !userDetail.id) return;
    setLoading(true);
    dispatch(
      revokeUser(
        { id: userDetail.id },
        () => {
          window.location.reload();
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  const clickReactivate = e => {
    e.preventDefault();
    if (!userDetail || !userDetail.id) return;
    setLoading(true);
    dispatch(
      reactivateUser(
        { id: userDetail.id },
        () => {
          window.location.reload();
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  const renderRevokeSection = () => {
    if (
      userDetail &&
      userDetail.profile &&
      userDetail.profile.status === 'approved'
    ) {
      if (userDetail.profile.extra_status !== 'Suspended') {
        return (
          <a className="text-sm underline text-primary" onClick={clickRevoke}>
            Revoke
          </a>
        );
      }
      return (
        <a className="text-sm underline text-primary" onClick={clickReactivate}>
          Reactivate
        </a>
      );
    }
    return null;
  };

  return (
    <LayoutDashboard>
      <Card className="h-full py-5 pl-card">
        <div className="h-full flex flex-col bg-transparent h-full">
          <div className="w-full">
            <div
              id="user-detail-headerSection"
              className="mt-4 border-primary border-b-2 mr-card"
            >
              <div className="flex flex-col justify-center">
                <BackButton href="/admin/users" text="Back" force />
                <h3 className="text-dark2 text-lg font-medium mb-1">
                  User details for user {userDetail?.email}
                </h3>
                <p className="text-sm text-gray pb-3">
                  User details are displayed below with admin functions for user
                  management.
                </p>
              </div>
              <div className="block-access-wrap">
                {blockAccess ? (
                  <h2 className="font-bold text-primary mb-1">Block Access</h2>
                ) : null}
                <div className="flex align-center">
                  {blockAccess && blockAccess.hasOwnProperty('nodes') ? (
                    <div className="block-access-item">
                      <span className="text-xs">Nodes</span>
                      <Switch
                        checked={!!blockAccess.nodes}
                        onChange={() => updateBlockAccessState('nodes')}
                        checkedIcon={null}
                        uncheckedIcon={null}
                        offColor="#bbb"
                        onColor="#ff474e"
                        height={18}
                        width={40}
                      />
                    </div>
                  ) : null}
                  {blockAccess && blockAccess.hasOwnProperty('discussions') ? (
                    <div className="block-access-item">
                      <span className="text-xs">Discussions</span>
                      <Switch
                        checked={!!blockAccess.discussions}
                        onChange={() => updateBlockAccessState('discussions')}
                        checkedIcon={null}
                        uncheckedIcon={null}
                        offColor="#bbb"
                        onColor="#ff474e"
                        height={18}
                        width={40}
                      />
                    </div>
                  ) : null}
                  {blockAccess && blockAccess.hasOwnProperty('votes') ? (
                    <div className="block-access-item">
                      <span className="text-xs">Votes</span>
                      <Switch
                        checked={!!blockAccess.votes}
                        onChange={() => updateBlockAccessState('votes')}
                        checkedIcon={null}
                        uncheckedIcon={null}
                        offColor="#bbb"
                        onColor="#ff474e"
                        height={18}
                        width={40}
                      />
                    </div>
                  ) : null}
                  {blockAccess && blockAccess.hasOwnProperty('perks') ? (
                    <div className="block-access-item last">
                      <span className="text-xs">Perks</span>
                      <Switch
                        checked={!!blockAccess.perks}
                        onChange={() => updateBlockAccessState('perks')}
                        checkedIcon={null}
                        uncheckedIcon={null}
                        offColor="#bbb"
                        onColor="#ff474e"
                        height={18}
                        width={40}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 min-h-0 flex flex-col pt-8 overflow-y-scroll pr-card-tracker">
            <div className="flex flex-row items-center">
              <p className="text-lg font-medium">Membership Status:</p>
              <p className="text-lg font-medium pl-2 mr-5">
                {userDetail?.membership_status}
              </p>
              {renderRevokeSection()}
            </div>
            <div className="flex flex-row pb-7 border-b border-gray">
              <p className="text-lg font-medium">Node Status:</p>
              <p className="text-lg font-medium pl-2">
                {userDetail?.node_status
                  ? userDetail?.node_status
                  : 'Not Available'}
              </p>
            </div>
            <div className="flex flex-col py-7 border-b border-gray">
              <p className="text-base font-medium pb-5">User Info</p>
              <div className="flex flex-row py-1">
                <p className="text-sm font-medium w-1/6">Email:</p>
                <p className="text-sm w-5/6">{userDetail?.email}</p>
              </div>
              <div className="flex flex-row py-1">
                <p className="text-sm font-medium w-1/6">User Id:</p>
                <p className="text-sm w-5/6">{userDetail?.id}</p>
              </div>
              <div className="flex flex-row py-1">
                <p className="text-sm font-medium w-1/6">First Name:</p>
                <p className="text-sm w-5/6">{userDetail?.first_name}</p>
              </div>
              <div className="flex flex-row py-1">
                <p className="text-sm font-medium w-1/6">Last Name:</p>
                <p className="text-sm w-5/6">{userDetail?.last_name}</p>
              </div>
              <div className="flex flex-row py-1">
                <p className="text-sm font-medium w-1/6">Forum Username:</p>
                <p className="text-sm w-5/6">{userDetail?.pseudonym}</p>
              </div>
              <div className="flex flex-row py-1">
                <p className="text-sm font-medium w-1/6">Telegram:</p>
                <p className="text-sm w-5/6">{userDetail?.telegram}</p>
              </div>
            </div>
            {userDetail?.type === 'Entity' && (
              <div className="flex flex-col py-7 border-b border-gray">
                <p className="text-base font-medium pb-5">Company Info</p>
                <div className="flex flex-row py-1">
                  <p className="text-sm font-medium w-1/6">Entity Name:</p>
                  <p className="text-sm w-5/6">{userDetail?.entity_name}</p>
                </div>
                <div className="flex flex-row py-1">
                  <p className="text-sm font-medium w-1/6">Entity Type:</p>
                  <p className="text-sm w-5/6">{userDetail?.entity_type}</p>
                </div>
                <div className="flex flex-row py-1">
                  <p className="text-sm font-medium w-1/6">
                    Registration Country:
                  </p>
                  <p className="text-sm w-5/6">
                    {
                      Countries.find(
                        country =>
                          country.code === userDetail?.entity_register_country
                      ).name
                    }
                  </p>
                </div>
                <div className="flex flex-row py-1">
                  <p className="text-sm font-medium w-1/6">
                    Registration Number:
                  </p>
                  <p className="text-sm w-5/6">
                    {userDetail?.entity_register_number}
                  </p>
                </div>
                <div className="flex flex-row py-1">
                  <p className="text-sm font-medium w-1/6">
                    Tax ID or VAT Number:
                  </p>
                  <p className="text-sm w-5/6">{userDetail?.entity_tax}</p>
                </div>
              </div>
            )}
            <div className="flex flex-col py-7 border-b border-gray">
              <p className="text-lg font-medium pb-5">Node Info</p>
              <div className="flex flex-col pb-5">
                <div style={{ maxWidth: '500px' }}>
                  <Dropdown
                    className="mt-2 w-full"
                    trigger={
                      <div className="flex items-center gap-2">
                        <p className="w-full relative h-6">
                          <span className="text-sm truncate absolute inset-0">
                            {currentAddress?.public_address_node}
                          </span>
                        </p>
                        <ArrowIcon />
                      </div>
                    }
                  >
                    <ul>
                      {addresses.map((address, index) => (
                        <li
                          className="p-2 hover:text-primary cursor-pointer"
                          onClick={() => {
                            setCurrentAddress(address);
                          }}
                          key={`node_${index}`}
                        >
                          <p className="w-full relative h-6">
                            <span className="text-center text-base font-thin truncate absolute inset-0">
                              {address?.public_address_node}
                            </span>
                          </p>
                        </li>
                      ))}
                    </ul>
                  </Dropdown>
                </div>
                <div className="flex flex-row py-1 h-11 items-center">
                  <p className="text-sm font-medium w-1/6">Member Stake:</p>
                  <p className="text-sm w-5/6">
                    {numberWithCommas(currentAddress?.bid_total_staked_amount)}
                  </p>
                </div>
                <div className="flex items-center flex-row my-1 h-11">
                  <p className="text-sm font-medium w-1/6">Uptime:</p>
                  <p className="text-sm w-1/6">{currentAddress?.uptime}%</p>
                </div>
                <div className="flex items-center flex-row my-1 h-11">
                  <p className="text-sm font-medium w-1/6">ERAs Active:</p>
                  <p className="text-sm w-1/6">{currentAddress?.eras_active}</p>
                </div>
                <div className="flex items-center flex-row my-1 h-11">
                  <p className="text-sm font-medium w-1/6">
                    ERAs since Redmark:
                  </p>
                  <p className="text-sm w-1/6">
                    {currentAddress?.eras_since_bad_mark}
                  </p>
                </div>
                <div className="flex items-center flex-row my-1 h-11">
                  <p className="text-sm font-medium w-1/6">Total Redmarks:</p>
                  <p className="text-sm w-1/6">
                    {currentAddress?.total_bad_marks}
                  </p>
                </div>
                <div className="flex items-center flex-row my-1 h-11">
                  <p className="text-sm font-medium w-1/6">
                    Update responsiveness:
                  </p>
                  <p className="text-sm w-1/6">
                    {currentAddress?.update_responsiveness}%
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col py-7">
              <p className="text-base font-medium pb-5">KYC Info</p>
              <div className="flex flex-row py-1">
                <p className="text-sm font-medium w-1/6">
                  User KYC/AML Status:
                </p>
                <p className="text-sm w-5/6">{renderShuftiproStatus()}</p>
              </div>
              {userDetail?.shuftipro?.status !== 'approved' ? (
                <div className="flex flex-row mt-3 items-center">
                  <p className="text-sm font-medium w-1/6">Manual KYC:</p>
                  <div className="w-5/6">
                    <button
                      type="button"
                      className="px-5 py-2 text-sm text-white rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
                      onClick={clickManualApprove}
                    >
                      Admin Approve
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </Card>
    </LayoutDashboard>
  );
};

export default LoadingScreen(AdminUserDetail, 'final-admin', 'users');
