import Link from 'next/link';
import useMobileDetect from 'use-mobile-detect-hook';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import AppFooter from '../components/layouts/app-footer';
import AppHeader from '../components/layouts/app-header';
import { EMAIL_PATTERN } from '../helpers/form-validation';
import { LoadingButton } from '../components/partials';
import { updateEmail } from '../shared/redux-saga/auth/actions';
import { LoadingScreen } from '../components/hoc/loading-screen';

const UpdateEmail = () => {
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = data => {
    setIsSubmitting(true);
    dispatch(
      updateEmail(
        {
          ...data,
        },
        () => {
          router.push('/verify-email');
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
          <div
            className="bg-white w-full lg:w-2/3 text-center px-4 py-12 lg:p-44"
            style={{
              backgroundImage: `url('/images/login_overlay.png')`,
              backgroundSize: 'cover',
            }}
          >
            <p className="text-4xl text-center animate__animated animate__fadeInUp">
              Update Your Email Address
            </p>
            <p className="text-xs text-center mt-2 animate__animated animate__fadeInUp animate__delay-2s">
              Please enter the email you want to change to. This will resend the
              code to that email and update the email on your account as well.
            </p>
            <div className="w-full flex flex-col animate__animated animate__fadeInLeft animate__delay-4s">
              <input
                type="text"
                className="text-center w-full h-16 text-xl mt-7 px-7 rounded-full shadow-md focus:outline-none"
                placeholder="Enter Updated Email"
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
                <p className="pl-7 mt-2 text-primary text-left">
                  {formState.errors.email?.message}
                </p>
              )}
            </div>
            <div className="w-full flex flex-col animate__animated animate__fadeInLeft animate__delay-4s">
              <input
                type="text"
                className="text-center w-full h-16 text-xl mt-7 px-7 rounded-full shadow-md focus:outline-none"
                placeholder="Confirm Updated Email"
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
                <p className="pl-7 mt-2 text-primary text-left">
                  {formState.errors.confirmEmail?.message}
                </p>
              )}
            </div>
            <div className="lg:flex lg:space-x-5 lg:mt-4 mt-14 lg:justify-center animate__animated animate__fadeInUp animate__delay-2s">
              <LoadingButton
                type="submit"
                isDisabled={isSubmitting}
                isLoading={isSubmitting}
                title="Update & Resend Code"
                className="text-lg text-white w-full lg:w-64 h-16 rounded-full bg-primary hover:opacity-40 focus:outline-none shadow-md"
              />
            </div>
            <Link href="/verify-email">
              <p className="cursor-pointer text-xs text-center mt-5 flex justify-center animate__animated animate__fadeInUp animate__delay-4s">
                <img
                  src="/images/ic_decline.svg"
                  className="mr-2"
                  alt="Go verify email"
                />
                <a className="text-primary underline font-medium">
                  Cancel and go back
                </a>
              </p>
            </Link>
          </div>
        </form>
        <AppFooter theme="light" />
      </div>
    </div>
  );
};

export default LoadingScreen(UpdateEmail, 'verifying');
