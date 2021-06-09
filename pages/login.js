import Link from 'next/link';
import useMobileDetect from 'use-mobile-detect-hook';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import AppFooter from '../components/layouts/app-footer';
import AppHeader from '../components/layouts/app-header';
import { EMAIL_PATTERN } from '../components/helpers/form-validation';
import AuthService from '../components/services/auth.service';

const authService = new AuthService();
const Login = () => {
  const { formState, register, handleSubmit } = useForm();
  const router = useRouter();
  const detectMobile = useMobileDetect();

  const onSubmit = data => {
    authService.login(data).then(res => {
      if (res.data) {
        localStorage.setItem('ACCESS-TOKEN', res.data.access_token);
        router.push('/dashboard');
      }
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
            <p className="text-4xl text-center">Sign In</p>
            <p className="text-xs text-center mt-2">
              {`Don’t have an account yet? `}
              <Link href="/register">
                <a className="text-primary underline font-medium">Register</a>
              </Link>
            </p>
            <div className="w-full flex flex-col">
              <input
                type="email"
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
            <div className="w-full flex flex-col">
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
            <div className="md:flex md:space-x-5 mt-14 md:justify-center">
              <button
                type="submit"
                className="text-lg text-white w-full md:w-64 h-16 rounded-full bg-primary hover:opacity-40 focus:outline-none shadow-md"
              >
                Sign in
              </button>
              <button
                type="button"
                className="mt-2 md:mt-0 text-lg border-2 border-primary text-primary w-full md:w-64 h-16 rounded-full bg-white hover:bg-primary hover:bg-opacity-40 hover:text-white focus:outline-none shadow-md"
              >
                Sign in as Guest
              </button>
            </div>
            <p className="text-xs text-center mt-5">
              {`Forgot your password? `}
              <Link href="/reset-password">
                <a className="text-primary underline font-medium">Reset</a>
              </Link>
            </p>
          </div>
        </form>
        <AppFooter theme="light" />
      </div>
    </div>
  );
};

export default Login;
