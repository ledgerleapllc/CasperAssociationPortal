import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import AppFooter from '../components/layouts/app-footer';
import AppHeader from '../components/layouts/app-header';
import {
  NAME_PATTERN,
  EMAIL_PATTERN,
  PASSWORD_PATTERN,
  FORUM_PATTERN,
  TELEGRAM_PATTERN,
} from '../components/helpers/form_validation';

const Register = () => {
  const [agreeChecked, setAgreeChecked] = useState(false);
  const [understandChecked, setUnderstandChecked] = useState(false);

  const router = useRouter();
  const {
    control,
    formState,
    register,
    handleSubmit,
    getValues,
    setValue,
    clearErrors,
    setError,
  } = useForm({
    mode: 'onBlur',
  });
  const onSubmit = data => router.push('/welcome');

  const validateFields = () => {
    if (!agreeChecked || !understandChecked) {
      return false;
    }
    return true;
  };

  const focusTelegram = e => {
    if (!e.target.value || e.target.value === '') {
      setValue('telegram', '@');
    }
  };

  const blurTelegram = e => {
    if (e.target.value === '@') {
      setValue('telegram', '');
    }
  };

  const onChangeTelegram = e => {
    if (e.target.value === '' || !/^@/.test(e.target.value)) {
      setValue('telegram', '@');
      e.target.value = '@';
    } else {
      setValue('telegram', e.target.value);
    }
  };

  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full md:max-w-screen-2xl md:p-9 p-4 flex flex-col">
        <AppHeader theme="dark" />
        <form
          className="flex-grow flex items-center justify-center mt-16 md:mt-0"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full md:w-9/12">
            <p className="text-2xl animate__animated animate__fadeInLeft">
              New User
            </p>
            <p className="text-sm text-dark mt-2 animate__animated animate__fadeInLeft animate__delay-2s">
              Fill out the form to register.
            </p>
            <div className="text-sm text-dark mt-2 animate__animated animate__fadeInUp animate__delay-4s">
              <div className="md:flex mt-10 md:space-x-5">
                <div className="flex-1 flex-col">
                  <input
                    type="text"
                    className="w-full mt-2 md:mt-0 h-14 px-7 rounded-full shadow-md focus:outline-none"
                    placeholder="First Name *"
                    name="firstName"
                    {...register('firstName', {
                      required: 'First name is required',
                      pattern: {
                        message: 'First name is invalid',
                        value: NAME_PATTERN,
                      },
                    })}
                  />
                  {formState.errors?.firstName && (
                    <p className="pl-7 mt-2 text-primary">
                      {formState.errors.firstName?.message}
                    </p>
                  )}
                </div>
                <div className="flex-1 flex-col">
                  <input
                    type="text"
                    className="w-full mt-2 md:mt-0 h-14 px-7 rounded-full shadow-md focus:outline-none"
                    placeholder="Last Name *"
                    name="lastName"
                    {...register('lastName', {
                      required: 'Last name is required',
                      pattern: {
                        message: 'Last name is invalid',
                        value: NAME_PATTERN,
                      },
                    })}
                  />
                  {formState.errors?.lastName && (
                    <p className="pl-7 mt-2 text-primary">
                      {formState.errors.lastName?.message}
                    </p>
                  )}
                </div>
                <div className="flex-1 h-0 md:h-14 px-7" />
              </div>
              <div className="md:flex mt-5 md:space-x-5">
                <div className="flex-1 flex-col">
                  <input
                    type="text"
                    className="w-full h-14 px-7 rounded-full shadow-md focus:outline-none"
                    placeholder="Email *"
                    name="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        message: 'Email is invalid',
                        value: EMAIL_PATTERN,
                      },
                      validate: value =>
                        value === getValues().confirmEmail || 'Email not match',
                    })}
                  />
                  {formState.errors?.email && (
                    <p className="pl-7 mt-2 text-primary">
                      {formState.errors.email?.message}
                    </p>
                  )}
                </div>
                <div className="flex-1 flex-col">
                  <input
                    type="text"
                    className="w-full mt-2 md:mt-0 h-14 px-7 rounded-full shadow-md focus:outline-none"
                    placeholder="Confirm Email *"
                    name="confirmEmail"
                    {...register('confirmEmail', {
                      required: 'Email Confirm is required',
                      pattern: {
                        message: 'Email Confirm is invalid',
                        value: EMAIL_PATTERN,
                      },
                      validate: value =>
                        value === getValues().email
                          ? clearErrors('email')
                          : setError('email', {
                              message: 'Email not match',
                            }),
                    })}
                  />
                  {formState.errors?.confirmEmail && (
                    <p className="pl-7 mt-2 text-primary">
                      {formState.errors.confirmEmail?.message}
                    </p>
                  )}
                </div>
                <div className="flex-1 h-0 md:h-14 px-7" />
              </div>
              <div className="md:flex mt-5 md:space-x-5">
                <div className="flex-1 flex-col">
                  <input
                    type="password"
                    className="w-full h-14 px-7 rounded-full shadow-md focus:outline-none"
                    placeholder="Password *"
                    name="password"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        message: 'Min 8 character',
                        value: 8,
                      },
                      pattern: {
                        message: 'Password is invalid',
                        value: PASSWORD_PATTERN,
                      },
                      validate: value =>
                        value === getValues().confirmPassword ||
                        'Password not match',
                    })}
                  />
                  {formState.errors?.password && (
                    <p className="pl-7 mt-2 text-primary">
                      {formState.errors.password?.message}
                    </p>
                  )}
                </div>
                <div className="flex-1 flex-col">
                  <input
                    type="password"
                    className="w-full mt-2 md:mt-0 h-14 px-7 rounded-full shadow-md focus:outline-none"
                    placeholder="Confirm Password *"
                    name="confirmPassword"
                    {...register('confirmPassword', {
                      required: 'Confirm password is required',
                      minLength: {
                        message: 'Min 8 character',
                        value: 8,
                      },
                      pattern: {
                        message: 'Confirm password is invalid',
                        value: PASSWORD_PATTERN,
                      },
                      validate: value =>
                        value === getValues().password
                          ? clearErrors('password')
                          : setError('password', {
                              message: 'Password not match',
                            }),
                    })}
                  />
                  {formState.errors?.confirmPassword && (
                    <p className="pl-7 mt-2 text-primary">
                      {formState.errors.confirmPassword?.message}
                    </p>
                  )}
                </div>
                <div className="flex-1 h-0 md:h-14 px-7" />
              </div>
              <div className="md:flex mt-5 md:space-x-5">
                <div className="flex-1 flex-col">
                  <input
                    type="text"
                    className="w-full h-14 px-7 rounded-full shadow-md focus:outline-none"
                    placeholder="Forum Name / Pseudonym *"
                    name="forumName"
                    {...register('forumName', {
                      required: 'Forum name is required',
                      pattern: {
                        message: 'Forum name is invalid',
                        value: FORUM_PATTERN,
                      },
                    })}
                  />
                  {formState.errors?.forumName && (
                    <p className="pl-7 mt-2 text-primary">
                      {formState.errors.forumName?.message}
                    </p>
                  )}
                </div>
                <div className="flex-1 flex-col">
                  <Controller
                    name="telegram"
                    control={control}
                    rules={{
                      pattern: {
                        message: 'Telegram is invalid',
                        value: TELEGRAM_PATTERN,
                      },
                    }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <input
                        type="text"
                        className="w-full mt-2 md:mt-0 h-14 px-7 rounded-full shadow-md focus:outline-none"
                        placeholder="Telegram"
                        name="telegram"
                        value={value}
                        onChange={e => {
                          onChangeTelegram(e);
                          onChange(e);
                        }}
                        onBlur={e => {
                          blurTelegram(e);
                          onBlur(e);
                        }}
                        onFocus={e => focusTelegram(e)}
                      />
                    )}
                  />
                  {formState.errors?.telegram && (
                    <p className="pl-7 mt-2 text-primary">
                      {formState.errors.telegram?.message}
                    </p>
                  )}
                </div>
                <div className="flex-1 h-0 md:h-14 px-7" />
              </div>
            </div>
            <div className="flex mt-10 animate__animated animate__fadeInUp animate__delay-6s">
              <button
                type="button"
                className="flex items-baseline focus:outline-none"
                onClick={() => setAgreeChecked(!agreeChecked)}
              >
                <img
                  src={`/images/${
                    agreeChecked ? 'ic_check.svg' : 'ic_uncheck.svg'
                  }`}
                  alt="agree checkbox"
                  width={18}
                  height={18}
                />
              </button>
              <p className="flex-1 text-dark1 text-sm ml-4">
                I agree the Terms and Conditions, cookie policy, and privacy
                policy.
              </p>
            </div>
            <div className="flex mt-5 animate__animated animate__fadeInUp animate__delay-7s">
              <button
                type="button"
                className="flex items-baseline focus:outline-none"
                onClick={() => setUnderstandChecked(!understandChecked)}
              >
                <img
                  src={`/images/${
                    understandChecked ? 'ic_check.svg' : 'ic_uncheck.svg'
                  }`}
                  alt="understand checkbox"
                  width={18}
                  height={18}
                />
              </button>
              <p className="flex-1 text-dark1 text-sm ml-4 break-words">
                I understand that this portal is only for Casper blockchain node
                operators and affirm that I do operate a node and understand
                that I will be required to prove I am a node operator.
              </p>
            </div>
            <div className="md:flex md:flex-row-reverse mt-10">
              <div className="animate__animated animate__fadeInLeft animate__delay-8s">
                <button
                  type="submit"
                  className="text-lg text-white w-full md:w-64 h-16 rounded-full bg-primary hover:opacity-40 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none shadow-md"
                  disabled={!validateFields()}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
        <AppFooter theme="dark" />
      </div>
    </div>
  );
};

export default Register;
