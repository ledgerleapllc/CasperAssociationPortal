/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { LoadingButton } from '../../partials';
import { NUMBER_PATTERN } from '../../../helpers/form-validation';
import { updateGlobalSettings } from '../../../shared/redux-saga/admin/actions';

const RedmarkForm = ({ isOverride, globalSettings }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const { formState, register, handleSubmit, setValue } = useForm({
    mode: 'onChange',
  });

  const setData = data => {
    setValue('redmarks_revoke', data.redmarks_revoke || '');
    setValue('redmarks_revoke_calc_size', data.redmarks_revoke_calc_size || '');
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
        <span>Redmark Rules</span>
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
              Set Revoke Level
            </label>
            <div className="w-full">
              <input
                type="text"
                className="w-full h-12 px-7 shadow-md focus:outline-none border border-gray1"
                name="redmarks_revoke"
                {...register('redmarks_revoke', {
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
              {formState.errors?.redmarks_revoke && (
                <p className="mt-2 text-primary text-sm">
                  {formState.errors.redmarks_revoke?.message}
                </p>
              )}
            </div>
          </div>
          <div className="w-full lg:w-6/12">
            <label className="block text-gray font-thin mb-2">
              How many ERAs to include in calculation
            </label>
            <div className="w-full">
              <input
                type="text"
                className="w-full h-12 px-7 shadow-md focus:outline-none border border-gray1"
                name="redmarks_revoke_calc_size"
                {...register('redmarks_revoke_calc_size', {
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
              {formState.errors?.redmarks_revoke_calc_size && (
                <p className="mt-2 text-primary text-sm">
                  {formState.errors.redmarks_revoke_calc_size?.message}
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

export default RedmarkForm;
