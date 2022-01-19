/* eslint-disable no-use-before-define */
import Link from 'next/link';
import { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import PlusIcon from '../../../public/images/ic_plus.svg';
import { LoadingScreen } from '../../../components/hoc/loading-screen';
import LayoutDashboard from '../../../components/layouts/layout-dashboard';
import { Card, Tooltips, Table, Button } from '../../../components/partials';
import { AppContext } from '../../_app';
import MonitoringCriteria from '../../../components/admin/settings/monitoring-criteria';
import SettingLockPage from '../../../components/admin/settings/setting-lock-page';
import {
  getWarningMetrics,
  getLockPageRules,
  addRecipient,
  removeRecipient,
  listRecipients,
  getMembershipFile,
  changeMembershipFile,
} from '../../../shared/redux-saga/admin/actions';
import { useDialog } from '../../../components/partials/dialog';
import { AddRecipientDialog } from '../../../components/dashboard/contact/dialogs/add-recipient';
import { RemoveRecipientDialog } from '../../../components/dashboard/contact/dialogs/remove-recipient';
import { useSnackBar } from '../../../components/partials/snack-bar';
import { formatDate } from '../../../shared/core/utils';
import { useTable } from '../../../components/partials/table';

const Styles = styled.div`
  .recipient-table {
    min-width: auto;
    .col-1 {
      width: 30%;
      padding-right: 0 !important;
    }
    .col-2 {
      width: 50%;
      padding-right: 0 !important;
    }
    .col-3 {
      width: 20%;
      padding-right: 0 !important;
    }
  }
`;

const Settings = () => {
  const [metrics, setMetrics] = useState(null);
  const [rules, setRules] = useState(null);
  const dispatch = useDispatch();
  const { setDialog, onClosed } = useDialog();
  const { setLoading } = useContext(AppContext);
  const { openSnack } = useSnackBar();
  const [agreement, setAgreement] = useState();
  const [replaceAgreement, setReplaceAgreement] = useState();
  const {
    data,
    setData,
    register,
    resetData,
    hasMore,
    appendData,
    setHasMore,
    page,
    setPage,
  } = useTable();

  useEffect(() => {
    setLoading(true);
    fetchWarningMetrics();
    fetchLockPageRules();
    fetchRecipients();
    getMembership();
  }, []);

  const getMembership = () => {
    dispatch(
      getMembershipFile(
        {},
        res => {
          setAgreement(res);
        },
        () => {}
      )
    );
  };

  const saveFile = () => {
    setLoading(true);
    dispatch(
      changeMembershipFile(
        { file: replaceAgreement },
        () => {
          setLoading(false);
          setAgreement(replaceAgreement);
          setReplaceAgreement(null);
          openSnack('primary', 'The membership agreement has been updated!');
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  const changeFile = e => {
    const fileArr = Array.from(e.target.files);
    setReplaceAgreement(fileArr[0]);
  };

  const cancelAgreement = () => {
    setReplaceAgreement(null);
  };

  const fetchRecipients = (pageValue = page) => {
    dispatch(
      listRecipients({ page: pageValue, limit: 999 }, (results, isHasMore) => {
        setHasMore(isHasMore);
        appendData(results);
        setPage(prev => prev + 1);
      })
    );
  };

  const openAddRecipientDialog = () => {
    setDialog({
      type: 'DialogCustom',
      data: {
        content: (
          <AddRecipientDialog
            onAdd={temp => {
              setLoading(true);
              dispatch(
                addRecipient(
                  temp,
                  () => {
                    setLoading(false);
                    resetData();
                    fetchRecipients(1);
                    openSnack('primary', 'Added new contact!');
                    onClosed();
                  },
                  () => {
                    setLoading(false);
                  }
                )
              );
            }}
            onBack={() => onClosed()}
          />
        ),
      },
    });
  };

  const doRemoveRecipient = res => {
    setDialog({
      type: 'DialogCustom',
      data: {
        content: (
          <RemoveRecipientDialog
            info={res}
            onRemove={() => {
              setLoading(true);
              dispatch(
                removeRecipient(
                  { id: res.id },
                  () => {
                    setLoading(false);
                    const temp = data.filter(x => x.id !== res.id);
                    setData([...temp]);
                    openSnack('primary', 'Removed contact!');
                    onClosed();
                  },
                  () => {
                    setLoading(false);
                  }
                )
              );
            }}
            onBack={() => onClosed()}
          />
        ),
      },
    });
  };

  const fetchWarningMetrics = () => {
    dispatch(
      getWarningMetrics(
        res => {
          const obj = res?.reduce((result, item) => {
            // eslint-disable-next-line no-param-reassign
            result[item.type] = item;
            return result;
          }, {});
          setLoading(false);
          setMetrics(obj);
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  const fetchLockPageRules = () => {
    dispatch(
      getLockPageRules(
        res => {
          if (res) {
            res.kyc_not_verify = res.kyc_not_verify?.reduce((result, item) => {
              // eslint-disable-next-line no-param-reassign
              result[item.screen] = item;
              return result;
            }, {});
            res.status_is_poor = res.status_is_poor?.reduce((result, item) => {
              // eslint-disable-next-line no-param-reassign
              result[item.screen] = item;
              return result;
            }, {});
            setRules(res);
          }
        },
        () => {}
      )
    );
  };

  return (
    <LayoutDashboard>
      <Card className="h-full pl-card py-5">
        <div className="flex flex-col bg-transparent h-full">
          <div className="w-full pr-card">
            <h3 className="text-dark2 text-lg font-medium h-11 flex items-end mb-3">
              Global settings
            </h3>
            <div className="border-primary border-b-2" />
          </div>
          <div className="flex flex-col flex-1 min-h-0 overflow-y-auto">
            <section className="pt-8">
              <h4 className="flex gap-2 mb-7 text-lg font-medium">
                Mailer Settings
                <Tooltips
                  placement="top"
                  title="Adjust settings for the automatic email system."
                  arrow
                >
                  <img
                    width="10px"
                    height="10px"
                    src="/images/ic_feather_info.svg"
                    alt="Info"
                  />
                </Tooltips>
              </h4>
              <Link href="/admin/settings/emailer">
                <button
                  type="button"
                  className="mr-5 transition text-lg text-white w-36 lg:w-48 h-9 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
                >
                  Access Mailer
                </button>
              </Link>
            </section>
            <section className="mt-20">
              <h4 className="flex gap-2 mb-7 text-lg font-medium">
                Notification Settings
                <Tooltips
                  placement="top"
                  title="Adjust settings for the notifications to node operators."
                  arrow
                >
                  <img
                    width="10px"
                    height="10px"
                    src="/images/ic_feather_info.svg"
                    alt="Info"
                  />
                </Tooltips>
              </h4>
              <Link href="/admin/settings/notifications">
                <button
                  type="button"
                  className="transition text-lg text-white w-36 lg:w-48 h-9 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
                >
                  Access Notifications
                </button>
              </Link>
            </section>
            <section className="mt-20">
              <h4 className="flex gap-2 mb-7 text-lg font-medium">
                Monitoring Criteria
                <Tooltips
                  placement="top"
                  title="Allows admin to adjust the settings for Uptime, Block Height, and Update Responsiveness."
                  arrow
                >
                  <img
                    width="10px"
                    height="10px"
                    src="/images/ic_feather_info.svg"
                    alt="Info"
                  />
                </Tooltips>
              </h4>
              <MonitoringCriteria
                metrics={metrics}
                fetchWarningMetrics={fetchWarningMetrics}
              />
            </section>
            <section className="my-20">
              <h4 className="flex gap-2 mb-7 text-lg font-medium">
                Status page lock rules
                <Tooltips
                  placement="top"
                  title="Locks users out of specified areas of the dashboard."
                  arrow
                >
                  <img
                    width="10px"
                    height="10px"
                    src="/images/ic_feather_info.svg"
                    alt="Info"
                  />
                </Tooltips>
              </h4>
              <SettingLockPage rules={rules} fetchRules={fetchLockPageRules} />
            </section>
            <section className="my-20">
              <h4 className="flex gap-2 mb-7 text-lg font-medium">
                Contact Form Recipients
                <button
                  type="button"
                  className="h-8 w-8 bg-primary rounded flex justify-center items-center"
                  onClick={openAddRecipientDialog}
                >
                  <PlusIcon className="text-white" />
                </button>
              </h4>
              <Styles className="h-full pt-4 w-full lg:w-7/12">
                <Table
                  className="recipient-table h-full"
                  {...register}
                  onLoadMore={fetchRecipients}
                  hasMore={hasMore}
                  dataLength={data?.length}
                >
                  <Table.Header>
                    <Table.HeaderCell key="header1">
                      <p>Added Date</p>
                    </Table.HeaderCell>
                    <Table.HeaderCell key="header2">
                      <p>Email</p>
                    </Table.HeaderCell>
                    <Table.HeaderCell key="header3">
                      <p>Admin Action</p>
                    </Table.HeaderCell>
                  </Table.Header>
                  <Table.Body className="padding-tracker">
                    {data.map(recipient => (
                      <Table.BodyRow key={`recipient-${recipient.id}`}>
                        <Table.BodyCell key="body1">
                          {`${formatDate(recipient.created_at)}`}
                        </Table.BodyCell>
                        <Table.BodyCell key="body2">
                          <p className="break-words">{recipient.email}</p>
                        </Table.BodyCell>
                        <Table.BodyCell key="body3">
                          <Button
                            className="w-28"
                            size="small"
                            primary
                            onClick={() => {
                              doRemoveRecipient(recipient);
                            }}
                          >
                            Remove
                          </Button>
                        </Table.BodyCell>
                      </Table.BodyRow>
                    ))}
                  </Table.Body>
                </Table>
              </Styles>
            </section>
            <section className="my-20">
              <h4 className="flex gap-2 mb-7 text-lg font-medium">
                Membership Agreement
              </h4>
              <div className="flex gap-4 items-center h-full pt-4 w-full lg:w-7/12">
                <input
                  type="text"
                  className="border border-gray1 w-96 flex-1 h-14 px-7 shadow-md focus:outline-none"
                  value={replaceAgreement?.name || agreement?.name || ''}
                  readOnly
                />
                <div className="w-72 flex gap-2">
                  {!replaceAgreement && (
                    <label
                      htmlFor="agreement"
                      className="bg-primary text-white flex justify-center items-center cursor-pointer ml-5 h-16 lg:h-11 w-full text-lg lg:w-48 rounded-full bg-none  hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
                    >
                      Replace File
                    </label>
                  )}
                  {replaceAgreement && (
                    <>
                      <Button
                        className="w-28"
                        size="small"
                        primary
                        onClick={saveFile}
                      >
                        Save File
                      </Button>
                      <Button
                        className="w-28"
                        size="small"
                        primary
                        onClick={cancelAgreement}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  multiple
                  id="agreement"
                  onClick={e => {
                    e.target.value = null;
                  }}
                  onChange={changeFile}
                  hidden
                  accept=".pdf"
                />
              </div>
            </section>
          </div>
        </div>
      </Card>
    </LayoutDashboard>
  );
};

export default LoadingScreen(Settings, 'final-admin');
