/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import Head from 'next/head';
import styled from 'styled-components';
import InfoIcon from '@material-ui/icons/Info';
import PlusIcon from '../../../public/images/ic_plus.svg';
import { LoadingScreen } from '../../../components/hoc/loading-screen';
import LayoutDashboard from '../../../components/layouts/layout-dashboard';
import { Card, Tooltips, Table, Button } from '../../../components/partials';
import { AppContext } from '../../../pages/_app';
import MonitoringCriteria from '../../../components/admin/settings/monitoring-criteria';
import SettingLockPage from '../../../components/admin/settings/setting-lock-page';
import {
  addRecipient,
  removeRecipient,
  changeMembershipFile,
  getGlobalSettings,
} from '../../../shared/redux-saga/admin/actions';
import { useDialog } from '../../../components/partials/dialog';
import { AddRecipientDialog } from '../../../components/dashboard/contact/dialogs/add-recipient';
import { RemoveRecipientDialog } from '../../../components/dashboard/contact/dialogs/remove-recipient';
import { useSnackBar } from '../../../components/partials/snack-bar';
import { formatDate } from '../../../shared/core/utils';
import { useTable } from '../../../components/partials/table';

const Styles = styled.div`
  .recipient-table {
    display: flex;
    flex-direction: column;
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
  const [isOverride, setIsOverride] = useState(false);
  const [rules, setRules] = useState(null);
  const dispatch = useDispatch();
  const { setDialog, onClosed } = useDialog();
  const { setLoading } = useContext(AppContext);
  const { openSnack } = useSnackBar();
  const [agreement, setAgreement] = useState();
  const [replaceAgreement, setReplaceAgreement] = useState();
  const [globalSettings, setGlobalSettings] = useState({});

  const {
    data,
    setData,
    register,
    resetData,
    appendData,
    hasMore,
    setHasMore,
  } = useTable();

  const fetchGlobalSettings = () => {
    setLoading(true);
    resetData();
    dispatch(
      getGlobalSettings(
        res => {
          setGlobalSettings(res.globalSettings || {});
          const lockRules = res.lockRules || {};
          lockRules.kyc_not_verify = lockRules.kyc_not_verify?.reduce(
            (result, item) => {
              const params = {
                ...result,
                [item.screen]: item,
              };
              return params;
            },
            {}
          );
          lockRules.status_is_poor = lockRules.status_is_poor?.reduce(
            (result, item) => {
              const params = {
                ...result,
                [item.screen]: item,
              };
              return params;
            },
            {}
          );
          setRules(lockRules);
          setAgreement(res.membershipAgreementFile);
          setHasMore(false);
          appendData(res.contactRecipients || []);
          setLoading(false);
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  useEffect(() => {
    fetchGlobalSettings();
  }, []);

  const clickOverride = () => {
    setIsOverride(pre => !pre);
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
                    fetchGlobalSettings();
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

  return (
    <>
      <Head>
        <title>Global Settings - Casper Association Portal</title>
      </Head>
      <LayoutDashboard>
        <Card className="w-full h-full pl-card py-5">
          <div className="flex flex-col bg-transparent h-full">
            <div className="w-full pr-card">
              <h3 className="text-dark2 text-lg font-medium mb-3">
                Global Settings
              </h3>
              <div className="border-primary border-b-2" />
            </div>
            <div className="flex flex-col flex-1 overflow-y-auto pr-card">
              <section className="pt-8">
                <h4 className="flex items-center gap-2 mb-7 text-lg font-medium">
                  Mailer Settings
                  <Tooltips
                    placement="top"
                    title="Adjust settings for the automatic email system."
                    arrow
                  >
                    <InfoIcon style={{ color: 'black', fontSize: '16px' }} />
                  </Tooltips>
                </h4>
                <Link to="/admin/settings/emailer">
                  <button
                    type="button"
                    className="px-8 py-2 transition text-lg text-white rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
                  >
                    Access Mailer
                  </button>
                </Link>
              </section>
              <section className="mt-20">
                <h4 className="flex items-center gap-2 mb-7 text-lg font-medium">
                  Notification Settings
                  <Tooltips
                    placement="top"
                    title="Adjust settings for the notifications to node operators."
                    arrow
                  >
                    <InfoIcon style={{ color: 'black', fontSize: '16px' }} />
                  </Tooltips>
                </h4>
                <Link to="/admin/settings/notifications">
                  <button
                    type="button"
                    className="px-8 py-2 transition text-lg text-white rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
                  >
                    Access Notifications
                  </button>
                </Link>
              </section>
              <section className="mt-20">
                <div className="flex mb-7 items-center gap-5">
                  <h4 className="flex items-center gap-2 text-lg font-medium">
                    Monitoring Criteria
                    <Tooltips
                      placement="top"
                      title="Allows admin to adjust the settings for Uptime, and Update Responsiveness."
                      arrow
                    >
                      <InfoIcon style={{ color: 'black', fontSize: '16px' }} />
                    </Tooltips>
                  </h4>
                  <p
                    className="text-primary underline cursor-pointer"
                    onClick={clickOverride}
                  >
                    {isOverride ? 'Cancel' : 'Edit'}
                  </p>
                </div>
                <MonitoringCriteria
                  isOverride={isOverride}
                  globalSettings={globalSettings}
                />
              </section>
              <section className="mt-20">
                <h4 className="flex items-center gap-2 mb-7 text-lg font-medium">
                  Status page lock rules
                  <Tooltips
                    placement="top"
                    title="Locks users out of specified areas of the dashboard."
                    arrow
                  >
                    <InfoIcon style={{ color: 'black', fontSize: '16px' }} />
                  </Tooltips>
                </h4>
                <SettingLockPage
                  rules={rules}
                  fetchRules={fetchGlobalSettings}
                />
              </section>
              <section className="mt-20">
                <h4 className="flex gap-5 mb-7 text-lg font-medium">
                  Contact Form Recipients
                  <button
                    type="button"
                    className="h-8 w-8 bg-primary rounded flex justify-center items-center"
                    onClick={openAddRecipientDialog}
                  >
                    <PlusIcon className="text-white" />
                  </button>
                </h4>
                <Styles className="w-full h-full pt-4">
                  <Table
                    className="recipient-table h-full"
                    {...register}
                    onLoadMore={() => {}}
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
                    <Table.Body className="custom-padding-tracker">
                      {data.map(recipient => (
                        <Table.BodyRow key={`recipient-${recipient.id}`}>
                          <Table.BodyCell key="body1">
                            {formatDate(recipient.created_at)}
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
                <h4 className="flex mb-7 text-lg font-medium">
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
    </>
  );
};

export default LoadingScreen(Settings, 'final-admin');
