import Link from 'next/link';
import useMobileDetect from 'use-mobile-detect-hook';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import AppFooter from '../components/layouts/app-footer';
import AppHeader from '../components/layouts/app-header';
import { EMAIL_PATTERN } from '../helpers/form-validation';
import AuthService from '../services/auth';

const authService = new AuthService();
const ResetPassword = () => {
  const { formState, register, handleSubmit } = useForm();
  const router = useRouter();
  const detectMobile = useMobileDetect();

  const onSubmit = data => {
    authService.resetPassword(data).then(res => {
      router.push('/login');
    });
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
          <div
            className="bg-white w-full md:w-2/3 text-center px-4 py-12 md:p-44"
            style={{
              backgroundImage: `url('/images/login_overlay.png')`,
              backgroundSize: 'cover',
            }}
          >
            <p className="text-4xl text-center whitespace-pre-line animate__animated animate__fadeInUp">
              Reset Your Password
            </p>
            <p className="text-xs text-center mt-2 animate__animated animate__fadeInUp animate__delay-2s">
              Please enter your email to request a password reset link.
            </p>
            <div className="w-full flex flex-col animate__animated animate__fadeInLeft animate__delay-4s">
              <input
                type="text"
                className="font-bold w-full h-16 text-xl mt-7 px-7 rounded-full shadow-md focus:outline-none"
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
            <div className="md:flex md:space-x-5 md:mt-4 mt-14 md:justify-center animate__animated animate__fadeInUp animate__delay-2s">
              <button
                type="submit"
                className="text-lg text-white w-full md:w-64 h-16 rounded-full bg-primary hover:opacity-40 focus:outline-none shadow-md"
              >
                Submit
              </button>
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
        </form>
        <AppFooter theme="light" />
      </div>
    </div>
  );
};

export default ResetPassword;
