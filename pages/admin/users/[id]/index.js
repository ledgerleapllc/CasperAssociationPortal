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

const AdminUserDetail = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { setLoading } = useContext(AppContext);
  const userDetail = useSelector(state => state.userDetailReducer.data);
  const [overrideInfo, setOverrideInfo] = useState({
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
            setOverrideInfo({
              uptime: !!res.uptime,
              block_height_average: !!res.block_height_average,
              update_responsiveness: !!res.update_responsiveness,
              peers: !!res.peers,
            });
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

  const toggleOverride = field => {
    setOverrideInfo({
      ...overrideInfo,
      [field]: !overrideInfo[field],
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
      return 'Submitted';
    return 'Not Submitted';
  };

  const updateField = (field, value) => {
    setOverrideValue({
      ...overrideValue,
      [field]: value,
    });
  };

  const save = field => {
    setLoading(true);
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
  };

  return (
    <LayoutDashboard>
      <Card className="h-full py-14 pl-24">
        <div className="bg-transparent h-full">
          <div className="w-full">
            <div className="lg:h-70px flex flex-col justify-center">
              <BackButton href="/admin/users" text="Back" force />
              <h3 className="text-dark2 text-xl lg:pr-32 font-medium mb-1">
                {`User details for user ${userDetail?.email}`}
              </h3>
              <p className="text-sm text-gray pb-2.5">
                User details are displayed below with admin functions for user
                management.
              </p>
              <div className="border-primary border-b-2 mr-24" />
            </div>
          </div>
          <div className="flex flex-col mt-6 h-5/6 overflow-y-scroll pr-24">
            <div className="flex flex-row py-7 border-b border-gray">
              <p className="text-lg font-medium">User Status:</p>
              <p className="text-lg font-medium pl-2">
                {userDetail?.member_status?.toUpperCase()}
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
              <p className="text-base font-medium pb-5">Node Info</p>
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
                      value={overrideInfo.uptime}
                      onChange={() => toggleOverride('uptime')}
                      labelText="override"
                    />
                  </div>
                  <div
                    className={`flex text-sm w-3/6 ${
                      overrideInfo.uptime
                        ? 'opacity-100'
                        : 'opacity-50 pointer-events-none'
                    }`}
                  >
                    <input
                      type="number"
                      max="100"
                      value={overrideValue.uptime}
                      onChange={e => updateField('uptime', e.target.value)}
                      className="mr-2 border border-gray1 w-32 px-2 shadow-md focus:outline-none"
                    />
                    <Button
                      primary
                      style={{ width: '7rem' }}
                      onClick={() => save('uptime')}
                      className={!overrideValue.uptime && 'pointer-events-none'}
                    >
                      Save
                    </Button>
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
                      value={overrideInfo.block_height_average}
                      onChange={() => toggleOverride('block_height_average')}
                      labelText="override"
                    />
                  </div>
                  <div
                    className={`flex text-sm w-3/6 ${
                      overrideInfo.block_height_average
                        ? 'opacity-100'
                        : 'opacity-50 pointer-events-none'
                    }`}
                  >
                    <input
                      type="number"
                      value={overrideValue.block_height_average}
                      onChange={e =>
                        updateField('block_height_average', e.target.value)
                      }
                      className="mr-2 border border-gray1 w-32 px-2 shadow-md focus:outline-none"
                    />
                    <Button
                      primary
                      style={{ width: '7rem' }}
                      onClick={() => save('block_height_average')}
                      className={
                        !overrideValue.block_height_average &&
                        'pointer-events-none'
                      }
                    >
                      Save
                    </Button>
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
                      value={overrideInfo.update_responsiveness}
                      onChange={() => toggleOverride('update_responsiveness')}
                      labelText="override"
                    />
                  </div>
                  <div
                    className={`flex text-sm w-3/6 ${
                      overrideInfo.update_responsiveness
                        ? 'opacity-100'
                        : 'opacity-50 pointer-events-none'
                    }`}
                  >
                    <input
                      type="number"
                      value={overrideValue.update_responsiveness}
                      onChange={e =>
                        updateField('update_responsiveness', e.target.value)
                      }
                      className="mr-2 border border-gray1 w-32 px-2 shadow-md focus:outline-none"
                    />
                    <Button
                      primary
                      style={{ width: '7rem' }}
                      onClick={() => save('update_responsiveness')}
                      className={
                        !overrideValue.update_responsiveness &&
                        'pointer-events-none'
                      }
                    >
                      Save
                    </Button>
                  </div>
                </div>
                <div className="flex items-center flex-row mt-1 h-11">
                  <p className="text-sm font-medium w-1/6">Peers:</p>
                  <p className="text-sm w-1/6">{metrics?.peers || 0}</p>
                  <div className="text-sm w-1/6">
                    <Checkbox
                      value={overrideInfo.peers}
                      onChange={() => toggleOverride('peers')}
                      labelText="override"
                    />
                  </div>
                  <div
                    className={`flex text-sm w-3/6 ${
                      overrideInfo.peers
                        ? 'opacity-100'
                        : 'opacity-50 pointer-events-none'
                    }`}
                  >
                    <input
                      type="number"
                      value={overrideValue.peers}
                      onChange={e => updateField('peers', e.target.value)}
                      className="mr-2 border border-gray1 w-32 px-2 shadow-md focus:outline-none"
                    />
                    <Button
                      primary
                      style={{ width: '7rem' }}
                      onClick={() => save('peers')}
                      className={!overrideValue.peers && 'pointer-events-none'}
                    >
                      Save
                    </Button>
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
                <p className="text-sm w-5/6">
                  {renderShuftiproStatus()}
                  <Link href={`/admin/users/${id}/kyc`}>
                    <a className="pl-3 text-primary cursor-pointer underline">
                      View Details
                    </a>
                  </Link>
                </p>
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

export default AdminUserDetail;
