/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import Switch from 'react-switch';
import {
  getSubadmins,
  inviteSubadmin,
  resendInviteLink,
  revokeSubadmin,
  resetSubadminPassword,
  changeSubadminPermissions,
  undoRevokeSubadmin,
} from '../../shared/redux-saga/admin/actions';
import { LoadingScreen } from '../../components/hoc/loading-screen';
import LayoutDashboard from '../../components/layouts/layout-dashboard';
import { Button, Card, Table } from '../../components/partials';
import { useTable } from '../../components/partials/table';
import { useDialog } from '../../components/partials/dialog';
import { formatDate } from '../../shared/core/utils';
import { AppContext } from '../_app';
import { IPHistoriesDialog } from '../../components/admin/teams/ip-histories';

const Styles = styled.div`
  .admin-table {
    .col {
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
    }
    .col-1 {
      width: 8%;
    }
    .col-2 {
      width: 8%;
    }
    .col-3 {
      width: 18%;
    }
    .col-4 {
      width: 8%;
    }
    .col-5 {
      width: 12%;
    }
    .col-6 {
      width: 6%;
    }
    .col-7 {
      width: 6%;
    }
    .col-8 {
      width: 6%;
    }
    .col-9 {
      width: 6%;
    }
    .col-10 {
      width: 22%;
      padding-right: 0;
    }
  }
`;

const AdminTeams = () => {
  // const [checked, setChecked] = useState({ intake });
  const { setDialog } = useDialog();
  const { setLoading } = useContext(AppContext);
  const dispatch = useDispatch();
  const {
    data,
    register,
    hasMore,
    appendData,
    setData,
    setHasMore,
    page,
    resetData,
    setPage,
    params,
  } = useTable();

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
    );
  };

  const registerAdmin = email => {
    if (email) {
      setLoading(true);
      dispatch(
        inviteSubadmin(
          email,
          res => {
            setLoading(false);
            setDialog({
              type: 'Dialog',
              data: {
                title: `Success`,
                content: `Sent invitation successfully to the ${email}`,
                ok: 'Invite',
                cancel: 'Cancel',
              },
              afterClosed: () => {
                resetData();
                fetchSubadmins(1, {});
              },
            });
          },
          () => {
            setLoading(false);
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
        cancel: 'Cancel',
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
        cancel: 'Cancel',
      },
      afterClosed: confirm => {
        if (confirm) {
          setLoading(true);
          dispatch(
            revokeSubadmin(
              item.id,
              () => {
                setLoading(false);
                const ind = data.findIndex(admin => admin.id === item.id);
                if (ind >= 0) {
                  data[ind].member_status = 'revoked';
                  setData([...data]);
                  setDialog({
                    type: 'Dialog',
                    data: {
                      title: `Success`,
                      content: `Successfully revoked the admin with ${item.email}`,
                      ok: 'OK',
                      cancel: 'Cancel',
                    },
                    afterClosed: () => {},
                  });
                }
              },
              () => {
                setLoading(false);
              }
            )
          );
        }
      },
    });
  };

  const undoRevokeAdmin = item => {
    setDialog({
      type: 'DialogConfirm',
      data: {
        title: `Are you sure you want to undo revoke admin privileges from ${item.email}?`,
        ok: 'Undo',
        cancel: 'Cancel',
      },
      afterClosed: confirm => {
        if (confirm) {
          setLoading(true);
          dispatch(
            undoRevokeSubadmin(
              item.id,
              res => {
                setLoading(false);
                const currentUser = data.find(admin => admin.id === item.id);
                if (currentUser) {
                  currentUser.member_status = res.member_status;
                  setData([...data]);
                  setDialog({
                    type: 'Dialog',
                    data: {
                      title: `Success`,
                      content: `Successfully undo revoked the admin with ${item.email}`,
                      ok: 'OK',
                      cancel: 'Cancel',
                    },
                    afterClosed: () => {},
                  });
                }
              },
              () => {
                setLoading(false);
              }
            )
          );
        }
      },
    });
  };

  const resetPassword = item => {
    setLoading(true);
    dispatch(
      resetSubadminPassword(
        item.id,
        () => {
          setLoading(false);
          setDialog({
            type: 'Dialog',
            data: {
              title: `Success`,
              content: `Sent reset password link successfully to the ${item.email}`,
              ok: 'Invite',
              cancel: 'Cancel',
            },
            afterClosed: () => {},
          });
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  const resendLink = item => {
    setLoading(true);
    dispatch(
      resendInviteLink(
        item.id,
        () => {
          setLoading(false);
          setDialog({
            type: 'Dialog',
            data: {
              title: `Success`,
              content: `Successfully sent invitation to the ${item.email} again`,
              ok: 'Invite',
              cancel: 'Cancel',
            },
            afterClosed: () => {},
          });
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  const setPermission = (id, perm, value) => {
    const permissions = {
      intake: 0,
      users: 0,
      ballots: 0,
      perks: 0,
    };
    const ind = data.findIndex(admin => admin.id === id);
    if (!data[ind].permissions) {
      data[ind].permissions = permissions;
    }
    data[ind].permissions[perm] = !value ? 0 : 1;
    dispatch(
      changeSubadminPermissions(id, data[ind].permissions, () => {
        setData([...data]);
      })
    );
  };

  const openIPHistories = id => {
    setDialog({
      type: 'DialogCustom',
      data: {
        content: <IPHistoriesDialog id={id} />,
      },
    });
  };

  useEffect(() => {
    fetchSubadmins();
  }, []);

  const renderStatus = status => {
    if (status === 'revoked') {
      return <p className="capitalize text-primary">{status}</p>;
    }
    if (status === 'active') {
      return <p className="capitalize">{status}</p>;
    }
    return <p>{status}</p>;
  };

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
            <Button
              className="px-6"
              primary
              type="button"
              onClick={showNewAdminDlg}
            >
              + New Admin
            </Button>
          </div>
          <div className="flex flex-col h-full">
            <Styles className="h-full pt-8" style={{ height: '85%' }}>
              <Table
                className="admin-table h-full"
                {...register}
                onLoadMore={fetchSubadmins}
                hasMore={hasMore}
                dataLength={data?.length}
              >
                <Table.Header>
                  <Table.HeaderCell>
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
                <Table.Body className="lg:-mr-24 lg:pr-24">
                  {data.map(admin => (
                    <Table.BodyRow key={`admin-team-${admin.id}`}>
                      <Table.BodyCell>
                        {formatDate(admin.created_at)}
                      </Table.BodyCell>
                      <Table.BodyCell>
                        {renderStatus(admin.member_status)}
                        {admin.member_status === 'invited' && (
                          <button
                            type="button"
                            className="inline-flex text-xs text-primary underline"
                            onClick={() => resendLink(admin)}
                          >
                            Resend Link
                          </button>
                        )}
                      </Table.BodyCell>
                      <Table.BodyCell>
                        <p className="break-words">{admin.email}</p>
                      </Table.BodyCell>
                      <Table.BodyCell>
                        {admin.last_login_at && (
                          <>
                            <p>
                              {formatDate(admin.last_login_at, 'dd/MM/yyyy')}
                            </p>
                            <p className="text-xs">
                              {formatDate(admin.last_login_at, 'HH:mm aa')}
                            </p>
                          </>
                        )}
                      </Table.BodyCell>
                      <Table.BodyCell>
                        <p className="relative h-4">
                          <span
                            className="absolute left-0 top-0 w-full truncate cursor-pointer"
                            onClick={() => {
                              openIPHistories(admin.id);
                            }}
                          >
                            {admin.last_login_ip_address}
                          </span>
                        </p>
                      </Table.BodyCell>
                      <Table.BodyCell>
                        <Switch
                          onChange={_check =>
                            setPermission(admin.id, 'intake', _check)
                          }
                          checked={admin.permissions?.intake || false}
                          checkedIcon={null}
                          uncheckedIcon={null}
                          offColor="#bbb"
                          onColor="#ff474e"
                          height={18}
                          width={40}
                        />
                      </Table.BodyCell>
                      <Table.BodyCell>
                        <Switch
                          onChange={_check =>
                            setPermission(admin.id, 'users', _check)
                          }
                          checked={admin.permissions?.users || false}
                          checkedIcon={null}
                          uncheckedIcon={null}
                          offColor="#bbb"
                          onColor="#ff474e"
                          height={18}
                          width={40}
                        />
                      </Table.BodyCell>
                      <Table.BodyCell>
                        <Switch
                          onChange={_check =>
                            setPermission(admin.id, 'ballots', _check)
                          }
                          checked={admin.permissions?.ballots || false}
                          checkedIcon={null}
                          uncheckedIcon={null}
                          offColor="#bbb"
                          onColor="#ff474e"
                          height={18}
                          width={40}
                        />
                      </Table.BodyCell>
                      <Table.BodyCell>
                        <Switch
                          onChange={_check =>
                            setPermission(admin.id, 'perks', _check)
                          }
                          checked={admin.permissions?.perks || false}
                          checkedIcon={null}
                          uncheckedIcon={null}
                          offColor="#bbb"
                          onColor="#ff474e"
                          height={18}
                          width={40}
                        />
                      </Table.BodyCell>
                      <Table.BodyCell>
                        <div className="flex gap-4">
                          <Button
                            className="px-6"
                            size="small"
                            primaryOutline
                            onClick={() => {
                              resetPassword(admin);
                            }}
                          >
                            Reset Password
                          </Button>
                          {admin.member_status !== 'revoked' ? (
                            <Button
                              className="w-28"
                              size="small"
                              primary
                              onClick={() => {
                                revokeAdmin(admin);
                              }}
                            >
                              Revoke
                            </Button>
                          ) : (
                            <Button
                              className="w-28"
                              size="small"
                              primary
                              onClick={() => {
                                undoRevokeAdmin(admin);
                              }}
                            >
                              Undo
                            </Button>
                          )}
                        </div>
                      </Table.BodyCell>
                    </Table.BodyRow>
                  ))}
                </Table.Body>
              </Table>
            </Styles>
          </div>
        </div>
      </Card>
    </LayoutDashboard>
  );
};

export default LoadingScreen(AdminTeams, 'final-admin');
