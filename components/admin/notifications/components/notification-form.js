/* eslint-disable jsx-a11y/label-has-associated-control */
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import React, { useState, useEffect, useContext } from 'react';
import router from 'next/router';
import Switch from 'react-switch';
import { Button, DateTimePicker } from '../../../partials';
import {
  addNotification,
  editNotification,
  getHighPriorityNotification,
} from '../../../../shared/redux-saga/admin/actions';
import { formatDate } from '../../../../shared/core/utils';
import ArrowIcon from '../../../../public/images/ic_arrow_down.svg';
import IconCheck from '../../../../public/images/ic_check.svg';
import IconUncheck from '../../../../public/images/ic_uncheck.svg';
import { AppContext } from '../../../../pages/_app';

export const NotificationForm = React.memo(
  ({ editMode, value, onChangeValue, onEditing }) => {
    const [isSubmit, setIsSubmit] = useState(false);
    const [isDisableAllFields, setIsDisableAllFields] = useState(false);
    const [highPriorityNoti, setHighPriorityNoti] = useState(null);
    const { setLoading } = useContext(AppContext);

    const dispatch = useDispatch();
    const { register, watch, control, handleSubmit, formState, reset } =
      useForm({
        mode: 'onChange',
      });
    const watchAllFields = watch();

    const checkHighPriority = () => {
      dispatch(
        getHighPriorityNotification(
          res => {
            setLoading(false);
            setHighPriorityNoti(res);
          },
          () => {
            setLoading(false);
          }
        )
      );
    };

    useEffect(() => {
      onChangeValue(watchAllFields);
    }, [watchAllFields]);

    useEffect(() => {
      if (editMode && value) {
        reset(value);
      }
    }, [value]);

    useEffect(() => {
      if (value?.id === highPriorityNoti?.id) {
        setHighPriorityNoti(null);
      }
    }, [value, highPriorityNoti]);

    useEffect(() => {
      setLoading(true);
      checkHighPriority();
      if (editMode) {
        setIsDisableAllFields(true);
      }
    }, []);

    const onSubmit = data => {
      const temp = data;
      setIsSubmit(true);
      if (temp.start_date)
        temp.start_date = formatDate(new Date(data.start_date), 'yyyy-MM-dd');
      if (temp.end_date)
        temp.end_date = formatDate(new Date(data.end_date), 'yyyy-MM-dd');
      temp.setting = temp.setting ? 1 : 0;
      if (!editMode) {
        if (highPriorityNoti) temp.high_priority = 0;
        dispatch(
          addNotification(
            temp,
            () => {
              router.push('/admin/settings/notifications');
            },
            () => {
              setIsSubmit(false);
            }
          )
        );
      } else {
        dispatch(
          editNotification(
            { id: value.id, data: { ...temp } },
            () => {
              router.push('/admin/settings/notifications');
            },
            () => {
              setIsSubmit(false);
            }
          )
        );
      }
    };

    const toggleEdit = val => {
      if (editMode) {
        setIsDisableAllFields(val);
        onEditing(!val);
      }
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4 pb-8 relative">
          <div
            className={`w-full lg:w-3/12 pb-10 relative ${
              isDisableAllFields || editMode
                ? 'opacity-50 pointer-events-none'
                : 'opacity-100'
            }`}
          >
            <label htmlFor="notification-type text-lg font-medium">
              Notification Type
            </label>
            <div
              id="notification-type"
              className="relative mt-2 border border-gray1 w-full flex-1 h-14 px-5 shadow-md focus:outline-none"
            >
              <Controller
                name="type"
                rules={{ required: true }}
                control={control}
                render={() => (
                  <select
                    className={`w-full h-full cursor-pointer ${
                      editMode ? 'pointer-events-none' : ''
                    }`}
                    required
                    {...register('type')}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select Type
                    </option>
                    <option value="Banner">Banner</option>
                    <option value="Popup">Popup</option>
                  </select>
                )}
              />
              <ArrowIcon className="absolute right-7 top-5" />
            </div>
          </div>
          {watchAllFields?.type ? (
            <>
              <div
                className={`w-full ${
                  !isDisableAllFields
                    ? 'opacity-100'
                    : 'opacity-50 pointer-events-none'
                }`}
              >
                {watchAllFields.type === 'Banner' ? (
                  <>
                    <div
                      className={`w-full lg:w-5/12 pb-10 relative ${
                        !!highPriorityNoti && !isDisableAllFields
                          ? 'opacity-50 pointer-events-none'
                          : 'opacity-100'
                      }`}
                    >
                      <label htmlFor="priority">
                        High Priority? Should this show IN FRONT OF all other
                        banners?
                      </label>
                      <Controller
                        name="high_priority"
                        control={control}
                        render={({ field: { onChange } }) => (
                          <div className="flex items-center mt-2">
                            <label className="radio-square relative flex items-center">
                              <input
                                name="high_priority"
                                type="radio"
                                className="text-primary"
                                value="1"
                                checked={!!watchAllFields.high_priority}
                                onChange={e => {
                                  onChange(e);
                                }}
                              />
                              <i>
                                {+watchAllFields.high_priority ? (
                                  <IconCheck />
                                ) : (
                                  <IconUncheck />
                                )}
                              </i>
                              <span className="text-sm text-dark1 pl-2">
                                YES
                              </span>
                            </label>
                            <label className="radio-square relative ml-20 flex items-center">
                              <input
                                name="high_priority"
                                type="radio"
                                className="text-primary"
                                value="0"
                                checked={
                                  +watchAllFields.high_priority === 0 ||
                                  highPriorityNoti
                                }
                                onChange={e => {
                                  onChange(e);
                                }}
                              />
                              <i>
                                {+watchAllFields.high_priority === 0 ||
                                highPriorityNoti ? (
                                  <IconCheck />
                                ) : (
                                  <IconUncheck />
                                )}
                              </i>
                              <span className="text-sm text-dark1 pl-2">
                                NO
                              </span>
                            </label>
                          </div>
                        )}
                      />
                      {!!highPriorityNoti && !isDisableAllFields && (
                        <p className="mt-2 text-primary text-sm">
                          Alert number {highPriorityNoti.id} currently has high
                          priority selected. You must edit and remove the high
                          priority status from Alert number{' '}
                          {highPriorityNoti.id} before adding it here.
                        </p>
                      )}
                    </div>
                    <div className="w-full lg:w-5/12 pb-10 relative">
                      <label>
                        Allow user to dismiss? If YES, a dismiss button will be
                        available.
                      </label>
                      <Controller
                        name="allow_dismiss_btn"
                        rules={{ required: 'Please check this setting' }}
                        control={control}
                        render={({ field: { onChange } }) => (
                          <div className="flex items-center mt-2">
                            <label className="radio-square relative flex items-center">
                              <input
                                name="allow_dismiss_btn"
                                type="radio"
                                className="text-primary"
                                value="1"
                                checked={+!!watchAllFields.allow_dismiss_btn}
                                onChange={e => {
                                  onChange(e);
                                }}
                              />
                              <i>
                                {+watchAllFields.allow_dismiss_btn ? (
                                  <IconCheck />
                                ) : (
                                  <IconUncheck />
                                )}
                              </i>
                              <span className="text-sm text-dark1 pl-2">
                                YES
                              </span>
                            </label>
                            <label className="radio-square relative ml-20 flex items-center">
                              <input
                                name="allow_dismiss_btn"
                                type="radio"
                                className="text-primary"
                                value="0"
                                checked={
                                  +watchAllFields.allow_dismiss_btn === 0
                                }
                                onChange={e => {
                                  onChange(e);
                                }}
                              />
                              <i>
                                {+watchAllFields.allow_dismiss_btn === 0 ? (
                                  <IconCheck />
                                ) : (
                                  <IconUncheck />
                                )}
                              </i>
                              <span className="text-sm text-dark1 pl-2">
                                NO
                              </span>
                            </label>
                          </div>
                        )}
                      />
                      {formState.errors?.allow_dismiss_btn && (
                        <p className="mt-2 text-primary text-sm">
                          {formState.errors.allow_dismiss_btn?.message}
                        </p>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="w-full lg:w-5/12 pb-10 relative">
                    <label>
                      Show on every login? If NO, each user will only see this
                      ONCE.
                    </label>
                    <Controller
                      name="show_login"
                      rules={{ required: 'Please check this setting' }}
                      control={control}
                      render={({ field: { onChange } }) => (
                        <div className="flex items-center mt-2">
                          <label className="radio-square relative flex items-center">
                            <input
                              name="show_login"
                              type="radio"
                              className="text-primary"
                              value="1"
                              checked={watchAllFields.show_login}
                              onChange={e => {
                                onChange(e);
                              }}
                            />
                            <i>
                              {+watchAllFields.show_login ? (
                                <IconCheck />
                              ) : (
                                <IconUncheck />
                              )}
                            </i>
                            <span className="text-sm text-dark1 pl-2">YES</span>
                          </label>
                          <label className="radio-square relative ml-20 flex items-center">
                            <input
                              name="show_login"
                              type="radio"
                              className="text-primary"
                              value="0"
                              checked={+watchAllFields.show_login === 0}
                              onChange={e => {
                                onChange(e);
                              }}
                            />
                            <i>
                              {+watchAllFields.show_login === 0 ? (
                                <IconCheck />
                              ) : (
                                <IconUncheck />
                              )}
                            </i>
                            <span className="text-sm text-dark1 pl-2">NO</span>
                          </label>
                        </div>
                      )}
                    />
                    {formState.errors?.show_login && (
                      <p className="mt-2 text-primary text-sm">
                        {formState.errors.show_login?.message}
                      </p>
                    )}
                  </div>
                )}
                <div className="w-full lg:w-9/12 pb-10 relative">
                  <label htmlFor="title">
                    {watchAllFields.type === 'Banner'
                      ? 'Banner Title Text'
                      : 'Popup Header Text'}
                  </label>
                  <input
                    id="title"
                    type="text"
                    className="mt-2 border border-gray1 w-full flex-1 h-14 px-5 shadow-md focus:outline-none"
                    placeholder={
                      watchAllFields.type === 'Banner'
                        ? 'Limit 60 characters'
                        : 'Limit 150 characters'
                    }
                    maxLength={watchAllFields.type === 'Banner' ? 60 : 150}
                    {...register('title', {
                      required: 'Title is required',
                    })}
                  />
                  {formState.errors?.title && (
                    <p className="mt-2 text-primary text-sm">
                      {formState.errors.title?.message}
                    </p>
                  )}
                </div>
                <div className="w-full lg:w-9/12 pb-10 relative">
                  <label htmlFor="content">
                    {watchAllFields.type === 'Banner'
                      ? 'Banner Body Text'
                      : 'Popup Body Text'}
                  </label>
                  <textarea
                    id="content"
                    type="text"
                    rows="5"
                    className="mt-2 border border-gray1 w-full flex-1 p-5 shadow-md focus:outline-none"
                    placeholder="Limit 200 characters"
                    maxLength="200"
                    {...register('body', {
                      required: 'Content is required',
                    })}
                  />
                  {formState.errors?.body && (
                    <p className="mt-2 text-primary text-sm">
                      {formState.errors.body?.message}
                    </p>
                  )}
                </div>
                <div className="w-full lg:w-8/12 flex-grow relative pb-10">
                  <label htmlFor="title">Have call to action button? </label>
                  <Controller
                    name="have_action"
                    rules={{ required: 'Please check this setting' }}
                    control={control}
                    render={({ field: { onChange } }) => (
                      <div className="flex items-center mt-2">
                        <label className="radio-square relative flex items-center">
                          <input
                            name="have_action"
                            type="radio"
                            className="text-primary"
                            value="1"
                            checked={!!watchAllFields.have_action}
                            onChange={e => {
                              onChange(e);
                            }}
                          />
                          <i>
                            {+watchAllFields.have_action ? (
                              <IconCheck />
                            ) : (
                              <IconUncheck />
                            )}
                          </i>
                          <span className="text-sm text-dark1 pl-2">YES</span>
                        </label>
                        <label className="radio-square relative ml-20 flex items-center">
                          <input
                            name="have_action"
                            type="radio"
                            className="text-primary"
                            value="0"
                            checked={+watchAllFields.have_action === 0}
                            onChange={e => {
                              onChange(e);
                            }}
                          />
                          <i>
                            {+watchAllFields.have_action === 0 ? (
                              <IconCheck />
                            ) : (
                              <IconUncheck />
                            )}
                          </i>
                          <span className="text-sm text-dark1 pl-2">NO</span>
                        </label>
                      </div>
                    )}
                  />
                  {formState.errors?.have_action && (
                    <p className="mt-2 text-primary text-sm">
                      {formState.errors.have_action?.message}
                    </p>
                  )}
                </div>
                <>
                  {+watchAllFields.have_action === 1 && (
                    <div className="w-full lg:w-8/12">
                      <div className="flex items-center w-full mt-3">
                        <div className="relative pb-10 max-w-xl flex-grow">
                          <div className="w-full">
                            <input
                              type="text"
                              className="mt-2 border border-gray1 w-full flex-1 h-14 px-5 shadow-md focus:outline-none"
                              placeholder="Link for CTA button"
                              {...register('action_link', {
                                required: 'Action link is required',
                              })}
                            />
                          </div>
                          {formState.errors?.action_link && (
                            <p className="mt-2 text-primary text-sm">
                              {formState.errors.action_link?.message}
                            </p>
                          )}
                        </div>
                        {watchAllFields.type === 'Popup' && (
                          <div className="ml-4 relative pb-10">
                            <div className="relative">
                              <label className="absolute left-0 -top-10">
                                Button Text
                              </label>
                              <input
                                type="text"
                                className="mt-2 border border-gray1 w-full flex-1 h-14 px-5 shadow-md focus:outline-none"
                                placeholder="Button text"
                                {...register('btn_text', {
                                  required: 'Button text is required',
                                })}
                              />
                            </div>
                            {formState.errors?.btn_text && (
                              <p className="mt-2 text-primary text-sm">
                                {formState.errors.btn_text?.message}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </>
                <div className="w-full lg:w-6/12 pb-4 flex gap-4">
                  <div className="w-1/2">
                    <label htmlFor="title">
                      {`Date for ${watchAllFields.type} to show live`}
                    </label>
                    <Controller
                      name="start_date"
                      control={control}
                      defaultValue=""
                      render={({
                        field: { value: valueD, onChange: onChangeDate },
                      }) => (
                        <DateTimePicker
                          value={valueD}
                          className="date-time-perks"
                          onChange={onChangeDate}
                          placeholder="Select..."
                        />
                      )}
                    />
                  </div>
                  <div className="w-1/2">
                    <label htmlFor="title">
                      {`Set Expiration for ${watchAllFields.type} to HIDE`}
                    </label>
                    <Controller
                      name="end_date"
                      control={control}
                      defaultValue=""
                      render={({
                        field: { value: valueD, onChange: onChangeDate },
                      }) => (
                        <DateTimePicker
                          value={valueD}
                          className="date-time-perks"
                          onChange={onChangeDate}
                          placeholder="Select..."
                        />
                      )}
                    />
                  </div>
                </div>
                <p className="py-4 w-full lg:w-8/12">
                  Should this notification be ON now. Please note if the start
                  time and end time fields are complete, then notifications in
                  ON status will only show visibly if they have passed the start
                  time and not yet passed the end time above.
                </p>
                <div className="pb-4 flex items-center gap-4">
                  <label
                    htmlFor="status"
                    className={`${watchAllFields.setting ? 'opacity-30' : ''}`}
                  >
                    OFF
                  </label>
                  <Controller
                    name="setting"
                    control={control}
                    defaultValue={false}
                    render={({
                      field: { value: valueS, onChange: onChangeS },
                    }) => (
                      <Switch
                        id="status"
                        checked={!!valueS}
                        onChange={onChangeS}
                        checkedIcon={null}
                        uncheckedIcon={null}
                        offColor="#bbb"
                        onColor="#ff474e"
                        height={18}
                        width={40}
                      />
                    )}
                  />
                  <label
                    htmlFor="status"
                    className={`${!watchAllFields.setting ? 'opacity-30' : ''}`}
                  >
                    ON
                  </label>
                </div>
              </div>
              <div className="flex gap-4">
                {!editMode && (
                  <>
                    <Button
                      primary
                      type="submit"
                      disabled={isSubmit}
                      isLoading={isSubmit}
                      sizeSpinner={20}
                    >
                      Save
                    </Button>
                    <Button
                      primaryOutline
                      onClick={() =>
                        router.push('/admin/settings/notifications')
                      }
                    >
                      Cancel
                    </Button>
                  </>
                )}
                {editMode && isDisableAllFields && (
                  <>
                    <Button
                      primary
                      type="button"
                      onClick={() => toggleEdit(false)}
                    >
                      Edit
                    </Button>
                  </>
                )}
                {editMode && !isDisableAllFields && (
                  <>
                    <Button
                      primary
                      type="submit"
                      disabled={isSubmit}
                      isLoading={isSubmit}
                      sizeSpinner={20}
                    >
                      Save
                    </Button>
                    <Button primaryOutline onClick={() => toggleEdit(true)}>
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </form>
    );
  }
);
