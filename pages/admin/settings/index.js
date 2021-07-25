/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/label-has-associated-control */
import Link from 'next/link';
import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';

import { LoadingScreen } from '../../../components/hoc/loading-screen';
import LayoutDashboard from '../../../components/layouts/layout-dashboard';
import { Card, LoadingButton } from '../../../components/partials';
import {
  NUMBER_PATTERN,
  NEGATIVE_NUMBER_PATTERN,
} from '../../../helpers/form-validation';
import {
  getWaringMetrics,
  updateWarningMetrics,
} from '../../../shared/redux-saga/admin/actions';
import { AppContext } from '../../_app';

const SettingForm = ({ metrics, title, type, doReloadData }) => {
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

  useEffect(() => {
    console.log('metrics', metrics);
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

  const setData = data => {
    // Only set default value for admin submitted metrics before
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
      setValue('warning_level', null);
      setValue('probation_start', null);
      setValue('frame_calculate_unit', null);
      setValue('given_to_correct_unit', null);
      setValue('system_check_unit', null);
      setValue('frame_calculate_value', null);
      setValue('given_to_correct_value', null);
      setValue('system_check_value', null);
      setIsEditWarningLevel(true);
      setIsEditProbationStart(true);
    }
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
          <img className="pl-3" src="/images/ic_feather_info.svg" alt="Info" />
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
            <label className="text-gray font-thin mb-2">
              Set Warning Level
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
                        return null;
                      },
                    })}
                  />
                  {formState.errors?.warning_level && (
                    <p className="pl-7 mt-2 text-primary">
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
                    value={+metrics?.warning_level}
                    hidden
                  />
                </>
              )}
            </div>
          </div>
          <div className="w-full lg:w-6/12 ml-10">
            <label className="text-gray font-thin mb-2">
              Set Probation Start
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
                        return null;
                      },
                    })}
                  />
                  {formState.errors?.probation_start && (
                    <p className="pl-7 mt-2 text-primary">
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
                    value={+metrics?.probation_start}
                    hidden
                  />
                </>
              )}
            </div>
          </div>
        </div>
        <p className="mb-3">
          What time window should the system use to calculate the average?
        </p>
        <div className="w-full lg:w-7/12 mb-10 flex">
          <div className="w-full lg:w-6/12 flex flex-row justify-between">
            <div className="w-full lg:w-6/12 h-40px mr-10 border border-gray1 c-select flex items-center relative focus:outline-none shadow-md">
              <Controller
                name="frame_calculate_unit"
                rules={{ required: true }}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <select
                    className="px-5 w-full h-full cursor-pointer"
                    required
                    {...register('frame_calculate_unit')}
                    onChange={e => {
                      setWatchCalculate(e.target.value);
                      onChange(e);
                    }}
                  >
                    <option selected value="" disabled>
                      Select Scale
                    </option>
                    <option value="Weeks">Weeks</option>
                    <option value="Days">Days</option>
                    <option value="Hours">Hours</option>
                  </select>
                )}
              />
            </div>
            <div className="w-full lg:w-6/12 h-40px border border-gray1 c-select flex items-center relative focus:outline-none shadow-md">
              <Controller
                name="frame_calculate_value"
                rules={{ required: true }}
                control={control}
                render={() => (
                  <select
                    className="w-full h-full px-5 cursor-pointer"
                    required
                    {...register('frame_calculate_value')}
                  >
                    <option selected value="" disabled>
                      Select...
                    </option>
                    {watchCalculate === 'Days' &&
                      new Array(30).fill(1).map((x, ind) => (
                        <option key={ind} value={ind + 1}>
                          {ind + 1}
                        </option>
                      ))}
                    {watchCalculate === 'Hours' &&
                      new Array(24).fill(1).map((x, ind) => (
                        <option key={ind} value={ind + 1}>
                          {ind + 1}
                        </option>
                      ))}
                    {watchCalculate === 'Weeks' &&
                      new Array(30).fill(1).map((x, ind) => (
                        <option key={ind} value={ind + 1}>
                          {ind + 1}
                        </option>
                      ))}
                  </select>
                )}
              />
            </div>
          </div>

          <div className="w-full lg:w-6/12 ml-10" />
        </div>
        <p className="mb-3">
          How much time should the user be given to correct this?
        </p>
        <div className="w-full lg:w-7/12 mb-10 flex">
          <div className="w-full lg:w-6/12 flex flex-row justify-between">
            <div className="w-full lg:w-6/12 h-40px mr-10 border border-gray1 c-select flex items-center relative focus:outline-none shadow-md">
              <Controller
                name="given_to_correct_unit"
                rules={{ required: true }}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <select
                    className="px-5 w-full h-full cursor-pointer"
                    required
                    {...register('given_to_correct_unit')}
                    onChange={e => {
                      setWatchCorrect(e.target.value);
                      onChange(e);
                    }}
                  >
                    <option selected value="" disabled>
                      Select Scale
                    </option>
                    <option value="Weeks">Weeks</option>
                    <option value="Days">Days</option>
                    <option value="Hours">Hours</option>
                  </select>
                )}
              />
            </div>
            <div className="w-full lg:w-6/12 h-40px border border-gray1 c-select flex items-center relative focus:outline-none shadow-md">
              <Controller
                name="given_to_correct_value"
                rules={{ required: true }}
                control={control}
                render={() => (
                  <select
                    className="w-full h-full px-5 cursor-pointer"
                    required
                    {...register('given_to_correct_value')}
                  >
                    <option selected value="" disabled>
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
          </div>

          <div className="w-full lg:w-6/12 ml-10" />
        </div>
        <p className="mb-3">
          How often should the system check that the above criteria has been
          met?
        </p>
        <div className="w-full lg:w-7/12 mb-10 flex">
          <div className="w-full lg:w-6/12 flex flex-row justify-between">
            <div className="w-full lg:w-6/12 h-40px mr-10 border border-gray1 c-select flex items-center relative focus:outline-none shadow-md">
              <Controller
                name="system_check_unit"
                rules={{ required: true }}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <select
                    className="px-5 w-full h-full cursor-pointer"
                    required
                    {...register('system_check_unit')}
                    onChange={e => {
                      setWatchSystemCheck(e.target.value);
                      onChange(e);
                    }}
                  >
                    <option selected value="" disabled>
                      Select Scale
                    </option>
                    <option value="Weeks">Weeks</option>
                    <option value="Days">Days</option>
                    <option value="Hours">Hours</option>
                  </select>
                )}
              />
            </div>
            <div className="w-full lg:w-6/12 h-40px border border-gray1 c-select flex items-center relative focus:outline-none shadow-md">
              <Controller
                name="system_check_value"
                rules={{ required: true }}
                control={control}
                render={() => (
                  <select
                    className="w-full h-full px-5 cursor-pointer"
                    required
                    {...register('system_check_value')}
                  >
                    <option selected value="" disabled>
                      Select...
                    </option>
                    {watchSystemCheck === 'Days' &&
                      new Array(30).fill(1).map((x, ind) => (
                        <option key={ind} value={ind + 1}>
                          {ind + 1}
                        </option>
                      ))}
                    {watchSystemCheck === 'Hours' &&
                      new Array(24).fill(1).map((x, ind) => (
                        <option key={ind} value={ind + 1}>
                          {ind + 1}
                        </option>
                      ))}
                    {watchSystemCheck === 'Weeks' &&
                      new Array(30).fill(1).map((x, ind) => (
                        <option key={ind} value={ind + 1}>
                          {ind + 1}
                        </option>
                      ))}
                  </select>
                )}
              />
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

const Settings = () => {
  const [metrics, setMetrics] = useState(null);
  const dispatch = useDispatch();
  const { setLoading } = useContext(AppContext);

  useEffect(() => {
    setLoading(true);
    fetchWarningMetrics();
  }, []);

  const fetchWarningMetrics = () => {
    dispatch(
      getWaringMetrics(
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

  return (
    <LayoutDashboard>
      <Card className="h-full pl-24 py-7">
        <div className="bg-transparent h-full">
          <div className="w-full h-70px pr-24">
            <div className="lg:h-70px flex flex-col justify-center">
              <h3 className="text-dark2 text-xl lg:pr-32 font-medium mb-6">
                Admin settings
              </h3>
              <div className="border-primary border-b-2" />
            </div>
          </div>
          <div className="flex flex-col h-100%-70px overflow-y-auto">
            <section className="mt-5 mb-20">
              <h4 className="mb-7 text-lg font-medium">Mailer Settings</h4>
              <Link href="/admin/settings/emailer">
                <button
                  type="button"
                  className="transition text-lg text-white w-36 lg:w-48 h-9 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
                >
                  Access Mailer
                </button>
              </Link>
            </section>
            <section>
              <h4 className="mb-7 text-lg font-medium">Monitoring Criteria</h4>
              <SettingForm
                metrics={metrics?.uptime}
                title="Uptime"
                type="uptime"
                doReloadData={fetchWarningMetrics}
              />
              <SettingForm
                metrics={metrics?.['block-height']}
                title="Block Height"
                type="block-height"
                doReloadData={fetchWarningMetrics}
              />
              <SettingForm
                metrics={metrics?.['update-responsiveness']}
                title="Update Responsiveness"
                type="update-responsiveness"
                doReloadData={fetchWarningMetrics}
              />
            </section>
          </div>
        </div>
      </Card>
    </LayoutDashboard>
  );
};

export default LoadingScreen(Settings, 'final-admin');
