import { useDispatch, useSelector } from 'react-redux';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  getUserDetail,
  updateUserMetrics,
  getUserMetrics,
} from '../../../../shared/redux-saga/admin/actions';
import LayoutDashboard from '../../../../components/layouts/layout-dashboard';
import {
  BackButton,
  Button,
  Card,
  Checkbox,
} from '../../../../components/partials';
import Countries from '../../../../public/json/country.json';
import { AppContext } from '../../../_app';
import { LoadingScreen } from '../../../../components/hoc/loading-screen';

const AdminUserDetail = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { setLoading } = useContext(AppContext);
  const userDetail = useSelector(state => state.userDetailReducer.data);
  const [unlockField, setUnlockField] = useState({
    uptime: false,
    block_height_average: false,
    update_responsiveness: false,
    peers: false,
  });

  const [overrideValue, setOverrideValue] = useState({
    uptime: '',
    block_height_average: '',
    update_responsiveness: '',
    peers: '',
  });

  const [metrics, setMetrics] = useState({
    uptime: '0',
    block_height_average: '0',
    update_responsiveness: '0',
    peers: '0',
  });

  useEffect(() => {
    if (id) {
      dispatch(getUserDetail(id));
      dispatch(
        getUserMetrics(
          { id },
          res => {
            setMetrics(
              res || {
                uptime: '0',
                block_height_average: '0',
                update_responsiveness: '0',
                peers: '0',
              }
            );
            setOverrideValue({
              uptime: +res.uptime ? +res.uptime : '',
              block_height_average: +res.block_height_average
                ? +res.block_height_average
                : '',
              update_responsiveness: +res.update_responsiveness
                ? +res.update_responsiveness
                : '',
              peers: +res.peers ? +res.peers : '',
            });
          },
          () => {}
        )
      );
    }
  }, [id]);

  const finishEditting = () => {
    setUnlockField({
      uptime: false,
      block_height_average: false,
      update_responsiveness: false,
      peers: false,
    });
  };

  const cancelEditting = () => {
    finishEditting();
    setOverrideValue({
      uptime: +metrics.uptime ? +metrics.uptime : '',
      block_height_average: +metrics.block_height_average
        ? +metrics.block_height_average
        : '',
      update_responsiveness: +metrics.update_responsiveness
        ? +metrics.update_responsiveness
        : '',
      peers: +metrics.peers ? +metrics.peers : '',
    });
  };

  const renderShuftiproStatus = () => {
    if (userDetail?.shuftipro && userDetail?.shuftipro?.id) {
      if (userDetail.shuftipro.status === 'approved') return 'Approved';
      return 'Denied';
    }

    if (
      userDetail?.shuftipro_temp &&
      userDetail?.shuftipro_temp?.status !== 'pending'
    )
      return (
        <>
          Submitted
          <Link href={`/admin/users/${id}/kyc`}>
            <a className="pl-3 text-primary cursor-pointer underline">
              View Details
            </a>
          </Link>
        </>
      );
    return 'N/A';
  };

  const updateField = (field, value) => {
    setOverrideValue({
      ...overrideValue,
      [field]: value,
    });
  };

  const save = field => {
    if (!unlockField[field]) {
      setUnlockField({
        uptime: false,
        block_height_average: false,
        update_responsiveness: false,
        peers: false,
        [field]: true,
      });
    } else {
      setLoading(true);
      finishEditting();
      dispatch(
        updateUserMetrics(
          {
            id,
            [field]: overrideValue[field],
          },
          () => {
            setMetrics({
              ...metrics,
              [field]: overrideValue[field],
            });
            setLoading(false);
          },
          () => {
            setLoading(false);
          }
        )
      );
    }
  };

  const checkUnlockField = currentField =>
    Object.keys(unlockField).some(
      field => field !== currentField && unlockField[field]
    );

  return (
    <LayoutDashboard>
      <Card className="h-full py-5 pl-card">
        <div className="h-full flex flex-col bg-transparent h-full">
          <div className="w-full">
            <div className="flex flex-col justify-center border-primary border-b-2 mr-card">
              <BackButton href="/admin/users" text="Back" force />
              <h3 className="text-dark2 text-xl font-medium mb-1">
                User details for user {userDetail?.email}
              </h3>
              <p className="text-sm text-gray pb-3">
                User details are displayed below with admin functions for user
                management.
              </p>
            </div>
          </div>
          <div className="flex-1 min-h-0 flex flex-col pt-8 overflow-y-scroll pr-card-tracker">
            <div className="flex flex-row">
              <p className="text-lg font-medium">Membership Status:</p>
              <p className="text-lg font-medium pl-2">
                {userDetail?.membership_status}
              </p>
            </div>
            <div className="flex flex-row pb-7 border-b border-gray">
              <p className="text-lg font-medium">Node Status:</p>
              <p className="text-lg font-medium pl-2">
                {userDetail?.node_status}
              </p>
            </div>
            {/* User Info */}
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
            {/* Company Info */}
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
            {/* Node Info */}
            <div className="flex flex-col py-7 border-b border-gray">
              <p className="text-lg font-medium pb-5">Node Info</p>
              <div className="flex flex-col pb-5">
                <p className="pb-4 text-sm font-medium w-full">
                  {userDetail?.public_address_node}
                </p>
                <div className="flex flex-row py-1 h-11 items-center">
                  <p className="text-sm font-medium w-1/6">Member Stake:</p>
                  <p className="text-sm w-5/6">2,200,300</p>
                </div>
                <div className="flex items-center flex-row my-1 h-11">
                  <p className="text-sm font-medium w-1/6">Uptime:</p>
                  <p className="text-sm w-1/6">{metrics?.uptime || 0}%</p>
                  <div className="text-sm w-1/6">
                    <Checkbox
                      value={!!overrideValue.uptime}
                      labelText="override"
                      readOnly
                    />
                  </div>
                  <div className="flex text-sm w-3/6">
                    <input
                      type="number"
                      max="100"
                      value={overrideValue.uptime}
                      onChange={e => updateField('uptime', e.target.value)}
                      className="mr-2 border border-gray1 w-32 px-2 shadow-md focus:outline-none disabled:opacity-40"
                      disabled={!unlockField.uptime}
                    />
                    <Button
                      primary
                      style={{ width: '7rem' }}
                      onClick={() => save('uptime')}
                      disabled={checkUnlockField('uptime')}
                    >
                      {!unlockField.uptime ? 'Edit' : 'Save'}
                    </Button>
                    <button
                      type="button"
                      className="ml-4 underline text-base text-primary disabled:opacity-40"
                      onClick={() => cancelEditting()}
                      disabled={!unlockField.uptime}
                    >
                      cancel
                    </button>
                  </div>
                </div>
                <div className="flex items-center flex-row my-1 h-11">
                  <p className="text-sm font-medium w-1/6">
                    Block height average:
                  </p>
                  <p className="text-sm w-1/6">
                    {metrics?.block_height_average || 0} behind
                  </p>
                  <div className="text-sm w-1/6">
                    <Checkbox
                      value={!!overrideValue.block_height_average}
                      labelText="override"
                      readOnly
                    />
                  </div>
                  <div className="flex text-sm w-3/6">
                    <input
                      type="number"
                      value={overrideValue.block_height_average}
                      onChange={e =>
                        updateField('block_height_average', e.target.value)
                      }
                      className="mr-2 border border-gray1 w-32 px-2 shadow-md focus:outline-none disabled:opacity-40"
                      disabled={!unlockField.block_height_average}
                    />
                    <Button
                      primary
                      style={{ width: '7rem' }}
                      onClick={() => save('block_height_average')}
                      disabled={checkUnlockField('block_height_average')}
                    >
                      {!unlockField.block_height_average ? 'Edit' : 'Save'}
                    </Button>
                    <button
                      type="button"
                      className="ml-4 underline text-base text-primary disabled:opacity-40"
                      onClick={() => cancelEditting()}
                      disabled={!unlockField.block_height_average}
                    >
                      cancel
                    </button>
                  </div>
                </div>
                <div className="flex items-center flex-row my-1 h-11">
                  <p className="text-sm font-medium w-1/6">
                    Update responsiveness:
                  </p>
                  <p className="text-sm w-1/6">
                    {metrics?.update_responsiveness || 0} days early
                  </p>
                  <div className="text-sm w-1/6">
                    <Checkbox
                      value={!!overrideValue.update_responsiveness}
                      labelText="override"
                      readOnly
                    />
                  </div>
                  <div className="flex text-sm w-3/6">
                    <input
                      type="number"
                      value={overrideValue.update_responsiveness}
                      onChange={e =>
                        updateField('update_responsiveness', e.target.value)
                      }
                      className="mr-2 border border-gray1 w-32 px-2 shadow-md focus:outline-none disabled:opacity-40"
                      disabled={!unlockField.update_responsiveness}
                    />
                    <Button
                      primary
                      style={{ width: '7rem' }}
                      onClick={() => save('update_responsiveness')}
                      disabled={checkUnlockField('update_responsiveness')}
                    >
                      {!unlockField.update_responsiveness ? 'Edit' : 'Save'}
                    </Button>
                    <button
                      type="button"
                      className="ml-4 underline text-base text-primary disabled:opacity-40"
                      onClick={() => cancelEditting()}
                      disabled={!unlockField.update_responsiveness}
                    >
                      cancel
                    </button>
                  </div>
                </div>
                <div className="flex items-center flex-row mt-1 h-11">
                  <p className="text-sm font-medium w-1/6">Peers:</p>
                  <p className="text-sm w-1/6">{metrics?.peers || 0}</p>
                  <div className="text-sm w-1/6">
                    <Checkbox
                      value={!!overrideValue.peers}
                      labelText="override"
                      readOnly
                    />
                  </div>
                  <div className="flex text-sm w-3/6">
                    <input
                      type="number"
                      value={overrideValue.peers}
                      onChange={e => updateField('peers', e.target.value)}
                      className="mr-2 border border-gray1 w-32 px-2 shadow-md focus:outline-none disabled:opacity-40"
                      disabled={!unlockField.peers}
                    />
                    <Button
                      primary
                      style={{ width: '7rem' }}
                      onClick={() => save('peers')}
                      disabled={checkUnlockField('peers')}
                    >
                      {!unlockField.peers ? 'Edit' : 'Save'}
                    </Button>
                    <button
                      type="button"
                      className="ml-4 underline text-base text-primary disabled:opacity-40"
                      onClick={() => cancelEditting()}
                      disabled={!unlockField.peers}
                    >
                      cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* KYC Info */}
            <div className="flex flex-col py-7">
              <p className="text-base font-medium pb-5">KYC Info</p>
              <div className="flex flex-row py-1">
                <p className="text-sm font-medium w-1/6">
                  User KYC/AML Status:
                </p>
                <p className="text-sm w-5/6">{renderShuftiproStatus()}</p>
              </div>
              {/* <div className="flex flex-row py-1">
                <p className="text-sm font-medium w-1/6">
                  Beneficial Owner Tree Status:
                </p>
                <p className="text-sm w-5/6">
                  Approved
                  <span className="pl-3 text-primary underline">
                    View Details
                  </span>
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </Card>
    </LayoutDashboard>
  );
};

export default LoadingScreen(AdminUserDetail, 'final-admin');
