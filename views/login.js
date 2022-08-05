import useMobileDetect from 'use-mobile-detect-hook';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import AppFooter from '../components/layouts/app-footer';
import AppHeader from '../components/layouts/app-header';
import { EMAIL_PATTERN } from '../helpers/form-validation';
import { LoadingButton } from '../components/partials';
import { loginApp, fetchUserInfo } from '../shared/redux-saga/auth/actions';
import { LoadingScreen } from '../components/hoc/loading-screen';

const Login = () => {
  const { formState, register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const detectMobile = useMobileDetect();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async data => {
    setIsSubmitting(true);
    dispatch(
      loginApp(
        {
          ...data,
        },
        () => {
          dispatch(
            fetchUserInfo(() => {
              history.push('/dashboard');
            })
          );
        },
        () => {
          setIsSubmitting(false);
        }
      )
    );
  };

  return (
    <>
      <Head>
        <title>Login - Casper Association Portal</title>
      </Head>
      <div
        className="flex justify-center h-screen"
        style={{
          backgroundImage: `url('/images/bg_welcome${
            detectMobile.isMobile() ? '_mobile' : ''
          }.jpg')`,
          backgroundSize: 'cover',
        }}
      >
        <div
          className="
            flex flex-col w-full
            p-4
            lg:max-w-380 lg:p-9
            xl:max-w-screen-xl xl:p-9
            2xl:max-w-screen-2xl
          "
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
                overflow: 'hidden',
              }}
            >
              <p className="text-4xl text-center animate__animated animate__fadeInUp">
                Sign In
              </p>
              <p className="text-xs text-center mt-2 animate__animated animate__fadeInUp">
                {`Don’t have an account yet? `}
                <Link to="/register-type">
                  <span className="text-primary underline font-medium">
                    Register
                  </span>
                </Link>
              </p>
              <div className="w-full flex flex-col animate__animated animate__fadeInLeft animate__delay-0-5s">
                <input
                  type="text"
                  className="w-full h-16 text-xl mt-7 px-7 rounded-full shadow-md focus:outline-none"
                  placeholder="Email"
                  name="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      message: 'Email is invalid',
                      value: EMAIL_PATTERN,
                    },
                  })}
                />
                {formState.errors?.email && (
                  <p className="pl-7 mt-2 text-primary text-left">
                    {formState.errors.email?.message}
                  </p>
                )}
              </div>
              <div className="w-full flex flex-col animate__animated animate__fadeInLeft animate__delay-0-5s">
                <input
                  type="password"
                  className="w-full h-16 text-xl mt-5 px-7 rounded-full shadow-md focus:outline-none"
                  placeholder="Password"
                  name="password"
                  {...register('password', {
                    required: 'Password is required',
                  })}
                />
                {formState.errors?.password && (
                  <p className="pl-7 mt-2 text-primary text-left">
                    {formState.errors.password?.message}
                  </p>
                )}
              </div>
              <div className="lg:flex lg:space-x-5 mt-14 lg:justify-center animate__animated animate__fadeInUp animate__delay-1s">
                <LoadingButton
                  type="submit"
                  isDisabled={isSubmitting}
                  isLoading={isSubmitting}
                  title="Sign in"
                  className="text-lg text-white w-full lg:w-64 h-16 rounded-full bg-primary hover:opacity-40 focus:outline-none shadow-md"
                />
              </div>
              <p className="text-xs text-center mt-5 animate__animated animate__fadeInUp animate__delay-1s">
                {`Forgot your password? `}
                <Link to="/reset-password">
                  <span className="text-primary underline font-medium">
                    Reset
                  </span>
                </Link>
              </p>
            </div>
          </form>
          <AppFooter theme="light" />
        </div>
      </div>
    </>
  );
};

export default LoadingScreen(Login, 'auth');
