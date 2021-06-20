import Link from 'next/link';
import useMobileDetect from 'use-mobile-detect-hook';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import AppFooter from '../components/layouts/app-footer';
import AppHeader from '../components/layouts/app-header';
import { PASSWORD_PATTERN } from '../helpers/form-validation';
import { Button } from '../components/partials/button';
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
  const router = useRouter();
  const detectMobile = useMobileDetect();
  const [isUpdatedPassword, setIsUpdatedPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = data => {
    setIsSubmitting(true);
    data.email = router.query.email;
    data.code = router.query.code;
    dispatch(
      updatePassword(
        {
          ...data,
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
      <div className="w-full md:max-w-screen-2xl md:p-9 p-4 flex flex-col">
        <AppHeader theme="light" />
        <form
          className="flex-grow flex items-center justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          {isUpdatedPassword ? (
            <div
              className="bg-white w-full md:w-2/3 text-center px-4 py-12 md:p-44"
              style={{
                backgroundImage: `url('/images/login_overlay.png')`,
                backgroundSize: 'cover',
              }}
            >
              <p className="text-4xl text-center animate__animated animate__fadeInUp">
                Your Password has been updated
              </p>
              <div className="md:flex md:space-x-5 md:mt-12 mt-8 md:justify-center animate__animated animate__fadeInUp animate__delay-2s">
                <button
                  type="button"
                  onClick={() => router.push('/login')}
                  className="text-lg text-white w-full md:w-64 h-16 rounded-full bg-primary hover:opacity-40 focus:outline-none shadow-md"
                >
                  Go to Login
                </button>
              </div>
            </div>
          ) : (
            <div
              className="bg-white w-full md:w-2/3 text-center px-4 py-12 md:p-44"
              style={{
                backgroundImage: `url('/images/login_overlay.png')`,
                backgroundSize: 'cover',
              }}
            >
              <p className="text-4xl text-center animate__animated animate__fadeInUp">
                Update Your Password
              </p>
              <p className="text-xs text-center mt-2 animate__animated animate__fadeInUp animate__delay-2s">
                Please create a new password and click Submit
              </p>
              <div className="w-full flex flex-col animate__animated animate__fadeInLeft animate__delay-4s">
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
              <div className="w-full flex flex-col animate__animated animate__fadeInLeft animate__delay-4s">
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
              <div className="md:flex md:space-x-5 md:mt-4 mt-14 md:justify-center animate__animated animate__fadeInUp animate__delay-2s">
                <Button
                  type="submit"
                  isDisabled={isSubmitting}
                  isLoading={isSubmitting}
                  title="Submit"
                  className="text-lg text-white w-full md:w-64 h-16 rounded-full bg-primary hover:opacity-40 focus:outline-none shadow-md"
                />
              </div>
              <Link href="/home">
                <p className="cursor-pointer text-xs text-center mt-5 flex justify-center animate__animated animate__fadeInUp animate__delay-4s">
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

export default LoadingScreen(UpdatePassword, 'final-all');
