import { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import Switch from "react-switch";
import {
  getSubadmins,
  inviteSubadmin,
  resendInviteLink,
  revokeSubadmin,
  resetSubadminPassword,
  changeSubadminPermissions
} from '../../shared/redux-saga/admin/actions';
import { LoadingScreen } from '../../components/hoc/loading-screen';
import LayoutDashboard from '../../components/layouts/layout-dashboard';
import { Card, Table } from '../../components/partials';
import { useTable } from '../../components/partials/table';
import { useDialog } from '../../components/partials/dialog';
import { formatDate } from '../../shared/core/utils';

const Styles = styled.div`
  .admin-table {
    .col-1 {
      width: 8%;
    }
    .col-2 {
      width: 8%;
    }
    .col-3 {
      width: 12%;
    }
    .col-4 {
      width: 8%;
    }
    .col-5 {
      width: 10%;
    }
    .col-6 {
      width: 8%;
    }
    .col-7 {
      width: 8%;
    }
    .col-8 {
      width: 8%;
    }
    .col-9 {
      width: 8%;
    }
    .col-10 {
      width: 22%;
    }
  }
`;

const AdminTeams = () => {
  // const [checked, setChecked] = useState({ intake });
  const { setDialog } = useDialog();
  const dispatch = useDispatch();
  const {
    data,
    register,
    hasMore,
    appendData,
    setData,
    resetData,
    setHasMore,
    page,
    setPage,
    params,
    setParams
  } = useTable();

  const registerAdmin = email => {
    if (email) {
      dispatch(
        inviteSubadmin(
          email,
          (res) => {
            setData(prevData => [res, ...prevData])
            setDialog({
              type: 'Dialog',
              data: {
                title: `Success`,
                content: `Sent invitation successfully to the ${email}`,
                ok: 'Invite',
                cancel: 'Cancel'
              },
              afterClosed: () => { },
            });
          }
        )
      );
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
  };
  const revokeAdmin = item => {
    setDialog({
      type: 'DialogConfirm',
      data: {
        title: `Are you sure you want to revoke admin privileges from ${item.email}?`,
        ok: 'Revoke',
        cancel: 'Cancel'
      },
      afterClosed: (confirm) => {
        if (confirm)
          dispatch(
            revokeSubadmin(
              item.id,
              () => {
                const ind = data.findIndex(admin => admin.id === item.id);
                if (ind >= 0) {
                  data[ind].type = 'revoked';
                  setData([...data]);
                  setDialog({
                    type: 'Dialog',
                    data: {
                      title: `Success`,
                      content: `Successfully revoked the admin with ${item.email}`,
                      ok: 'Invite',
                      cancel: 'Cancel'
                    },
                    afterClosed: () => { },
                  });
                }
              }
            )
          )
      },
    });

    ;
  };

  const resetPassword = item => {
    dispatch(
      resetSubadminPassword(
        item.id,
        () => {
          setDialog({
            type: 'Dialog',
            data: {
              title: `Success`,
              content: `Sent reset password link successfully to the ${item.email}`,
              ok: 'Invite',
              cancel: 'Cancel'
            },
            afterClosed: () => { },
          });
        }
      )
    );
  };

  const resendLink = item => {
    dispatch(
      resendInviteLink(
        item.id,
        () => {
          setDialog({
            type: 'Dialog',
            data: {
              title: `Success`,
              content: `Successfully sent invitation to the ${item.email} again`,
              ok: 'Invite',
              cancel: 'Cancel'
            },
            afterClosed: () => { },
          });
        }
      )
    );
  }

  const setPermission = (id, perm, value) => {
    const permissions = {
      intake: false,
      users: false,
      ballots: false,
      perks: false
    };
    const ind = data.findIndex(admin => admin.id === id);
    if (!data[ind].permissions)
      data[ind].permissions = permissions;
    data[ind].permissions[perm] = value;
    dispatch(
      changeSubadminPermissions(
        id,
        {
          permissions: data[ind].permissions
        },
        () => {
          setData([...data]);
        }
      )
    )
  }

  const fetchSubadmins = (pageValue = page, paramsValue = params) => {
    dispatch(
      getSubadmins(
        {
          page: pageValue,
          ...paramsValue,
        },
        (results, isHasMore) => {
          setHasMore(isHasMore);
          appendData(results);
          setPage(prev => prev + 1);
        }
      )
    )
  }

  const handleSort = async (key, direction) => {
    const newParams = {
      sort_key: key,
      sort_direction: direction,
    };
    setParams(newParams);
    resetData();
    getSubadmins(1, newParams);
  };

  useEffect(() => {
    fetchSubadmins();
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
            <Styles className="h-full pt-8 overflow-y-scroll" style={{ height: '85%' }}>
              <Table
                className="admin-table w-full h-full min-w-full"
                {...register}
                onLoadMore={fetchSubadmins}
                hasMore={hasMore}
                dataLength={data?.length}
                onSort={handleSort}
              >
                <Table.Header>
                  <Table.HeaderCell sortKey="id">
                    <p>Added Date</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <p>Status</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <p>Email</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <p>Last Login</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <p>IP</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <p>Intake</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <p>Users</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <p>Ballots</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <p>Perks</p>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <p>Admin Action</p>
                  </Table.HeaderCell>
                </Table.Header>
                <Table.Body>
                  {data.map((admin) =>
                    <Table.BodyRow key={`admin-team-${admin.id}`} >
                      <Table.BodyCell>
                        {formatDate(admin.created_at)}
                      </Table.BodyCell>
                      <Table.BodyCell>
                        <div>{admin.type}</div>
                        {admin.type === 'invited' &&
                          <button
                            type="button"
                            className="inline-flex text-xs text-primary underline"
                            onClick={() => resendLink(admin)}>
                            Resend Link
                          </button>
                        }
                      </Table.BodyCell>
                      <Table.BodyCell>
                        <p className="text-break">
                          {admin.email}
                        </p>
                      </Table.BodyCell>
                      <Table.BodyCell>
                        21/06/2021<br />2:15PM
                      </Table.BodyCell>
                      <Table.BodyCell>
                        255.255.255.255
                      </Table.BodyCell>
                      <Table.BodyCell>

                        <Switch
                          onChange={(_check) => setPermission(admin.id, 'intake', _check)}
                          checked={admin.permissions?.intake || false}
                          checkedIcon={null}
                          uncheckedIcon={null}
                          offColor='#bbb'
                          onColor='#ff474e'
                          height={18}
                          width={40}
                        />
                      </Table.BodyCell>
                      <Table.BodyCell>
                        <Switch
                          onChange={(_check) => setPermission(admin.id, 'users', _check)}
                          checked={admin.permissions?.users || false}
                          checkedIcon={null}
                          uncheckedIcon={null}
                          offColor='#bbb'
                          onColor='#ff474e'
                          height={18}
                          width={40}
                        />
                      </Table.BodyCell>
                      <Table.BodyCell>
                        <Switch
                          onChange={(_check) => setPermission(admin.id, 'ballots', _check)}
                          checked={admin.permissions?.ballots || false}
                          checkedIcon={null}
                          uncheckedIcon={null}
                          offColor='#bbb'
                          onColor='#ff474e'
                          height={18}
                          width={40}
                        />
                      </Table.BodyCell>
                      <Table.BodyCell>
                        <Switch
                          onChange={(_check) => setPermission(admin.id, 'perks', _check)}
                          checked={admin.permissions?.perks || false}
                          checkedIcon={null}
                          uncheckedIcon={null}
                          offColor='#bbb'
                          onColor='#ff474e'
                          height={18}
                          width={40}
                        />
                      </Table.BodyCell>
                      <Table.BodyCell>
                        <button
                          type="button"
                          className="text-md text-primary px-4 py-1 rounded-full border-primary border-2 mr-2 bg-white shadow-md focus:outline-none hover:opacity-40"
                          onClick={() => { resetPassword(admin) }}
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
                      </Table.BodyCell>
                    </Table.BodyRow>
                  )}
                </Table.Body>
              </Table>
            </Styles>
          </div>
        </div>
      </Card>
    </LayoutDashboard >
  )
};

export default LoadingScreen(AdminTeams, 'final-admin');
