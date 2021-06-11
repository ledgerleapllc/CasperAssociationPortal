import Link from 'next/link';
import useMobileDetect from 'use-mobile-detect-hook';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import AppFooter from '../components/layouts/app-footer';
import AppHeader from '../components/layouts/app-header';
import AuthService from '../services/auth.service';

const authService = new AuthService();
const VerifyEmail = () => {
  const { formState, register, handleSubmit } = useForm();
  const router = useRouter();
  const detectMobile = useMobileDetect();

  const onSubmit = data => {
    authService.verifyEmail(data).then(res => {
      router.push('/onboard');
    });
  };

  const onResend2FaCode = () => {
    authService.resend2FaCode();
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
            <p className="text-4xl text-center animate__animated animate__fadeInUp">
              Verify Your Email
            </p>
            <p className="text-xs text-center mt-2 animate__animated animate__fadeInUp animate__delay-2s">
              A verification code was sent to your email [show email]. You must
              enter this code in the field below to proceed. If you did not get
              the code, please check your spam folder.
            </p>
            <div className="w-full flex flex-col animate__animated animate__fadeInLeft animate__delay-4s ">
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
            </div>
            <div className="md:flex md:space-x-5 md:mt-4 mt-14 md:justify-center animate__animated animate__fadeInUp animate__delay-2s">
              <button
                type="submit"
                className="text-lg text-white w-full md:w-64 h-16 rounded-full bg-primary hover:opacity-40 focus:outline-none shadow-md"
              >
                Verify
              </button>
            </div>
            <a onClick={onResend2FaCode}>
              <p className="text-primary underline font-medium cursor-pointer text-xs text-center mt-5 flex justify-center animate__animated animate__fadeInUp animate__delay-4s">
                <a>Resend 2fa Code</a>
              </p>
            </a>
            <Link href="/update-email">
              <p className="text-primary underline font-medium cursor-pointer text-xs text-center mt-5 flex justify-center animate__animated animate__fadeInUp animate__delay-4s">
                <a>Update Email Address</a>
              </p>
            </Link>
          </div>
        </form>
        <AppFooter theme="light" />
      </div>
    </div>
  );
};

export default VerifyEmail;
