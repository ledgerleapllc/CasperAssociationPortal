import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import LayoutDashboard from '../../components/layouts/layout-dashboard';
import { Card } from '../../components/partials';
import { getListMembers } from '../../shared/redux-saga/admin/actions';

const AdminUserList = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const members = useSelector(state => state.membersReducer.data);
  useEffect(() => {
    dispatch(getListMembers({ limit: 999 }));
  }, []);
  return (
    <LayoutDashboard>
      <Card className="h-full px-24 py-14">
        <div className="bg-transparent h-full">
          <div className="w-full">
            <div className="lg:h-70px flex flex-col justify-center">
              <h3 className="text-dark2 text-xl lg:pr-32 font-medium mb-3.5">
                User List
              </h3>
              <p className="text-sm text-gray pb-3.5">
                Click any user for more details
              </p>
              <div className="border-primary border-b-2" />
            </div>
          </div>
          <div className="flex flex-col pt-4 h-full">
            <div className="flex flex-col lg:pt-6 h-full">
              <div className="flex w-full">
                <p className="px-2 w-1/12 text-base font-medium">User ID</p>
                <p className="px-2 w-1/12 text-base font-medium">
                  Membership status
                </p>
                <p className="px-2 w-2/12 text-base font-medium">User Email</p>
                <p className="px-2 w-1/12 text-base font-medium">Entity Name</p>
                <p className="px-2 w-1/12 text-base font-medium">
                  Fist and Last Name
                </p>
                <p className="px-2 w-3/12 text-base font-medium">
                  Node Addresses
                </p>
                <p className="px-2 w-1/12 text-base font-medium">
                  CSPR delegated
                </p>
                <p className="px-2 w-1/12 text-base font-medium">
                  Registration date
                </p>
                <p className="px-2 w-1/12 text-base font-medium">
                  Further detail
                </p>
              </div>
              <div className="flex flex-col w-full h-4/5 mt-5 overflow-y-scroll">
                {members?.data?.map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center lg:flex-row w-full py-2.5 border-b border-gray"
                  >
                    <p className="px-2 text-sm lg:w-1/12">{member.id}</p>
                    <p className="px-2 text-sm lg:w-1/12">
                      {member.member_status}
                    </p>
                    <p className="px-2 text-sm lg:w-2/12 overflow-hidden overflow-ellipsis">
                      {member.email}
                    </p>
                    <p className="px-2 text-sm lg:w-1/12">
                      {member.entity_name ? member.entity_name : 'None'}
                    </p>
                    <p className="px-2 text-sm lg:w-1/12">{`${member.first_name} ${member.last_name}`}</p>
                    <p className="px-2 text-sm lg:w-3/12 overflow-hidden overflow-ellipsis">
                      {member.public_address_node}
                    </p>
                    <p className="px-2 text-sm lg:w-1/12">2,000,250</p>
                    <p className="px-2 text-sm lg:w-1/12">
                      {new Date(member.created_at).toISOString().split('T')[0]}
                    </p>
                    <p className="px-2 text-sm lg:w-1/12">
                      <button
                        type="button"
                        onClick={() => router.push(`/admin/users/${member.id}`)}
                        className="text-lg text-white rounded-lg bg-primary shadow-md focus:outline-none hover:opacity-40"
                      >
                        View & Manager
                      </button>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </LayoutDashboard>
  );
};

export default AdminUserList;
