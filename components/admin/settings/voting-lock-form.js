/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { LoadingButton } from '../../partials';
import { NUMBER_PATTERN } from '../../../helpers/form-validation';
import { updateGlobalSettings } from '../../../shared/redux-saga/admin/actions';

const VotingLockForm = ({ isOverride, globalSettings }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const { formState, register, handleSubmit, setValue } = useForm({
    mode: 'onChange',
  });

  const setData = data => {
    setValue('voting_eras_to_vote', data.voting_eras_to_vote || '');
    setValue('voting_eras_since_redmark', data.voting_eras_since_redmark || '');
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
        <span>Voting Lock</span>
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
              ERAs required to be active
            </label>
            <div className="w-full">
              <input
                type="text"
                className="w-full h-12 px-7 shadow-md focus:outline-none border border-gray1"
                name="voting_eras_to_vote"
                {...register('voting_eras_to_vote', {
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
              {formState.errors?.voting_eras_to_vote && (
                <p className="mt-2 text-primary text-sm">
                  {formState.errors.voting_eras_to_vote?.message}
                </p>
              )}
            </div>
          </div>
          <div className="w-full lg:w-6/12">
            <label className="block text-gray font-thin mb-2">
              ERAs since last redmark
            </label>
            <div className="w-full">
              <input
                type="text"
                className="w-full h-12 px-7 shadow-md focus:outline-none border border-gray1"
                name="voting_eras_since_redmark"
                {...register('voting_eras_since_redmark', {
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
              {formState.errors?.voting_eras_since_redmark && (
                <p className="mt-2 text-primary text-sm">
                  {formState.errors.voting_eras_since_redmark?.message}
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

export default VotingLockForm;
