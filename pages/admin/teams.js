import { useState, useEffect } from 'react';
import Switch from "react-switch";
import { LoadingScreen } from '../../components/hoc/loading-screen';
import LayoutDashboard from '../../components/layouts/layout-dashboard';
import { Card } from '../../components/partials';
import { useDialog } from '../../components/partials/dialog';
import { ApiService } from '../../helpers/api/api.service';
import { formatDate } from '../../shared/core/utils';

const http = new ApiService();


const AdminTeams = () => {
  // const [checked, setChecked] = useState({ intake });
  const { setDialog } = useDialog();
  const [admins, setAdmins] = useState([]);

  const registerAdmin = email => {
    if (email) {
      http.doPost(['admin/teams/invite'], { email })
        .then(res => {
          const { data } = res.data;
          setAdmins([...admins, data.invited_admin]);
        })
        .catch(err => console.log(err));
    }
  };

  const showNewAdminDlg = () => {
    setDialog({
      type: 'DialogPrompt',
      data: {
        title: `Enter the email address of the person you would like
                 too invite to be come an admin`,
        ok: 'Invite',
        cancel: 'Cancel'
      },
      afterClosed: registerAdmin,
    });
  }

  const revokeAdmin = (item) => {
    http.doDelete([`admin/teams/${item.id}/revoke`], {})
      .then(res => {
        const { code } = res.data;
        if (code === 200) {
          const ind = admins.findIndex(admin => admin.id === item.id);
          admins[ind].type = 'revoked';
          if (ind >= 0)
            setAdmins([...admins]);
        }
      })
      .catch(err => console.log(err))
  }

  const setPermission = (id, perm, value) => {
    const ind = admins.findIndex(admin => admin.id === id);
    admins[ind].permission[perm] = value;
    http.doPost([`admin/teams/${id}/change-permissions`], { permission: admins[ind].permission })
      .then(res => {
        const { code } = res.data;
        if (code === 200) {
          setAdmins([...admins]);
        }
      });
  }

  useEffect(() => {
    http.doGet(['admin/teams'])
      .then(res => {
        const { data } = res.data;
        setAdmins(data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <LayoutDashboard>
      <Card className="h-full px-24 py-14">
        <div className="bg-transparent h-full">
          <div className="w-full">
            <div className="lg:h-70px flex flex-col justify-center">
              <h3 className="text-dark2 text-xl lg:pr-32 font-medium mb-3.5">
                Team Management
              </h3>
              <div className="border-primary border-b-2" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <h4 className="text-dark2 text-lg lg:pr-32 font-medium mb-4">
              Admins
            </h4>
            <button
              type="button"
              className="transition text-lg text-white w-full lg:w-56 h-12 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
              onClick={showNewAdminDlg}
            >
              + New Admin
            </button>
          </div>
          <div className="flex flex-col h-full">
            <div className="flex flex-col lg:pt-6 h-full">
              <div className="flex w-full">
                <p className="w-1/12 text-base font-medium">Added Date</p>
                <p className="w-1/12 text-base font-medium">Status</p>
                <p className="w-1/12 text-base font-medium">Email</p>
                <p className="w-1/12 text-base font-medium">Last Login</p>
                <p className="w-1/12 text-base font-medium">IP</p>
                <p className="w-1/12 text-base font-medium">Intake</p>
                <p className="w-1/12 text-base font-medium">Users</p>
                <p className="w-1/12 text-base font-medium">Ballots</p>
                <p className="w-1/12 text-base font-medium">Perks</p>
                <p className="w-1/4 text-base font-medium">Admin Action</p>
              </div>
              <div className="flex flex-col w-full h-4/5 mt-5 overflow-y-scroll">
                {admins.map((admin) =>
                  <div className="flex items-center lg:flex-row w-full py-2.5 border-b border-gray" key={`admin-team-${admin.id}`}>
                    <p className="text-sm w-full lg:w-1/12">{formatDate(admin.created_at)}</p>
                    <div className="text-sm w-full lg:w-1/12">
                      <div>{admin.type}</div>
                      {admin.type === 'invited' &&
                        <button
                          type="button"
                          className="inline-flex text-xs text-primary underline"
                          onClick={async e => {
                            e.preventDefault();
                          }}>
                          Resend Link
                        </button>
                      }
                    </div>
                    <p className="text-sm w-full lg:w-1/12 text-break">{admin.email}</p>
                    <p className="text-sm w-full lg:w-1/12">21/06/2021<br />2:15PM</p>
                    <p className="text-sm w-full lg:w-1/12">255.255.255.255</p>
                    <div className="text-sm w-full lg:w-1/12">
                      <Switch
                        onChange={(_check) => setPermission(admin.id, 'intake', _check)}
                        checked={admin.permission.intake}
                        checkedIcon={null}
                        uncheckedIcon={null}
                        offColor='#bbb'
                        onColor='#ff474e'
                        height={18}
                        width={40}
                      />
                    </div>
                    <div className="text-sm w-full lg:w-1/12">
                      <Switch
                        onChange={(_check) => setPermission(admin.id, 'users', _check)}
                        checked={admin.permission.users}
                        checkedIcon={null}
                        uncheckedIcon={null}
                        offColor='#bbb'
                        onColor='#ff474e'
                        height={18}
                        width={40}
                      />
                    </div>
                    <div className="text-sm w-full lg:w-1/12">
                      <Switch
                        onChange={(_check) => setPermission(admin.id, 'ballots', _check)}
                        checked={admin.permission.ballots}
                        checkedIcon={null}
                        uncheckedIcon={null}
                        offColor='#bbb'
                        onColor='#ff474e'
                        height={18}
                        width={40}
                      />
                    </div>
                    <div className="text-sm w-full lg:w-1/12">
                      <Switch
                        onChange={(_check) => setPermission(admin.id, 'perks', _check)}
                        checked={admin.permission.perks}
                        checkedIcon={null}
                        uncheckedIcon={null}
                        offColor='#bbb'
                        onColor='#ff474e'
                        height={18}
                        width={40}
                      />
                    </div>
                    <p className="text-sm w-full lg:w-1/4">
                      <button
                        type="button"
                        className="text-md text-primary px-4 py-1 rounded-full border-primary border-2 mr-2 bg-white shadow-md focus:outline-none hover:opacity-40"
                      >
                        Reset Password
                      </button>
                      <button
                        type="button"
                        className="text-md text-white px-4 py-1 rounded-full bg-primary border-primary border-2 shadow-md focus:outline-none hover:opacity-40"
                        onClick={() => { revokeAdmin(admin) }}
                      >
                        Revoke
                      </button>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </LayoutDashboard>
  )
};

export default LoadingScreen(AdminTeams, 'final-admin');
