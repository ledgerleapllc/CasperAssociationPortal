import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import useMobileDetect from 'use-mobile-detect-hook';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import AppFooter from '../components/layouts/app-footer';
import AppHeader from '../components/layouts/app-header';
import { PASSWORD_PATTERN } from '../helpers/form-validation';
import { LoadingButton } from '../components/partials';
import { updatePassword } from '../shared/redux-saga/auth/actions';
import { LoadingScreen } from '../components/hoc/loading-screen';

const UpdatePassword = () => {
  const {
    clearErrors,
    formState,
    register,
    handleSubmit,
    getValues,
    setError,
  } = useForm();
  const dispatch = useDispatch();
  const router = useHistory();
  const detectMobile = useMobileDetect();
  const [isUpdatedPassword, setIsUpdatedPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const useQuery = () => {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  };

  const onSubmit = data => {
    const temp = data;
    setIsSubmitting(true);
    const query = useQuery();
    temp.email = query.get('email');
    temp.code = query.get('code');
    dispatch(
      updatePassword(
        {
          ...temp,
        },
        () => {
          setIsUpdatedPassword(true);
        },
        () => {
          setIsSubmitting(false);
        }
      )
    );
  };

  return (
    <div
      className="flex justify-center h-screen"
      style={{
        backgroundImage: `url('/images/bg_welcome${
          detectMobile.isMobile() ? '_mobile' : ''
        }.png')`,
        backgroundSize: 'cover',
      }}
    >
      <div
        className="
          flex flex-col w-full
          p-4
          lg:max-w-380 lg:p-9
          xl:max-w-screen-xl xl:p-9
          2xl:max-w-screen-2xl"
      >
        <AppHeader theme="light" />
        <form
          className="flex-grow flex items-center justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          {isUpdatedPassword ? (
            <div
              className="bg-white w-full lg:w-2/3 text-center px-4 py-12 lg:p-44"
              style={{
                backgroundImage: `url('/images/login_overlay.png')`,
                backgroundSize: 'cover',
              }}
            >
              <p className="text-4xl text-center animate__animated animate__fadeInUp">
                Your Password has been updated
              </p>
              <div className="lg:flex lg:space-x-5 lg:mt-12 mt-8 lg:justify-center animate__animated animate__fadeInUp animate__delay-0-5s">
                <button
                  type="button"
                  onClick={() => router.push('/login')}
                  className="text-lg text-white w-full lg:w-64 h-16 rounded-full bg-primary hover:opacity-40 focus:outline-none shadow-md"
                >
                  Go to Login
                </button>
              </div>
            </div>
          ) : (
            <div
              className="bg-white w-full lg:w-2/3 text-center px-4 py-12 lg:p-44"
              style={{
                backgroundImage: `url('/images/login_overlay.png')`,
                backgroundSize: 'cover',
              }}
            >
              <p className="text-4xl text-center animate__animated animate__fadeInUp">
                Update Your Password
              </p>
              <p className="text-xs text-center mt-2 animate__animated animate__fadeInUp animate__delay-0-5s">
                Please create a new password and click Submit
              </p>
              <div className="w-full flex flex-col animate__animated animate__fadeInLeft animate__delay-1s">
                <input
                  type="password"
                  className="text-center w-full h-16 text-xl mt-7 px-7 rounded-full shadow-md focus:outline-none"
                  placeholder="Enter New Password"
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
                  <p className="pl-7 mt-2 text-primary text-left">
                    {formState.errors.password?.message}
                  </p>
                )}
              </div>
              <div className="w-full flex flex-col animate__animated animate__fadeInLeft animate__delay-1s">
                <input
                  type="password"
                  className="text-center w-full h-16 text-xl mt-7 px-7 rounded-full shadow-md focus:outline-none"
                  placeholder="Verify New Password"
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
                  <p className="pl-7 mt-2 text-primary text-left">
                    {formState.errors.confirmPassword?.message}
                  </p>
                )}
              </div>
              <div className="lg:flex lg:space-x-5 lg:mt-4 mt-14 lg:justify-center animate__animated animate__fadeInUp animate__delay-1-5s">
                <LoadingButton
                  type="submit"
                  isDisabled={isSubmitting}
                  isLoading={isSubmitting}
                  title="Submit"
                  className="text-lg text-white w-full lg:w-64 h-16 rounded-full bg-primary hover:opacity-40 focus:outline-none shadow-md"
                />
              </div>
              <Link to="/home">
                <p className="cursor-pointer text-xs text-center mt-5 inline-flex justify-center animate__animated animate__fadeInUp animate__delay-1-5s">
                  <img
                    src="/images/ic_decline.svg"
                    className="mr-2"
                    alt="Go home page"
                  />
                  <a className="text-primary underline font-medium">
                    Cancel and go back
                  </a>
                </p>
              </Link>
            </div>
          )}
        </form>
        <AppFooter theme="light" />
      </div>
    </div>
  );
};

export default LoadingScreen(UpdatePassword, 'auth');
