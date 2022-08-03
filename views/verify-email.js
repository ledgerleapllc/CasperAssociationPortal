/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Link, useHistory } from 'react-router-dom';
import Head from 'next/head';
import useMobileDetect from 'use-mobile-detect-hook';
import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppFooter from '../components/layouts/app-footer';
import AppHeader from '../components/layouts/app-header';
import { LoadingButton } from '../components/partials';
import {
  resendVerificationCode,
  verifyEmail,
  verify2FA,
  resend2FACode,
} from '../shared/redux-saga/auth/actions';
import { LoadingScreen } from '../components/hoc/loading-screen';
import { AppContext } from '../pages/_app';

const VerifyEmail = () => {
  const { formState, register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const router = useHistory();
  const detectMobile = useMobileDetect();
  const userInfo = useSelector(state => state.authReducer.userInfo.fullInfo);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setLoading } = useContext(AppContext);
  const onSubmit = data => {
    if (data.type === 'verify-email') {
      setIsSubmitting(true);
      dispatch(
        verifyEmail(
          {
            code: data.code,
          },
          () => {
            router.push('/welcome');
          },
          () => {
            setIsSubmitting(false);
          }
        )
      );
    } else if (data.type === '2fa') {
      setIsSubmitting(true);
      dispatch(
        verify2FA(
          {
            code: data.code,
          },
          () => {
            router.push('/dashboard');
          },
          () => {
            setIsSubmitting(false);
          }
        )
      );
    }
  };

  const onResendVerificationCode = () => {
    setLoading(true);
    dispatch(
      resendVerificationCode(
        () => {
          setLoading(false);
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  const onResend2FaCode = () => {
    setLoading(true);
    dispatch(
      resend2FACode(
        () => {
          setLoading(false);
        },
        () => {
          setLoading(false);
        }
      )
    );
  };

  const VerifySection = () => {
    if (userInfo && !userInfo.email_verified_at) {
      return (
        <>
          <p className="text-4xl text-center">Verify Your Email</p>
          <p className="text-xs text-center mt-2">
            A verification code was sent to your email {userInfo?.email}. You
            must enter this code in the field below to proceed. If you did not
            get the code, please check your spam folder.
          </p>
          <div className="w-full flex flex-col">
            <input
              type="text"
              className="fw-full text-center h-16 text-xl mt-7 px-7 rounded-full shadow-md focus:outline-none"
              placeholder="Enter Code"
              name="code"
              {...register('code', {
                required: 'Code is required',
              })}
            />
            {formState.errors?.code && (
              <p className="pl-7 mt-2 text-primary text-left">
                {formState.errors.code?.message}
              </p>
            )}
            <input {...register('type')} value="verify-email" hidden />
          </div>
          <div className="lg:flex lg:space-x-5 lg:mt-4 mt-14 lg:justify-center animate__delay-0-5s">
            <LoadingButton
              type="submit"
              isDisabled={isSubmitting}
              isLoading={isSubmitting}
              title="Verify"
              className="text-lg text-white w-full lg:w-64 h-16 rounded-full bg-primary hover:opacity-40 focus:outline-none shadow-md"
            />
          </div>
          <div className="mt-5">
            <a
              className="text-primary underline font-medium cursor-pointer text-xs text-center animate__delay-1s"
              onClick={onResendVerificationCode}
            >
              Resend Verifcation Code
            </a>
            <br />
            <Link to="/update-email">
              <span className="text-primary underline font-medium cursor-pointer text-xs text-center animate__delay-1s">
                Update Email Address
              </span>
            </Link>
          </div>
        </>
      );
    }
    if (userInfo && userInfo.twoFA_login) {
      return (
        <>
          <p className="text-4xl text-center">Two-Factor Authentication</p>
          <p className="text-xs text-center mt-2 animate__delay-1s">
            Please enter the code sent to the email: {userInfo?.email}
          </p>
          <div className="w-full flex flex-col">
            <input
              type="text"
              className="fw-full text-center h-16 text-xl mt-7 px-7 rounded-full shadow-md focus:outline-none"
              placeholder="Enter Code"
              name="code"
              {...register('code', {
                required: 'Code is required',
              })}
            />
            {formState.errors?.code && (
              <p className="pl-7 mt-2 text-primary text-left">
                {formState.errors.code?.message}
              </p>
            )}
            <input {...register('type')} value="2fa" hidden />
          </div>
          <div className="lg:flex lg:space-x-5 lg:mt-4 mt-14 lg:justify-center animate__delay-1s">
            <LoadingButton
              type="submit"
              isDisabled={isSubmitting}
              isLoading={isSubmitting}
              title="Submit"
              className="text-lg text-white w-full lg:w-64 h-16 rounded-full bg-primary hover:opacity-40 focus:outline-none shadow-md"
            />
          </div>
          <div className="mt-5">
            <a
              className="text-primary underline font-medium cursor-pointer text-xs text-center pt-5 flex justify-center animate__delay-1s"
              onClick={onResend2FaCode}
            >
              Resend 2fa Code
            </a>
          </div>
        </>
      );
    }
    return null;
  };

  return (
    <>
      <Head>
        <title>Verify Email Address - Casper Association Portal</title>
      </Head>
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
              <VerifySection />
            </div>
          </form>
          <AppFooter theme="light" />
        </div>
      </div>
    </>
  );
};

export default LoadingScreen(VerifyEmail, 'verifying');
