/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import Switch from 'react-switch';
import Head from 'next/head';
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
import { Button, Card, Table, Tooltips } from '../../components/partials';
import { useTable } from '../../components/partials/table';
import { useDialog } from '../../components/partials/dialog';
import { formatDate } from '../../shared/core/utils';
import { AppContext } from '../../pages/_app';
import { IPHistoriesDialog } from '../../components/admin/teams/ip-histories';

const Styles = styled.div`
  .teams-table {
    display: flex;
    flex-direction: column;
    .col {
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
    }
    .col-1 {
      width: 8%;
      padding-right: 0 !important;
    }
    .col-2 {
      width: 8%;
      padding-right: 0 !important;
    }
    .col-3 {
      width: 18%;
      padding-right: 0 !important;
    }
    .col-4 {
      width: 8%;
      padding-right: 0 !important;
    }
    .col-5 {
      width: 11%;
      padding-right: 0 !important;
    }
    .col-6 {
      width: 5%;
      padding-right: 0 !important;
    }
    .col-7 {
      width: 5%;
      padding-right: 0 !important;
    }
    .col-8 {
      width: 5%;
      padding-right: 0 !important;
    }
    .col-9 {
      width: 5%;
      padding-right: 0 !important;
    }
    .col-10 {
      width: 5%;
      padding-right: 0 !important;
    }
    .col-11 {
      width: 22%;
      padding-right: 0 !important;
    }
  }
`;

const AdminTeams = () => {
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
          () => {
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
                 to invite to become an admin`,
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
      teams: 0,
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
    <>
      <Head>
        <title>Team Management - Casper Association Portal</title>
      </Head>
      <LayoutDashboard>
        <Card className="h-full px-card py-5">
          <div className="flex flex-col bg-transparent h-full">
            <div className="w-full">
              <h3 className="h-11 text-dark2 text-lg lg:pr-32 font-medium mb-3 flex items-end">
                Team Management
              </h3>
              <div className="border-primary border-b-2" />
            </div>
            <div className="pt-3 flex items-center justify-between">
              <h4 className="text-dark2 text-lg lg:pr-32 font-medium">
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
            <div
              className="flex flex-1 flex-col min-h-0"
              style={{ overflowY: 'auto' }}
            >
              <Styles className="h-full pt-4">
                <Table
                  className="teams-table h-full"
                  {...register}
                  onLoadMore={fetchSubadmins}
                  hasMore={hasMore}
                  dataLength={data?.length}
                >
                  <Table.Header>
                    <Table.HeaderCell key="header1">
                      <p>Added Date</p>
                    </Table.HeaderCell>
                    <Table.HeaderCell key="header2">
                      <p>Status</p>
                    </Table.HeaderCell>
                    <Table.HeaderCell key="header3">
                      <p>Email</p>
                    </Table.HeaderCell>
                    <Table.HeaderCell key="header4">
                      <p>Last Login</p>
                    </Table.HeaderCell>
                    <Table.HeaderCell key="header5">
                      <p>IP</p>
                    </Table.HeaderCell>
                    <Table.HeaderCell key="header6">
                      <Tooltips
                        placement="top"
                        title="Toggles admin access to the intake tab."
                        arrow
                      >
                        <p>Intake</p>
                      </Tooltips>
                    </Table.HeaderCell>
                    <Table.HeaderCell key="header7">
                      <Tooltips
                        placement="top"
                        title="Toggles admin access to the users tab."
                        arrow
                      >
                        <p>Users</p>
                      </Tooltips>
                    </Table.HeaderCell>
                    <Table.HeaderCell key="header8">
                      <Tooltips
                        placement="top"
                        title="Toggles admin access to the ballots tab."
                        arrow
                      >
                        <p>Ballots</p>
                      </Tooltips>
                    </Table.HeaderCell>
                    <Table.HeaderCell key="header9">
                      <Tooltips
                        placement="top"
                        title="Toggles admin access to the perks tab."
                        arrow
                      >
                        <p>Perks</p>
                      </Tooltips>
                    </Table.HeaderCell>
                    <Table.HeaderCell key="header10">
                      <Tooltips
                        placement="top"
                        title="Toggles admin access to the teams tab."
                        arrow
                      >
                        <p>Teams</p>
                      </Tooltips>
                    </Table.HeaderCell>
                    <Table.HeaderCell key="header11">
                      <p>Admin Action</p>
                    </Table.HeaderCell>
                  </Table.Header>
                  <Table.Body className="custom-padding-tracker">
                    {data.map(admin => (
                      <Table.BodyRow key={`admin-team-${admin.id}`}>
                        <Table.BodyCell key="body1">
                          <p className="truncate">
                            {formatDate(admin.created_at, 'dd/MM/yyyy')}
                            <br />
                            {formatDate(admin.created_at, 'HH:mm aa')}
                          </p>
                        </Table.BodyCell>
                        <Table.BodyCell key="body2">
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
                        <Table.BodyCell key="body3">
                          <p className="break-words">{admin.email}</p>
                        </Table.BodyCell>
                        <Table.BodyCell key="body4">
                          {admin.last_login_at && (
                            <p className="truncate">
                              {formatDate(admin.last_login_at, 'dd/MM/yyyy')}
                              <br />
                              {formatDate(admin.last_login_at, 'HH:mm aa')}
                            </p>
                          )}
                        </Table.BodyCell>
                        <Table.BodyCell key="body5">
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
                        <Table.BodyCell key="body6">
                          <Switch
                            onChange={_check =>
                              setPermission(admin.id, 'intake', _check)
                            }
                            checked={!!admin.permissions?.intake}
                            checkedIcon={null}
                            uncheckedIcon={null}
                            offColor="#bbb"
                            onColor="#ff474e"
                            height={18}
                            width={40}
                          />
                        </Table.BodyCell>
                        <Table.BodyCell key="body7">
                          <Switch
                            onChange={_check =>
                              setPermission(admin.id, 'users', _check)
                            }
                            checked={!!admin.permissions?.users}
                            checkedIcon={null}
                            uncheckedIcon={null}
                            offColor="#bbb"
                            onColor="#ff474e"
                            height={18}
                            width={40}
                          />
                        </Table.BodyCell>
                        <Table.BodyCell key="body8">
                          <Switch
                            onChange={_check =>
                              setPermission(admin.id, 'ballots', _check)
                            }
                            checked={!!admin.permissions?.ballots}
                            checkedIcon={null}
                            uncheckedIcon={null}
                            offColor="#bbb"
                            onColor="#ff474e"
                            height={18}
                            width={40}
                          />
                        </Table.BodyCell>
                        <Table.BodyCell key="body9">
                          <Switch
                            onChange={_check =>
                              setPermission(admin.id, 'perks', _check)
                            }
                            checked={!!admin.permissions?.perks}
                            checkedIcon={null}
                            uncheckedIcon={null}
                            offColor="#bbb"
                            onColor="#ff474e"
                            height={18}
                            width={40}
                          />
                        </Table.BodyCell>
                        <Table.BodyCell key="body10">
                          <Switch
                            onChange={_check =>
                              setPermission(admin.id, 'teams', _check)
                            }
                            checked={!!admin.permissions?.teams}
                            checkedIcon={null}
                            uncheckedIcon={null}
                            offColor="#bbb"
                            onColor="#ff474e"
                            height={18}
                            width={40}
                          />
                        </Table.BodyCell>
                        <Table.BodyCell key="body11">
                          <div className="flex gap-3 items-center">
                            <Button
                              className="px-6 py-1"
                              size="small"
                              primaryOutline
                              onClick={() => {
                                resetPassword(admin);
                              }}
                              style={{ height: 'auto' }}
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
    </>
  );
};

export default LoadingScreen(AdminTeams, 'final-admin', 'teams');
