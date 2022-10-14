/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { LoadingButton } from '../../partials';
import { NUMBER_PATTERN } from '../../../helpers/form-validation';
import { updateGlobalSettings } from '../../../shared/redux-saga/admin/actions';

const ResponsivenessForm = ({ isOverride, globalSettings }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const { formState, register, handleSubmit, setValue } = useForm({
    mode: 'onChange',
  });

  const setData = data => {
    setValue('responsiveness_warning', data.responsiveness_warning || '');
    setValue('responsiveness_probation', data.responsiveness_probation || '');
  };

  useEffect(() => {
    setData(globalSettings);
  }, [globalSettings]);

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
        <span>Update Responsiveness</span>
      </div>
      <form
        className={`w-full ${
          isOverride ? 'opacity-100' : 'opacity-50 pointer-events-none'
        }`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full lg:w-7/12 flex flex-col lg:flex-row gap-5">
          <div className="w-full lg:w-6/12">
            <label className="block text-gray font-thin mb-2">
              Set Warning Level
            </label>
            <div className="w-full">
              <input
                type="text"
                className="w-full h-14 px-7 shadow-md focus:outline-none border border-gray1"
                name="responsiveness_warning"
                {...register('responsiveness_warning', {
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
              {formState.errors?.responsiveness_warning && (
                <p className="mt-2 text-primary text-sm">
                  {formState.errors.responsiveness_warning?.message}
                </p>
              )}
            </div>
          </div>
          <div className="w-full lg:w-6/12">
            <label className="block text-gray font-thin mb-2">
              Set Probation Start
            </label>
            <div className="w-full">
              <input
                type="text"
                className="w-full h-14 px-7 shadow-md focus:outline-none border border-gray1"
                name="responsiveness_probation"
                {...register('responsiveness_probation', {
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
              {formState.errors?.responsiveness_probation && (
                <p className="mt-2 text-primary text-sm">
                  {formState.errors.responsiveness_probation?.message}
                </p>
              )}
            </div>
          </div>
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

export default ResponsivenessForm;
