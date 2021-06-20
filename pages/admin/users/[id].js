import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getListMembers } from '../../../shared/redux-saga/admin/action';
import LayoutDashboard from '../../../components/layouts/layout-dashboard';
import { Card } from '../../../components/partials';

const AdminUserDetail = () => {
  // const dispatch = useDispatch();
  const router = useRouter();
  // const members = useSelector(state => state.membersReducer.data);
  // useEffect(() => {
  //   dispatch(getListMembers({ limit: 999 }));
  // }, []);
  return (
    <LayoutDashboard>
      <Card className="h-full px-24 py-14">
        <div className="bg-transparent h-full">
          <div className="w-full">
            <div className="lg:h-70px flex flex-col justify-center">
              <button
                type="button"
                className="flex items-center focus:outline-none pb-5"
                onClick={() => router.push('/admin/users')}
              >
                <img
                  src="/images/ic_prev_circle.svg"
                  alt="prev"
                  width="18"
                  height="18"
                  className="mr-2"
                />
                <span className="text-primary text-sm">Back</span>
              </button>
              <h3 className="text-dark2 text-xl lg:pr-32 font-medium mb-3.5">
                {`User details for user {email address of user}`}
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
              <p className="text-lg font-medium pl-2">ACTIVE</p>
            </div>
            {/* User Info */}
            <div className="flex flex-col py-7 border-b border-gray">
              <p className="text-base font-medium pb-5">User Info</p>
              <div className="flex flex-row py-1">
                <p className="text-sm font-medium w-1/6">Email:</p>
                <p className="text-sm w-5/6">jstone123@gmail.com</p>
              </div>
              <div className="flex flex-row py-1">
                <p className="text-sm font-medium w-1/6">User Id:</p>
                <p className="text-sm w-5/6">2</p>
              </div>
              <div className="flex flex-row py-1">
                <p className="text-sm font-medium w-1/6">First Name:</p>
                <p className="text-sm w-5/6">Jason</p>
              </div>
              <div className="flex flex-row py-1">
                <p className="text-sm font-medium w-1/6">Last Name:</p>
                <p className="text-sm w-5/6">Stone</p>
              </div>
              <div className="flex flex-row py-1">
                <p className="text-sm font-medium w-1/6">Forum Username:</p>
                <p className="text-sm w-5/6">bigjstone123</p>
              </div>
              <div className="flex flex-row py-1">
                <p className="text-sm font-medium w-1/6">Telegram:</p>
                <p className="text-sm w-5/6">@bigjaystone</p>
              </div>
            </div>
            {/* Company Info */}
            <div className="flex flex-col py-7 border-b border-gray">
              <p className="text-base font-medium pb-5">Company Info</p>
              <div className="flex flex-row py-1">
                <p className="text-sm font-medium w-1/6">Entity Name:</p>
                <p className="text-sm w-5/6">Jay Stone Computing LLC.</p>
              </div>
              <div className="flex flex-row py-1">
                <p className="text-sm font-medium w-1/6">Entity Type:</p>
                <p className="text-sm w-5/6">LLC</p>
              </div>
              <div className="flex flex-row py-1">
                <p className="text-sm font-medium w-1/6">
                  Registration Country:
                </p>
                <p className="text-sm w-5/6">United States</p>
              </div>
              <div className="flex flex-row py-1">
                <p className="text-sm font-medium w-1/6">
                  Registration Number:
                </p>
                <p className="text-sm w-5/6">21-321761683726</p>
              </div>
              <div className="flex flex-row py-1">
                <p className="text-sm font-medium w-1/6">
                  Tax ID or VAT Number:
                </p>
                <p className="text-sm w-5/6">684821494</p>
              </div>
            </div>
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
                  Approved
                  <span className="pl-3 text-primary underline">
                    View Details
                  </span>
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
