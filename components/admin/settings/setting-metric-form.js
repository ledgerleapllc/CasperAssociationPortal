/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { LoadingButton, Tooltips } from '../../partials';
import {
  NUMBER_PATTERN,
  NEGATIVE_NUMBER_PATTERN,
} from '../../../helpers/form-validation';
import { updateWarningMetrics } from '../../../shared/redux-saga/admin/actions';

const SettingMetricForm = ({
  metrics,
  title,
  type,
  doReloadData,
  warningTooltip,
  probationTooltip,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditWarningLevel, setIsEditWarningLevel] = useState(false);
  const [isEditProbationStart, setIsEditProbationStart] = useState(false);
  const [isOverride, setIsOverride] = useState(false);
  const [watchCalculate, setWatchCalculate] = useState(null);
  const [watchCorrect, setWatchCorrect] = useState(null);
  const [watchSystemCheck, setWatchSystemCheck] = useState(null);

  const dispatch = useDispatch();
  const { formState, register, handleSubmit, setValue, control, setFocus } =
    useForm({
      mode: 'onChange',
    });

  const setData = data => {
    if (data?.updated_at) {
      setIsEditWarningLevel(false);
      setIsEditProbationStart(false);
      setValue('warning_level', +data?.warning_level, {
        shouldValidate: true,
      });
      setValue('probation_start', +data?.probation_start, {
        shouldValidate: true,
      });
      setValue('frame_calculate_unit', data?.frame_calculate_unit, {
        shouldValidate: true,
      });
      setWatchCalculate(data?.frame_calculate_unit);
      setValue('given_to_correct_unit', data?.given_to_correct_unit, {
        shouldValidate: true,
      });
      setWatchCorrect(data?.given_to_correct_unit);
      setValue('system_check_unit', data?.system_check_unit, {
        shouldValidate: true,
      });
      setWatchSystemCheck(data?.system_check_unit);
    } else {
      setValue('warning_level', '');
      setValue('probation_start', '');
      setValue('frame_calculate_unit', '');
      setValue('given_to_correct_unit', '');
      setValue('system_check_unit', '');
      setValue('frame_calculate_value', '');
      setValue('given_to_correct_value', '');
      setValue('system_check_value', '');
      setIsEditWarningLevel(true);
      setIsEditProbationStart(true);
    }
  };

  useEffect(() => {
    setData(metrics);
  }, [metrics]);

  useEffect(() => {
    if (watchCalculate && metrics?.updated_at) {
      setValue('frame_calculate_value', metrics?.frame_calculate_value, {
        shouldValidate: true,
      });
    }
  }, [watchCalculate]);

  useEffect(() => {
    if (watchCorrect && metrics?.updated_at) {
      setValue('given_to_correct_value', +metrics?.given_to_correct_value, {
        shouldValidate: true,
      });
    }
  }, [watchCorrect]);

  useEffect(() => {
    if (watchSystemCheck && metrics?.updated_at) {
      setValue('system_check_value', +metrics?.given_to_correct_value, {
        shouldValidate: true,
      });
    }
  }, [watchSystemCheck]);

  const onSubmit = data => {
    setIsSubmitting(true);
    dispatch(
      updateWarningMetrics(
        { type, data },
        () => {
          doReloadData();
          setIsOverride(false);
          setIsSubmitting(false);
        },
        () => {
          setIsSubmitting(false);
        }
      )
    );
  };

  const doCancel = () => {
    setIsOverride(pre => {
      if (pre) {
        setData(metrics);
      }
      return !pre;
    });
  };

  return (
    <div className="mb-10">
      <div className="flex mb-3">
        <div className="flex flex-row mr-2">
          <span>{title}</span>
        </div>
        <p className="text-primary underline cursor-pointer" onClick={doCancel}>
          {isOverride ? 'Cancel' : 'Edit'}
        </p>
      </div>
      <form
        className={`w-full ${
          isOverride ? 'opacity-100' : 'opacity-50 pointer-events-none'
        }`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full lg:w-7/12 mb-10 flex flex-row justify-between">
          <div className="w-full lg:w-6/12">
            <label className="flex gap-2 text-gray font-thin mb-2">
              Set Warning Level
              <Tooltips placement="top" title={warningTooltip} arrow>
                <img
                  width="10px"
                  height="10px"
                  src="/images/ic_feather_info.svg"
                  alt="Info"
                />
              </Tooltips>
            </label>
            <div className="flex-1 flex-col">
              {isEditWarningLevel ? (
                <>
                  <input
                    type="text"
                    className="w-full mt-2 lg:mt-0 h-14 px-7 shadow-md focus:outline-none border border-gray1"
                    name="warning_level"
                    {...register('warning_level', {
                      required: 'Warning Level is required',
                      pattern: {
                        message: 'Warning Level is invalid',
                        value:
                          type === 'block-height'
                            ? NEGATIVE_NUMBER_PATTERN
                            : NUMBER_PATTERN,
                      },
                      validate: value => {
                        if (type === 'uptime' && (value < 0 || value > 100)) {
                          return 'Warning Level is invalid';
                        }
                        if (type === 'block-height' && value > 10) {
                          return 'Warning Level is invalid';
                        }
                        return null;
                      },
                    })}
                  />
                  {formState.errors?.warning_level && (
                    <p className="mt-2 text-primary text-sm">
                      {formState.errors.warning_level?.message}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <div
                    className="flex items-center w-full mt-2 lg:mt-0 h-14 px-7 shadow-md focus:outline-none border border-gray1"
                    onClick={() => {
                      setIsEditWarningLevel(true);
                      setTimeout(() => {
                        setFocus('warning_level');
                      });
                    }}
                  >
                    {type === 'uptime' && `${metrics?.warning_level} %`}
                    {type === 'block-height' &&
                      (![1, 0, -1].includes(+metrics?.warning_level)
                        ? `${metrics?.warning_level} Blocks`
                        : `${metrics?.warning_level} Block`)}
                    {type === 'update-responsiveness' &&
                      (![1, 0, -1].includes(+metrics?.warning_level)
                        ? `Behind ${metrics?.warning_level} Update`
                        : `Behind ${metrics?.warning_level} Updates`)}
                  </div>
                  <input
                    name="warning_level"
                    value={+metrics?.warning_level || ''}
                    hidden
                    onChange={() => {}}
                  />
                </>
              )}
            </div>
          </div>
          <div className="w-full lg:w-6/12 ml-10">
            <label className="flex gap-2 text-gray font-thin mb-2">
              Set Probation Start
              <Tooltips placement="top" title={probationTooltip} arrow>
                <img
                  width="10px"
                  height="10px"
                  src="/images/ic_feather_info.svg"
                  alt="Info"
                />
              </Tooltips>
            </label>
            <div className="flex-1 flex-col">
              {isEditProbationStart ? (
                <>
                  <input
                    type="text"
                    className="w-full mt-2 lg:mt-0 h-14 px-7 shadow-md focus:outline-none border border-gray1"
                    name="probation_start"
                    {...register('probation_start', {
                      required: 'Probation start is required',
                      pattern: {
                        message: 'Probation start is invalid',
                        value:
                          type === 'block-height'
                            ? NEGATIVE_NUMBER_PATTERN
                            : NUMBER_PATTERN,
                      },
                      validate: value => {
                        if (type === 'uptime' && (value < 0 || value > 100)) {
                          return 'Probation start is invalid';
                        }
                        if (type === 'block-height' && value > 10) {
                          return 'Probation start is invalid';
                        }
                        return null;
                      },
                    })}
                  />
                  {formState.errors?.probation_start && (
                    <p className="mt-2 text-primary text-sm">
                      {formState.errors.probation_start?.message}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <div
                    className="flex items-center w-full mt-2 lg:mt-0 h-14 px-7 shadow-md focus:outline-none border border-gray1"
                    onClick={() => {
                      setIsEditProbationStart(true);
                      setTimeout(() => {
                        setFocus('probation_start');
                      });
                    }}
                  >
                    {type === 'uptime' && `${metrics?.probation_start} %`}
                    {type === 'block-height' &&
                      (![1, 0, -1].includes(+metrics?.probation_start)
                        ? `${metrics?.probation_start} Blocks`
                        : `${metrics?.probation_start} Block`)}
                    {type === 'update-responsiveness' &&
                      (![1, 0, -1].includes(+metrics?.probation_start)
                        ? `Behind ${metrics?.probation_start} Update`
                        : `Behind ${metrics?.probation_start} Updates`)}
                  </div>
                  <input
                    name="probation_start"
                    value={+metrics?.probation_start || ''}
                    hidden
                    onChange={() => {}}
                  />
                </>
              )}
            </div>
          </div>
        </div>
        <p className="mb-3">
          How much time should the user be given to correct this?
        </p>
        <div className="w-full lg:w-7/12 mb-10 flex">
          <div className="w-full lg:w-6/12 flex flex-row justify-between">
            <div className="w-full lg:w-6/12 relative flex flex-col mr-10">
              <div className="h-40px border border-gray1 c-select flex items-center relative focus:outline-none shadow-md">
                <Controller
                  name="given_to_correct_unit"
                  rules={{ required: 'Please select this field' }}
                  control={control}
                  render={({ field: { onChange } }) => (
                    <select
                      className="px-5 w-full h-full cursor-pointer"
                      {...register('given_to_correct_unit')}
                      onChange={e => {
                        setWatchCorrect(e.target.value);
                        onChange(e);
                      }}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select Scale
                      </option>
                      <option value="Weeks">Weeks</option>
                      <option value="Days">Days</option>
                      <option value="Hours">Hours</option>
                    </select>
                  )}
                />
              </div>
              {formState.errors?.given_to_correct_unit && (
                <p className="mt-2 text-primary text-sm">
                  {formState.errors.given_to_correct_unit?.message}
                </p>
              )}
            </div>
            <div className="w-full lg:w-6/12 relative flex flex-col">
              <div className="h-40px border border-gray1 c-select flex items-center relative focus:outline-none shadow-md">
                <Controller
                  name="given_to_correct_value"
                  rules={{ required: 'Please select this field' }}
                  control={control}
                  render={({ field: { onChange } }) => (
                    <select
                      className="w-full h-full px-5 cursor-pointer"
                      {...register('given_to_correct_value')}
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
              {formState.errors?.given_to_correct_value && (
                <p className="mt-2 text-primary text-sm">
                  {formState.errors.given_to_correct_value?.message}
                </p>
              )}
            </div>
          </div>
          <div className="w-full lg:w-6/12 ml-10" />
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

export default SettingMetricForm;
