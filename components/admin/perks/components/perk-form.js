import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Switch from 'react-switch';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns';
import { Button } from '../../../partials';
import IconX from '../../../../public/images/ic_x.svg';
import {
  submitPerk,
  editPerk,
} from '../../../../shared/redux-saga/admin/actions';
import { getDateObject } from '../../../../shared/core/utils';

const perkSchema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required')
    .max(70, 'Maximum characters of title is 70'),
  content: yup.string().required('Content is required'),
  action_link: yup.string().required('Action Link is required'),
  image: yup.object().typeError('Image is required'),
});

export const PerkForm = React.memo(
  ({ editMode, value, onChange, onEditing }) => {
    const [isSubmit, setIsSubmit] = useState(false);
    const [isDisableAllFields, setIsDisableAllFields] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const dispatch = useDispatch();
    const router = useHistory();

    const handleStartDateChange = date => {
      setStartDate(date);
    };

    const handleStartTimeChange = date => {
      setStartTime(date);
    };

    const handleEndDateChange = date => {
      setEndDate(date);
    };

    const handleEndTimeChange = date => {
      setEndTime(date);
    };

    const {
      register,
      setValue,
      watch,
      control,
      handleSubmit,
      formState,
      reset,
    } = useForm({
      resolver: yupResolver(perkSchema),
    });
    const watchAllFields = watch();

    useEffect(() => {
      onChange(watchAllFields);
    }, [watchAllFields]);

    useEffect(() => {
      if (editMode && value) {
        reset(value);
      }

      if (value && value.time_begin) {
        setStartDate(getDateObject(value.time_begin));
        setStartTime(getDateObject(value.time_begin));
      }

      if (value && value.time_end) {
        setEndDate(getDateObject(value.time_end));
        setEndTime(getDateObject(value.time_end));
      }
    }, [value]);

    useEffect(() => {
      if (editMode) {
        setIsDisableAllFields(true);
      }
    }, []);

    const onSubmit = data => {
      const temp = data;

      let startDateStr = '';
      let startTimeStr = '';
      let endDateStr = '';
      let endTimeStr = '';

      if (startDate) startDateStr = format(startDate, 'yyyy-MM-dd');
      if (startTime) startTimeStr = format(startTime, 'HH:mm:ss');
      if (endDate) endDateStr = format(endDate, 'yyyy-MM-dd');
      if (endTime) endTimeStr = format(endTime, 'HH:mm:ss');

      const start = new Date(`${startDateStr} ${startTimeStr}`).getTime();
      const end = new Date(`${endDateStr} ${endTimeStr}`).getTime();
      if (start >= end) return;

      setIsSubmit(true);

      const params = {
        ...temp,
        start_date: startDateStr,
        start_time: startTimeStr,
        end_date: endDateStr,
        end_time: endTimeStr,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };

      if (!editMode) {
        dispatch(
          submitPerk(
            params,
            () => {
              router.push('/admin/perks');
            },
            () => {
              setIsSubmit(false);
            }
          )
        );
      } else {
        dispatch(
          editPerk(
            { id: value.id, ...params },
            () => {
              router.push('/admin/perks');
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

    const removeFile = () => {
      setValue('image', null, { shouldValidate: true });
    };

    const handleUpload = e => {
      if (e.target.files) {
        const file = Array.from(e.target.files)[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          setValue(
            'image',
            {
              url: reader.result,
              file,
              name: file.name,
            },
            { shouldValidate: true }
          );
        };
        reader.readAsDataURL(file);
      }
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="pb-8 relative">
          <div className="max-w-xl pb-6 relative">
            <label htmlFor="title">Title of Perk (Limit 70 characters)*</label>
            <input
              id="title"
              type="text"
              className="mt-2 border border-gray1 w-full flex-1 h-14 px-5 shadow-md focus:outline-none"
              {...register('title')}
              disabled={isDisableAllFields}
            />
            {formState.errors?.title && (
              <p className="absolute bottom-1 left-5 text-primary text-xs">
                {formState.errors.title?.message}
              </p>
            )}
          </div>
          <div className="max-w-xl pb-6 relative">
            <label htmlFor="content">Content to describe perk*</label>
            <textarea
              id="content"
              type="text"
              rows="5"
              className="mt-2 border border-gray1 w-full flex-1 p-5 shadow-md focus:outline-none"
              {...register('content')}
              disabled={isDisableAllFields}
            />
            {formState.errors?.content && (
              <p className="absolute bottom-1 left-5 text-primary text-xs">
                {formState.errors.content?.message}
              </p>
            )}
          </div>
          <div className="max-w-200 flex justify-between items-end">
            <div className="max-w-xl flex-grow relative pb-6">
              <label htmlFor="title">Call to action link*</label>
              <input
                id="title"
                type="text"
                className="mt-2 border border-gray1 w-full flex-1 h-14 px-5 shadow-md focus:outline-none"
                {...register('action_link')}
                disabled={isDisableAllFields}
              />
              {formState.errors?.action_link && (
                <p className="absolute bottom-1 left-5 text-primary text-xs">
                  {formState.errors.action_link?.message}
                </p>
              )}
            </div>
            <div className="relative pb-2 mb-6">
              <label
                htmlFor="perkImage"
                className={`${
                  isDisableAllFields && 'opacity-40 cursor-not-allowed'
                } flex ml-3 px-4 py-2 justify-center items-center cursor-pointer text-lg text-white rounded-full bg-primary hover:opacity-40 focus:outline-none shadow-md`}
              >
                Upload Image
              </label>
              {watchAllFields.image?.name && (
                <div className="flex items-center text-primary absolute -bottom-5 left-4 truncate w-60">
                  {!isDisableAllFields && (
                    <button
                      className="pr-1 w-5 focus:outline-none"
                      onClick={() => removeFile()}
                      type="button"
                    >
                      <IconX className="text-primary" />
                    </button>
                  )}
                  <span className="text-sm text-primary">
                    {watchAllFields.image?.name}
                  </span>
                </div>
              )}
              {formState.errors?.image && (
                <p className="absolute -bottom-4 left-4 text-primary text-xs">
                  {formState.errors.image?.message}
                </p>
              )}
            </div>
            <input
              type="file"
              id="perkImage"
              onClick={e => {
                e.target.value = null;
              }}
              onChange={handleUpload}
              hidden
              accept="image/*"
              disabled={isDisableAllFields}
            />
            <input value="" {...register('image')} hidden />
          </div>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ marginRight: '20px' }}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  label="Start Date"
                  value={startDate}
                  onChange={handleStartDateChange}
                  required
                />
              </div>
              <div>
                <KeyboardTimePicker
                  margin="normal"
                  label="Start Time"
                  value={startTime}
                  onChange={handleStartTimeChange}
                  required
                />
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <div style={{ marginRight: '20px' }}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  label="End Date"
                  value={endDate}
                  onChange={handleEndDateChange}
                  required
                />
              </div>
              <div>
                <KeyboardTimePicker
                  margin="normal"
                  label="End Time"
                  value={endTime}
                  onChange={handleEndTimeChange}
                  required
                />
              </div>
            </div>
          </MuiPickersUtilsProvider>

          <p className="py-4 max-w-200">
            Choose notification status. (Note: If the start time and the end{' '}
            time fields are complete and notifications is set to "ON", members{' '}
            will see the notification during the selected time period above)
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
              render={({ field: { value: valueS, onChange: onChangeS } }) => (
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
                  disabled={isDisableAllFields}
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
                className="px-5 py-2"
              >
                Save
              </Button>
              <Button
                primaryOutline
                onClick={() => router.push('/admin/perks')}
                className="px-5 py-2"
              >
                Cancel
              </Button>
            </>
          )}
          {editMode && isDisableAllFields && (
            <>
              <Button primary type="button" onClick={() => toggleEdit(false)}>
                Edit
              </Button>
            </>
          )}
          {editMode && !isDisableAllFields && (
            <>
              <Button
                primary
                disabled={isSubmit}
                isLoading={isSubmit}
                type="submit"
                sizeSpinner={20}
              >
                Commit Edits
              </Button>
              <Button primaryOutline onClick={() => toggleEdit(true)}>
                Cancel
              </Button>
            </>
          )}
        </div>
      </form>
    );
  }
);
