/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { NAME_PATTERN } from '../../../helpers/form-validation';
import Countries from '../../../public/json/country.json';
import ArrowIcon from '../../../public/images/ic_arrow_down.svg';
import { DateTimePicker, LoadingButton } from '../../partials';
import { submitDetail } from '../../../shared/redux-saga/dashboard/dashboard-actions';
import { useDialog } from '../../partials/dialog';
import { Shuftipro } from '../../onboard/submit-kyc/shuftipro';
import { updateUser } from '../../../shared/redux-saga/auth/actions';

export const IndividualVerification = ({ goNext }) => {
  const {
    control,
    formState,
    register,
    handleSubmit,
    setValue,
    watch,
    setFocus,
  } = useForm({
    mode: 'onChange',
  });
  const watchCitizenship = watch('country_citizenship', false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.authReducer.userInfo);
  const [confirmed, setConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReadOnlyFirstName, setIsReadOnlyFirstName] = useState(true);
  const [isReadOnlyLastName, setIsReadOnlyLastName] = useState(true);

  const { setDialog } = useDialog();

  useEffect(() => {
    setValue('first_name', user?.fullInfo?.first_name, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue('last_name', user?.fullInfo?.last_name, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [user]);

  const handleBeginKYC = () => {
    setDialog({
      type: 'Dialog',
      settings: {
        style: {
          height: '90vh',
          width: '90%',
          maxWidth: '800px',
          overflow: 'scroll',
        },
        hideButton: true,
      },
      data: {
        title: 'KYC',
        content: <Shuftipro />,
      },
      afterClosed: value => {
        if (value) {
          dispatch(
            updateUser({
              status: 'pending',
            })
          );
          goNext();
        }
      },
    });
  };

  const onSubmit = data => {
    setIsSubmitting(true);
    data.type = 'individual';
    dispatch(
      submitDetail(
        data,
        () => {
          setIsSubmitting(false);
          handleBeginKYC();
        },
        () => {
          setIsSubmitting(false);
        }
      )
    );
  };

  return (
    <div className="animate__animated animate__fadeInLeft animate__delay-8s">
      <p className="text-lg mt-2 text-dark1">You registered as an individual</p>
      <p className="text-medium mt-2 text-dark1 font-light">
        As the node operator, please enter your details. In the next step you
        must upload an identity document (such as a passport) to verify your
        identity.
      </p>
      <div className="my-10">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full lg:w-10/12 lg:justify-between lg:flex mt-5 lg:space-x-5">
            <div className="w-full lg:w-5/12 mb-10">
              <label>First Name</label>
              <div className="w-full lg:flex-1 flex items-center justify-between">
                <input
                  type="text"
                  className="w-10/12 h-14 px-7 rounded-full shadow-md focus:outline-none"
                  {...register('first_name', {
                    required: 'First name is required',
                    pattern: {
                      message: 'First name is invalid',
                      value: NAME_PATTERN,
                    },
                  })}
                  readOnly={isReadOnlyFirstName}
                />
                <button
                  type="button"
                  className="text-primary focus:outline-none"
                  onClick={() => {
                    setIsReadOnlyFirstName(false);
                    setFocus('first_name');
                  }}
                >
                  Edit
                </button>
              </div>
              {formState.errors?.first_name && (
                <p className="pl-7 mt-2 text-primary">
                  {formState.errors.first_name?.message}
                </p>
              )}
            </div>
            <div className="w-full lg:w-5/12 mb-10">
              <label>Last Name</label>
              <div className="w-full lg:flex-1 flex items-center justify-between">
                <input
                  type="text"
                  className="w-10/12 h-14 px-7 rounded-full shadow-md focus:outline-none"
                  {...register('last_name', {
                    required: 'Last name is required',
                    pattern: {
                      message: 'Last name is invalid',
                      value: NAME_PATTERN,
                    },
                  })}
                  readOnly={isReadOnlyLastName}
                />
                <button
                  type="button"
                  className="text-primary focus:outline-none"
                  onClick={() => {
                    setIsReadOnlyLastName(false);
                    setFocus('last_name');
                  }}
                >
                  Edit
                </button>
              </div>
              {formState.errors?.last_name && (
                <p className="pl-7 mt-2 text-primary">
                  {formState.errors.last_name?.message}
                </p>
              )}
            </div>
          </div>
          <div className="w-full lg:w-10/12 lg:justify-between lg:flex mt-5 lg:space-x-5">
            <div className="w-full lg:w-5/12 mb-10">
              <label>Country of Citizenship</label>
              <div className="relative w-10/12 lg:flex-1 flex items-center justify-between px-7 mt-2 h-14 rounded-full shadow-md">
                <select
                  className={`max-w-60 cursor-pointer focus:outline-none ${
                    watchCitizenship ? 'text-black' : 'text-gray'
                  }`}
                  {...register('country_citizenship', {
                    required: 'Citizenship is required',
                  })}
                >
                  <option value="" disabled selected>
                    Select...
                  </option>
                  {Countries.map(country => (
                    <option value={country.code}>{country.name}</option>
                  ))}
                </select>
                <ArrowIcon className="absolute right-7" />
              </div>
              {formState.errors?.country_citizenship && (
                <p className="pl-7 mt-2 text-primary">
                  {formState.errors.country_citizenship?.message}
                </p>
              )}
            </div>
            <div className="w-full lg:w-5/12 mb-10">
              <label>Date of Birth</label>
              <Controller
                name="dob"
                control={control}
                rules={{
                  required: 'Date of Birth is required',
                }}
                defaultValue=""
                render={({ field: { onChange: onChangeDate } }) => (
                  <DateTimePicker onChange={onChangeDate} className="w-10/12" />
                )}
              />
              {formState.errors?.dob && (
                <p className="pl-7 mt-2 text-primary">
                  {formState.errors.dob?.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex mt-5 animate__animated animate__fadeInUp animate__delay-7s">
            <button
              type="button"
              className="flex items-baseline focus:outline-none"
              onClick={() => setConfirmed(pre => !pre)}
            >
              <img
                src={`/images/${confirmed ? 'ic_check.svg' : 'ic_uncheck.svg'}`}
                alt="understand checkbox"
                width={18}
                height={18}
              />
            </button>
            <p className="flex-1 text-dark1 text-sm ml-4 break-words">
              I affirm the above information is correct.
            </p>
          </div>
          <div className="mt-10">
            <LoadingButton
              type="submit"
              isDisabled={!formState.isValid || !confirmed || isSubmitting}
              isLoading={isSubmitting}
              title="Continue to ID Verification"
              className="text-lg text-white w-full lg:w-auto px-7 h-12 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
