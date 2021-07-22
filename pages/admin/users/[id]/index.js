import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getUserDetail } from '../../../../shared/redux-saga/admin/actions';
import LayoutDashboard from '../../../../components/layouts/layout-dashboard';
import { Card, BackButton } from '../../../../components/partials';
import Countries from '../../../../public/json/country.json';

const AdminUserDetail = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const userDetail = useSelector(state => state.userDetailReducer.data);
  useEffect(() => {
    if (id) {
      dispatch(getUserDetail(id));
    }
  }, [id]);

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

  return (
    <LayoutDashboard>
      <Card className="h-full px-24 py-14">
        <div className="bg-transparent h-full">
          <div className="w-full">
            <div className="lg:h-70px flex flex-col justify-center">
              <BackButton href="/admin/users" text="Back" force />
              <h3 className="text-dark2 text-xl lg:pr-32 font-medium mb-3.5">
                {`User details for user ${userDetail?.email}`}
              </h3>
              <p className="text-sm text-gray pb-3.5">
                User details are displayed below with admin functions for user
                management.
              </p>
              <div className="border-primary border-b-2" />
            </div>
          </div>
          <div className="flex flex-col mt-6 h-5/6 overflow-y-scroll">
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
                <p className=" py-1text-sm font-medium w-1/6">NODE 1:</p>
                <div className="flex flex-row py-1">
                  <p className="text-sm font-medium w-1/6">Signed File:</p>
                  <p className="text-sm text-primary underline w-5/6">
                    Download
                  </p>
                </div>
                <div className="flex flex-row py-1">
                  <p className="text-sm font-medium w-1/6">Verified Date:</p>
                  <p className="text-sm w-5/6">21/06/2021</p>
                </div>
                <div className="flex flex-row py-1">
                  <p className="text-sm font-medium w-1/6">Status:</p>
                  <p className="text-sm w-5/6">
                    Above Minimum Criteria
                    <span className="pl-3 text-primary underline">
                      View Metrics
                    </span>
                  </p>
                </div>
                <div className="flex flex-row py-1">
                  <p className="text-sm font-medium w-1/6">Member Stake:</p>
                  <p className="text-sm w-5/6">2,200,300</p>
                </div>
                <div className="flex flex-row py-1">
                  <p className="text-sm font-medium w-1/6">Average CPU:</p>
                  <p className="text-sm w-5/6">16%</p>
                </div>
                <div className="flex flex-row py-1">
                  <p className="text-sm font-medium w-1/6">Average Peers:</p>
                  <p className="text-sm w-5/6">12</p>
                </div>
              </div>
              <div className="flex flex-col">
                <p className=" py-1text-sm font-medium w-1/6">NODE 2:</p>
                <div className="flex flex-row py-1">
                  <p className="text-sm font-medium w-1/6">Signed File:</p>
                  <p className="text-sm text-primary underline w-5/6">
                    Download
                  </p>
                </div>
                <div className="flex flex-row py-1">
                  <p className="text-sm font-medium w-1/6">Verified Date:</p>
                  <p className="text-sm w-5/6">25/06/2021</p>
                </div>
                <div className="flex flex-row py-1">
                  <p className="text-sm font-medium w-1/6">Status:</p>
                  <p className="text-sm w-5/6">
                    Above Minimum Criteria
                    <span className="pl-3 text-primary underline">
                      View Metrics
                    </span>
                  </p>
                </div>
                <div className="flex flex-row py-1">
                  <p className="text-sm font-medium w-1/6">Member Stake:</p>
                  <p className="text-sm w-5/6">1,800,000</p>
                </div>
                <div className="flex flex-row py-1">
                  <p className="text-sm font-medium w-1/6">Average CPU:</p>
                  <p className="text-sm w-5/6">35%</p>
                </div>
                <div className="flex flex-row py-1">
                  <p className="text-sm font-medium w-1/6">Average Peers:</p>
                  <p className="text-sm w-5/6">8</p>
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
              <div className="flex flex-row py-1">
                <p className="text-sm font-medium w-1/6">
                  Beneficial Owner Tree Status:
                </p>
                <p className="text-sm w-5/6">
                  Approved
                  <span className="pl-3 text-primary underline">
                    View Details
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </LayoutDashboard>
  );
};

export default AdminUserDetail;
