/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm, Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { LoadingButton } from '../../partials';
import { NUMBER_PATTERN } from '../../../helpers/form-validation';
import { updateGlobalSettings } from '../../../shared/redux-saga/admin/actions';

const UptimeForm = ({ isOverride, globalSettings }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [watchCorrect, setWatchCorrect] = useState(null);

  const dispatch = useDispatch();
  const { formState, register, handleSubmit, setValue, control } = useForm({
    mode: 'onChange',
  });

  const setData = data => {
    setValue('uptime_calc_size', data.uptime_calc_size || '');
    setValue('uptime_warning', data.uptime_warning || '');
    setValue('uptime_probation', data.uptime_probation || '');
    setValue('uptime_correction_unit', data.uptime_correction_unit || '');
    setWatchCorrect(data.uptime_correction_unit || '');
  };

  useEffect(() => {
    setData(globalSettings);
  }, [globalSettings]);

  useEffect(() => {
    if (watchCorrect) {
      setValue(
        'uptime_correction_value',
        globalSettings.uptime_correction_value || ''
      );
    }
  }, [watchCorrect]);

  const onSubmit = data => {
    setIsSubmitting(true);
    dispatch(
      updateGlobalSettings(
        data,
        () => {
          setIsSubmitting(false);
        },
        () => {
          setIsSubmitting(false);
        }
      )
    );
  };

  return (
    <div className="mb-10">
      <div className="mb-3">
        <span>Uptime Rules</span>
      </div>
      <form
        className={`w-full ${
          isOverride ? 'opacity-100' : 'opacity-50 pointer-events-none'
        }`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-5 w-full lg:w-7/12 flex flex-col lg:flex-row gap-5">
          <div className="w-full lg:w-6/12">
            <label className="block text-gray font-thin mb-2">
              How many ERAs to include in calculation
            </label>
            <div className="w-full">
              <input
                type="text"
                className="w-full h-12 px-7 shadow-md focus:outline-none border border-gray1"
                name="uptime_calc_size"
                {...register('uptime_calc_size', {
                  required: 'This value is required',
                  pattern: {
                    message: 'This value is invalid',
                    value: NUMBER_PATTERN,
                  },
                  validate: value => {
                    if (value < 0) {
                      return 'This value is invalid';
                    }
                    return null;
                  },
                })}
              />
              {formState.errors?.uptime_calc_size && (
                <p className="mt-2 text-primary text-sm">
                  {formState.errors.uptime_calc_size?.message}
                </p>
              )}
            </div>
          </div>
          <div className="w-full lg:w-6/12" />
        </div>
        <div className="mb-5 w-full lg:w-7/12 flex flex-col lg:flex-row gap-5">
          <div className="w-full lg:w-6/12">
            <label className="block text-gray font-thin mb-2">
              Set Warning Level
            </label>
            <div className="w-full">
              <input
                type="text"
                className="w-full h-12 px-7 shadow-md focus:outline-none border border-gray1"
                name="uptime_warning"
                {...register('uptime_warning', {
                  required: 'This value is required',
                  pattern: {
                    message: 'This value is invalid',
                    value: NUMBER_PATTERN,
                  },
                  validate: value => {
                    if (value < 0) {
                      return 'This value is invalid';
                    }
                    return null;
                  },
                })}
              />
              {formState.errors?.uptime_warning && (
                <p className="mt-2 text-primary text-sm">
                  {formState.errors.uptime_warning?.message}
                </p>
              )}
            </div>
          </div>
          <div className="w-full lg:w-6/12">
            <label className="block text-gray font-thin mb-2">
              Set Probation Level
            </label>
            <div className="w-full">
              <input
                type="text"
                className="w-full h-12 px-7 shadow-md focus:outline-none border border-gray1"
                name="uptime_probation"
                {...register('uptime_probation', {
                  required: 'This value is required',
                  pattern: {
                    message: 'This value is invalid',
                    value: NUMBER_PATTERN,
                  },
                  validate: value => {
                    if (value < 0) {
                      return 'This value is invalid';
                    }
                    return null;
                  },
                })}
              />
              {formState.errors?.uptime_probation && (
                <p className="mt-2 text-primary text-sm">
                  {formState.errors.uptime_probation?.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <p className="text-gray font-thin mb-3">
          How much time should the user be given to correct this?
        </p>
        <div className="w-full lg:w-7/12 flex gap-5">
          <div className="w-full lg:w-6/12 flex gap-5">
            <div className="w-full lg:w-6/12 relative flex flex-col">
              <div className="h-12 border border-gray1 c-select flex items-center relative focus:outline-none shadow-md">
                <Controller
                  name="uptime_correction_unit"
                  rules={{ required: 'Please select this field' }}
                  control={control}
                  render={({ field: { onChange } }) => (
                    <select
                      className="px-5 w-full h-full cursor-pointer"
                      {...register('uptime_correction_unit')}
                      onChange={e => {
                        setWatchCorrect(e.target.value);
                        onChange(e);
                      }}
                      defaultValue=""
                    >
                      <option value="">Select Scale...</option>
                      <option value="Weeks">Weeks</option>
                      <option value="Days">Days</option>
                      <option value="Hours">Hours</option>
                    </select>
                  )}
                />
              </div>
              {formState.errors?.uptime_correction_unit && (
                <p className="mt-2 text-primary text-sm">
                  {formState.errors.uptime_correction_unit?.message}
                </p>
              )}
            </div>
            <div className="w-full lg:w-6/12 relative flex flex-col">
              <div className="h-12 border border-gray1 c-select flex items-center relative focus:outline-none shadow-md">
                <Controller
                  name="uptime_correction_value"
                  rules={{ required: 'Please select this field' }}
                  control={control}
                  render={({ field: { onChange } }) => (
                    <select
                      className="w-full h-full px-5 cursor-pointer"
                      {...register('uptime_correction_value')}
                      onChange={e => {
                        onChange(e);
                      }}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select...
                      </option>
                      {watchCorrect === 'Days' &&
                        new Array(30).fill(1).map((x, ind) => (
                          <option key={ind} value={ind + 1}>
                            {ind + 1}
                          </option>
                        ))}
                      {watchCorrect === 'Hours' &&
                        new Array(24).fill(1).map((x, ind) => (
                          <option key={ind} value={ind + 1}>
                            {ind + 1}
                          </option>
                        ))}
                      {watchCorrect === 'Weeks' &&
                        new Array(30).fill(1).map((x, ind) => (
                          <option key={ind} value={ind + 1}>
                            {ind + 1}
                          </option>
                        ))}
                    </select>
                  )}
                />
              </div>
              {formState.errors?.uptime_correction_value && (
                <p className="mt-2 text-primary text-sm">
                  {formState.errors.uptime_correction_value?.message}
                </p>
              )}
            </div>
          </div>
          <div className="w-full lg:w-6/12" />
        </div>
        <LoadingButton
          type="submit"
          isDisabled={isSubmitting}
          isLoading={isSubmitting}
          title="Save Changes"
          className="text-lg text-white w-full mt-10 lg:w-auto px-7 h-12 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
        />
      </form>
    </div>
  );
};

export default UptimeForm;
