import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import router from 'next/router';
import Switch from 'react-switch';
import { Button, DateTimePicker } from '../../../partials';
import IconX from '../../../../public/images/ic_x.svg';
import {
  submitPerk,
  editPerk,
} from '../../../../shared/redux-saga/admin/actions';
import { formatDate } from '../../../../shared/core/utils';

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
    const dispatch = useDispatch();
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
    }, [value]);

    useEffect(() => {
      if (editMode) {
        setIsDisableAllFields(true);
      }
    }, []);

    const onSubmit = data => {
      const temp = data;
      setIsSubmit(true);
      temp.start_date = data.start_date
        ? formatDate(new Date(data.start_date), 'yyyy-MM-dd')
        : '';
      temp.end_date = data.end_date
        ? formatDate(new Date(data.end_date), 'yyyy-MM-dd')
        : '';
      if (!editMode) {
        dispatch(
          submitPerk(
            temp,
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
            { id: value.id, ...temp },
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
                } flex justify-center items-center cursor-pointer h-16 lg:h-11 text-lg text-white lg:w-48 rounded-full bg-primary hover:opacity-40 focus:outline-none shadow-md`}
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
            <input value={null} {...register('image')} hidden />
          </div>
          <div className="max-w-xl pb-4 flex gap-4">
            <div className="w-1/2">
              <label htmlFor="title">Start Date</label>
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
                    disabled={isDisableAllFields}
                  />
                )}
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="title">End Date</label>
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
                    disabled={isDisableAllFields}
                  />
                )}
              />
            </div>
          </div>
          <p className="py-4 max-w-200">
            Should this notification be ON now. Please note if the start time
            and end time fields are complete, then notifications in ON status
            will only show visibly if they have passed the start time and not
            yet passed the end time above.
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
                  checked={valueS}
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
              >
                Save
              </Button>
              <Button
                primaryOutline
                onClick={() => router.push('/admin/perks')}
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
