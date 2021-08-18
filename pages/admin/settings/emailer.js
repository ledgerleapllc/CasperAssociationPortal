/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useEffect, useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

import { LoadingScreen } from '../../../components/hoc/loading-screen';
import LayoutDashboard from '../../../components/layouts/layout-dashboard';
import {
  Card,
  BackButton,
  Table,
  Switch,
  Button,
  LoadingButton,
} from '../../../components/partials';
import { useTable } from '../../../components/partials/table';
import {
  getEmailerData,
  addEmailerAdmin,
  deleteEmailerAdmin,
  updateEmailerTriggerUser,
  updateEmailerTriggerAdmin,
} from '../../../shared/redux-saga/admin/actions';
import { AppContext } from '../../_app';
import { useDialog } from '../../../components/partials/dialog';
import { EMAIL_PATTERN } from '../../../helpers/form-validation';

const Styles = styled.div`
  .emailer-admin-table {
    .col-1 {
      width: 60%;
    }
    .col-2 {
      width: 40%;
    }
  }
`;

const AddEmailForm = ({ closeDialog, fetchData }) => {
  const { formState, register, handleSubmit } = useForm({
    mode: 'onChange',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = data => {
    setIsSubmitting(true);
    dispatch(
      addEmailerAdmin(
        data,
        () => {
          fetchData();
          setIsSubmitting(false);
          closeDialog();
        },
        () => {
          setIsSubmitting(false);
        }
      )
    );
  };

  return (
    <div>
      <h3 className="mb-10 text-2xl">
        Add a new recipient of admin email alerts.
      </h3>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full">
          <input
            type="text"
            className="w-full mt-2 h-14 px-7 rounded-full shadow-md focus:outline-none"
            name="email"
            placeholder="Enter email address"
            {...register('email', {
              required: 'Email is require',
              pattern: {
                message: 'Email is invalid',
                value: EMAIL_PATTERN,
              },
            })}
          />
          {formState.errors?.email && (
            <p className="mt-2 text-primary">
              {formState.errors.email?.message}
            </p>
          )}
        </div>
        <div className="flex items-center mt-10">
          <LoadingButton
            type="submit"
            isDisabled={!formState.isValid || isSubmitting}
            isLoading={isSubmitting}
            title="Add"
            className="mr-5 text-sm h-16 lg:w-52 text-white rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
          />
          <Button primaryOutline className="h-16 lg:w-52" onClick={closeDialog}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

const Emailer = () => {
  const { data, setData } = useTable();
  const [triggerAdminEmails, setTriggerAdminEmails] = useState([]);
  const [triggerUserEmails, setTriggerUserEmails] = useState([]);

  const dispatch = useDispatch();
  const { setLoading } = useContext(AppContext);
  const { setDialog, onClosed } = useDialog();

  useEffect(() => {
    setLoading(true);
    fetchEmailerAdmins();
  }, []);

  const fetchEmailerAdmins = () => {
    dispatch(
      getEmailerData(
        result => {
          setData(result?.admins);
          setTriggerUserEmails(result?.triggerUser);
          setTriggerAdminEmails(result?.triggerAdmin);
          setLoading(false);
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  const changeTriggerAdmin = (e, item, index) => {
    const triggerAdminTemp = [...triggerAdminEmails];
    const itemNew = {
      ...item,
      enabled: e.target.checked,
    };
    triggerAdminTemp[index] = {
      ...triggerAdminTemp[index],
      ...itemNew,
    };
    dispatch(
      updateEmailerTriggerAdmin(
        { id: item.id, data: itemNew },
        () => {
          setTriggerAdminEmails(triggerAdminTemp);
        },
        () => {
          //
        }
      )
    );
  };

  const changeTriggerUser = (e, item, index) => {
    const triggerUserTemp = [...triggerUserEmails];
    const itemNew = {
      ...item,
      enabled: e.target.checked,
    };
    triggerUserTemp[index] = {
      ...triggerUserTemp[index],
      ...itemNew,
    };
    setTriggerUserEmails(triggerUserTemp);
    dispatch(
      updateEmailerTriggerUser(
        { id: item.id, data: itemNew },
        () => {
          setTriggerUserEmails(triggerUserTemp);
        },
        () => {
          //
        }
      )
    );
  };

  const changeTriggerUserMessage = (e, item, index) => {
    const triggerUserTemp = [...triggerUserEmails];
    const itemNew = {
      ...item,
      content: e.target.value,
    };
    triggerUserTemp[index] = {
      ...triggerUserTemp[index],
      ...itemNew,
    };
    setTriggerUserEmails(triggerUserTemp);
  };

  const saveTriggerUser = index => {
    const triggerUserTemp = [...triggerUserEmails];
    const item = triggerUserTemp[index];

    if (!item.content || !item.content.trim()) {
      return;
    }
    triggerUserTemp[index] = {
      ...triggerUserTemp[index],
      ...{ isRequesting: true },
    };
    setTriggerUserEmails(triggerUserTemp);

    dispatch(
      updateEmailerTriggerUser(
        { id: item.id, data: item },
        () => {
          triggerUserTemp[index] = {
            ...triggerUserTemp[index],
            ...{ isRequesting: false },
          };
          setTriggerUserEmails(triggerUserTemp);
          disableTriggerUserEdit(item, index);
        },
        () => {
          triggerUserTemp[index] = {
            ...triggerUserTemp[index],
            ...{ isRequesting: false },
          };
          setTriggerUserEmails(triggerUserTemp);
        }
      )
    );
  };

  const disableTriggerUserEdit = (item, index) => {
    const triggerUserTemp = [...triggerUserEmails];

    const itemNew = {
      ...item,
      editing: false,
    };
    triggerUserTemp[index] = {
      ...triggerUserTemp[index],
      ...itemNew,
    };
    setTriggerUserEmails(triggerUserTemp);
  };

  const enableTriggerUserEdit = (item, index) => {
    const triggerUserTemp = [...triggerUserEmails];
    const itemNew = {
      ...item,
      editing: true,
    };
    triggerUserTemp[index] = {
      ...triggerUserTemp[index],
      ...itemNew,
    };
    setTriggerUserEmails(triggerUserTemp);
  };

  // Click Remove
  const clickRemove = item => {
    setDialog({
      type: 'DialogConfirm',
      data: {
        title: '',
        content: (
          <p className="text-xl">
            Are you sure you are going to remove this emailer admin?
          </p>
        ),
        ok: 'Yes, Please continue',
        cancel: 'Cancel',
      },
      afterClosed: res => {
        if (res) {
          setLoading(true);
          dispatch(
            deleteEmailerAdmin(
              { id: item.id },
              () => {
                fetchEmailerAdmins();
                setLoading(false);
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

  const clickAddAdmin = () => {
    setDialog({
      type: 'Dialog',
      data: {
        content: (
          <AddEmailForm closeDialog={onClosed} fetchData={fetchEmailerAdmins} />
        ),
      },
      settings: {
        hideButton: true,
      },
    });
  };

  return (
    <LayoutDashboard>
      <Card className="h-full py-5">
        <div className="flex flex-col bg-transparent h-full">
          <div className="px-card mt-4">
            <div className="w-full pb-3 border-primary border-b-2 flex flex-col justify-center">
              <BackButton href="/admin/settings" text="Back" force />
              <h3 className="text-dark2 text-lg lg:pr-32 font-medium">
                Emailer
              </h3>
            </div>
          </div>
          <div className="flex-1 pt-8 min-h-0 px-card overflow-y-auto">
            <div>
              <h3 className="text-dark2 text-lg font-medium">Emailer Admins</h3>
              <Styles className="max-h-200px">
                <Table
                  className="emailer-admin-table my-10 h-full max-h-200px"
                  onLoadMore={() => {}}
                  hasMore={false}
                  dataLength={data.length}
                >
                  <Table.Header>
                    <Table.HeaderCell>
                      <p>Email</p>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      <p>Action</p>
                    </Table.HeaderCell>
                  </Table.Header>
                  <Table.Body className="padding-tracker">
                    {data.map((row, ind) => (
                      <Table.BodyRow key={`b-${ind}`}>
                        <Table.BodyCell>
                          <p className="truncate">{row.email}</p>
                        </Table.BodyCell>
                        <Table.BodyCell>
                          <button
                            type="button"
                            className="text-lg text-white w-auto px-5 h-7 rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
                            onClick={() => clickRemove(row)}
                          >
                            Remove
                          </button>
                        </Table.BodyCell>
                      </Table.BodyRow>
                    ))}
                  </Table.Body>
                </Table>
              </Styles>

              <button
                type="button"
                className="text-lg text-white w-52 px-5 h-12 rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
                onClick={clickAddAdmin}
              >
                Add
              </button>
            </div>
            <div className="emailer-item-section">
              <h3 className="text-dark2 text-lg font-medium mb-4">
                Admin Email Triggers
              </h3>
              {!!triggerAdminEmails?.length &&
                triggerAdminEmails.map((item, index) => (
                  <div className="emailer-item" key={`emailer-item-${index}`}>
                    <div className="flex items-center mb-4">
                      <Switch
                        checked={!!item.enabled}
                        onChange={e => changeTriggerAdmin(e, item, index)}
                      />
                      <label className="ml-3">{item.title}</label>
                    </div>
                    <p>{item.content}</p>
                  </div>
                ))}
            </div>
            <div className="emailer-item-section">
              <h3 className="text-dark2 text-lg font-medium mb-4">
                User Email Triggers
              </h3>
              {!!triggerUserEmails?.length &&
                triggerUserEmails.map((item, index) => (
                  <div className="emailer-item" key={`emailer-item-${index}`}>
                    <div className="flex items-center mb-4">
                      <Switch
                        checked={!!item.enabled}
                        onChange={e => changeTriggerUser(e, item, index)}
                      />
                      <label className="ml-3">{item.title}</label>
                    </div>
                    {item.editing ? (
                      <>
                        <textarea
                          className="focus:outline-none"
                          value={item.content}
                          onChange={e =>
                            changeTriggerUserMessage(e, item, index)
                          }
                        />
                        {!item?.content?.trim().length && (
                          <span className="mt-2 text-primary">
                            Please input message content
                          </span>
                        )}
                      </>
                    ) : (
                      <p>{item.content}</p>
                    )}
                    {item.editing ? (
                      <div className="flex items-center mt-4">
                        <LoadingButton
                          type="button"
                          isDisabled={item.isRequesting}
                          isLoading={item.isRequesting}
                          title="Save"
                          className="mr-5 text-sm h-11 lg:w-52 text-white rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
                          onClick={() => saveTriggerUser(index)}
                        />
                        <Button
                          primaryOutline
                          onClick={() => disableTriggerUserEdit(item, index)}
                        >
                          Cancel Edit
                        </Button>
                      </div>
                    ) : (
                      <Button
                        primary
                        onClick={() => enableTriggerUserEdit(item, index)}
                        className="mt-4"
                      >
                        Edit Message
                      </Button>
                    )}
                  </div>
                ))}
            </div>
          </div>

        </div>
      </Card>
    </LayoutDashboard>
  );
};

export default LoadingScreen(Emailer, 'final-admin');
