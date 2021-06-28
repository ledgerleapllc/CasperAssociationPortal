import { forwardRef, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { NAME_PATTERN } from '../../../helpers/form-validation';
import Countries from '../../../public/json/country.json';
import { submitKYC } from '../../../shared/redux-saga/onboard/actions';
import { DateTimePicker } from '../../partials';

const SubmitKYCSecondStep = forwardRef(({ onNext, nextStep, type }, ref) => {
  const { control, watch, register, handleSubmit, formState, setValue } = useForm({
    mode: 'onChange',
  });
  const watchCitizenship = watch('country_citizenship', false);
  const watchResidence = watch('country_residence', false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.authReducer.userInfo);

  const onSubmit = data => {
    dispatch(
      submitKYC(
        {
          ...data,
          type,
        },
        () => {
          nextStep();
        }
      )
    );
  };

  useEffect(() => {
    setValue('first_name', user?.fullInfo?.first_name);
    setValue('last_name', user?.fullInfo?.last_name);
  }, [user]);

  return (
    <form
      className="flex-grow flex items-center justify-center mt-16 md:mt-0"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="pt-8 animate__animated animate__fadeInUp animate__delay-2s">
        <div className="md:flex md:space-x-5">
          <div className="w-full md:flex-1">
            <input
              type="text"
              className="w-full h-14 px-7 rounded-full shadow-md focus:outline-none"
              placeholder="First Name *"
              {...register('first_name', {
                required: 'First name is required',
                pattern: {
                  message: 'First name is invalid',
                  value: NAME_PATTERN,
                },
              })}
            />
            {formState.errors?.first_name && (
              <p className="pl-7 mt-2 text-primary">
                {formState.errors.first_name?.message}
              </p>
            )}
          </div>
          <div className="w-full md:flex-1 h-14 mt-2 md:mt-0">
            <input
              type="text"
              className="w-full h-14 px-7 rounded-full shadow-md focus:outline-none"
              placeholder="Last Name *"
              {...register('last_name', {
                required: 'Last name is required',
                pattern: {
                  message: 'Last name is invalid',
                  value: NAME_PATTERN,
                },
              })}
            />
            {formState.errors?.last_name && (
              <p className="pl-7 mt-2 text-primary">
                {formState.errors.last_name?.message}
              </p>
            )}
          </div>
        </div>
        <div className="md:flex space-x-5 mt-2">
          <div className="w-full md:flex-1">
            <Controller
              name="dob"
              control={control}
              rules={{
                required: 'Date of Birth is required',
              }}
              defaultValue=""
              render={({ field: { onChange: onChangeDate } }) => (
                <DateTimePicker onChange={onChangeDate} />
              )}
            />
            {formState.errors?.dob && (
              <p className="pl-7 mt-2 text-primary">
                {formState.errors.dob?.message}
              </p>
            )}
          </div>
          <div className="md:flex-1 px-7" />
        </div>
        <div className="w-full mt-2">
          <input
            type="text"
            className="w-full h-14 px-7 rounded-full shadow-md focus:outline-none"
            placeholder="Address *"
            {...register('address', {
              required: 'Address is required',
            })}
          />
          {formState.errors?.address && (
            <p className="pl-7 mt-2 text-primary">
              {formState.errors.address?.message}
            </p>
          )}
        </div>
        <div className="md:flex md:space-x-5 mt-2">
          <div className="w-full md:flex-1">
            <input
              type="text"
              className="w-full h-14 px-7 rounded-full shadow-md focus:outline-none"
              placeholder="City *"
              {...register('city', {
                required: 'City is required',
              })}
            />
            {formState.errors?.city && (
              <p className="pl-7 mt-2 text-primary">
                {formState.errors.city?.message}
              </p>
            )}
          </div>
          <div className="w-full md:flex-1">
            <input
              type="text"
              className="w-full mt-2 md:mt-0 h-14 px-7 rounded-full shadow-md focus:outline-none"
              placeholder="Postal Code or Zip *"
              {...register('zip', {
                required: 'Zip is required',
              })}
            />
            {formState.errors?.zip && (
              <p className="pl-7 mt-2 text-primary">
                {formState.errors.zip?.message}
              </p>
            )}
          </div>
        </div>
        <div className="md:flex md:space-x-5 mt-2">
          <div className="w-full md:flex-1">
            <div className="flex items-center justify-between px-7 mt-2 md:mt-0 h-14 rounded-full shadow-md">
              <select
                className={`max-w-60 cursor-pointer focus:outline-none ${
                  watchCitizenship ? 'text-black' : 'text-gray'
                }`}
                placeholder="Country of Citizenship *"
                {...register('country_citizenship', {
                  required: 'Citizenship is required',
                })}
              >
                <option value="" disabled selected>
                  Country of Citizenship *
                </option>
                {Countries.map(country => (
                  <option value={country.code}>{country.name}</option>
                ))}
              </select>
              <img src="/images/ic_arrow_down.svg" alt="down" />
            </div>
            {formState.errors?.country_citizenship && (
              <p className="pl-7 mt-2 text-primary">
                {formState.errors.country_citizenship?.message}
              </p>
            )}
          </div>
          <div className="w-full md:flex-1">
            <div className="w-full md:flex-1 flex items-center justify-between px-7 mt-2 md:mt-0 h-14 rounded-full shadow-md">
              <select
                className={`max-w-60 cursor-pointer focus:outline-none ${
                  watchResidence ? 'text-black' : 'text-gray'
                }`}
                {...register('country_residence', {
                  required: 'Residence is required',
                })}
              >
                <option value="" disabled selected>
                  Country of Residence *
                </option>
                {Countries.map(country => (
                  <option value={country.code}>{country.name}</option>
                ))}
              </select>
              <img src="/images/ic_arrow_down.svg" alt="down" />
            </div>
            {formState.errors?.country_residence && (
              <p className="pl-7 mt-2 text-primary">
                {formState.errors.country_residence?.message}
              </p>
            )}
          </div>
        </div>
        <p className="text-sm text-dark1 mt-8">
          By clicking continue, you are confirming that the above information is
          correct and that you can provide a document to prove your personal
          information, such as a passport, and another document to prove you
          reside at the above address, such as a utility/phone bill or bank
          statement.
        </p>
        <button ref={ref} type="submit" className="hidden">
          submit
        </button>
        <button
          type="button"
          className="md:hidden my-5 text-lg text-white w-full md:w-64 h-16 rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
          onClick={onNext}
        >
          Continue
        </button>
      </div>
    </form>
  );
});

export default SubmitKYCSecondStep;
